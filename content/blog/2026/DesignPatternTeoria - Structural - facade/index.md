+++
title = "DesignPatternTeoria - Structural - facade"
date = 2026-02-25T14:01:09Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++


#  DESIGN PATTERN: FACADE

Il Facade è un pattern strutturale che fornisce un'interfaccia unificata
e semplificata a un insieme di sottosistemi complessi.

La "facciata" nasconde i dettagli interni e offre al client un solo punto
di accesso, riducendo l'accoppiamento tra componenti e migliorando la leggibilità.


##  QUANDO USARLO

- Quando il sistema ha API verbose, complesse o frammentate.
- Quando vuoi esporre solo facciate e non classi interne ai livelli superiori.


##  VANTAGGI

- Semplifica l'uso del sistema, nascondendo la complessità.
- Riduce l'accoppiamento tra client e sottosistemi.
- Fornisce un punto unico di controllo (utile per logging, sicurezza, transazioni).
- Facilita modifiche e manutenzione, isolando le dipendenze.


##  POTENZIALI SVANTAGGI

- Se il client necessita di funzionalità molto specifiche, potrebbe comunque dover accedere ai sottosistemi.
- Un eccessivo numero di facciate può portare a duplicazione di logica già presente nei moduli interni.

## CODICE
```typescript
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
