+++
title = "DesignPatternTeoria - Behavioral - command"
date = 2026-02-25T14:01:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

# DESIGN PATTERN: COMMAND

Il Command è un pattern comportamentale che incapsula una richiesta
all'interno di un oggetto, consentendo di parametrizzare i client con
richieste differenti, mettere in coda o salvare operazioni, e
supportare funzionalità come undo/redo.

Il pattern separa chi invoca un'operazione (Invoker) da chi la esegue
(Receiver), permettendo maggiore flessibilità nella gestione delle azioni.


## QUANDO USARLO

- Vuoi separare il codice che invoca un'operazione dal codice che la esegue.
- Vuoi implementare operazioni annullabili (undo/redo).
- Vuoi registrare, ritardare o eseguire operazioni in batch.
- Vuoi implementare macro che combinano più comandi in sequenza.


## VANTAGGI

- **Separazione delle responsabilità**: chi invoca non conosce i dettagli dell'esecuzione.
- **Flessibilità**: code di comandi, esecuzione ritardata, batch, macro.
- **Undo/Redo**: possibile mantenendo lo stato o registrando operazioni inverse.
- **Estendibilità**: nuovi comandi possono essere aggiunti senza modificare il codice esistente.


## POTENZIALI SVANTAGGI

- **Maggiore complessità**: richiede una classe separata per ogni comando.
- **Overkill per sistemi semplici**: il vantaggio si percepisce in scenari più complessi.

## CODICE

```typescript
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
