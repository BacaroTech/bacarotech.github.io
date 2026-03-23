+++
title = "AlgoritmiTeoria - 6 - tree - binary tree"
date = 2026-02-25T14:00:06Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## binaryTree.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: ALBERO BINARIO
──────────────────────────────
L'**Albero Binario** è una struttura dati gerarchica formata da nodi, 
dove ciascun nodo può avere al massimo **due figli**:  
➡ un **figlio sinistro** e un **figlio destro**.  

È ideale per rappresentare dati con relazioni gerarchiche e per 
implementare altre strutture complesse (es. BST, Heap, Alberi Bilanciati).  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Nodo** → elemento dell'albero contenente un valore e puntatori ai figli.  
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
- **Altezza dell'Albero** → percorso più lungo radice → foglia.  
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
- `inserisci(valore)` → aggiunge un nuovo nodo nell'albero.  
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

➡ L'efficienza dipende dal bilanciamento dell'albero.  

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
