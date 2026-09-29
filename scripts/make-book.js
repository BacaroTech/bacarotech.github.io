#!/usr/bin/env node

/**
 * Script per generare/aggiornare data/book.json partendo da un link Google Books
 *
 * Usage:
 *   node scripts/make-book.js <link-google-books> [link-riferimento] [--title "Titolo riferimento"] [--refresh]
 *   node scripts/make-book.js   (senza parametri: modalità interattiva)
 *
 * Esempi:
 *   node scripts/make-book.js "https://www.google.it/books/edition/Embedded_Linux_Development_Using_Yocto_P/6NRJDwAAQBAJ?hl=it&gbpv=0"
 *   node scripts/make-book.js "https://books.google.com/books?id=6NRJDwAAQBAJ" "https://www.youtube.com/watch?v=XXXX"
 *
 * - Se il libro non esiste viene creato con i dati presi da Google Books
 * - Se il libro esiste e il riferimento non è presente viene aggiunto
 * - --refresh forza il riaggiornamento dei dati del libro (i riferimenti restano)
 *
 * I dati vengono letti dalle Google Books API (chiave opzionale GOOGLE_BOOKS_API_KEY
 * o YOUTUBE_API_KEY, con Books API abilitata nel progetto). Se le API non sono
 * disponibili si ripiega sul parsing della pagina HTML di Google Books.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const BOOK_FILE = path.join(__dirname, "..", "data", "book.json");
const USER_AGENT =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// Legge la chiave API (opzionale)
function getApiKey() {
	let apiKey = process.env.GOOGLE_BOOKS_API_KEY || process.env.YOUTUBE_API_KEY;

	if (!apiKey) {
		const envPath = path.join(__dirname, "..", ".env");
		if (fs.existsSync(envPath)) {
			const envContent = fs.readFileSync(envPath, "utf-8");
			const match =
				envContent.match(/GOOGLE_BOOKS_API_KEY=(.+)/) ||
				envContent.match(/YOUTUBE_API_KEY=(.+)/);
			if (match) {
				apiKey = match[1].trim().replace(/^["']|["']$/g, "");
			}
		}
	}

	return apiKey;
}

// Estrae l'ID del volume da un link Google Books
function extractBookId(link) {
	let url;
	try {
		url = new URL(link);
	} catch {
		return null;
	}

	const idParam = url.searchParams.get("id");
	if (idParam) return idParam;

	// es: /books/edition/<slug>/<ID>
	const match = url.pathname.match(/\/books\/edition\/[^/]+\/([A-Za-z0-9_-]{12})/);
	if (match) return match[1];

	return null;
}

function decodeEntities(text) {
	return text
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&nbsp;?/g, " ")
		.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(html) {
	return decodeEntities(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, ""))
		.replace(/[ \t]+/g, " ")
		.trim();
}

function splitIsbn(identifiers) {
	const isbn = {};
	for (const raw of identifiers) {
		const code = raw.replace(/[^0-9Xx]/g, "");
		if (code.length === 13) isbn.isbn13 = code;
		else if (code.length === 10) isbn.isbn10 = code;
	}
	return isbn;
}

// Recupera i dati dalle Google Books API
async function fetchFromApi(id) {
	const apiKey = getApiKey();
	const url = new URL(`https://www.googleapis.com/books/v1/volumes/${id}`);
	if (apiKey) url.searchParams.set("key", apiKey);

	const res = await fetch(url);
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body?.error?.message || `HTTP ${res.status}`);
	}

	const data = await res.json();
	const info = data.volumeInfo || {};
	const images = info.imageLinks || {};
	const isbn = splitIsbn(
		(info.industryIdentifiers || [])
			.filter((i) => i.type.startsWith("ISBN"))
			.map((i) => i.identifier),
	);

	return {
		title: info.title || "",
		subtitle: info.subtitle || "",
		authors: info.authors || [],
		publisher: info.publisher || "",
		publishedDate: info.publishedDate || "",
		description: info.description ? stripTags(info.description) : "",
		...isbn,
		pageCount: info.pageCount || null,
		categories: info.categories || [],
		language: info.language || "",
		thumbnail: (images.thumbnail || images.smallThumbnail || "").replace(
			/^http:/,
			"https:",
		),
	};
}

// Fallback: parsing della pagina HTML di Google Books
async function fetchFromHtml(id) {
	const url = `https://books.google.com/books?id=${id}&hl=en`;
	const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const html = await res.text();

	const meta = (name) => {
		const re = new RegExp(
			`<meta (?:name|property)="${name}" content="([^"]*)"`,
			"i",
		);
		const m = html.match(re);
		return m ? decodeEntities(m[1]) : "";
	};

	// Tabella dei metadati: <td class="metadata_label">X</td><td class="metadata_value">Y</td>
	const table = {};
	const rowRe =
		/<td class="metadata_label">([\s\S]*?)<\/td><td class="metadata_value">([\s\S]*?)<\/td><\/tr>/g;
	let m;
	while ((m = rowRe.exec(html)) !== null) {
		table[stripTags(m[1])] = m[2];
	}

	const fullTitle = table.Title ? stripTags(table.Title) : meta("og:title");
	const [title, ...rest] = fullTitle.split(": ");
	const subtitle = rest.join(": ");

	const authorsHtml = table.Author || table.Authors || "";
	const authors = [...authorsHtml.matchAll(/<span dir=ltr>([\s\S]*?)<\/span>/g)]
		.map((a) => stripTags(a[1]))
		.filter(Boolean);

	let publisher = table.Publisher ? stripTags(table.Publisher) : "";
	let publishedDate = "";
	const pubMatch = publisher.match(/^(.*),\s*(\d{4})$/);
	if (pubMatch) {
		publisher = pubMatch[1];
		publishedDate = pubMatch[2];
	}

	const isbn = splitIsbn(table.ISBN ? stripTags(table.ISBN).split(",") : []);

	const pages = table.Length ? stripTags(table.Length).match(/\d+/) : null;

	const categories = table.Subjects
		? [...table.Subjects.matchAll(/source=gbs_metadata_r[^>]*><span dir=ltr>([\s\S]*?)<\/span>/g)].map(
				(c) => stripTags(c[1]),
			)
		: [];

	return {
		title: title || "",
		subtitle,
		authors,
		publisher,
		publishedDate,
		description: meta("description"),
		...isbn,
		pageCount: pages ? Number(pages[0]) : null,
		categories,
		language: "",
		thumbnail: `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1`,
	};
}

async function fetchBook(id) {
	let data;
	try {
		data = await fetchFromApi(id);
		console.log("📚 Dati recuperati dalle Google Books API");
	} catch (err) {
		console.warn(`⚠️  Google Books API non disponibile (${err.message})`);
		console.warn("   Uso il fallback sulla pagina HTML...");
		data = await fetchFromHtml(id);
		console.log("📚 Dati recuperati dalla pagina di Google Books");
	}

	if (!data.title) throw new Error("Impossibile recuperare il titolo del libro");

	return {
		id,
		...data,
		link: `https://books.google.com/books?id=${id}`,
	};
}

// Tipo del riferimento dedotto dal link
function referenceType(link) {
	const host = new URL(link).hostname.replace(/^www\./, "");
	if (/(youtube\.com|youtu\.be|twitch\.tv|vimeo\.com)$/.test(host)) return "video";
	return "post";
}

// Normalizza un link per confrontare i riferimenti già presenti
function normalizeUrl(link) {
	const url = new URL(link);
	url.hash = "";
	url.hostname = url.hostname.replace(/^www\./, "");
	// Riduce i link YouTube alla forma canonica dell'ID video
	if (url.hostname === "youtu.be") {
		return `youtube.com/watch?v=${url.pathname.slice(1)}`;
	}
	if (url.hostname.endsWith("youtube.com")) {
		const v =
			url.searchParams.get("v") ||
			url.pathname.match(/\/(?:live|shorts|embed)\/([^/]+)/)?.[1];
		if (v) return `youtube.com/watch?v=${v}`;
	}
	for (const key of [...url.searchParams.keys()]) {
		if (key.startsWith("utm_")) url.searchParams.delete(key);
	}
	return `${url.hostname}${url.pathname.replace(/\/$/, "")}${url.search}`;
}

// Prova a recuperare il titolo della pagina del riferimento (best effort)
async function fetchReferenceTitle(link) {
	try {
		if (referenceType(link) === "video" && /youtu/.test(link)) {
			const res = await fetch(
				`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(link)}`,
			);
			if (res.ok) return (await res.json()).title || "";
		}
		const res = await fetch(link, { headers: { "User-Agent": USER_AGENT } });
		if (!res.ok) return "";
		const html = await res.text();
		const og = html.match(/<meta (?:property|name)="og:title" content="([^"]*)"/i);
		if (og) return decodeEntities(og[1]).trim();
		const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
		return title ? decodeEntities(title[1]).trim() : "";
	} catch {
		return "";
	}
}

function loadBooks() {
	if (!fs.existsSync(BOOK_FILE)) return {};
	const content = fs.readFileSync(BOOK_FILE, "utf-8").trim();
	return content ? JSON.parse(content) : {};
}

function saveBooks(books) {
	fs.writeFileSync(BOOK_FILE, JSON.stringify(books, null, "\t") + "\n");
}

function parseArgs(argv) {
	const args = { positional: [], title: "", refresh: false };
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === "--title") args.title = argv[++i] || "";
		else if (argv[i] === "--refresh") args.refresh = true;
		else args.positional.push(argv[i]);
	}
	return args;
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	let [bookLink, refLink] = args.positional;

	// Senza parametri chiede i dati in modo interattivo
	if (!bookLink) {
		const rl = readline.createInterface({ input: process.stdin });
		const lines = rl[Symbol.asyncIterator]();
		const ask = async (question) => {
			process.stdout.write(question);
			const { value } = await lines.next();
			return (value || "").trim();
		};

		console.log("--- 📚 Aggiungi libro ---");
		bookLink = await ask("Link Google Books: ");
		if (bookLink) {
			refLink = await ask("Link live/video/post (invio per nessuno): ");
			if (refLink && !args.title) {
				args.title = await ask(
					"Titolo del riferimento (invio per rilevarlo in automatico): ",
				);
			}
		}
		rl.close();

		if (!bookLink) {
			console.error("❌ Il link Google Books è obbligatorio");
			process.exit(1);
		}
	}

	const id = extractBookId(bookLink);
	if (!id) {
		console.error(`❌ Impossibile estrarre l'ID del libro da: ${bookLink}`);
		process.exit(1);
	}

	if (refLink) {
		try {
			new URL(refLink);
		} catch {
			console.error(`❌ Link del riferimento non valido: ${refLink}`);
			process.exit(1);
		}
	}

	const books = loadBooks();
	let book = books[id];

	if (!book || args.refresh) {
		const data = await fetchBook(id);
		book = { ...data, references: book?.references || [] };
		console.log(`✅ ${args.refresh && books[id] ? "Aggiornato" : "Aggiunto"}: ${book.title}`);
	} else {
		console.log(`ℹ️  Libro già presente: ${book.title}`);
		book.references = book.references || [];
	}

	if (refLink) {
		const normalized = normalizeUrl(refLink);
		const exists = book.references.some((r) => normalizeUrl(r.url) === normalized);

		if (exists) {
			console.log(`ℹ️  Riferimento già presente: ${refLink}`);
		} else {
			const title = args.title || (await fetchReferenceTitle(refLink));
			book.references.push({
				url: refLink,
				type: referenceType(refLink),
				title,
				added: new Date().toISOString().slice(0, 10),
			});
			console.log(`🔗 Riferimento aggiunto: ${title || refLink}`);
		}
	}

	books[id] = book;
	saveBooks(books);
	console.log(`💾 Salvato in ${path.relative(process.cwd(), BOOK_FILE)}`);
}

main().catch((err) => {
	console.error(`❌ Errore: ${err.message}`);
	process.exit(1);
});
