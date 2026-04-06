+++
title = "DesignPatternTeoria - Creational - singleton"
date = 2026-02-25T14:01:08Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++


# DESIGN PATTERN: SINGLETON

Il pattern Singleton è una soluzione architetturale che garantisce la creazione
di **una sola istanza** di una determinata classe per l'intera durata
dell'applicazione.

Viene utilizzato quando è necessario un unico punto di accesso globale
a una risorsa condivisa, ad esempio:
- configurazioni dell'applicazione
- connessioni a database
- sistemi di logging


##  QUANDO UTILIZZARLO

- Serve una sola istanza condivisa
- Lo stato deve essere centralizzato
- L'oggetto è costoso da creare
- È richiesta una visione globale dello stato


##  VANTAGGI

- **Consistenza globale**: tutti gli utilizzatori condividono lo stesso stato.
- **Controllo centralizzato**: gestione unificata della risorsa.
- **Risparmio di memoria**: un'unica istanza evita duplicazioni inutili.


##  POTENZIALI SVANTAGGI

- **Testing più complesso**: può introdurre dipendenze nascoste, ostacolando i test unitari.
- **Accesso globale rischioso**: se abusato, può portare a un design meno modulare
  e più difficile da manutenere.


## CODICE
```typescript
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
