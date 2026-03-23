+++
title = "DesignPatternTeoria - Structural - decorator"
date = 2026-02-25T14:01:09Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

## decorator.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: DECORATOR
──────────────────────────────
Il Decorator è un pattern strutturale che consente di aggiungere,
in modo dinamico, nuove funzionalità a un oggetto senza modificarne
la classe originale.

Il principio di base è "impacchettare" (wrapping) l'oggetto originale
all'interno di un altro oggetto che implementa la stessa interfaccia,
delegando le chiamate e arricchendole prima o dopo l'esecuzione.

──────────────────────────────
  QUANDO UTILIZZARLO
──────────────────────────────
- Vuoi estendere il comportamento di un oggetto a runtime senza usare l'ereditarietà.
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
