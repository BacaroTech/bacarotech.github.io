const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

function nameCleaning(name) {
	let title = name.replace(/[^A-Za-z0-9 ]+/g, " ");
	title = title.replace(/\s+/g, "-");
	return title.toLowerCase();
}

function slugify(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function createAuthor(name, role, linkedin, imageFile) {
	const slug = slugify(name);
	const authorDir = path.join(process.cwd(), "content", "authors", slug);

	if (fs.existsSync(authorDir)) {
		console.log(`⚠️  L'autore ${name} esiste già!`);
		return false;
	}

	fs.mkdirSync(authorDir, { recursive: true });

	const authorContent = `---
title: "${name}"
name: "${name}"
role: "${role}"
avatar: "images/${imageFile}"
bio: ""
links:
  - label: "Linkedin"
    url: "${linkedin}"
---`;

	fs.writeFileSync(
		path.join(authorDir, "_index.md"),
		authorContent,
		"utf-8",
	);

	console.log(`✅ Autore creato: ${name} (${slug})`);
	return true;
}

function addToAbout(name, role, linkedin, imageFile) {
	const aboutPath = path.join(
		process.cwd(),
		"content",
		"about",
		"index.md",
	);

	if (!fs.existsSync(aboutPath)) {
		console.log("❌ File about non trovato!");
		return false;
	}

	const slug = slugify(name);
	const linkedinSlug = linkedin.replace(
		"https://www.linkedin.com/in/",
		"",
	);

	const newSection = `{{< about-section
    title="${name}"
    content="${role}"
    imgSrc="images/${imageFile}"
    button_url="${linkedin}"
  >}}`;

	fs.readFile(aboutPath, "utf-8", (err, data) => {
		if (err) {
			console.log(
				"❌ Errore nella lettura del file:",
				err.message,
			);
			return;
		}

		const lines = data.split("\n");
		let insertIndex = lines.length;

		for (let i = lines.length - 1; i >= 0; i--) {
			if (lines[i].trim() === "{{< /about-section >}}") {
				insertIndex = i + 1;
				break;
			}
		}

		lines.splice(insertIndex, 0, newSection);
		fs.writeFileSync(aboutPath, lines.join("\n"), "utf-8");
		console.log(`✅ Aggiunto a about us: ${name}`);
	});

	return true;
}

function main() {
	console.log("\n=== 🧑‍💼 CREAZIONE NUOVO MEMBRO TEAM ===\n");

	const name = readline.question("Nome e cognome: ");
	if (!name.trim()) {
		console.log("❌ Il nome è obbligatorio!");
		return;
	}

	const role = readline.question("Ruolo (es: Sviluppatore Full-Stack): ");
	const linkedin = readline.question(
		"URL LinkedIn (es: https://www.linkedin.com/in/...): ",
	);
	const imageFile = readline.question(
		"Nome file immagine (es: nome.jpg): ",
	);

	const createAuthorOnly = readline.question(
		"\nCreare solo l'autore? (s/n, default n): ",
	);

	const authorCreated = createAuthor(name, role, linkedin, imageFile);

	if (createAuthorOnly.toLowerCase() === "s") {
		console.log("\n✅ Operazione completata!");
		return;
	}

	if (authorCreated) {
		const addToAboutUs = readline.question(
			"Aggiungere anche a About Us? (s/n): ",
		);
		if (addToAboutUs.toLowerCase() === "s") {
			addToAbout(name, role, linkedin, imageFile);
		}
	}

	console.log("\n✅ Operazione completata!");
}

main();
