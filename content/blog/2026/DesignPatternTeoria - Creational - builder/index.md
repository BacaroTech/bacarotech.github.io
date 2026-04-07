+++
title = "DesignPatternTeoria - Creational - builder"
date = 2026-02-25T14:01:08Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

# DESIGN PATTERN: BUILDER

Il Builder è un pattern creazionale che consente di costruire oggetti
complessi passo dopo passo.

A differenza del Factory, che si concentra solo sulla creazione,
il Builder gestisce anche la composizione graduale dell'oggetto,
rendendo il processo più leggibile e flessibile.

## QUANDO UTILIZZARLO

- La costruzione dell'oggetto richiede molti passaggi o parametri opzionali.
- Vuoi evitare il "telescoping constructor" (costruttori con troppi parametri).
- Vuoi che l'oggetto finale sia immutabile, ma la sua creazione rimanga flessibile.
- Necessiti di creare varianti partendo da una configurazione di base.

## VANTAGGI

- **Chiarezza**: sequenze come `.setX().setY().build()` rendono il codice leggibile e modulare.
- **Flessibilità**: permette di configurare solo ciò che serve.
- **Immutabilità**: l'oggetto finale può essere reso non modificabile.
- **Pulizia del costruttore**: evita l'uso di costruttori con troppi parametri.
- **Riutilizzo**: puoi partire da un builder già configurato per creare varianti.

## POTENZIALI SVANTAGGI

- **Maggiore complessità**: richiede classi aggiuntive anche per casi semplici.
- **Overkill**: non necessario per oggetti con poche proprietà.
- **Validazione assente**: di default non impone controlli sui dati forniti.

## CHICCA OPZIONALE: DIRETTIVE

Nel caso in cui notiamo nel codice dei casi in cui abbiamo diversi build che hanno lo stesso set di parametri
allora conviene utilizzare oltre ai builder anche le DIRETTIVE, ovvero dei builder pre-compilati

## CODICE
```typescript
/**
 * Classe di partenza 
 * Rappresenta cosa vogliamo costruire
 */
class Computer {
	private cpu?: string;
	private ram?: string;
	private storage?: string;
	private gpu?: string;

	constructor(cpu: string, ram: string, storage: string, gpu: string) {
		this.cpu = cpu;
		this.ram = ram;
		this.storage = storage;
		this.gpu = gpu;
	}

	//Stampa tutti i componenti scelti
	public descrizione(): void {
		console.log(`Informazioni => CPU: ${this.cpu}, RAM: ${this.ram}, Storage: ${this.storage}, GPU: ${this.gpu}`);
	}
}

/**
 * BUILDER
 * Rappresenta chi costruisce effettivamente
 * Costruisco un Computer tramite il ComputerBuilder
 */
class ComputerBuilder {
	//Deve avere gli stessi parametri della classe che si vuole costruire!!!
	private cpu?: string;
	private ram?: string;
	private storage?: string;
	private gpu?: string;

	setCPU(cpu: string): ComputerBuilder {
		this.cpu = cpu;
		return this;
	}

	setRAM(ram: string): ComputerBuilder {
		this.ram = ram;
		return this;
	}

	setStorage(storage: string): ComputerBuilder {
		this.storage = storage;
		return this;
	}

	setGPU(gpu: string): ComputerBuilder {
		this.gpu = gpu;
		return this;
	}

	//In alcuni casi overkill
	build() {
		return new Computer(this.cpu!, this.ram!, this.storage!, this.gpu!);
	}
}

//USO BUILDER
const gamingPC: Computer = new ComputerBuilder()
	.setCPU("Intel i9")
	.setRAM("32GB")
	.setStorage("1TB NVMe SSD")
	.setGPU("NVIDIA RTX 4090")
	.build();
gamingPC.descrizione();

```
