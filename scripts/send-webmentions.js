#!/usr/bin/env node

/**
 * Script per inviare le webmention dei post del blog tramite Telegraph
 * (https://telegraph.p3k.io).
 *
 * Per ogni post pubblicato di recente (letto dal feed RSS del sito online):
 *   1. scarica la pagina pubblicata e ne legge il microformat h-entry;
 *   2. estrae i link esterni contenuti in e-content;
 *   3. chiede a Telegraph di inviare una webmention per ogni link non ancora
 *      notificato.
 *
 * I link a Bridgy Publish (https://brid.gy/publish/...) pubblicano il post sui
 * social: vengono inviati solo per i post degli ultimi BRIDGY_MAX_AGE_DAYS giorni.
 *
 * Le coppie source/target già inviate sono salvate in
 * scripts/data/webmentions-sent.json, così ogni link viene notificato una
 * sola volta. Se Telegraph rifiuta una richiesta, la coppia non viene salvata
 * e verrà ritentata al giro successivo.
 *
 * Usage:
 *   node scripts/send-webmentions.js            # invia le webmention
 *   node scripts/send-webmentions.js --dry-run  # mostra cosa verrebbe inviato
 *
 * Opzioni:
 *   --dry-run          Non chiama Telegraph e non aggiorna lo stato
 *   --days <n>         Considera solo i post pubblicati negli ultimi n giorni (default 30)
 *   --site <url>       URL del sito (default https://bacarotech.github.io/)
 *
 * Variabili d'ambiente (anche via file .env nella root):
 *   TELEGRAPH_TOKEN    Token API di Telegraph (https://telegraph.p3k.io/dashboard)
 */

const fs = require("fs");
const path = require("path");
const { mf2 } = require("microformats-parser");

const ROOT_DIR = path.join(__dirname, "..");
const STATE_FILE = path.join(__dirname, "data", "webmentions-sent.json");

const TELEGRAPH_ENDPOINT = "https://telegraph.p3k.io/webmention";
const DEFAULT_SITE = "https://bacarotech.github.io/";
const DEFAULT_DAYS = 30;
const FETCH_TIMEOUT_MS = 15000;
// Pausa tra una richiesta e l'altra a Telegraph, per non sovraccaricarlo
const TELEGRAPH_DELAY_MS = 1000;
// Le webmention a Bridgy Publish pubblicano il post su Mastodon/Bluesky:
// vengono inviate solo per i post appena usciti, per non ripubblicare
// sui social i post vecchi (es. al primo avvio o dopo un cambio di --days).
const BRIDGY_PUBLISH_PREFIX = "https://brid.gy/publish/";
const BRIDGY_MAX_AGE_DAYS = 2;

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

// Carica le variabili da un file .env se presente (parser minimale)
function loadDotEnv() {
	const envPath = path.join(ROOT_DIR, ".env");
	if (!fs.existsSync(envPath)) return;

	const content = fs.readFileSync(envPath, "utf-8");
	for (const rawLine of content.split("\n")) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;
		const eq = line.indexOf("=");
		if (eq === -1) continue;
		const key = line.slice(0, eq).trim();
		const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
		if (!(key in process.env)) process.env[key] = value;
	}
}

function parseArgs(argv) {
	const args = { dryRun: false, days: DEFAULT_DAYS, site: DEFAULT_SITE };
	for (let i = 0; i < argv.length; i++) {
		switch (argv[i]) {
			case "--dry-run":
				args.dryRun = true;
				break;
			case "--days":
				args.days = Number(argv[++i]);
				break;
			case "--site":
				args.site = argv[++i];
				break;
			default:
				throw new Error(`Opzione sconosciuta: ${argv[i]}`);
		}
	}
	if (!Number.isFinite(args.days) || args.days <= 0) {
		throw new Error("--days deve essere un numero positivo");
	}
	if (!args.site.endsWith("/")) args.site += "/";
	return args;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
	const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
	if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
	return res.text();
}

function decodeXmlEntities(text) {
	return text
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, "&");
}

function loadState() {
	if (!fs.existsSync(STATE_FILE)) return {};
	return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
}

function saveState(state) {
	fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
	fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, "\t") + "\n");
}

// ---------------------------------------------------------------------------
// Lettura dei post
// ---------------------------------------------------------------------------

// Restituisce i post del feed RSS pubblicati dopo `since`
async function getRecentPosts(site, since) {
	const xml = await fetchText(new URL("blog/index.xml", site).href);
	const posts = [];
	for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
		const link = item.match(/<link>([^<]+)<\/link>/);
		const pubDate = item.match(/<pubDate>([^<]+)<\/pubDate>/);
		if (!link || !pubDate) continue;
		const date = new Date(pubDate[1]);
		if (date >= since) posts.push({ url: decodeXmlEntities(link[1].trim()), date });
	}
	return posts;
}

// Estrae i link esterni contenuti nell'e-content del primo h-entry della pagina
async function getMentionTargets(postUrl) {
	const html = await fetchText(postUrl);
	const parsed = mf2(html, { baseUrl: postUrl });
	const entry = parsed.items.find((item) => item.type.includes("h-entry"));
	if (!entry) throw new Error(`${postUrl}: nessun h-entry trovato`);

	const content = entry.properties.content?.[0];
	if (!content?.html) return [];

	const siteHost = new URL(postUrl).host;
	const targets = new Set();
	for (const [, href] of content.html.matchAll(/<a\s[^>]*?href="([^"]+)"/g)) {
		let target;
		try {
			target = new URL(decodeXmlEntities(href), postUrl);
		} catch {
			continue;
		}
		if (!["http:", "https:"].includes(target.protocol)) continue;
		// I link interni al sito non hanno un endpoint webmention
		if (target.host === siteHost) continue;
		target.hash = "";
		targets.add(target.href);
	}
	return [...targets];
}

// ---------------------------------------------------------------------------
// Invio tramite Telegraph
// ---------------------------------------------------------------------------

async function sendWebmention(token, source, target) {
	const res = await fetch(TELEGRAPH_ENDPOINT, {
		method: "POST",
		body: new URLSearchParams({ token, source, target }),
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
	});
	if (res.ok) return { ok: true, status: res.headers.get("location") };

	const body = await res.text();
	let message = body;
	try {
		const json = JSON.parse(body);
		message = json.error_description || json.error || body;
	} catch {
		// risposta non JSON: si usa il testo così com'è
	}
	return { ok: false, message: `HTTP ${res.status}: ${message}` };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	loadDotEnv();
	const args = parseArgs(process.argv.slice(2));
	const token = process.env.TELEGRAPH_TOKEN;
	if (!token && !args.dryRun) {
		throw new Error("TELEGRAPH_TOKEN non impostato (usa --dry-run per una prova senza invio)");
	}

	const DAY_MS = 24 * 60 * 60 * 1000;
	const since = new Date(Date.now() - args.days * DAY_MS);
	const bridgySince = new Date(Date.now() - BRIDGY_MAX_AGE_DAYS * DAY_MS);
	const posts = await getRecentPosts(args.site, since);
	console.log(`📰 ${posts.length} post pubblicati negli ultimi ${args.days} giorni`);

	const state = loadState();
	let sent = 0;
	let failed = 0;

	for (const post of posts) {
		let targets;
		try {
			targets = await getMentionTargets(post.url);
		} catch (err) {
			console.error(`❌ ${err.message}`);
			failed++;
			continue;
		}

		const alreadySent = state[post.url] || {};
		const pending = targets.filter(
			(target) =>
				!alreadySent[target] &&
				(!target.startsWith(BRIDGY_PUBLISH_PREFIX) || post.date >= bridgySince),
		);
		if (pending.length === 0) continue;

		console.log(`\n📝 ${post.url}`);
		for (const target of pending) {
			if (args.dryRun) {
				console.log(`   ↪ ${target} (dry run)`);
				continue;
			}

			const result = await sendWebmention(token, post.url, target);
			if (result.ok) {
				console.log(`   ✅ ${target}`);
				state[post.url] = { ...state[post.url], [target]: new Date().toISOString() };
				sent++;
			} else {
				console.error(`   ❌ ${target} → ${result.message}`);
				failed++;
			}
			await sleep(TELEGRAPH_DELAY_MS);
		}
	}

	if (!args.dryRun) saveState(state);
	console.log(`\n✨ Webmention inviate: ${sent}, errori: ${failed}`);
	// Gli errori non bloccano il workflow: le coppie non inviate vengono ritentate al giro successivo
}

main().catch((err) => {
	console.error(`❌ ${err.message}`);
	process.exit(1);
});
