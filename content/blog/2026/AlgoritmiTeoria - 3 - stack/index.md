+++
title = "AlgoritmiTeoria - 3 - stack"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## stack.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: STACK (PILA)
──────────────────────────────
Lo **Stack** (pila) è una struttura dati lineare che segue il principio
**LIFO (Last In, First Out)**:  
➡ L’ultimo elemento inserito è il primo a essere rimosso.  

È molto utile in contesti in cui i dati devono essere gestiti in ordine
inverso rispetto all’inserimento, ad esempio:  
- gestione delle chiamate annidate (call stack),  
- algoritmi di backtracking,  
- undo/redo in editor di testo.

──────────────────────────────
  STRUTTURA INTERNA
──────────────────────────────
- Gli elementi vengono inseriti e rimossi **solo dalla cima** (top).  
- Gli elementi sottostanti restano temporaneamente **inaccessibili** finché
non si rimuove quello in cima.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `push(element)` → inserisce un elemento in cima allo stack.  
- `pop()` → rimuove e restituisce l’elemento in cima (oppure `undefined` se vuoto).  
- `peek()` → restituisce l’elemento in cima senza rimuoverlo.  
- `isEmpty()` → restituisce `true` se la pila è vuota, `false` altrimenti.  
- `size()` → restituisce il numero di elementi nello stack.  
- `printStack()` → stampa tutti gli elementi dallo **top** alla **base**.

──────────────────────────────
  PRESTAZIONI
──────────────────────────────
- `push` → **O(1)**  
- `pop` → **O(1)**  
- `peek` → **O(1)**  
- `isEmpty` → **O(1)**  
- `size` → **O(1)**  

➡ Tutte le operazioni avvengono in tempo costante, poiché non richiedono
spostamenti o ridistribuzioni degli elementi.

──────────────────────────────
  NOTE
──────────────────────────────
- Struttura semplice ma estremamente efficiente.  
- Usata come building block di numerosi algoritmi.  
- Spesso implementata con array o liste collegate.
*/

class Stack<T> {
    private items: T[] = [];

	/**
	 * Inserimento in testa (push)
	 * @param element elemento da inserire
	 */
    push(element: T): void {
        this.items.push(element);
    }

	/**
	 * Rimozione in testa (pop)
	 * @returns elmento rimosso o null se la pila è vuota
	 */
    pop(): T | null {
        if (this.isEmpty()) return null;
        return this.items.pop() ?? null;
    }

	/**
	 * Restituisce l'elemento in testa senza rimuoverlo
	 * @returns elmento in testa
	 */
    peek(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }

	/**
	 * Verifica se lo stack è vuoto
	 * @returns true se è vuoto, false altrimenti
	 */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

	/**
	 * Restituisce il contenuto dello stack
	 * @returns lo stack
	 */
    getStack(): T[] {
        return this.items; 
    }
}

// Test
const stack = new Stack<number>();
console.log("verifica se lo stack è vuoto:", stack.isEmpty());
console.log("eliminazione elemento:", stack.pop());
stack.push(10);
stack.push(20);
stack.push(30);
console.log("stampa tutti gli elementi dello stack:", stack.getStack());
console.log("osservare l'elemento in testa:", stack.peek());
console.log("rimozione dell'elemento in testa:", stack.pop());
console.log("stampa di tutti gli elementi dopo aver rimosso la testa:", stack.getStack());

```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/stack",

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

