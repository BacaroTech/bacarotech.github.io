+++
title = "AlgoritmiTeoria - 6 - tree - k-tree"
date = 2026-02-25T14:00:06Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## kTree.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: K-ARY TREE
──────────────────────────────
Un **K-Ary Tree** è una struttura dati gerarchica in cui ogni nodo può 
avere al massimo **K figli**.  
È una generalizzazione dell'albero binario (dove K=2) e viene usato in 
contesti dove servono più di due rami di navigazione.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Implementazione di **B-Tree** e **B+ Tree** per database.
- File system gerarchici.
- rappresentazione di **alberi di decisione** con più alternative.
- Strutture per **trie** (alberi di prefissi).

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **K** → numero massimo di figli per ogni nodo.
- **Nodo** → contenitore del valore e array di figli.
- **Radice (Root)** → nodo principale dell'albero.
- **Foglia (Leaf)** → nodo senza figli.
- **Altezza** → percorso più lungo dalla radice a una foglia.
- **Profondità** → livello del nodo (radice = 0).

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisci(valore, parent)` → aggiunge un nodo come figlio di parent.
- `cerca(valore)` → verifica la presenza di un valore.
- `rimuovi(valore)` → rimuove un nodo e i suoi discendenti.
- `visitaLivelli()` → attraversamento livello per livello.
- `contaNodi()` → numero totale di nodi.
- `getProfondità()` → profondità massima dell'albero.

──────────────────────────────
  IMPLEMENTAZIONE
──────────────────────────────
- Ogni nodo ha un array `figli` di dimensione massima K.
- L'inserimento fillows la prima posizione disponibile nell'array.
- La ricerca è tipicamente in ampiezza (BFS) o profondità (DFS).

──────────────────────────────
  PRESTAZIONI
──────────────────────────────
- Inserimento → **O(1)** (se c'è spazio nel parent), altrimenti ricerca.
- Ricerca → **O(n)** (caso peggiore, bisogna visitare tutti i nodi).
- Attraversamento → **O(n)**.

──────────────────────────────
  NOTE
──────────────────────────────
- Più flessibile dell'albero binario per rappresentare strutture complesse.
- L'efficienza dipende dalla scelta di K e dalla distribuzione dei figli.
- Spesso usato come base per algoritmi ottimizzati di ricerca.
*/

class KNode<T> {
    value: T;
    children: KNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
}

class KTree<T> {
    root: KNode<T> | null;
    k: number; // massimo numero di figli

    constructor(k: number = 2) {
        this.root = null;
        this.k = k;
    }

    /**
     * Inserisce un nodo come figlio di un nodo padre esistente
     * @param value valore del nuovo nodo
     * @param parentValue valore del nodo padre (se null, inserisce alla radice)
     * @returns true se l'inserimento è riuscito, false altrimenti
     */
    insert(value: T, parentValue: T | null): boolean {
        const newNode = new KNode(value);

        // Se non c'è radice, il primo nodo diventa radice
        if (!this.root) {
            if (parentValue === null) {
                this.root = newNode;
                return true;
            }
            return false;
        }

        // Se parentValue è null, inserisci alla radice
        if (parentValue === null) {
            if (this.root.children.length < this.k) {
                this.root.children.push(newNode);
                return true;
            }
            return false;
        }

        // Trova il padre e inserisci
        return this.insertNode(this.root, parentValue, newNode);
    }

    /**
     * Funzione ausiliaria ricorsiva per inserire un nodo
     */
    private insertNode(node: KNode<T>, parentValue: T, newNode: KNode<T>): boolean {
        if (node.value === parentValue) {
            if (node.children.length < this.k) {
                node.children.push(newNode);
                return true;
            }
            return false;
        }

        // Cerca nei figli
        for (const child of node.children) {
            if (this.insertNode(child, parentValue, newNode)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Cerca un valore nell'albero
     * @param value valore da cercare
     * @returns true se trovato, false altrimenti
     */
    search(value: T): boolean {
        if (!this.root) return false;
        return this.searchNode(this.root, value);
    }

    /**
     * Funzione ausiliaria per la ricerca
     */
    private searchNode(node: KNode<T>, value: T): boolean {
        if (node.value === value) return true;
        for (const child of node.children) {
            if (this.searchNode(child, value)) return true;
        }
        return false;
    }

    /**
     * Attraversamento livello per livello (BFS)
     * @returns array con i valori nell'ordine di visita
     */
    levelOrderTraversal(): T[] {
        if (!this.root) return [];
        
        const result: T[] = [];
        const queue: KNode<T>[] = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node.value);
            
            for (const child of node.children) {
                queue.push(child);
            }
        }
        
        return result;
    }

    /**
     * Conta il numero totale di nodi
     * @returns numero di nodi
     */
    countNodes(): number {
        if (!this.root) return 0;
        return this.countNodesRecursive(this.root);
    }

    /**
     * Funzione ausiliaria per contare i nodi
     */
    private countNodesRecursive(node: KNode<T>): number {
        let count = 1;
        for (const child of node.children) {
            count += this.countNodesRecursive(child);
        }
        return count;
    }

    /**
     * Calcola la profondità massima dell'albero
     * @returns profondità massima
     */
    getDepth(): number {
        if (!this.root) return 0;
        return this.getDepthRecursive(this.root);
    }

    /**
     * Funzione ausiliaria per calcolare la profondità
     */
    private getDepthRecursive(node: KNode<T>): number {
        if (node.children.length === 0) return 1;
        
        let maxDepth = 0;
        for (const child of node.children) {
            maxDepth = Math.max(maxDepth, this.getDepthRecursive(child));
        }
        return maxDepth + 1;
    }
}

// Esempio d'uso
const kTree = new KTree<number>(3); // K = 3

kTree.insert(1, null);      // Radice
kTree.insert(2, 1);         // Figlio di 1
kTree.insert(3, 1);         // Figlio di 1
kTree.insert(4, 1);         // Figlio di 1
kTree.insert(5, 2);         // Figlio di 2
kTree.insert(6, 2);         // Figlio di 2

console.log("Attraversamento livello per livello:", kTree.levelOrderTraversal());
console.log("Cerca 5:", kTree.search(5));
console.log("Cerca 10:", kTree.search(10));
console.log("Numero nodi:", kTree.countNodes());
console.log("Profondità:", kTree.getDepth());
```
