#!/usr/bin/env node

/**
 * Script per recuperare il numero di follower/iscritti di un account sui
 * principali social:
 *   - Bluesky
 *   - Instagram
 *   - LinkedIn
 *   - Mastodon
 *   - TikTok
 *   - YouTube
 *
 * Usage:
 *   node scripts/follower-count.js --youtube @Bacarotech --instagram bacarotech \
 *       --tiktok bacarotech --linkedin bacarotech --mastodon @bacarotech@mastodon.uno \
 *       --bluesky bacarotech.bsky.social
 *
 *   # Oppure senza argomenti: legge scripts/data/social-accounts.json
 *   node scripts/follower-count.js
 *
 * Opzioni:
 *   --bluesky <handle|did|url>    Profilo Bluesky (es. bacarotech.bsky.social)
 *   --youtube <handle|id|url>     Canale YouTube (handle con o senza @, channel id, o URL)
 *   --instagram <username|url>    Profilo Instagram
 *   --tiktok <username|url>       Profilo TikTok
 *   --linkedin <slug|url>         Pagina aziendale LinkedIn (/company/<slug>)
 *   --mastodon <user@istanza|url> Account Mastodon (es. @bacarotech@mastodon.uno)
 *   --config <path>              Percorso a un file JSON con gli account
 *   --json                       Stampa anche il risultato completo in JSON su stdout
 *   --no-save                    Non aggiornare data/social.json
 *
 * Di default lo script aggiorna data/social.json: per ogni social con un
 * numero valido scrive/aggiorna la voce; i social senza dati vengono lasciati
 * invariati (la voce precedente resta, e se non c'era non viene aggiunta).
 *
 * Variabili d'ambiente (anche via file .env nella root):
 *   YOUTUBE_API_KEY        Chiave API di YouTube Data API v3 (necessaria per YouTube)
 *   LINKEDIN_ACCESS_TOKEN  Token OAuth con scope r_organization_social (opzionale, LinkedIn ufficiale)
 *   LINKEDIN_ORG_ID        ID numerico dell'organizzazione LinkedIn (con LINKEDIN_ACCESS_TOKEN)
 *
 * NOTA: YouTube (con API key), Mastodon, Bluesky e LinkedIn (con token) usano
 * API ufficiali/pubbliche. Instagram, TikTok e LinkedIn "pubblico" vengono letti
 * da pagine/endpoint web non ufficiali: possono cambiare, essere rate-limitati o
 * richiedere login. In quei casi il valore sarà `null` con un messaggio di errore.
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const DATA_DIR = path.join(__dirname, "data");
const DEFAULT_CONFIG = path.join(DATA_DIR, "social-accounts.json");
// File dati del sito (consumabile da Hugo come site.Data.social)
const SITE_DATA_DIR = path.join(ROOT_DIR, "data");
const SOCIAL_FILE = path.join(SITE_DATA_DIR, "social.json");

const USER_AGENT =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
	"(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const FETCH_TIMEOUT_MS = 15000;

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
		let value = line.slice(eq + 1).trim();
		value = value.replace(/^["']|["']$/g, "");
		if (!(key in process.env)) {
			process.env[key] = value;
		}
	}
}

// Parsing degli argomenti da riga di comando
function parseArgs(argv) {
	const args = { flags: {}, options: {} };
	for (let i = 0; i < argv.length; i++) {
		const token = argv[i];
		if (!token.startsWith("--")) continue;
		const name = token.slice(2);
		const next = argv[i + 1];
		if (next === undefined || next.startsWith("--")) {
			args.flags[name] = true;
		} else {
			args.options[name] = next;
			i++;
		}
	}
	return args;
}

// Estrae l'ultimo segmento non vuoto da un URL/percorso
function lastPathSegment(value) {
	const parts = value.split(/[/?#]/).filter(Boolean);
	return parts.length ? parts[parts.length - 1] : value;
}

// Normalizza un handle/username: toglie URL, @, spazi
function normalizeHandle(value) {
	if (!value) return value;
	let handle = String(value).trim();
	if (handle.includes("://") || handle.includes("/")) {
		handle = lastPathSegment(handle);
	}
	return handle.replace(/^@/, "").trim();
}

// fetch con timeout e User-Agent da browser
async function httpGet(url, extraHeaders = {}) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
	try {
		const res = await fetch(url, {
			signal: controller.signal,
			redirect: "follow",
			headers: {
				"User-Agent": USER_AGENT,
				"Accept-Language": "it-IT,it;q=0.9,en;q=0.8",
				...extraHeaders,
			},
		});
		return res;
	} finally {
		clearTimeout(timer);
	}
}

function formatNumber(n) {
	if (n === null || n === undefined || Number.isNaN(n)) return "n/d";
	return new Intl.NumberFormat("it-IT").format(n);
}

// ---------------------------------------------------------------------------
// YouTube (API ufficiale - YouTube Data API v3)
// ---------------------------------------------------------------------------

async function getYouTubeFollowers(account) {
	const apiKey = process.env.YOUTUBE_API_KEY;
	if (!apiKey) {
		return {
			followers: null,
			method: "youtube-data-api-v3",
			error: "YOUTUBE_API_KEY non impostata",
		};
	}

	const raw = String(account).trim();
	const base = "https://www.googleapis.com/youtube/v3/channels";
	const params = new URLSearchParams({ part: "statistics,snippet", key: apiKey });

	// channel id: UC + 22 caratteri
	if (/^UC[\w-]{22}$/.test(raw)) {
		params.set("id", raw);
	} else {
		params.set("forHandle", normalizeHandle(raw));
	}

	const res = await httpGet(`${base}?${params.toString()}`);
	const body = await res.json().catch(() => null);

	if (!res.ok) {
		const msg =
			body && body.error && body.error.message
				? body.error.message
				: `HTTP ${res.status}`;
		return { followers: null, method: "youtube-data-api-v3", error: msg };
	}

	const item = body && body.items && body.items[0];
	if (!item) {
		return {
			followers: null,
			method: "youtube-data-api-v3",
			error: "Canale non trovato",
		};
	}

	const count = Number(item.statistics.subscriberCount);
	return {
		followers: Number.isFinite(count) ? count : null,
		method: "youtube-data-api-v3",
		error: item.statistics.hiddenSubscriberCount
			? "Numero iscritti nascosto dal canale"
			: null,
		extra: { channelId: item.id, title: item.snippet && item.snippet.title },
	};
}

// ---------------------------------------------------------------------------
// Instagram (endpoint web non ufficiale)
// ---------------------------------------------------------------------------

async function getInstagramFollowers(account) {
	const username = normalizeHandle(account);
	const url =
		"https://www.instagram.com/api/v1/users/web_profile_info/?username=" +
		encodeURIComponent(username);

	const res = await httpGet(url, {
		// app id pubblico usato dal client web di Instagram
		"x-ig-app-id": "936619743392459",
		Accept: "*/*",
		Referer: `https://www.instagram.com/${username}/`,
	});

	if (!res.ok) {
		return {
			followers: null,
			method: "instagram-web-profile-info",
			error: `HTTP ${res.status} (possibile rate-limit o login richiesto)`,
		};
	}

	const body = await res.json().catch(() => null);
	const user = body && body.data && body.data.user;
	if (!user) {
		return {
			followers: null,
			method: "instagram-web-profile-info",
			error: "Profilo non trovato o risposta non valida",
		};
	}

	const count = user.edge_followed_by && user.edge_followed_by.count;
	return {
		followers: typeof count === "number" ? count : null,
		method: "instagram-web-profile-info",
		error: null,
		extra: { fullName: user.full_name, isPrivate: user.is_private },
	};
}

// ---------------------------------------------------------------------------
// TikTok (parsing dello state JSON nella pagina)
// ---------------------------------------------------------------------------

async function getTikTokFollowers(account) {
	const username = normalizeHandle(account);
	const res = await httpGet(`https://www.tiktok.com/@${encodeURIComponent(username)}?lang=en`, {
		Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
		"Accept-Language": "en-US,en;q=0.9",
		"Sec-Fetch-Dest": "document",
		"Sec-Fetch-Mode": "navigate",
		"Sec-Fetch-Site": "none",
		"Upgrade-Insecure-Requests": "1",
		"sec-ch-ua":
			'"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": '"macOS"',
	});

	if (!res.ok) {
		return {
			followers: null,
			method: "tiktok-universal-data",
			error: `HTTP ${res.status} (possibile blocco anti-bot)`,
		};
	}

	const html = await res.text();

	// TikTok serve una pagina di verifica/captcha alle richieste non-browser
	// (tipico da IP datacenter): non contiene i dati del profilo.
	if (
		!html.includes('"webapp.user-detail"') &&
		/captcha|verify|__tea|SecSdk/i.test(html)
	) {
		return {
			followers: null,
			method: "tiktok-universal-data",
			error:
				"TikTok ha risposto con una pagina di verifica anti-bot (prova da una rete residenziale o usa la TikTok API ufficiale)",
		};
	}

	// 1) Prova con lo state JSON iniettato nella pagina
	const match = html.match(
		/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([\s\S]*?)<\/script>/,
	);
	if (match) {
		try {
			const data = JSON.parse(match[1]);
			const scope = data["__DEFAULT_SCOPE__"] || {};
			const detail = scope["webapp.user-detail"];
			const stats =
				detail && detail.userInfo && detail.userInfo.stats
					? detail.userInfo.stats
					: detail && detail.userInfo && detail.userInfo.statsV2;
			if (stats && stats.followerCount !== undefined) {
				return {
					followers: Number(stats.followerCount),
					method: "tiktok-universal-data",
					error: null,
				};
			}
		} catch (_) {
			// cade nel fallback regex
		}
	}

	// 2) Fallback: cerca "followerCount":N nell'HTML grezzo
	const rough = html.match(/"followerCount":\s*(\d+)/);
	if (rough) {
		return {
			followers: Number(rough[1]),
			method: "tiktok-html-regex",
			error: null,
		};
	}

	return {
		followers: null,
		method: "tiktok-universal-data",
		error: "Dati follower non trovati nella pagina",
	};
}

// ---------------------------------------------------------------------------
// LinkedIn (API ufficiale se c'è il token, altrimenti scraping best-effort)
// ---------------------------------------------------------------------------

async function getLinkedInFollowers(account) {
	const token = process.env.LINKEDIN_ACCESS_TOKEN;
	const orgId = process.env.LINKEDIN_ORG_ID;

	// --- Metodo ufficiale: networkSizes ---
	if (token && orgId) {
		const url =
			`https://api.linkedin.com/rest/networkSizes/urn:li:organization:${orgId}` +
			"?edgeType=CompanyFollowedByMember";
		const res = await httpGet(url, {
			Authorization: `Bearer ${token}`,
			"LinkedIn-Version": "202405",
			"X-Restli-Protocol-Version": "2.0.0",
		});
		const body = await res.json().catch(() => null);
		if (res.ok && body && typeof body.firstDegreeSize === "number") {
			return {
				followers: body.firstDegreeSize,
				method: "linkedin-networkSizes-api",
				error: null,
			};
		}
		return {
			followers: null,
			method: "linkedin-networkSizes-api",
			error:
				body && body.message ? body.message : `HTTP ${res.status}`,
		};
	}

	// --- Best-effort: pagina pubblica /company/<slug> ---
	const slug = normalizeHandle(account);
	const res = await httpGet(`https://www.linkedin.com/company/${encodeURIComponent(slug)}/`, {
		Accept: "text/html,application/xhtml+xml",
	});

	if (!res.ok) {
		return {
			followers: null,
			method: "linkedin-public-page",
			error: `HTTP ${res.status} (LinkedIn spesso richiede login)`,
		};
	}

	const html = await res.text();
	const candidates = [
		/"followerCount":\s*(\d+)/,
		/"followingInfo":\s*{[^}]*"followerCount":\s*(\d+)/,
		/([\d.,]+)\s*follower/i,
	];
	for (const re of candidates) {
		const m = html.match(re);
		if (m) {
			const num = Number(m[1].replace(/[.,]/g, ""));
			if (Number.isFinite(num)) {
				return {
					followers: num,
					method: "linkedin-public-page",
					error: null,
				};
			}
		}
	}

	return {
		followers: null,
		method: "linkedin-public-page",
		error:
			"Follower non trovati (imposta LINKEDIN_ACCESS_TOKEN + LINKEDIN_ORG_ID per l'API ufficiale)",
	};
}

// ---------------------------------------------------------------------------
// Mastodon (API pubblica dell'istanza - nessuna autenticazione)
// ---------------------------------------------------------------------------

// Estrae { username, instance } da "user@istanza", "@user@istanza" o URL profilo
function parseMastodonAccount(value) {
	let raw = String(value).trim();

	if (raw.includes("://")) {
		try {
			const url = new URL(raw);
			return {
				username: lastPathSegment(url.pathname).replace(/^@/, ""),
				instance: url.host,
			};
		} catch (_) {
			return null;
		}
	}

	raw = raw.replace(/^@/, "");
	const parts = raw.split("@");
	if (parts.length === 2 && parts[0] && parts[1]) {
		return { username: parts[0], instance: parts[1] };
	}
	return null;
}

async function getMastodonFollowers(account) {
	const parsed = parseMastodonAccount(account);
	if (!parsed) {
		return {
			followers: null,
			method: "mastodon-api",
			error: "Formato non valido: usa utente@istanza (es. bacarotech@mastodon.uno) o l'URL del profilo",
		};
	}

	const { username, instance } = parsed;
	const url =
		`https://${instance}/api/v1/accounts/lookup?acct=` +
		encodeURIComponent(username);

	const res = await httpGet(url, { Accept: "application/json" });
	if (!res.ok) {
		return {
			followers: null,
			method: "mastodon-api",
			error: `HTTP ${res.status} (istanza o account non validi)`,
		};
	}

	const body = await res.json().catch(() => null);
	if (!body || typeof body.followers_count !== "number") {
		return {
			followers: null,
			method: "mastodon-api",
			error: "Account non trovato o risposta non valida",
		};
	}

	return {
		followers: body.followers_count,
		method: "mastodon-api",
		error: null,
		extra: {
			instance,
			acct: `${body.username}@${instance}`,
			displayName: body.display_name,
		},
	};
}

// ---------------------------------------------------------------------------
// Bluesky (AppView pubblica - nessuna autenticazione)
// ---------------------------------------------------------------------------

async function getBlueskyFollowers(account) {
	let actor = String(account).trim();
	if (actor.includes("://")) {
		actor = lastPathSegment(actor);
	}
	actor = actor.replace(/^@/, "");

	const url =
		"https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=" +
		encodeURIComponent(actor);

	const res = await httpGet(url, { Accept: "application/json" });
	const body = await res.json().catch(() => null);

	if (!res.ok) {
		return {
			followers: null,
			method: "bluesky-public-api",
			error:
				body && body.message ? body.message : `HTTP ${res.status}`,
		};
	}

	if (!body || typeof body.followersCount !== "number") {
		return {
			followers: null,
			method: "bluesky-public-api",
			error: "Profilo non trovato o risposta non valida",
		};
	}

	return {
		followers: body.followersCount,
		method: "bluesky-public-api",
		error: null,
		extra: {
			handle: body.handle,
			did: body.did,
			displayName: body.displayName,
		},
	};
}

// ---------------------------------------------------------------------------
// Orchestrazione
// ---------------------------------------------------------------------------

const PLATFORMS = {
	bluesky: getBlueskyFollowers,
	instagram: getInstagramFollowers,
	linkedin: getLinkedInFollowers,
	mastodon: getMastodonFollowers,
	tiktok: getTikTokFollowers,
	youtube: getYouTubeFollowers,
};

// Costruisce la mappa piattaforma -> account da CLI o file di config
function resolveAccounts(args) {
	const fromCli = {};
	for (const key of Object.keys(PLATFORMS)) {
		if (args.options[key]) fromCli[key] = args.options[key];
	}
	if (Object.keys(fromCli).length > 0) return fromCli;

	const configPath = args.options.config
		? path.resolve(args.options.config)
		: DEFAULT_CONFIG;

	if (!fs.existsSync(configPath)) {
		console.error(`Nessun account passato e config non trovata: ${configPath}`);
		console.error(
			"Esempio: node scripts/follower-count.js --youtube @Bacarotech --instagram bacarotech",
		);
		process.exit(1);
	}

	const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
	const accounts = {};
	for (const key of Object.keys(PLATFORMS)) {
		if (config[key]) accounts[key] = config[key];
	}
	return accounts;
}

// Aggiorna data/social.json unendo i nuovi valori a quelli già presenti.
// I social senza un numero valido (followers null) non vengono toccati:
// resta la voce precedente e, se non esisteva, non viene aggiunta.
function updateSocialFile(results) {
	let current = {};
	if (fs.existsSync(SOCIAL_FILE)) {
		try {
			const parsed = JSON.parse(fs.readFileSync(SOCIAL_FILE, "utf-8"));
			if (parsed && typeof parsed === "object") current = parsed;
		} catch (_) {
			console.warn(
				`Attenzione: ${path.relative(ROOT_DIR, SOCIAL_FILE)} non è JSON valido, verrà rigenerato`,
			);
		}
	}

	const now = new Date().toISOString();
	const updated = [];

	for (const r of results) {
		if (typeof r.followers !== "number" || Number.isNaN(r.followers)) {
			continue;
		}
		current[r.platform] = {
			account: r.account,
			followers: r.followers,
			updatedAt: now,
		};
		updated.push(r.platform);
	}

	if (updated.length === 0) {
		console.log(
			`Nessun dato valido: ${path.relative(ROOT_DIR, SOCIAL_FILE)} lasciato invariato`,
		);
		return;
	}

	const ordered = {};
	for (const key of Object.keys(current).sort()) {
		ordered[key] = current[key];
	}

	if (!fs.existsSync(SITE_DATA_DIR)) {
		fs.mkdirSync(SITE_DATA_DIR, { recursive: true });
	}
	fs.writeFileSync(SOCIAL_FILE, JSON.stringify(ordered, null, 2) + "\n");
	console.log(
		`Aggiornato ${path.relative(ROOT_DIR, SOCIAL_FILE)} (${updated.join(", ")})`,
	);
}

async function main() {
	loadDotEnv();
	const args = parseArgs(process.argv.slice(2));
	const accounts = resolveAccounts(args);

	const entries = Object.entries(accounts);
	if (entries.length === 0) {
		console.error("Nessun account da controllare.");
		process.exit(1);
	}

	const results = await Promise.all(
		entries.map(async ([platform, account]) => {
			try {
				const data = await PLATFORMS[platform](account);
				return { platform, account: String(account), ...data };
			} catch (err) {
				return {
					platform,
					account: String(account),
					followers: null,
					method: "n/d",
					error: err.message || String(err),
				};
			}
		}),
	);

	results.sort((a, b) => a.platform.localeCompare(b.platform));

	console.log("\nFollower per account");
	console.log("====================");
	for (const r of results) {
		const value = formatNumber(r.followers).padStart(12);
		console.log(
			`${r.platform.padEnd(10)} ${String(r.account).padEnd(24)} ${value}`,
		);
		if (r.error) console.log(`${" ".repeat(11)}⚠  ${r.error}`);
	}
	console.log("");

	if (args.flags.json) {
		console.log(JSON.stringify(results, null, 2));
	}

	if (!args.flags["no-save"]) {
		updateSocialFile(results);
	}

	// exit code 1 se nessun dato è stato recuperato
	if (results.every((r) => r.followers === null)) {
		process.exit(1);
	}
}

main().catch((err) => {
	console.error("Errore:", err.message || err);
	process.exit(1);
});
