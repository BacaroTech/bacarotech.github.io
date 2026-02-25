+++
title = "DesingPatternTeoria - Creational"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

## builder.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: BUILDER
──────────────────────────────
Il Builder è un pattern creazionale che consente di costruire oggetti
complessi passo dopo passo.

A differenza del Factory, che si concentra solo sulla creazione,
il Builder gestisce anche la composizione graduale dell’oggetto,
rendendo il processo più leggibile e flessibile.

──────────────────────────────
  QUANDO UTILIZZARLO
──────────────────────────────
- La costruzione dell’oggetto richiede molti passaggi o parametri opzionali.
- Vuoi evitare il "telescoping constructor" (costruttori con troppi parametri).
- Vuoi che l’oggetto finale sia immutabile, ma la sua creazione rimanga flessibile.
- Necessiti di creare varianti partendo da una configurazione di base.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- **Chiarezza**: sequenze come `.setX().setY().build()` rendono il codice leggibile e modulare.
- **Flessibilità**: permette di configurare solo ciò che serve.
- **Immutabilità**: l’oggetto finale può essere reso non modificabile.
- **Pulizia del costruttore**: evita l’uso di costruttori con troppi parametri.
- **Riutilizzo**: puoi partire da un builder già configurato per creare varianti.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- **Maggiore complessità**: richiede classi aggiuntive anche per casi semplici.
- **Overkill**: non necessario per oggetti con poche proprietà.
- **Validazione assente**: di default non impone controlli sui dati forniti.

──────────────────────────────
  CHICCA OPZIONALE: DIRETTIVE
──────────────────────────────
Nel caso in cui notiamo nel codice dei casi in cui abbiamo diversi build che hanno lo stesso set di parametri
allora conviene utilizzare oltre ai builder anche le DIRETTIVE, ovvero dei builder pre-compilati
*/

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

## factoryMethod.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: FACTORY METHOD
──────────────────────────────
Il Factory Method è un pattern creazionale che definisce un’interfaccia
per la creazione di oggetti, delegando alle sottoclassi la decisione
su quale classe concreta istanziare.

Questo approccio separa la logica di creazione dal codice che utilizza
gli oggetti, migliorando flessibilità e manutenibilità.

──────────────────────────────
  QUANDO UTILIZZARLO
──────────────────────────────
- Quando non conosci a priori la classe concreta da istanziare.
- Quando vuoi centralizzare la logica di creazione degli oggetti.
- Quando desideri ridurre le dipendenze dirette da classi specifiche.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- **Separazione delle responsabilità**: isola la logica di istanziazione dal codice client.
- **Estendibilità**: per supportare nuovi tipi di oggetti basta estendere la factory.
- **Open/Closed Principle**: il codice client dipende da interfacce, non da implementazioni concrete.
- **Codice più pulito e modulare**: la creazione è incapsulata.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- Potrebbe richiedere molte sottoclassi o rami condizionali per gestire vari tipi di oggetti.
- Non è ottimale per oggetti con numerose varianti di configurazione.
- L’aggiunta di nuovi tipi può richiedere modifiche alla factory esistente.
*/

/**
 * Interfaccia di base(necessaria)
 */
interface Notifica {
    invia(messaggio: string): void;
}

/**
 * Classi specializzate che implementano l'interfaccia di partenza
 */
class NotificaEmail implements Notifica {
    //Override del metodo
    invia(messaggio: string): void {
        console.log(`Invio email con messaggio: ${messaggio}`);
    }
}

/**
 * Classi specializzate che implementano l'interfaccia di partenza
 */
class NotificaSMS implements Notifica {
    //Override del metodo
    invia(messaggio: string): void {
        console.log(`Invio SMS con messaggio: ${messaggio}`);
    }
}

/**FACTORY
* Andremo a eseguire le new passando per il metodo statico della factory
* Deleghiamo come avviene la creazione/costruzione dell'oggetto alla factory
* Per funzionare le classi devono avere un padre comune(interfaccia o classe)
*/
class NotificaFactory {
    static creaNotifica(tipo: string) {
        switch (tipo) {
            case "email":
                return new NotificaEmail();
            case "sms":
                return new NotificaSMS();
            default:
                throw new Error("Tipo di notifica non supportato");
        }
    }
}

//USO FACORY
//Nelle righe a seguire io non so come viene creata una notifica -> delego questa logica alla 'NotificaFactory'
let notifica = NotificaFactory.creaNotifica("sms");
notifica.invia("Ciao utente!");
notifica = NotificaFactory.creaNotifica("email");
notifica.invia("Come stai?");

```

## singleton.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: SINGLETON
──────────────────────────────
Il pattern Singleton è una soluzione architetturale che garantisce la creazione
di **una sola istanza** di una determinata classe per l’intera durata
dell’applicazione.

Viene utilizzato quando è necessario un unico punto di accesso globale
a una risorsa condivisa, ad esempio:
- configurazioni dell’applicazione
- connessioni a database
- sistemi di logging

──────────────────────────────
  QUANDO UTILIZZARLO
──────────────────────────────
- Serve una sola istanza condivisa
- Lo stato deve essere centralizzato
- L’oggetto è costoso da creare
- È richiesta una visione globale dello stato

──────────────────────────────
  VANTAGGI
──────────────────────────────
- **Consistenza globale**: tutti gli utilizzatori condividono lo stesso stato.
- **Controllo centralizzato**: gestione unificata della risorsa.
- **Risparmio di memoria**: un’unica istanza evita duplicazioni inutili.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- **Testing più complesso**: può introdurre dipendenze nascoste, ostacolando i test unitari.
- **Accesso globale rischioso**: se abusato, può portare a un design meno modulare
  e più difficile da manutenere.
*/

/**
* SINGLETON
*/
class Logger {
	//Istanza statica per conservare le informazioni
	private static instance?: Logger;
	private message?: string;

	//Costruttore privato
	private constructor(message: string) {
		this.message = message;
	}

	//Punto in cui avviene la magia
	static getInstance(message: string): Logger {
		//Attenzione nei linguaggi multi thread in questo punto 
		if (this.instance) {
			return this.instance;
		}

		this.instance = new Logger(message);
		return this.instance
	}

	public getMessage() {
		return this.message;
	}
}

//USO SINGLETON
const logger1 = Logger.getInstance("ciao mondo");
const logger2 = Logger.getInstance("seconda instanza, non mi vedi");

console.log(logger1 === logger2); // true -> stessa istanza!
console.log(logger1.getMessage());
console.log(logger2.getMessage());

```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/Creational",

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

