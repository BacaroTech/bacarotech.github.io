+++
title = "DesingPatternTeoria - Structural"
date = 2026-02-25T14:00:00Z
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
L’Adapter (o Adattatore / Wrapper) è un pattern strutturale che consente
a due classi con interfacce incompatibili di collaborare.

L’adattatore funge da “traduttore” tra l’interfaccia attesa dal codice client
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
- **Basso accoppiamento**: il client dipende solo dall’interfaccia Target.
- **Nessuna modifica a codice esistente**: adattamento non invasivo.
- **Flessibilità nella sostituzione**: puoi introdurre più adattatori per transizioni graduali.
- **Riutilizzo di codice**: componenti vecchi possono integrarsi con sistemi nuovi.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- **Aumento della complessità**: più formati = più adapter da gestire.
- **Prestazioni**: un layer aggiuntivo può introdurre overhead.
- **Soluzione temporanea**: spesso è un “cerotto” invece di una riprogettazione strutturale.
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

## decorator.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: DECORATOR
──────────────────────────────
Il Decorator è un pattern strutturale che consente di aggiungere,
in modo dinamico, nuove funzionalità a un oggetto senza modificarne
la classe originale.

Il principio di base è “impacchettare” (wrapping) l’oggetto originale
all’interno di un altro oggetto che implementa la stessa interfaccia,
delegando le chiamate e arricchendole prima o dopo l’esecuzione.

──────────────────────────────
  QUANDO UTILIZZARLO
──────────────────────────────
- Vuoi estendere il comportamento di un oggetto a runtime senza usare l’ereditarietà.
- Vuoi evitare la proliferazione di sottoclassi per ogni combinazione di funzionalità
  (es. `ButtonBlueLargeWithIcon`, `ButtonRedSmallNoIcon`, ecc.).
- Necessiti di combinare funzionalità in modo flessibile e modulare.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- **Modularità**: aggiungi funzionalità senza toccare la classe originale.
- **Flessibilità**: puoi impilare più decoratori in qualunque ordine.
- **Open/Closed Principle**: estendi il comportamento senza modificare codice esistente.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- **Maggiore complessità**: troppi oggetti annidati possono rendere il flusso poco chiaro.
- **Configurazione verbosa**: la creazione e combinazione dei decoratori può diventare prolissa.
*/

/**
 * Interfaccia comune per DataSource
 */
interface DataSource {
	writeData(data: string): void;
	readData(): string;
}

/**
 * Classe concreta: sorgente dati base
 */
class FileDataSource implements DataSource {
	private storage: string = "";

	writeData(data: string): void {
		console.log("Scrittura dati nel file:", data);
		this.storage = data;
	}

	readData(): string {
		console.log("Lettura dati dal file");
		return this.storage;
	}
}

/**
 * DECORATOR
 * Decoratore concreto che implementa DataSource e ha un riferimento a un DataSource
 * Inoltre aggiunge compressione ai dati
 * Serve per dare piu struttura al codice ma si può evitare e fare direttamente il Decoratore concreto
 */
class DataSourceDecorator implements DataSource{
	//Oggetto di base wrappato
	protected wrapper: DataSource;

	constructor(source: DataSource) {
		this.wrapper = source;
	}

	//riutilizzo le funzioni del wrapper e aggiungo altra logica
	writeData(data: string): void {
		data = this.compress(data);
		this.wrapper.writeData(data);
	}

	readData(): string {
		let data = this.wrapper.readData();
		return this.decompress(data);
	}

	//aggiungo ulteriori funzioni
	private compress(data: string): string {
		//Implementazione di compressione fittizia (esempio semplice)
		return data.split("").reverse().join("");
	}

	private decompress(data: string): string {
		//Decompressione fittizia(in questo caso inversa della compressione)
		return data.split("").reverse().join("");
	}
}


//Da questo momento in poi potrei procedere in 2 modi:
//VERTICALE: Aggiungo un nuovo decoratore(virtuale e concreto) 'wrappando' un oggetto di tipo CompressionDecorator
//ORIZZONTALE: Aggiungo un nuovo decoratore(virtuale e concreto) 'wrappando' un oggetto di tipo DataSource => Consigliato

//USO DECORATOR
const fileSource: FileDataSource = new FileDataSource();
const compressedSource: DataSourceDecorator = new DataSourceDecorator(fileSource);

compressedSource.writeData("Questo è un testo da salvare");
const result: string = compressedSource.readData();

console.log("Dati letti decompressi:", result);

```

## facade.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: FACADE
──────────────────────────────
Il Facade è un pattern strutturale che fornisce un’interfaccia unificata
e semplificata a un insieme di sottosistemi complessi.

La “facciata” nasconde i dettagli interni e offre al client un solo punto
di accesso, riducendo l’accoppiamento tra componenti e migliorando la leggibilità.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Quando il sistema ha API verbose, complesse o frammentate.
- Quando vuoi esporre solo facciate e non classi interne ai livelli superiori.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Semplifica l’uso del sistema, nascondendo la complessità.
- Riduce l’accoppiamento tra client e sottosistemi.
- Fornisce un punto unico di controllo (utile per logging, sicurezza, transazioni).
- Facilita modifiche e manutenzione, isolando le dipendenze.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- Se il client necessita di funzionalità molto specifiche, potrebbe comunque dover accedere ai sottosistemi.
- Un eccessivo numero di facciate può portare a duplicazione di logica già presente nei moduli interni.
*/

/**
 * Interfaccia comune
 */
interface Crypto {
	currency: string;
	doPayment(amount: number): void;
	getCurrency(): string;
}

/**
 * Implementazioni concrete
 */
class BTC implements Crypto {
	currency: string = "BTC";

	doPayment(amount: number): void {
		console.log("[BTC] Avvio pagamento di " + amount + " BTC");
		console.log("[BTC] Operazione riuscita");
		console.log("[BTC] Invio mail di conferma");
	}

	getCurrency(): string {
		return this.currency;
	}
}

class Dogecoin implements Crypto {
	currency: string = "Dogecoin";

	doPayment(amount: number): void {
		console.log("[Dogecoin] Avvio pagamento di " + amount + " Dogecoin");
		console.log("[Dogecoin] Operazione riuscita");
		console.log("[Dogecoin] Invio mail di conferma");
	}

	getCurrency(): string {
		return this.currency;
	}
}

/**
 * FACADE
 * Espone un'interfaccia semplificata per il client
 */
class CryptoFacade {
	private wallet: Map<string, Crypto> = new Map();

	constructor() {
		// Registrazione delle crypto disponibili
		const btc = new BTC();
		const dogecoin = new Dogecoin();
		this.wallet.set(btc.getCurrency(), btc);
		this.wallet.set(dogecoin.getCurrency(), dogecoin);
	}

	// Metodo comune per pagare
	public pay(amount: number, currency: string): void {
		const crypto = this.wallet.get(currency);
		if (!crypto) {
			console.log("Valuta non supportata: " + currency);
			return;
		}
		console.log("=== Avvio pagamento tramite Facade ===");
		crypto.doPayment(amount);
		console.log("=== Fine pagamento ===");
	}
}

/**
 * USO DEL FACADE
 * Il client vede solo la Facade, non le classi concrete
 */
const paymentSystem = new CryptoFacade();
paymentSystem.pay(500, "BTC");
paymentSystem.pay(2000, "Dogecoin");
paymentSystem.pay(100, "Ethereum"); // non supportata

```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/Structural",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}

```

