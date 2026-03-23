+++
title = "DesignPatternTeoria - Behavioral - observer"
date = 2026-02-25T14:01:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

## observer.ts

```typescript
/*
──────────────────────────────
  DESIGN PATTERN: OBSERVER
──────────────────────────────
L'Observer è un pattern comportamentale che permette a un oggetto 
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
