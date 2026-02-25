+++
title = "AlgoritmiTeoria - 2 - list"
date = 2026-02-25T14:00:02Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## linkedList.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: LISTA SEMPLICE
──────────────────────────────
La **Lista Semplice** è una struttura dati dinamica composta da nodi
collegati tra loro.  
A differenza degli array, non ha una dimensione fissa e permette di
inserire o rimuovere elementi senza dover ridimensionare l’intera
struttura.  
L’accesso agli elementi, però, è **sequenziale**, poiché non esiste un
indice diretto.

──────────────────────────────
  STRUTTURA INTERNA
──────────────────────────────
Ogni **nodo** della lista è composto da due campi:
- `data`: il valore contenuto nel nodo.
- `next`: riferimento al nodo successivo (oppure `null` se è l’ultimo).

La lista è gestita tramite un puntatore alla **testa** (head), che
rappresenta il primo nodo e consente di accedere all’intera struttura.

──────────────────────────────
  PROBLEMA DELLA "FRAGILITÀ DELLA TESTA"
──────────────────────────────
Durante l’iterazione della lista, se si utilizza direttamente la testa,
il riferimento al primo nodo può essere perso.  

Esempio:  
- Lista iniziale: `2 → 5`  
- Testa: `2`  

Se scorro la lista senza usare una copia, la testa può diventare `null`,
perdendo l’accesso alla struttura.  

Soluzione: usare una **copia della testa** per iterare, così il
riferimento originale alla lista rimane intatto.

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisciInTesta(valore)` → inserisce un nodo in testa alla lista.  
- `inserisciInCoda(valore)` → inserisce un nodo in fondo alla lista.  
- `rimuovi(valore)` → rimuove il primo nodo con valore uguale a quello dato.  
- `cerca(valore)` → restituisce il primo nodo che contiene il valore dato.  
- `stampaLista()` → stampa tutti i valori partendo dalla testa.

──────────────────────────────
  PRESTAZIONI
──────────────────────────────
- Inserimento in testa → **O(1)**  
- Rimozione in testa → **O(1)**  
- Inserimento in coda → **O(n)** (se non si mantiene un puntatore alla coda)  
- Ricerca di un elemento → **O(n)**  
- Accesso diretto ad una posizione → **O(n)**  

──────────────────────────────
  NOTE
──────────────────────────────
- Struttura **semplice ed efficiente** per inserimenti/rimozioni in
testa.  
- Poco adatta per accessi casuali (serve scorrere sequenzialmente).  
- È la base per strutture più complesse come **liste doppiamente collegate** o **liste circolari**.
*/


// Nodo generico
class ListNode<E> {
    data: E;
    next: ListNode<E> | null = null;

    /**
     * Costruttore del nodo
     * @param data valore del nodo
     */
    constructor(data: E) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList<E> {
    private head: ListNode<E> | null;

    /**
     * Costruttore della lista, col puntatore al primo elmento della lista
     * @param head nodo che farà da testa alla lista
     */
    constructor(head: ListNode<E> | null) {
        this.head = head;
    }

    /**
     * Calcola il numero di elementi della lista
     * @returns numero di elementi della lista
     */
    size(): number {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    }

    /**
     * Si posizione alla fine della lista e ritorna l'ultimo elmento
     * @returns ultimo nodo della lista
     */
    getLast(): ListNode<E> | null {
        let node = this.head;
        if (!node) return null;
        while (node.next) {
            node = node.next;
        }
        return node;
    }

    /**
     * Funzione che aggiunge un nuovo nodo alla fine
     * @param newNode nodo che deve inserito
     */
    add(newNode: ListNode<E>): void {
        if (!this.head) {
            this.head = newNode;
        } else {
            const last = this.getLast();
            if (last) {
                last.next = newNode;
            }
        }
    }

    /**
     * Funzione che rimuove tutti i nodi che hanno come valore lo stesso v passato in input
     * @param v valore dei nodi da cancellare all'interno della funzione
     */
    remove(v: E): void {
        const dummy = new ListNode<E>(null as any); // dummy head
        dummy.next = this.head;
        let curr = dummy;

        while (curr.next) {
            if (curr.next.data === v) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }

        this.head = dummy.next;
    }

    /**
     * Restituisce il valore della cella della lista alla posizione pos
     * @param pos posizione da verificare il valore
     * @returns valore alla posizione data in input
     */
    at(pos: number): E | null {
        let curr = this.head;
        let i = 0;
        while (curr) {
            if (i === pos) return curr.data;
            curr = curr.next;
            i++;
        }
        return null;
    }

    /**
     * Restituisce la lista come stringa
     * @returns stringa che rappresenta la stringa
     */
    toString(): string {
        if (!this.head) return "vuota";
        let result = "";
        let curr = this.head;
        while (curr) {
            result += curr.data + (curr.next ? " -> " : "");
            curr = curr.next!;
        }
        return result;
    }

    /**
     * Stampa la lista
     */
    print(): void {
        console.log(this.toString());
    }
}

// Test
const node1 = new ListNode<number>(7);
const node2 = new ListNode<number>(5);
const list = new LinkedList<number>(node1);

list.add(node2);
console.log("elemento in posizione 0:", list.at(0));
console.log("grandezza della lista:", list.size());
list.print();

list.remove(7);
list.print();
```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/list",

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

