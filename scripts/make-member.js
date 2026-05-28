const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

function slugify(name) {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function addToTeamYaml(name, ruolo, content, imgSrc, buttonUrl) {
	const teamPath = path.join(process.cwd(), "data", "team.yaml");

	if (!fs.existsSync(teamPath)) {
		console.log("❌ File data/team.yaml non trovato!");
		return false;
	}

	const newEntry = [
		`  - title: "${name}"`,
		`    ruolo: "${ruolo}"`,
		`    content: "${content}"`,
		`    button_url: "${buttonUrl}"`,
		`    imgSrc: "${imgSrc}"`,
	].join("\n");

	const current = fs.readFileSync(teamPath, "utf-8");
	fs.writeFileSync(teamPath, current.trimEnd() + "\n\n" + newEntry + "\n", "utf-8");

	console.log(`✅ Aggiunto a data/team.yaml: ${name}`);
	return true;
}

function createAuthor(name, ruolo, linkedin, imgFile) {
	const slug = slugify(name);
	const authorDir = path.join(process.cwd(), "content", "authors", slug);

	if (fs.existsSync(authorDir)) {
		console.log(`⚠️  Autore già esistente: content/authors/${slug}/`);
		return false;
	}

	fs.mkdirSync(authorDir, { recursive: true });

	const authorContent = `---
title: "${name}"
name: "${name}"
role: "${ruolo}"
avatar: "images/${imgFile}"
bio: ""
links:
  - label: "Linkedin"
    url: "${linkedin}"
---`;

	fs.writeFileSync(path.join(authorDir, "_index.md"), authorContent, "utf-8");
	console.log(`✅ Autore creato: content/authors/${slug}/_index.md`);
	return true;
}

function main() {
	console.log("\n=== 🧑‍💼 AGGIUNGI NUOVO MEMBRO AL TEAM ===\n");

	const name = readline.question("Nome e cognome: ").trim();
	if (!name) {
		console.log("❌ Il nome è obbligatorio!");
		process.exit(1);
	}

	const ruolo = readline.question(
		"Ruolo istituzionale (es: Responsabile X — lascia vuoto se nessuno): "
	).trim();

	const content = readline.question(
		"Descrizione professionale (es: Sviluppatore Full-Stack): "
	).trim();

	const linkedin = readline.question(
		"URL LinkedIn (es: https://www.linkedin.com/in/...): "
	).trim();

	const imgFile = readline.question(
		"Nome file immagine in assets/images/ (es: nome.jpg): "
	).trim();

	const imgPath = path.join(process.cwd(), "assets", "images", imgFile);
	if (!fs.existsSync(imgPath)) {
		console.log(`⚠️  Attenzione: il file assets/images/${imgFile} non esiste ancora.`);
		const proceed = readline.question("Continuare comunque? (s/n): ").trim();
		if (proceed.toLowerCase() !== "s") {
			console.log("Operazione annullata.");
			process.exit(0);
		}
	}

	addToTeamYaml(name, ruolo, content, `images/${imgFile}`, linkedin);

	const wantAuthor = readline.question(
		"\nCreare anche la voce autore in content/authors/? (s/n, default n): "
	).trim();

	if (wantAuthor.toLowerCase() === "s") {
		createAuthor(name, ruolo, linkedin, imgFile);
	}

	console.log("\n✅ Operazione completata!");
}

main();
