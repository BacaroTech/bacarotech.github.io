const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const crypto = require("crypto");
const chrono = require("chrono-node");
const readline = require("readline-sync");

function nameCleaning(name) {
	let title = name.replace(/[^A-Za-z0-9 ]+/g, " ");
	title = title.replace(/\s+/g, "-");
	return title.toLowerCase();
}

function formatDateIcs(date) {
	// Formato: AAAAMMGGTHHMMSS
	return date.toISOString().replace(/[-:]/g, "").split(".")[0];
}

function generaIcs(directoryPath, titoloEvento) {
	console.log("\n--- 📅 Configurazione Evento (Linguaggio Naturale) ---");

	const inizioRaw = readline.question(
		"Quando inizia? (es: domani alle 10): ",
	);
	const fineRaw = readline.question(
		"Quando finisce? (es: tra due ore): ",
	);

	// Parsing date con chrono-node (supporta inglese/italiano via custom locale se necessario)
	// Per l'italiano base, chrono gestisce bene i formati standard
	const inizioDt = chrono.it.parseDate(inizioRaw, new Date(), {
		forwardDate: true,
	});
	const fineDt = chrono.it.parseDate(fineRaw, inizioDt);

	if (!inizioDt || !fineDt) {
		console.log("❌ Errore: Non ho capito le date. Riprova.");
		return;
	}

	const desc = readline.question("Breve descrizione: ");
	const uid = crypto.randomUUID();
	const now = formatDateIcs(new Date()) + "Z";

	const icsContent = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		`UID:${uid}`,
		`DTSTAMP:${now}`,
		`DTSTART:${formatDateIcs(inizioDt)}`,
		`DTEND:${formatDateIcs(fineDt)}`,
		`SUMMARY:${titoloEvento}`,
		`DESCRIPTION:${desc}`,
		"END:VEVENT",
		"END:VCALENDAR",
	].join("\n");

	const filePath = path.join(directoryPath, "evento.ics");

	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath, { recursive: true });
	}

	fs.writeFileSync(filePath, icsContent, "utf-8");

	console.log(`✅ Evento creato: ${inizioDt.toLocaleString("it-IT")}`);
	console.log(`📍 Salvato in: ${filePath}`);
}

function postFc() {
	const year = new Date().getFullYear().toString();
	const name = readline.question("Give me the title: ");
	const title = nameCleaning(name);

	try {
		execSync(`hugo new blog/${year}/${title}/index.md`, {
			stdio: "inherit",
		});

		const targetDir = path.join(
			process.cwd(),
			"content",
			"blog",
			year,
			title,
		);

		const addIcs = readline.question(
			"\nVuoi aggiungere un file .ics a questo post? (s/n): ",
		);
		if (addIcs.toLowerCase() === "s") {
			generaIcs(targetDir, name);
		}
	} catch (error) {
		console.error(
			"Errore durante la creazione del post Hugo:",
			error.message,
		);
	}
}

function postRedirect() {
	const name = readline.question("Give me the title: ");
	const title = nameCleaning(name);
	try {
		execSync(`hugo new redirect/${title}/index.md`, {
			stdio: "inherit",
		});
	} catch (error) {
		console.error("Errore:", error.message);
	}
}

const main = () => {
	let actionType = process.argv[2];

	if (!actionType) {
		actionType = readline.question(
			"You need a new [post] or [redirect]? ",
		);
	}

	const actions = {
		post: postFc,
		redirect: postRedirect,
	};

	if (actions[actionType]) {
		actions[actionType]();
	} else {
		console.log("Opzione non valida.");
	}
};

main();
