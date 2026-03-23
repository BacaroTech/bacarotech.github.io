+++
title = "DesignPatternTeoria - Structural - adapter"
date = 2026-02-25T14:01:09Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

## adapter.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: ADAPTER
──────────────────────────────
L'Adapter (o Adattatore / Wrapper) è un pattern strutturale che consente
a due classi con interfacce incompatibili di collaborare.

L'adattatore funge da "traduttore" tra l'interfaccia attesa dal codice client
(Target) e quella realmente offerta da un oggetto esistente (Adaptee),
senza modificare né il client né la classe originale.

──────────────────────────────
  QUANDO UTILIZZARLO
──────────────────────────────
- Integrazione di librerie o componenti di terze parti.
- Uniformare formati di input/output differenti (es. XML ⇆ JSON, sistemi di coordinate diversi).
- Migrare verso una nuova API senza interrompere il funzionamento del codice esistente.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- **Basso accoppiamento**: il client dipende solo dall'interfaccia Target.
- **Nessuna modifica a codice esistente**: adattamento non invasivo.
- **Flessibilità nella sostituzione**: puoi introdurre più adattatori per transizioni graduali.
- **Riutilizzo di codice**: componenti vecchi possono integrarsi con sistemi nuovi.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- **Aumento della complessità**: più formati = più adapter da gestire.
- **Prestazioni**: un layer aggiuntivo può introdurre overhead.
- **Soluzione temporanea**: spesso è un "cerotto" invece di una riprogettazione strutturale.
*/

/**
 * Sorgenti dati JSON ok
 */
class JSONData {
	content: Object;

	constructor(content: Object) {
		this.content = content;
	}
}

/**
 * Sorgenti dati XML ok => da adattare con il nostro design pattern
 */
class XMLData {
	content: string;

	constructor(content: string) {
		this.content = content;
	}
}

/**
 * ADAPTER
 * Interfaccia comune per l'adattamento a un MCM
 */
interface CommonData {
	convertToCommonData(): JSONData;
}

/**
 * CONVERTITORE JSON
 */
class convertJSONData implements CommonData {
	jsonData: JSONData;

	constructor(jsonData: JSONData) {
		this.jsonData = jsonData;
	}

	convertToCommonData(): JSONData {
		return this.jsonData;
	}
}

/**
 * CONVERTITORE XML
 */
class convertXMLData implements CommonData {
	xmlData: XMLData;

	constructor(xmlData: XMLData) {
		this.xmlData = xmlData;
	}

	convertToCommonData(): JSONData {
		//Parsing manuale semplificato (solo per esempio)
		const matches = this.xmlData.content.match(/<campo1 xml>(.*?)<\/campo1 xml>[\s\S]*<campo2 xml>(.*?)<\/campo2 xml>/);

		if (!matches) {
			throw new Error("Formato XML non valido");
		}

		const jsonObj: Object = {
			"campo 1 xml": matches[1],
			"campo 2 xml": matches[2]
		};

		return new JSONData(jsonObj);
	}
}

//USO ADAPTER
const jsonData: JSONData = new JSONData({
	"campo 1 json": "valore 1 json",
	"campo 2 json": "valore 2 json",
});

const xmlData: XMLData = new XMLData(`
  <root>
    <campo1 xml>valore 1 xml</campo1 xml>
    <campo2 xml>valore 2 xml</campo2 xml>
  </root>
`);

const commonDataFromJSON: JSONData = new convertJSONData(jsonData).convertToCommonData();
const commonDataFromXML: JSONData = new convertXMLData(xmlData).convertToCommonData();
console.log("JSON convertito a JSON: ", commonDataFromJSON);
console.log("XML convertito a JSON: ", commonDataFromXML);
```
