#!/usr/bin/env node

/**
 * Script per generare post Hugo per ogni video e short del canale YouTube
 *
 * Usage:
 *   - Imposta la variabile d'ambiente YOUTUBE_API_KEY con la tua chiave API
 *   - Oppure crea un file .env con YOUTUBE_API_KEY=your_key
 *   - Esegui: node scripts/generate-youtube-posts.js
 *
 * Per ottenere una chiave API YouTube:
 * 1. Vai su https://console.cloud.google.com/
 * 2. Crea un progetto
 * 3. Abilita YouTube Data API v3
 * 4. Crea le credenziali (API Key)
 */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// Configurazione
const CHANNEL_HANDLE = "@Bacarotech";
const OUTPUT_DIR = path.join(__dirname, "..", "content", "blog");

// Legge la chiave API
function getApiKey() {
	let apiKey = process.env.YOUTUBE_API_KEY;

	if (!apiKey) {
		const envPath = path.join(__dirname, "..", ".env");
		if (fs.existsSync(envPath)) {
			const envContent = fs.readFileSync(envPath, "utf-8");
			const match = envContent.match(/YOUTUBE_API_KEY=(.+)/);
			if (match) {
				apiKey = match[1].trim();
			}
		}
	}

	if (!apiKey) {
		console.error("ERRORE: YouTube API Key non trovata!");
		console.error(
			"Imposta la variabile d'ambiente YOUTUBE_API_KEY o crea un file .env",
		);
		console.error("");
		console.error("Per ottenere una chiave API:");
		console.error("1. Vai su https://console.cloud.google.com/");
		console.error("2. Crea un progetto");
		console.error("3. Abilita YouTube Data API v3");
		console.error("4. Crea le credenziali (API Key)");
		process.exit(1);
	}

	return apiKey;
}

// Ottiene l'ID del canale e la playlist uploads dall'handle
async function getChannelInfo(youtube, channelHandle) {
	console.log(`Cercando canale con handle: ${channelHandle}`);
	try {
		const response = await youtube.channels.list({
			forHandle: channelHandle,
			part: "id,snippet,contentDetails",
		});

		console.log("Response status:", response.status);
		if (response.data && response.data.items) {
			console.log(
				"Numero di canali trovati:",
				response.data.items.length,
			);
		}

		if (response.data.items && response.data.items.length > 0) {
			const channel = response.data.items[0];
			return {
				id: channel.id,
				uploadsPlaylistId:
					channel.contentDetails.relatedPlaylists
						.uploads,
			};
		}
		return null;
	} catch (error) {
		console.error("Errore nel recupero del canale:", error.message);
		throw error;
	}
}

// Parsa la durata ISO 8601 e ritorna i secondi
function parseDuration(duration) {
	if (!duration) return 0;

	const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
	if (!match) return 0;

	const hours = parseInt(match[1] || 0);
	const minutes = parseInt(match[2] || 0);
	const seconds = parseInt(match[3] || 0);

	return hours * 3600 + minutes * 60 + seconds;
}

// Determina se il video è uno Short (max 60 secondi)
function isShort(duration) {
	return parseDuration(duration) <= 60;
}

/**
 * Estrae il nome della serie dal titolo del video.
 * Formato previsto: "NOME_SERIE EP NUMERO - TITOLO" o simili
 *
 * Esempi:
 * - "BacaroLive EP 8 - hybris, gdg lecce..." -> "BacaroLive"
 * - "Self Hosting PT6 - Self Hosting PT6 - Impostazioni" -> "Self Hosting PT6"
 * - "Corso C zero to hero - PT26 - ricerca" -> "Corso C zero to hero"
 */
function extractSeries(title) {
	// Rimuovi i duplicati come "NomeSerie - NomeSerie - Titolo"
	// Trova pattern come "X - X - Y" e sostituisci con "X - Y"
	let cleanedTitle = title.replace(
		/^([A-Za-z0-9\s]+?)\s*-\s*\1\s*-\s*/i,
		"$1 - ",
	);

	// Pattern comuni per le serie
	const patterns = [
		/^([A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*?)\s+EP\s*\d+/i, // "NomeSerie EP 1"
		/^([A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*?)\s*#\s*\d+/i, // "NomeSerie #1"
		/^([A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*?)\s+PT\s*\d+/i, // "NomeSerie PT 1"
		/^([A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*?)\s+-\s+[A-Za-z]/i, // "NomeSerie - Titolo"
		/^([A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*?):\s+/i, // "NomeSerie: Titolo"
	];

	for (const pattern of patterns) {
		const match = cleanedTitle.match(pattern);
		if (match) {
			let seriesName = match[1].trim();
			// Pulisci il nome della serie
			seriesName = seriesName.replace(/\s+/g, " ");
			return seriesName;
		}
	}

	return null;
}

// Genera uno slug dal titolo
function generateSlug(title) {
	let slug = title.toLowerCase();
	// Rimuovi caratteri speciali
	slug = slug.replace(/[^a-z0-9\s-]/g, "");
	// Sostituisci spazi con trattini
	slug = slug.replace(/\s+/g, "-");
	// Rimuovi trattini multipli
	slug = slug.replace(/-+/g, "-");
	// Limita la lunghezza
	return slug.substring(0, 100);
}

// Genera il frontmatter del post
function generateFrontmatter(video, isShortVideo, seriesName) {
	const date = video.snippet.publishedAt;
	const year = new Date(date).getFullYear();

	// Genera i tag
	const tags = [];
	if (isShortVideo) {
		tags.push("short");
	} else {
		tags.push("video");
	}

	// Aggiungi i tag da YouTube (max 10)
	const videoTags = video.snippet.tags || [];
	for (const tag of videoTags.slice(0, 10)) {
		const slugTag = tag.toLowerCase().replace(/\s+/g, "-");
		if (!tags.includes(slugTag)) {
			tags.push(slugTag);
		}
	}

	// Costruisci il frontmatter
	const title = video.snippet.title.replace(/"/g, '\\"');
	// Pulisci la descrizione rimuovendo i link social
	const cleanedDescription = removeSocialLinks(
		video.snippet.description || "",
	);
	const description = cleanedDescription
		.substring(0, 200)
		.replace(/"/g, '\\"');

	let frontmatter = `---
title: "${title}"
date: ${date}
featured: false
weight: 100
description: "${description}"
tags:
`;

	for (const tag of tags) {
		frontmatter += ` - "${tag}"\n`;
	}

	frontmatter += "topics:\nauthors:\n";

	// Aggiungi la serie se trovata
	if (seriesName) {
		frontmatter += `series:\n - "${seriesName}"\n`;
	} else {
		frontmatter += "series:\n";
	}

	frontmatter += "---\n\n";

	return { frontmatter, year };
}

// Rimuove i link social dalla descrizione del video
function removeSocialLinks(description) {
	if (!description) return "";

	const lines = description.split("\n");
	const cleanedLines = [];

	// Pattern per le sezioni di link social nella descrizione (intestazioni)
	const socialSectionPatterns = [
		/^link\s*e\s*crediti?$/i,
		/^crediti?$/i,
		/^🔗\s*(link|links|social|seguici|contact|contatti)/i,
		/^(link|links|social|seguici|contact|contatti|connect|seguimi|follow)\s*[:|-]?$/i,
		/^📱\s*(social|contatti|follow)/i,
	];

	// Flag per indicare se siamo nella sezione dei link social
	let inSocialSection = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmedLine = line.trim();

		// Se la linea è vuota, resetta il contatore
		if (trimmedLine === "") {
			// Mantieni solo una linea vuota, non multiple consecutive
			if (
				cleanedLines.length > 0 &&
				cleanedLines[cleanedLines.length - 1] !== ""
			) {
				cleanedLines.push(line);
			}
			continue;
		}

		// Controlla se questa linea è l'inizio della sezione social
		const isSocialSectionHeader = socialSectionPatterns.some(
			(pattern) => pattern.test(trimmedLine),
		);

		if (isSocialSectionHeader) {
			// Trovata l'intestazione della sezione social - inizia a rimuovere
			inSocialSection = true;
			continue;
		}

		// Se siamo nella sezione social, continua a rimuovere tutto fino allo shortcode youtube
		if (inSocialSection) {
			// Termina la pulizia quando arrivi allo shortcode youtube
			if (
				trimmedLine.includes("{{< youtube") ||
				trimmedLine.includes("{{< youtube-short")
			) {
				inSocialSection = false;
				cleanedLines.push(line);
				continue;
			}
			// Rimuovi questa linea (è parte della sezione LINK E CREDITI)
			continue;
		}

		cleanedLines.push(line);
	}

	return cleanedLines.join("\n").trim();
}

// Genera il contenuto del post
function generateContent(video, isShortVideo) {
	// Pulisci la descrizione rimuovendo i link social
	let content = removeSocialLinks(video.snippet.description || "");
	const videoId = video.id;

	// Aggiungi lo shortcode alla fine
	if (isShortVideo) {
		content += `\n\n{{< youtube ${videoId} >}}\n`;
	} else {
		content += `\n\n{{< youtube ${videoId} >}}\n`;
	}

	return content;
}

// Ottiene tutti i video del canale dalla playlist uploads
async function getAllVideos(youtube, uploadsPlaylistId) {
	const videos = [];
	let nextPageToken = null;

	console.log(
		"Recupero i video dalla playlist uploads...",
		uploadsPlaylistId,
	);

	try {
		do {
			const response = await youtube.playlistItems.list({
				playlistId: uploadsPlaylistId,
				part: "snippet",
				maxResults: 50,
				pageToken: nextPageToken,
			});

			console.log(
				"Playlist response status:",
				response.status,
			);
			console.log(
				"Numero di risultati:",
				response.data.items
					? response.data.items.length
					: 0,
			);

			if (response.data.items) {
				for (const item of response.data.items) {
					// I video nella playlist hanno l'ID in resourceId
					const videoId =
						item.snippet.resourceId.videoId;
					videos.push({
						id: videoId,
						snippet: item.snippet,
					});
				}
			}

			nextPageToken = response.data.nextPageToken;
			console.log(`Trovati ${videos.length} video...`);
		} while (nextPageToken);

		console.log(`Totale video trovati: ${videos.length}`);
		return videos;
	} catch (error) {
		console.error("Errore nel recupero video:", error.message);
		throw error;
	}
}

// Ottiene i dettagli completi dei video (tag, durata, ecc.)
async function getVideoDetails(youtube, videoIds) {
	const details = [];

	// YouTube permette max 50 video per richiesta
	const chunks = [];
	for (let i = 0; i < videoIds.length; i += 50) {
		chunks.push(videoIds.slice(i, i + 50));
	}

	for (let i = 0; i < chunks.length; i++) {
		console.log(
			`Recupero dettagli chunk ${i + 1}/${chunks.length}...`,
		);

		const response = await youtube.videos.list({
			id: chunks[i].join(","),
			part: "snippet,statistics,contentDetails",
		});

		if (response.data.items) {
			details.push(...response.data.items);
		}
	}

	return details;
}

// Funzione principale
async function main() {
	const apiKey = getApiKey();

	const youtube = google.youtube({
		version: "v3",
		auth: apiKey,
	});

	console.log("YouTube BacaroTech Post Generator");
	console.log("==================================\n");

	// Ottieni l'ID del canale e la playlist uploads
	console.log(`Cerco il canale ${CHANNEL_HANDLE}...`);
	const channelInfo = await getChannelInfo(youtube, CHANNEL_HANDLE);

	if (!channelInfo) {
		console.error("Canale non trovato!");
		process.exit(1);
	}

	console.log(`Canale trovato! Channel ID: ${channelInfo.id}`);
	console.log(`Uploads Playlist ID: ${channelInfo.uploadsPlaylistId}`);

	// Ottieni tutti i video dalla playlist uploads
	const videos = await getAllVideos(
		youtube,
		channelInfo.uploadsPlaylistId,
	);

	if (videos.length === 0) {
		console.log("Nessun video trovato!");
		process.exit(0);
	}

	// Ottieni i dettagli completi
	console.log("\nRecupero i dettagli dei video...");
	const videoIds = videos.map((v) => v.id);
	const videoDetails = await getVideoDetails(youtube, videoIds);

	// Crea un dizionario per un accesso più rapido
	const detailsDict = {};
	for (const v of videoDetails) {
		detailsDict[v.id] = v;
	}

	console.log("\nGenerazione dei post in corso...");

	let created = 0;
	let skipped = 0;

	for (const video of videos) {
		const videoId = video.id;

		// Usa i dettagli completi se disponibili
		const fullVideo = detailsDict[videoId] || video;

		// Determina se è uno Short
		const isShortVideo = isShort(
			fullVideo.contentDetails?.duration,
		);

		// Estrai la serie dal titolo
		const title = fullVideo.snippet.title;
		const seriesName = extractSeries(title);

		if (seriesName) {
			console.log(
				`  Serie trovata: ${seriesName} - ${title}`,
			);
		}

		// Genera lo slug
		const slug = generateSlug(title);

		// Genera il frontmatter e il contenuto
		const { frontmatter, year } = generateFrontmatter(
			fullVideo,
			isShortVideo,
			seriesName,
		);
		const content = generateContent(fullVideo, isShortVideo);

		// Crea la directory per l'anno
		const yearDir = path.join(OUTPUT_DIR, String(year));
		if (!fs.existsSync(yearDir)) {
			fs.mkdirSync(yearDir, { recursive: true });
		}

		// Crea la directory per il post
		const postDir = path.join(yearDir, slug);

		// Verifica se esiste già
		if (fs.existsSync(postDir)) {
			console.log(`  - Skip: ${title} (già esiste)`);
			skipped++;
			continue;
		}

		// Crea la directory
		fs.mkdirSync(postDir, { recursive: true });

		// Scrivi il file
		const filePath = path.join(postDir, "index.md");
		fs.writeFileSync(filePath, frontmatter + content);

		console.log(`  + Creato: ${title}`);
		created++;
	}

	console.log("\n==================================");
	console.log("Completato!");
	console.log(`  - Post creati: ${created}`);
	console.log(`  - Post saltati: ${skipped}`);
	console.log(`  - Directory output: ${OUTPUT_DIR}`);
}

// Esegui lo script
main().catch((err) => {
	console.error("Errore:", err.message);
	process.exit(1);
});
