+++
title = "AlgoritmiTeoria - 6 - tree - binary search tree"
date = 2026-02-25T14:00:06Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## binarySearchTree.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: ALBERO BINARIO DI RICERCA (BST)
──────────────────────────────
Un **Binary Search Tree (BST)** è una struttura dati ad albero 
che organizza i valori in modo ordinato per consentire 
ricerca, inserimento e rimozione efficienti.  

──────────────────────────────
  PROPRIETÀ DI RICERCA
──────────────────────────────
- Ogni nodo contiene un valore univoco.  
- Per ogni nodo `N`:  
  - Sottoalbero sinistro → valori < `N.value`  
  - Sottoalbero destro → valori > `N.value`  
- Grazie a questa proprietà, è possibile sfruttare 
  la **ricerca binaria** durante la navigazione.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Nodo** → contiene un valore e i puntatori a sinistra e destra.  
- **Radice (Root)** → nodo principale dell'albero.  
- **Foglia (Leaf)** → nodo senza figli.  
- **Padre (Parent)** → nodo con almeno un figlio.  
- **Figlio (Child)** → nodo collegato a un padre.  
- **Sottoalbero (Subtree)** → albero discendente da un nodo.  
- **Altezza dell'Albero** → percorso più lungo dalla radice a una foglia.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisci(valore)` → aggiunge un nodo rispettando la proprietà BST.  
- `cerca(valore)` → verifica la presenza di un valore.  
- `elimina(valore)` → rimuove un nodo:  
  - Nessun figlio → eliminato direttamente.  
  - Un figlio → sostituito con il figlio.  
  - Due figli → sostituito dal successore in ordine (minimo del sottoalbero destro).  
- `visitaInOrdine()` → restituisce valori ordinati crescenti.  
- `visitaPreOrdine()` → visita radice → sottoalbero sinistro → sottoalbero destro.  
- `visitaPostOrdine()` → visita sottoalberi → radice.  
- `altezza()` → calcola la profondità massima.  
- `contaNodi()` → numero totale di nodi.  

──────────────────────────────
  OPERAZIONI AUSILIARIE
──────────────────────────────
- `getMin()` → valore minimo (nodo più a sinistra).  
- `getMax()` → valore massimo (nodo più a destra).  
- `isBalanced()` → verifica che le altezze dei sottoalberi 
  differiscano al massimo di 1.  

──────────────────────────────
  EFFICIENZA
──────────────────────────────
- Ricerca → **O(log n)** (medio), **O(n)** (peggiore caso).  
- Inserimento → **O(log n)** (medio), **O(n)** (peggiore caso).  
- Eliminazione → **O(log n)** (medio), **O(n)** (peggiore caso).  
- Spazio → **O(n)**.  

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Strutture di database.  
- Implementazioni di insiemi e mappe ordinate.  
- Algoritmi di ordinamento.  
- Gestione di intervalli e dati gerarchici.  

──────────────────────────────
  NOTE
──────────────────────────────
- Più semplice rispetto ad AVL.  
- Non garantisce bilanciamento automatico.  
- Può degradare in una lista se i dati sono inseriti in ordine.  
*/

class Node<E> {
    value: E;
    left: Node<E> | null;
    right: Node<E> | null;

    constructor(value: E) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree<E> {
    root: Node<E> | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserisce un valore nell'albero rispettando la proprieta di ricerca
     * @param value valore da inserire nell'albero
     * @returns nuovo nodo inserito
     */
    insert(value: E) : Node<E> | null{
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this.root;
        }

        let current = this.root;
        while (true) {
            // valori duplicati non consentiti
            if (value === current.value) return null;
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this.root;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this.root;
                }
                current = current.right;
            }
        }
    }

    /**
     * Cerca un valore nell'albero sfruttando la proprietà di ricerca
     * @param value valore da cercare nell'albero
     * @returns true se esiste un nodo con il valore "value", false altrimenti
     */
    find(value: E): boolean {
        if (!this.root) return false;
        let current: Node<E> | null = this.root;
        while (current) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    /**
     * Funzione ausiliaria che effettua l'eleminazione
     * @param node nodo da cui deve partire l'eliminazione, valore di partenza la radice
     * @param value valore da eliminare
     * @returns nuova radice dell'albero
     */
    private auxRemove(node: Node<E> | null, value: E): Node<E> | null {
        if (!node) return null;
        if (value < node.value) {
            node.left = this.auxRemove(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.auxRemove(node.right, value);
            return node;
        } else {
            // Caso 1: Nessun figlio
            if (!node.left && !node.right) return null;
            // Caso 2: Un figlio
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            // Caso 3: Due figli
            let temp = this.getMin(node.right);
            if (temp) {
                node.value = temp.value;
                node.right = this.auxRemove(node.right, temp.value);
                return node;
            }
            return null;
        }
    }

    /**
     * Rimuove un nodo dall'albero
     * @param value valore del nodo da eliminare
     */
    remove(value: E): void {
        this.root = this.auxRemove(this.root, value);
    }

    /**
     * Trova il valore minimo in un sottoalbero sfruttando la proprietà di ricerca
     * @param node nodo da cui deve partire la ricerca, valore di partenza la radice
     * @returns nodo con il valore minimo, null se l'albero è vuoto
     */
    getMin(node: Node<E> | null = this.root): Node<E> | null {
        while (node && node.left) {
            node = node.left;
        }
        return node;
    }

    /**
     * Trova il valore massimo in un sottoalbero sfruttando la proprietà di ricerca
     * @param node nodo da cui deve partire la ricerca, valore di partenza la radice
     * @returns nodo con il valore massimo, null se l'albero è vuoto
     */
    getMax(node: Node<E> | null = this.root): Node<E> | null {
        while (node && node.right) {
            node = node.right;
        }
        return node;
    }

    /**
     * Funzione ausiliara che detrmina se l'albero radicato su nodo in input è bilanciato o meno
     * @param node nodo da verificare se è bilanciato
     * @returns oggetto con contenuto se è bilanciato o meno e l'altezza
     */
    private isBalancedAux(node: Node<E> | null): { balanced: boolean, height: number } {
        if (!node) return { balanced: true, height: 0 };

        const left = this.isBalancedAux(node.left);
        const right = this.isBalancedAux(node.right);

        const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
        const height = Math.max(left.height, right.height) + 1;

        return { balanced, height };
    };

    /**
     * Verifica che l'albero è bilanciato
     * @returns oggetto con contenuto se è bilanciato o meno e l'altezza 
     */
    isBalanced(): { balanced: boolean, height: number } {
        return this.isBalancedAux(this.root);
    }

    /**
     * Visita in ordine dell'albero
     * @returns array con i
     */
    inOrderTraversal(): E[] {
        let result: E[] = [];
        let node = this.root;
        this.auxInOrderTraversal(node, result)
        return result
    }

    /**
     * Ritorna l'albero in ordine (in-order traversal)[sx - r - dx]
     * @param node nodo da cui far partire la visita, di solito la radice
     * @param result array contenente i valori in ordine in base alla visita
     */
    auxInOrderTraversal(node: Node<E> | null, result: E[]) {
        if (node) {
            if (node.left)
                this.auxInOrderTraversal(node.left, result);

            result.push(node.value);

            if (node.right)
                this.auxInOrderTraversal(node.right, result);
        }
    }
};

// test della struttura dati
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(18);

console.log("Attraversamento in preordine:", bst.inOrderTraversal());
console.log("Ricerca di valori:");
console.log("Cerca 7:", bst.find(7));
console.log("Cerca 20:", bst.find(20));

console.log("Eliminazione di un nodo (10)");
bst.remove(10);
console.log("Attraversamento in preordine dopo aver rimosso il 10:", bst.inOrderTraversal());

```
