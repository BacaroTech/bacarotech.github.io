+++
title = "AlgoritmiTeoria - 6 - tree - AVL tree"
date = 2026-02-25T14:00:06Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## avlTree.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: ALBERO AVL
──────────────────────────────
L'**Albero AVL** (Adelson-Velsky e Landis) è una variante bilanciata 
dei **Binary Search Tree (BST)**.  
Mantiene l'altezza dei sottoalberi sempre bilanciata, evitando il problema 
degli alberi sbilanciati e garantendo prestazioni efficienti.  

──────────────────────────────
  PROPRIETÀ DI BILANCIAMENTO
──────────────────────────────
Per ogni nodo `N`:  
  |altezza(sottoalbero sinistro) - altezza(sottoalbero destro)| ≤ 1  

Questa proprietà viene mantenuta **dinamicamente** attraverso **rotazioni** 
dopo inserimenti o eliminazioni.  

──────────────────────────────
  PROPRIETÀ DI RICERCA
──────────────────────────────
Come in un **BST**:  
- Nel sottoalbero sinistro → valori < `N.key`  
- Nel sottoalbero destro → valori > `N.key`  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Nodo** → contiene una chiave, altezza e puntatori ai figli.  
- **Radice (Root)** → nodo principale dell'albero.  
- **Foglia (Leaf)** → nodo senza figli.  
- **Sottoalbero (Subtree)** → albero discendente da un nodo.  
- **Altezza del Nodo** → percorso più lungo fino a una foglia.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisci(key)` → aggiunge una chiave e riequilibra con rotazioni.  
- `cerca(key)` → verifica la presenza di una chiave sfruttando la proprietà BST.  
- `elimina(key)` → rimuove un nodo, aggiornando l'altezza e riequilibrando.  
- `visitaInOrdine()` → attraversa i nodi in ordine crescente.  
- `getAltezza()` → restituisce la profondità massima dell'albero.  

──────────────────────────────
  MECCANISMI DI BILANCIAMENTO
──────────────────────────────
- **Rotazione Destra (Right Rotation)** → quando il sottoalbero sinistro è troppo alto.  
- **Rotazione Sinistra (Left Rotation)** → quando il sottoalbero destro è troppo alto.  
- **Rotazione Sinistra-Destra (Left-Right)** → sbilanciamento nel figlio sinistro del destro.  
- **Rotazione Destra-Sinistra (Right-Left)** → sbilanciamento nel figlio destro del sinistro.  

──────────────────────────────
  EFFICIENZA
──────────────────────────────
- Ricerca → **O(log n)**  
- Inserimento → **O(log n)**  
- Eliminazione → **O(log n)**  
- Spazio → **O(n)** (dove `n` è il numero di nodi)  

➡ Prestazioni garantite grazie al bilanciamento automatico.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Mantiene sempre un albero bilanciato.  
- Prestazioni prevedibili e stabili anche con frequenti inserimenti/eliminazioni.  
- Più efficiente dei BST tradizionali nei contesti dinamici.  

──────────────────────────────
  OPERAZIONI AUSILIARIE
──────────────────────────────
- `getMin()` → restituisce la chiave minima.  
- `getMax()` → restituisce la chiave massima.  
- `isBalance()` → verifica il rispetto della proprietà AVL.  

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
Gli alberi AVL sono usati in sistemi che richiedono accesso rapido e aggiornamenti frequenti:  
- Database con indici ordinati.  
- Motori di ricerca.  
- Implementazioni di **set** e **mappe ordinate**.  
- Algoritmi su intervalli e dati gerarchici.  

──────────────────────────────
  NOTE
──────────────────────────────
- Più complessi da gestire rispetto ai BST semplici.  
- Il costo aggiuntivo è giustificato perché il bilanciamento migliora le prestazioni complessive.  
*/


class Node<E> {
    key: E;
    left: Node<E> | null;
    right: Node<E> | null;
    height: number;

    constructor(key: E) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree<E> {
    root: Node<E> | null;

    constructor() {
        this.root = null;
    }

    /**
     * Funzione per ottenere l'altezza di un nodo
     * @param node nodo dal quale far partire il calcolo dell'altezza
     * @returns altezza dal nodo in input
     */
    getAltezza(node: Node<E> | null) {
        return node ? node.height : 0;
    }

    /**
     * Funzione per ottenere il fattore di bilanciamento
     * @param node nodo dal quale calcolare il fattore di bilanciamento
     * @returns fattore di bilanciamento
     */
    isBalance(node: Node<E>): number {
        let balanceSX: number = 0;
        let balanceDX: number = 0;
        if (node) {
            if (node.left) {
                balanceSX = this.getAltezza(node.left);
            }
            if (node.right) {
                balanceDX = this.getAltezza(node.right);
            }
            return balanceSX - balanceDX;
        }
        return 0;
    }

    /**
     * Rotazione a destra
     * @param z nodo dal quale far partire la rotazione a destra
     * @returns nuovo nodo post rotazione
     */
    private rotateRight(z: Node<E>): Node<E> {
        const y = z.left;
        if (!y) return z;

        const T3 = y.right;

        // Rotazione
        y.right = z;
        z.left = T3;

        // Aggiornamento altezze (prima z, poi y)
        z.height = 1 + Math.max(this.getAltezza(z.left), this.getAltezza(z.right));
        y.height = 1 + Math.max(this.getAltezza(y.left), this.getAltezza(y.right));

        // Nuova radice del sottoalbero
        return y;
    }


    /**
     * Rotazione a sinistra
     * @param z nodo dal quale far partire la rotazione a sinistra
     * @returns nuovo nodo post rotazione
     */
    private rotateLeft(z: Node<E>): Node<E> {
        const y = z.right;
        if (!y) return z;
        let T2 = y.left;

        y.left = z;
        z.right = T2;

        z.height = 1 + Math.max(this.getAltezza(z.left), this.getAltezza(z.right));
        y.height = 1 + Math.max(this.getAltezza(y.left), this.getAltezza(y.right));

        return y;
    }
```
