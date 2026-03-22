#!/usr/bin/env node

/**
 * Script per rimuovere la sezione "LINK E CREDITI" da tutti i post video
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const BLOG_DIR = path.join(__dirname, "..", "content", "blog");

// Trova tutti i file index.md nella directory blog
const files = glob.sync("**/index.md", { cwd: BLOG_DIR });

let modified = 0;
let skipped = 0;

for (const file of files) {
	const filePath = path.join(BLOG_DIR, file);
	let content = fs.readFileSync(filePath, "utf-8");

	// Verifica se il file contiene "LINK E CREDITI"
	if (!content.includes("LINK E CREDITI")) {
		skipped++;
		continue;
	}

	// Rimuovi la sezione "LINK E CREDITI" e tutto fino allo shortcode youtube
	// Pattern: cerca "LINK E CREDITI" seguito da righe e poi lo shortcode youtube
	const lines = content.split("\n");
	const newLines = [];
	let removeMode = false;

	for (const line of lines) {
		if (line.includes("LINK E CREDITI")) {
			removeMode = true;
			continue;
		}

		if (removeMode) {
			// Continua a rimuovere fino a quando non trovi lo shortcode youtube
			if (
				line.includes("{{< youtube") ||
				line.includes("{{< youtube-short")
			) {
				removeMode = false;
				newLines.push(line);
			}
			// Altrimenti continua a rimuovere
			continue;
		}

		newLines.push(line);
	}

	// Scrivi il file aggiornato
	fs.writeFileSync(filePath, newLines.join("\n"));
	modified++;
	console.log(`Modificato: ${file}`);
}

console.log(`\nCompletato!`);
console.log(`  - File modificati: ${modified}`);
console.log(`  - File saltati (senza LINK E CREDITI): ${skipped}`);
