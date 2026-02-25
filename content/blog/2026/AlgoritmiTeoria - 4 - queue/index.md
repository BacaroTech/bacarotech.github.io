+++
title = "AlgoritmiTeoria - 4 - queue"
date = 2026-02-25T14:00:04Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## queue.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: QUEUE (CODA)
──────────────────────────────
La **Queue** (coda) è una struttura dati lineare che segue il principio
**FIFO (First In, First Out)**:  
➡ Il primo elemento inserito è anche il primo a essere rimosso.  

È ideale per gestire dati in ordine di arrivo, come:  
- gestione delle richieste in un server,  
- code di stampa,  
- algoritmi di scheduling dei processi.

──────────────────────────────
  STRUTTURA INTERNA
──────────────────────────────
- Gli elementi vengono **inseriti in fondo** (enqueue).  
- Gli elementi vengono **rimossi dalla testa** (dequeue).  
- L’ordine di arrivo viene sempre rispettato.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `enqueue(element)` → inserisce un elemento in fondo alla coda.  
- `dequeue()` → rimuove e restituisce l’elemento in testa (oppure `undefined` se vuota).  
- `peek()` → restituisce l’elemento in testa senza rimuoverlo.  
- `isEmpty()` → restituisce `true` se la coda è vuota, `false` altrimenti.  
- `size()` → restituisce il numero di elementi nella coda.  
- `printQueue()` → stampa tutti gli elementi dalla testa alla fine.  

──────────────────────────────
  PRESTAZIONI
──────────────────────────────
- `enqueue` → **O(1)**  
- `dequeue` → **O(1)**  
- `peek` → **O(1)**  
- `isEmpty` → **O(1)**  
- `size` → **O(1)**  

➡ Tutte le operazioni principali sono in tempo costante.  
La coda è particolarmente efficiente per scenari di gestione in tempo reale.  

──────────────────────────────
  NOTE
──────────────────────────────
- È la controparte "naturale" dello **Stack**.  
- Può essere implementata tramite array o liste collegate.  
- Varianti comuni includono:  
  • **Deque (Double-Ended Queue)** → inserimento/rimozione a entrambe le estremità.  
  • **Priority Queue** → rimozione basata su priorità, non sull’ordine di arrivo.
*/

class Queue<T> {
	private items: T[] = []

	/**
	 * Inserimento in coda
	 * @param item elemento da inserire
	 */
	enqueue(item: T): void {
		this.items.push(item);
	}

	/**
	 * Rimozione dalla testa
	 * @returns elemento rimosso, null se la coda è vuota
	 */
	dequeue(): T | undefined {
		if (this.isEmpty()) return undefined;
		const item = this.items[0];
		this.items = this.items.slice(1, this.items.length);
		return item
	}

	/**
	 * Restituisce l'elemento in testa senza rimuoverlo
	 * @returns elemento in testa
	 */
	peek(): T | undefined {
		return this.items[0]
	}

	/**
	 * Verifica se la coda è vuota
	 * @returns true se è vuota, false altrimenti
	 */
	isEmpty(): boolean {
		return this.items.length == 0;
	}

	/**
	 * Restituisce il contenuto della coda
	 * @returns la coda
	 */
	getQueue(): T[] {
		return this.items;
	}

	/**
	 * Restituisce la lunghezza della coda
	 * @returns lunghezza della coda
	 */
	size(): number {
		return this.items.length
	}
}

// Test
const queue = new Queue<number>();
queue.enqueue(7);
queue.enqueue(2);
queue.enqueue(6);
queue.enqueue(4);

console.log("Primo elemento rimosso:", queue.dequeue());
console.log("Elemento in testa:", queue.peek());
console.log("Stampa di tutti gli elementi della coda:", queue.getQueue());
console.log("La coda è vuota?", queue.isEmpty());
console.log("Lunghezza della coda:", queue.size());      
```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/queue",

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

