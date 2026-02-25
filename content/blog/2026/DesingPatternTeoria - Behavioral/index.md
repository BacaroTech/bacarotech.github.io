+++
title = "DesingPatternTeoria - Behavioral"
date = 2026-02-25T14:01:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

## command.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: COMMAND
──────────────────────────────
Il Command è un pattern comportamentale che incapsula una richiesta
all’interno di un oggetto, consentendo di parametrizzare i client con
richieste differenti, mettere in coda o salvare operazioni, e
supportare funzionalità come undo/redo.

Il pattern separa chi invoca un’operazione (Invoker) da chi la esegue
(Receiver), permettendo maggiore flessibilità nella gestione delle azioni.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Vuoi separare il codice che invoca un’operazione dal codice che la esegue.
- Vuoi implementare operazioni annullabili (undo/redo).
- Vuoi registrare, ritardare o eseguire operazioni in batch.
- Vuoi implementare macro che combinano più comandi in sequenza.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- **Separazione delle responsabilità**: chi invoca non conosce i dettagli dell’esecuzione.
- **Flessibilità**: code di comandi, esecuzione ritardata, batch, macro.
- **Undo/Redo**: possibile mantenendo lo stato o registrando operazioni inverse.
- **Estendibilità**: nuovi comandi possono essere aggiunti senza modificare il codice esistente.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- **Maggiore complessità**: richiede una classe separata per ogni comando.
- **Overkill per sistemi semplici**: il vantaggio si percepisce in scenari più complessi.
*/

/**
 * Classe ricevente(del comando)
 */
class Light {
	private state: boolean = false;

	getState(): boolean {
		return this.state;
	}

	setState(newState: boolean): void {
		this.state = newState;
	}

	toString(): string {
		return this.state ? "accesa" : "spenta";
	}
}

/**
 * COMMAND
 */
interface CommandLight {
	//comando astratto
	executeSwitchOnOffLight(): void;
}

/**
 * Classe mandante(del comando)
 * Deve implementare correttamente l'interfaccia command
 */
class Room implements CommandLight {
	roomLight: Light;

	constructor(light: Light) {
		this.roomLight = light;
	}

	/**
	 * Comando contreto
	 */
	executeSwitchOnOffLight(): void {
		const oldState = this.roomLight.getState();
		this.roomLight.setState(!oldState);
		console.log("La lampadina è", this.roomLight.toString());
	}
}

//USO COMMAND
let light: Light = new Light();
let room: Room = new Room(light);
room.executeSwitchOnOffLight();
room.executeSwitchOnOffLight();
```

## observer.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: OBSERVER
──────────────────────────────
L’Observer è un pattern comportamentale che permette a un oggetto 
(Subject) di notificare automaticamente un insieme di oggetti (Observers) 
ogni volta che il suo stato cambia.  
È alla base di molti sistemi basati su eventi e della programmazione reattiva.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Più oggetti devono reagire ai cambiamenti di stato di un altro oggetto.
- Vuoi implementare sistemi di eventi o flussi di dati asincroni.
- Vuoi disaccoppiare il publisher dai subscriber, evitando dipendenze dirette.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Broadcasting semplice verso più listener contemporaneamente.
- Disaccoppiamento tra chi emette eventi e chi li gestisce.
- Perfetto per UI reattive, flussi di dati in tempo reale e sistemi asincroni.
- Supportato nativamente in librerie come RxJS.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- Possibili **memory leak** se gli observer non vengono disiscritti.
- La complessità aumenta con il numero di observer e interazioni.
- Debug più complesso in sistemi con molti eventi concatenati.

──────────────────────────────
  STRUTTURA
──────────────────────────────
SUBJECT -> OBSERVER 1, OBSERVER 2, ..., OBSERVER N(stesso tipo) -> NOTIFICATION
*/

/**
 * Interfaccia comune per l'Observer(reazione agli eventi) 
 */
interface Observer {
	update(): void;
}

/**
 * Interfaccia del Subject(gestione delle iscrizioni)
 */
interface Subject {
	subscribe(observer: Observer): void;
	unsubscribe(observer: Observer): void;
	notify(): void;
}

/**
 * Interfaccia del Notification(chi invia la notifica)
 */
interface Notification{
	getMessage(): void;
}

/**
 * Implementazione concreta di Notification
 */
class MailNotification implements Notification{
	constructor(private text: string) { }

	getMessage(): void {
		console.log("Notifica mail:", this.text);
	}
}

/**
 * Implementazione concreta di Subject
 */
class MailSubject implements Subject {
	private observers: Set<Observer> = new Set();

	subscribe(observer: Observer): void {
		this.observers.add(observer);
	}

	unsubscribe(observer: Observer): void {
		this.observers.delete(observer);
	}

	notify(): void {
		this.observers.forEach(observer => observer.update());
	}
}

/**
 * OBSERVER
 * Implementazione concreta dell'observer
 * prende in input una notifica che verrà triggherata solo tramite il Subject(concreto)
 */
class MailObserver implements Observer {
	constructor(private notification: Notification) { }
	update(): void {
		this.notification.getMessage();
	}
}

//USO OBSERVER
const subject = new MailSubject();

const mail1 = new MailObserver(new MailNotification("Hai una nuova email"));
const mail2 = new MailObserver(new MailNotification("Aggiornamento account"));

subject.subscribe(mail1);
subject.subscribe(mail2);

//Notifica tutti
subject.notify();
```

## state.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: STATE
──────────────────────────────
Lo State è un pattern comportamentale che permette a un oggetto di 
modificare il proprio comportamento quando cambia il suo stato interno.  
È come se l’oggetto cambiasse “classe” in modo dinamico.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Un oggetto deve cambiare comportamento in base al suo stato.
- Vuoi evitare grandi istruzioni `if` o `switch` che controllano lo stato.
- Vuoi centralizzare i comportamenti di uno stato in una classe dedicata.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Elimina `if-else` o `switch-case` complessi.
- Ogni stato è isolato in una classe separata (Single Responsibility Principle).
- Facile aggiungere nuovi stati senza modificare quelli esistenti.
- Migliora leggibilità e manutenzione del codice.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- Aumenta il numero di classi nel sistema.
- Può risultare eccessivo per macchine a stati semplici.
*/


/**
 * Classe con internamente il riferimento a uno degli stati esterni
 */
class Semaforo {
    //Determino solo che esiste uno stato, non mi interessa la logica di aggiornamento
    private stato: StatoSemaforo = new Rosso();

    aggiornataStato(): void {
        this.stato = this.stato.cambia();
    }

    getStato(): void {
        this.stato.mostra();
    }
}

/**
 * STATE
 * State interfaccia comune
 */
interface StatoSemaforo {
    cambia(): StatoSemaforo;
    mostra(): void;
}

/**
 * Stati concreto => Rosso 
 * Slego il cambio stato dalla "classe con stato" agli "stati effettivi"
 */
class Rosso implements StatoSemaforo {
    cambia(): StatoSemaforo {
        console.log('Cambio da ROSSO a VERDE');
        return new Verde();
    }

    mostra(): void {
        console.log('Rosso: STOP');
    }
}

/**
 * Stati concreto => Verde 
 * Slego il cambio stato dalla "classe con stato" agli "stati effettivi"
 */
class Verde implements StatoSemaforo {
    cambia(): StatoSemaforo {
        console.log('Cambio da VERDE a GIALLO');
        return new Giallo();
    }

    mostra(): void {
        console.log('Verde: VAI');
    }
}

/**
 * Stati concreto => Giallo 
 * Slego il cambio stato dalla "classe con stato" agli "stati effettivi"
 */
class Giallo implements StatoSemaforo {
    cambia(): StatoSemaforo {
        console.log('Cambio da GIALLO a ROSSO');
        return new Rosso();
    }

    mostra(): void {
        console.log('Giallo: ATTENZIONE');
    }
}

// USO STATE
const semaforo = new Semaforo();

semaforo.getStato();
semaforo.aggiornataStato();

semaforo.getStato();
semaforo.aggiornataStato();

semaforo.getStato();
semaforo.aggiornataStato();

```

## strategy.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: STRATEGY
──────────────────────────────
Lo Strategy è un pattern comportamentale che permette di definire una 
famiglia di algoritmi, incapsularli e renderli intercambiabili a runtime 
senza modificare il contesto che li utilizza.  
In pratica, consente di cambiare il "comportamento" di un oggetto in modo flessibile.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Più algoritmi alternativi devono essere scelti dinamicamente.
- Vuoi evitare lunghi `if-else` o `switch-case` pieni di logica condizionale.
- Vuoi rispettare l’Open/Closed Principle: estendere il comportamento senza modificare il codice esistente.

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Possibilità di aggiungere nuovi algoritmi senza modificare il codice principale.
- Migliora leggibilità eliminando `if/switch` complessi.
- Promuove la composizione invece dell’ereditarietà.
- Algoritmi intercambiabili a runtime.

──────────────────────────────
  POTENZIALI SVANTAGGI
──────────────────────────────
- Aumenta il numero di classi/funzioni (una per strategia).
- Il contesto deve conoscere l’interfaccia comune.
- Più complesso rispetto a una semplice funzione inline per problemi banali.
*/

/**
 * Strategy astratta comune
 */
interface Strategy {
    esegui(a: number, b: number): number;
}

/**
 * Strategy concrete
 */
class StrategiaAddizione implements Strategy {
    esegui(a: number, b: number): number {
        return a + b;
    }
}

/**
 * Strategy concrete
 */
class StrategiaSottrazione implements Strategy {
    esegui(a: number, b: number): number {
        return a - b;
    }
}

/**
 * Strategy concrete
 */
class StrategiaMoltiplicazione implements Strategy {
    esegui(a: number, b: number): number {
        return a * b;
    }
}

/**
 * STRATEGY
 * Classe che utilizza una strategia interna
 */
class Calcolatrice {
    private StrategiaCalcolo: Strategy;

    constructor(strategia: Strategy) {
        this.StrategiaCalcolo = strategia;
    }

    setStrategia(strategia: Strategy): void {
        this.StrategiaCalcolo = strategia;
    }

    eseguiStrategia(a: number, b: number): number {
        return this.StrategiaCalcolo.esegui(a, b);
    }
}

// USO STRATEGY
const calcolatrice = new Calcolatrice(new StrategiaAddizione());
console.log("Risultato:", calcolatrice.eseguiStrategia(5, 3));

calcolatrice.setStrategia(new StrategiaSottrazione());
console.log("Risultato:", calcolatrice.eseguiStrategia(5, 3));

calcolatrice.setStrategia(new StrategiaMoltiplicazione());
console.log("Risultato:", calcolatrice.eseguiStrategia(5, 3));

```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/Behavioral",

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

