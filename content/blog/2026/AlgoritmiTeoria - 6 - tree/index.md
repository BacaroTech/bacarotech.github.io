+++
title = "AlgoritmiTeoria - 6 - tree"
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
L’**Albero AVL** (Adelson-Velsky e Landis) è una variante bilanciata 
dei **Binary Search Tree (BST)**.  
Mantiene l’altezza dei sottoalberi sempre bilanciata, evitando il problema 
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
- **Radice (Root)** → nodo principale dell’albero.  
- **Foglia (Leaf)** → nodo senza figli.  
- **Sottoalbero (Subtree)** → albero discendente da un nodo.  
- **Altezza del Nodo** → percorso più lungo fino a una foglia.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisci(key)` → aggiunge una chiave e riequilibra con rotazioni.  
- `cerca(key)` → verifica la presenza di una chiave sfruttando la proprietà BST.  
- `elimina(key)` → rimuove un nodo, aggiornando l’altezza e riequilibrando.  
- `visitaInOrdine()` → attraversa i nodi in ordine crescente.  
- `getAltezza()` → restituisce la profondità massima dell’albero.  

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

    /**
     * Funzione asuliaria che inserisce un nodo
     * @param node nodo dal quale inserire il nodo, valore di partenza è la root
     * @param key nuova key da inserire
     * @returns nuovo nodo inserito
     */
    private auxInserisci(node: Node<E> | null, key: E): Node<E> {
        // Passo base: inserisci il nodo come in un albero binario di ricerca
        if (!node) {
            return new Node(key);
        }

        if (key < node.key) {
            node.left = this.auxInserisci(node.left, key);
        } else if (key > node.key) {
            node.right = this.auxInserisci(node.right, key);
        }

        // Aggiorna l'altezza del nodo corrente
        node.height = 1 + Math.max(this.getAltezza(node.left), this.getAltezza(node.right));

        // Ottieni il fattore di bilanciamento
        const balance = this.isBalance(node);

        // Rotazioni per bilanciare l'albero
        // Caso sinistra-sinistra
        if (balance > 1 && node.left && key < node.left.key) {
            return this.rotateRight(node);
        }

        // Caso destra-destra
        if (balance < -1 && node.right && key > node.right.key) {
            return this.rotateLeft(node);
        }

        // Caso sinistra-destra
        if (balance > 1 && node.left && key > node.left.key) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Caso destra-sinistra
        if (balance < -1 && node.right && key < node.right.key) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    /**
     * Wrapper per inserire un valore nell'albero
     * @param key valore da inserire 
     */
    inserisciKey(key: E): void {
        this.root = this.auxInserisci(this.root, key);
    }

    /**
     * Funzione ausiliaria che effettua la vitita in ordine
     * @param node nodo da cui far patire la visita
     * @param visitedNode array che contiene i dati in ordine della visita
     */
    private auxVisitaInOrdine(node: Node<E>, visitedNode: E[]): void {
        if (node) {
            if (node.left) {
                this.auxVisitaInOrdine(node.left, visitedNode);
            }
            visitedNode.push(node.key);
            if (node.right) {
                this.auxVisitaInOrdine(node.right, visitedNode);
            }
        }
    }

    /**
     * Visita in ordine sull'albero
     * @returns array che contiene i dati in ordine della visita
     */
    visitaInOrdine(): E[] {
        if (this.root) {
            let visitedNode: E[] = [];
            this.auxVisitaInOrdine(this.root, visitedNode);
            return visitedNode;
        }
        return [];
    }

    /**
     * Funzione ausiliara che cerca un nodo con una chiave specifica
     * @param node nodo da cui far partire la ricerca
     * @param key chiave che devo cercare nell'albero
     * @returns nodo dell'albero se esite, null altrimenti
     */
    private auxCercaKey(node: Node<E> | null, key: E): Node<E> | null {
        if (!node || node.key === key) {
            return node;
        }

        if (key < node.key) {
            return this.auxCercaKey(node.left, key);
        }

        return this.auxCercaKey(node.right, key);
    }

    // cercaKey(key) --> Wrapper per la ricerca
    cercaKey(key: E): Node<E> | null {
        return this.auxCercaKey(this.root, key);
    }

    /**
     * Restituisce il valore minimo nell'albero
     * @param node nodo da cui far partire la ricerca del minimo, di default la radice
     * @returns nodo minimo se esiste, null altrimenti
     */
    getMin(node: Node<E> | null = this.root): Node<E> | null {
        while (node && node.left) {
            node = node.left;
        }
        return node;
    }

    /**
     * Restituisce il valore massimo nell'albero
     * @param node nodo da cui far partire la ricerca del massimo, di default la radice
     * @returns nodo massimo se esiste, null altrimenti
     */
    getMax(node: Node<E> | null = this.root) {
        while (node && node.right) {
            node = node.right;
        }
        return node;
    }


    /**
     * Funzione ausiliaria per eliminazione di un nodo
     * @param node nodo da cui far partire la cancellazione
     * @param key chiave da eliminare
     * @returns nodo eliminato, null se non esite o l'albero è vuoto
     */
    private auxEliminaKey(node: Node<E> | null, key: E): Node<E> | null {
        if (!node) return node;

        if (key < node.key) {
            node.left = this.auxEliminaKey(node.left, key);
        } else if (key > node.key) {
            node.right = this.auxEliminaKey(node.right, key);
        } else {
            // Nodo con uno o nessun figlio
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                // Nodo con due figli
                const temp = this.getMin(node.right);
                if (temp) {
                    node.key = temp.key;
                    node.right = this.auxEliminaKey(node.right, temp.key);
                }
            }
        }

        if (!node) return node;

        // Aggiorna altezza del nodo corrente
        node.height = 1 + Math.max(this.getAltezza(node.left), this.getAltezza(node.right));

        // Bilanciamento
        const balance = this.isBalance(node);

        // Rotazioni per bilanciare l'albero
        if (balance > 1 && node.left && this.isBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        if (balance > 1 && node.left && this.isBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        if (balance < -1 && node.right && this.isBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        if (balance < -1 && node.right && this.isBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // eliminaKey(key) --> 
    /**
     * Wrapper per eliminare un nodo
     * @param key chiave da eliminare
     */
    eliminaKey(key: E): void {
        this.root = this.auxEliminaKey(this.root, key);
    }
}

// test 
const tree = new AVLTree();
tree.inserisciKey(10);
tree.inserisciKey(20);
tree.inserisciKey(5);
tree.inserisciKey(6);
tree.inserisciKey(8);

console.log("Visita in ordine:");
tree.visitaInOrdine();

console.log("Min:", tree.getMin());
console.log("Max:", tree.getMax());

tree.eliminaKey(10);
console.log("Visita in ordine dopo eliminazione:");
tree.visitaInOrdine();
```

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
- **Radice (Root)** → nodo principale dell’albero.  
- **Foglia (Leaf)** → nodo senza figli.  
- **Padre (Parent)** → nodo con almeno un figlio.  
- **Figlio (Child)** → nodo collegato a un padre.  
- **Sottoalbero (Subtree)** → albero discendente da un nodo.  
- **Altezza dell’Albero** → percorso più lungo dalla radice a una foglia.  

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

## binaryTree.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: ALBERO BINARIO
──────────────────────────────
L’**Albero Binario** è una struttura dati gerarchica formata da nodi, 
dove ciascun nodo può avere al massimo **due figli**:  
➡ un **figlio sinistro** e un **figlio destro**.  

È ideale per rappresentare dati con relazioni gerarchiche e per 
implementare altre strutture complesse (es. BST, Heap, Alberi Bilanciati).  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Nodo** → elemento dell’albero contenente un valore e puntatori ai figli.  
- **Radice (Root)** → il nodo principale, punto di partenza di tutte le operazioni.  
- **Foglia (Leaf)** → nodo senza figli.  
- **Padre (Parent)** → nodo che ha almeno un figlio.  
- **Figlio (Child)** → nodo collegato a un padre.  
- **Fratelli (Siblings)** → nodi che condividono lo stesso padre.  
- **Sottoalbero (Subtree)** → albero derivato da un nodo specifico.  
- **Albero Vuoto** → struttura senza nodi (radice nulla).  
- **Profondità (Depth)** → distanza di un nodo dalla radice.  
- **Altezza di un Nodo** → distanza fino alla foglia più lontana.  
- **Livello (Level)** → insieme dei nodi alla stessa profondità.  
- **Altezza dell’Albero** → percorso più lungo radice → foglia.  
- **Dimensione (Size)** → numero totale di nodi.  

──────────────────────────────
  OPERAZIONI DI VISITA
──────────────────────────────
- **Pre-Ordine** → Nodo → Sottoalbero Sinistro → Sottoalbero Destro.  
- **In-Ordine** → Sottoalbero Sinistro → Nodo → Sottoalbero Destro.  
- **Post-Ordine** → Sottoalbero Sinistro → Sottoalbero Destro → Nodo.  
- **Per Livelli (Level-Order)** → attraversamento livello per livello (con una coda).  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisci(valore)` → aggiunge un nuovo nodo nell’albero.  
- `cerca(valore)` → verifica se un valore è presente.  
- `elimina(valore)` → rimuove un nodo con valore specifico.  
- `visitaInOrdine()` → restituisce i valori in ordine simmetrico.  
- `visitaPreOrdine()` → attraversa prima il nodo, poi i sottoalberi.  
- `visitaPostOrdine()` → attraversa prima i sottoalberi, poi il nodo.  
- `altezza()` → calcola la profondità massima.  
- `contaNodi()` → restituisce il numero totale di nodi.  

──────────────────────────────
  PRESTAZIONI
──────────────────────────────
- Alberi **bilanciati**:  
  • Inserimento → **O(log n)**  
  • Ricerca → **O(log n)**  
  • Eliminazione → **O(log n)**  
- Alberi **sbilanciati**:  
  • Tutte le operazioni possono degradare a **O(n)**.  

➡ L’efficienza dipende dal bilanciamento dell’albero.  

──────────────────────────────
  NOTE
──────────────────────────────
- È la base per strutture come **Binary Search Tree (BST)**, **AVL**, **Heap**.  
- Per evitare perdita di riferimenti, conviene usare copie dei nodi 
nelle funzioni ricorsive → si preserva un backup al nodo originale.  
- Le modifiche si propagano grazie agli effetti collaterali, mantenendo 
la coerenza della struttura.  
*/

// Classe Nodo
class Nodo<E> {
    valore: E;
    sinistro: Nodo<E> | null;
    destro: Nodo<E> | null;

    /**
     * 
     * @param valore 
     */
    constructor(valore: E) {
        this.valore = valore; // Valore del nodo
        this.sinistro = null; // Puntatore al figlio sinistro
        this.destro = null;   // Puntatore al figlio destro
    }
}

// Classe Albero
class AlberoBinario<E> {
    radice: Nodo<E> | null;

    constructor() {
        this.radice = null; // Puntatore al nodo radice
    }

    /**
     * Inserimento di un valore nell'albero
     * @param valore > valore del nodo da inserire
     */
    inserisci(valore: E): void {
        const nuovoNodo = new Nodo(valore);
        if (!this.radice) {
            this.radice = nuovoNodo;
        } else {
            this.inserisciNodo(this.radice, nuovoNodo);
        }
    }

    // inserisciNodo(nodoCorrente, nuovoNodo) --> 
    /**
     * Funzione ausiliaria per l'inserimento del nodo
     * @param nodoCorrente 
     * @param nuovoNodo 
     */
    inserisciNodo(nodoCorrente: Nodo<E>, nuovoNodo: Nodo<E>): void {
        if (nuovoNodo.valore < nodoCorrente.valore) {
            if (!nodoCorrente.sinistro) {
                nodoCorrente.sinistro = nuovoNodo;
            } else {
                this.inserisciNodo(nodoCorrente.sinistro, nuovoNodo);
            }
        } else {
            if (!nodoCorrente.destro) {
                nodoCorrente.destro = nuovoNodo;
            } else {
                this.inserisciNodo(nodoCorrente.destro, nuovoNodo);
            }
        }
    }

    /**
     * Ricerca di un valore nell'albero
     * @param valore 
     * @returns true se è stato trovato, false altrimenti
     */
    cerca(valore: E): boolean | null {
        return this.cercaNodo(this.radice, valore);
    }

    /**
     * Funzione ausiliaria per cercare un nodo all'interno di un albero
     * @param nodoCorrente 
     * @param valore 
     * @returns true se è stato trovato, false altrimenti
     */
    private cercaNodo(nodoCorrente: Nodo<E> | null, valore: E): boolean {
        if (!nodoCorrente) return false;
        if (nodoCorrente.valore === valore) return true;
        return valore < nodoCorrente.valore
            ? this.cercaNodo(nodoCorrente.sinistro, valore)
            : this.cercaNodo(nodoCorrente.destro, valore);
    }

    /**
     * Visita simmetrica(sx - r - dx)
     * @returns array con gli elmenti in ordine in base alla visita effettuata
     */
    visitaInOrdine(): E[] {
        if (this.radice) {
            const visita: E[] = [];
            this.visitaInOrdineNodo(this.radice, visita);
            return visita;
        } else {
            return [];
        }

    }

    /**
     * Funzione ausiliaria per visita simmetrica
     * @param nodoCorrente 
     * @param visita 
     */
    private visitaInOrdineNodo(nodoCorrente: Nodo<E>, visita: E[]): void {
        if (nodoCorrente && nodoCorrente.sinistro) {
            this.visitaInOrdineNodo(nodoCorrente.sinistro, visita);
        }
        if (nodoCorrente) {
            visita.push(nodoCorrente.valore);
        }
        if (nodoCorrente && nodoCorrente.destro) {
            this.visitaInOrdineNodo(nodoCorrente.destro, visita);
        }
    }

    /**
     * Visita in pre ordine(radice - sx - dx)
     * @returns array con gli elmenti in ordine in base alla visita effettuata
     */
    visitaPreOrdine(): E[] {
        if (this.radice) {
            const visita: E[] = [];
            this.visitaPreOrdineNodo(this.radice, visita);
            return visita;
        } else {
            return [];
        }
    }

    /**
     * Funzione ausiliaria per visita in pre ordine
     * @param nodoCorrente 
     * @param visita 
     */
    private visitaPreOrdineNodo(nodoCorrente: Nodo<E>, visita: E[]) {
        if (nodoCorrente) {
            visita.push(nodoCorrente.valore);
        }
        if (nodoCorrente && nodoCorrente.sinistro) {
            this.visitaPreOrdineNodo(nodoCorrente.sinistro, visita);
        }
        if (nodoCorrente && nodoCorrente.destro) {
            this.visitaPreOrdineNodo(nodoCorrente.destro, visita);
        }
    }

    /**
     * Visita in post ordine(sx - dx - radice)
     * @returns array con gli elmenti in ordine in base alla visita effettuata
     */
    visitaPostOrdine() {
        if (this.radice) {
            const visita: E[] = [];
            this.visitaPostOrdineNodo(this.radice, visita);
            return visita;
        } else {
            return [];
        }
    }

    /**
     * Funzione ausiliaria per visita in post ordine
     * @param nodoCorrente 
     * @param visita 
     */
    private visitaPostOrdineNodo(nodoCorrente: Nodo<E>, visita: E[]) {
        if (nodoCorrente && nodoCorrente.sinistro) {
            this.visitaPostOrdineNodo(nodoCorrente.sinistro, visita);
        }
        if (nodoCorrente && nodoCorrente.destro) {
            this.visitaPostOrdineNodo(nodoCorrente.destro, visita);
        }
        if (nodoCorrente) {
            visita.push(nodoCorrente.valore);
        }
    }

    /**
     * Eliminazione del primo nodo in base al suo valore
     * @param valore 
     */
    elimina(valore: E): void {
        if (this.radice) {
            this.radice = this.eliminaNodo(this.radice, valore);
        }
    }

    /**
     * Funzione ausiliaria per cancellare uno specifico nodo dall'albero
     * @param nodoCorrente 
     * @param valore 
     * @returns nuova radice
     */
    private eliminaNodo(nodoCorrente: Nodo<E> | null, valore: E): Nodo<E> | null {
        if (!nodoCorrente) return null;

        // 1) Pulisci prima i figli (post-order: sinistro, destro, poi corrente)
        nodoCorrente.sinistro = this.eliminaNodo(nodoCorrente.sinistro, valore);
        nodoCorrente.destro = this.eliminaNodo(nodoCorrente.destro, valore);

        // 2) Se il nodo corrente ha il valore da eliminare, ricollega i sottoalberi
        if (nodoCorrente.valore === valore) {
            // caso 0 figli
            if (!nodoCorrente.sinistro && !nodoCorrente.destro) return null;

            // caso 1 figlio
            if (!nodoCorrente.sinistro) return nodoCorrente.destro;
            if (!nodoCorrente.destro) return nodoCorrente.sinistro;

            // caso 2 figli (strategia: attacca il sottoalbero destro
            // al nodo più a destra del sottoalbero sinistro e ritorna il sinistro)
            let rightmost = nodoCorrente.sinistro;
            while (rightmost.destro) rightmost = rightmost.destro;
            rightmost.destro = nodoCorrente.destro;
            return nodoCorrente.sinistro;
        }

        // 3) Nessuna eliminazione qui, restituisci il nodo (eventualmente con figli aggiornati)
        return nodoCorrente;
    }

    /**
     * Trovare il nodo con il valore minimo nell'albero
     * @param nodo 
     * @returns nodo minimo, null se l'albero è vuoto
     */
    private trovaMinimo(nodo: Nodo<E> | null): E | null {
        if (!nodo) return null;

        // Valore corrente
        let min: E = nodo.valore;

        // Ricerca nel sottoalbero sinistro
        const minSinistro = this.trovaMinimo(nodo.sinistro);
        if (minSinistro !== null && minSinistro && minSinistro < min) {
            min = minSinistro;
        }

        // Ricerca nel sottoalbero destro
        const minDestro = this.trovaMinimo(nodo.destro);
        if (minDestro !== null && minDestro && minDestro < min) {
            min = minDestro;
        }

        return min;
    }


    /**
     * calcola l'altezza dell'albero
     * @returns 
     */
    altezza(): number {
        if (this.radice) {
            return this.calcolaAltezza(this.radice);
        } else {
            return 0;
        }
    }

    /**
     * Funzione ausiliaria per calcolare l'altezza dell'albero
     * @param nodoCorrente 
     * @returns altezza dell'albero
     */
    private calcolaAltezza(nodoCorrente: Nodo<E>): number {
        if (!nodoCorrente) return 0;
        const altezzaSinistro = nodoCorrente.sinistro ? this.calcolaAltezza(nodoCorrente.sinistro) : 0;
        const altezzaDestro = nodoCorrente.destro ? this.calcolaAltezza(nodoCorrente.destro) : 0;
        return Math.max(altezzaSinistro, altezzaDestro) + 1; // Aggiungi 1 per il nodo corrente
    }

    /**
     * Calcola il numero di nodi di cui è composto l'albero
     * @returns numero di nodi 
     */
    contaNodi(): number {
        if (this.radice) {
            return this.contaNodiRicorsivo(this.radice);
        } else {
            return 0;
        }
    }

    /**
     * Funzione ausiliaria per contare il numero di nodi di cui è composto l'albero
     * @param nodoCorrente 
     * @returns numero di nodi dell'albero
     */
    private contaNodiRicorsivo(nodoCorrente: Nodo<E>): number {
        if (!nodoCorrente) return 0;
        const contaSinistro = nodoCorrente.sinistro ? this.contaNodiRicorsivo(nodoCorrente.sinistro) : 0;
        const contaDestro = nodoCorrente.destro ? this.contaNodiRicorsivo(nodoCorrente.destro) : 0;
        return contaSinistro + contaDestro + 1; // Conta il nodo corrente
    }
}

// test della struttura dati
const albero = new AlberoBinario();

console.log("Inserimento di valori nell'albero...");
albero.inserisci(50);
albero.inserisci(30);
albero.inserisci(70);
albero.inserisci(20);
albero.inserisci(40);
albero.inserisci(60);
albero.inserisci(80);

console.log("Visita in ordine (In-Order Traversal):", albero.visitaInOrdine());

console.log("Ricerca di valori:");
console.log("Cerca 40:", albero.cerca(40));
console.log("Cerca 100:", albero.cerca(100));

console.log("Eliminazione di un nodo (30)");
albero.elimina(30);
console.log("Visita in ordine dopo eliminazione:", albero.visitaInOrdine());

console.log("Visita Pre-Ordine:", albero.visitaPreOrdine());
console.log("Visita Post-Ordine:", albero.visitaPostOrdine());
console.log("Altezza dell'albero:", albero.altezza());
console.log("Numero totale di nodi:", albero.contaNodi()); 
```

## kTree.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: ALBERO K-ARIO
──────────────────────────────
Un **Albero K-ario** è una struttura dati gerarchica in cui 
ogni nodo può avere fino a **k figli**.  
Offre maggiore flessibilità rispetto a un albero binario, 
rendendolo adatto per rappresentare relazioni complesse.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Nodo** → contiene un valore e un array di figli.  
- **Radice (Root)** → nodo principale dell’albero.  
- **Foglia (Leaf)** → nodo senza figli.  
- **Padre (Parent)** → nodo con uno o più figli.  
- **Figlio (Child)** → nodo collegato a un padre.  
- **Fratelli (Siblings)** → nodi con lo stesso padre.  
- **Profondità di un Nodo** → distanza dalla radice.  
- **Altezza di un Nodo** → distanza fino alla foglia più lontana.  
- **Altezza dell’Albero** → percorso massimo dalla radice a una foglia.  
- **Dimensione (Size)** → numero totale di nodi.  

──────────────────────────────
  OPERAZIONI DI VISITA
──────────────────────────────
- **Pre-Ordine** → Nodo → Figli.  
- **Post-Ordine** → Figli → Nodo.  
- **Per Livelli (Level-Order)** → attraversamento per livelli (con una coda).  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `inserisci(valore, padre)` → aggiunge un nodo come figlio di un padre.  
- `cerca(valore)` → verifica se un valore è presente.  
- `elimina(valore)` → rimuove un nodo e collega i figli al padre (se esiste).  
- `visitaPreOrdine()` → restituisce i valori in pre-ordine.  
- `visitaPostOrdine()` → restituisce i valori in post-ordine.  
- `altezza()` → calcola la profondità massima dell’albero.  
- `contaNodi()` → restituisce il numero totale di nodi.  

──────────────────────────────
  EFFICIENZA
──────────────────────────────
- Albero bilanciato → **O(logₖ n)** per ricerca/inserimento/eliminazione.  
- Albero sbilanciato → **O(n)**.  
- Spazio → **O(n)** (dove `n` è il numero di nodi).  

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Rappresentazione di **file system**.  
- **Gerarchie organizzative** (aziende, enti, strutture).  
- Implementazione di **heap k-ari** (es. code di priorità).  
- **Alberi di decisione** e giochi multi-scelta.  

──────────────────────────────
  NOTE
──────────────────────────────
- Più generico e flessibile di un albero binario.  
- Prestazioni dipendono dal valore di `k` e dal bilanciamento.  
- Adatto a dati naturalmente multi-ramificazione.  
*/

// Classe NodoKArio
class NodoKArio<E> {
    valore: E;
    figli: NodoKArio<E>[] = [];


    constructor(valore: E) {
        this.valore = valore;      // Valore del nodo
        this.figli = [];           // Array dei figli -> altri nodiKari
    }

    // 
    /**
     * Aggiunge un figlio al nodo, nell'array dei figli/fratelli del nodo appena inserito
     * @param nuovoFiglio nuovo nodo da inserire
     */
    aggiungiFiglio(nuovoFiglio: NodoKArio<E>) {
        this.figli.push(nuovoFiglio);
    }
}

// Classe AlberoKArio
class AlberoKArio<E> {
    radice: NodoKArio<E> | null

    constructor() {
        this.radice = null; // Puntatore al nodo radice
    }

    // inserisci(valore, valorePadre = null) --> 
    /**
     * Inserisce un nodo sotto un nodo esistente specifico
     * @param valore valore da inserire
     * @param valorePadre valore del padre, da trovare
     */
    inserisci(valore: E, valorePadre: E): void {
        const nuovoNodo = new NodoKArio(valore);
        if (!this.radice) {
            // Se l'albero è vuoto, imposta il nodo come radice
            this.radice = nuovoNodo;
        } else {
            // Cerca il nodo padre e aggiungi il nuovo nodo come figlio
            const padre = this.auxCerca(this.radice, valorePadre);
            if (!padre) {
                throw new Error(`Nodo padre con valore ${valorePadre} non trovato.`);
            }
            padre.aggiungiFiglio(nuovoNodo);
        }
    }

    // cerca(valore) --> 
    /**
     * Ricerca di un nodo nell'albero
     * @param valore valore da cercare
     * @returns nodo con il valore da cercare, null se non esiste
     */
    cerca(valore: E): NodoKArio<E> | null {
        return this.auxCerca(this.radice, valore);
    }

    /**
     * Funzione ausiliaria per trovare un valore all'interno dell'albero
     * @param nodoCorrente nodo da cui far partire la ricerca
     * @param valore valore da cercare
     * @returns nodo con il valore da cercare, null se non esiste
     */
    private auxCerca(nodoCorrente: NodoKArio<E> | null, valore: E): NodoKArio<E> | null {
        if (!nodoCorrente) return null;
        if (nodoCorrente.valore === valore) return nodoCorrente;

        // Cerca ricorsivamente nei figli
        for (const figlio of nodoCorrente.figli) {
            const risultato = this.auxCerca(figlio, valore);
            if (risultato) return risultato;
        }
        return null;
    }

    /**
     * Funzione ausiliare per effettuare la visita in pre ordine
     * @param nodo nodo da cui far partire la ricerca la ricerca in pre ordine
     * @param risultati array contente la visita in pre ordine
     * @returns array con la visita in pre ordine
     */
    private auxVisitaPreOrdine(nodo: NodoKArio<E> | null, risultati: E[]): E[] {
        if (!nodo) return [];

        risultati.push(nodo.valore); // Visita il nodo corrente
        for (let figlio of nodo.figli) {
            risultati.concat(this.auxVisitaPreOrdine(figlio, risultati)); // Visita ricorsivamente i figli
        }
        return risultati;
    };

    /**
     * Visita pre-ordine(radice - figli)
     * @returns array con la visita in pre ordine
     */
    visitaPreOrdine(): E[] {
        let risultati: E[] = [];
        this.auxVisitaPreOrdine(this.radice, risultati);
        return risultati;
    }

    /**
     * Funzione ausiliare per effettuare la visita in post ordine
     * @param nodo nodo da cui far partire la ricerca la ricerca in pre ordine
     * @param risultati array contente la visita in post ordine
     * @returns array con la visita in post ordine
     */
    private auxVisitaPostOrdine(nodo: NodoKArio<E> | null, risultati: E[]): E[] {
        if (!nodo) return [];

        for (let figlio of nodo.figli) {
            risultati.concat(this.auxVisitaPreOrdine(figlio, risultati)); // Visita ricorsivamente i figli
        }
        risultati.push(nodo.valore); // Visita il nodo corrente
        return risultati;
    };

    /**
     * Visita post-ordine(figli - radice)
     * @returns array con la visita in post ordine
     */
    visitaPostOrdine() {
        let risultati: E[] = [];
        this.auxVisitaPostOrdine(this.radice, risultati);
        return risultati;
    }

    /**
     * Funzione di supporto per la DFS
     * @param nodo nodo da cui far partire la ricerca la ricerca in pre ordine
     * @param risultato array contente la visita in post ordine
     * @returns array con la visita DFS
     */
    private auxDfs(nodo: NodoKArio<E> | null, risultato: E[]): E[] {
        if (!nodo) return [];
        risultato.push(nodo.valore); // Aggiunge il valore del nodo visitato
        for (const figlio of nodo.figli) {
            risultato.concat(this.auxDfs(figlio, risultato)); // Visita i figli ricorsivamente
        }
        return risultato
    };

    /**
     * Effettua una visita in profondità sull'albero - DFS
     * @returns array con la visita DFS
     */
    visitaInProfondita() {
        const risultato: E[] = [];
        this.auxDfs(this.radice, risultato); // Avvia la DFS dalla radice
        return risultato;
    }

    /**
     * Elimina il primo nodo dall'albero con uno specifico valore
     * @param valore valore del nodo da eliminare
     * @returns true se è stato possibile eliminare il nodo, false altrimenti
     */
    elimina(valore: E): boolean {
        if (this.radice) {
            return this.auxEliminaNodo(this.radice, valore);
        }
        return false;
    }

    /**
     * Funzione ausiliaria per eliminare un nodo dall'albero
     * @param nodoCorrente nodo da cui effetturare la ricerca e l'eliminazione del nodo
     * @param valore valore del nodo da eliminar
     * @returns true se è stato possibile eliminare il nodo, false altrimenti
     */
    private auxEliminaNodo(nodoCorrente: NodoKArio<E> | null, valore: E): boolean {
        if (!nodoCorrente) return false;

        nodoCorrente.figli = nodoCorrente.figli.filter(figlio => {
            if (figlio.valore === valore) return false; // Rimuovi il nodo figlio
            this.auxEliminaNodo(figlio, valore); // Continua la ricerca nei sotto-alberi
        });

        return true;
    }

    /**
     * Funzione ausiliaria per ottenere l'altezza dell'albero
     * @param nodo nodo da cui far partire il calcolo, il valore di default è la radice
     * @returns altezza dell'albero
     */
    auxAltezza(nodo: NodoKArio<E> | null): number {
        if (!nodo) return 0;
        let altezzaMassima = 0;
        for (let figlio of nodo.figli) {
            altezzaMassima = Math.max(altezzaMassima, this.auxAltezza(figlio));
        }
        return altezzaMassima + 1; // Aggiungi 1 per includere il nodo corrente
    };

    /**
     * Calcola l'altezza dell'albero
     * @returns altezza dell'albero
     */
    altezza(): number {
        return this.auxAltezza(this.radice);
    }

    /**
     * Funzione ausiliaria che conta il numero di nodi nell'albero
     * @param nodo nodo da cui far partire il calcolo, il valore di default è la radice
     * @returns numero di nodi dell'albero
     */
    private auxConta(nodo: NodoKArio<E> | null): number {
        if (!nodo) return 0;
        let totale = 1; // Conta il nodo corrente
        for (let figlio of nodo.figli) {
            totale += this.auxConta(figlio); // Conta ricorsivamente i figli
        }
        return totale;
    };

    /**
     * Conta il numero totale di nodi nell'albero
     * @returns numero di nodi dell'albero
     */
    contaNodi(): number {
        return this.auxConta(this.radice);
    }
}

// test della struttura dati
const albero = new AlberoKArio();

console.log("Inserimento di nodi nell'albero k-ario...");
albero.inserisci(1, null);            
albero.inserisci(2, 1);         
albero.inserisci(3, 1);         
albero.inserisci(4, 1);         
albero.inserisci(5, 2);         
albero.inserisci(6, 2);         
albero.inserisci(7, 3);         
albero.inserisci(8, 3);         

console.log("Ricerca di valori:");
console.log("Cerca 6:", albero.cerca(6)); 
console.log("Cerca 10:", albero.cerca(10));

console.log("Eliminazione di un nodo (3)");
albero.elimina(3);
console.log("Visita in profondità dopo eliminazione:", albero.visitaInProfondita());

console.log("Visita Pre-Ordine:", albero.visitaPreOrdine());
console.log("Visita Post-Ordine:", albero.visitaPostOrdine());
console.log("Altezza dell'albero:", albero.altezza());
console.log("Numero totale di nodi:", albero.contaNodi());
```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/tree",

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

