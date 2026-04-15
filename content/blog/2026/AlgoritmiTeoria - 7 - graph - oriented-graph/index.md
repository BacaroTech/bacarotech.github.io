+++
title = "AlgoritmiTeoria - 7 - graph - oriented-graph"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# STRUTTURA DATI: GRAFO ORIENTATO

Un **grafo orientato** è una collezione di nodi (vertici) connessi da archi direzionati, 
dove ciascun arco rappresenta una relazione unidirezionale tra due nodi.  

## PROPRIETÀ PRINCIPALI

- Rappresentato come coppia (V, E):  
  - V → insieme dei vertici (nodi).  
  - E → insieme degli archi (coppie ordinate di vertici).  
- Gli archi hanno direzione:  
  se esiste un arco da `A` a `B`, si può navigare **solo da A a B** e non viceversa.  

## TERMINOLOGIA

- **Vertice (Vertex)** → un nodo del grafo.  
- **Arco (Edge)** → connessione direzionata tra due vertici.  
- **Grado di Entrata (In-Degree)** → numero di archi che arrivano a un vertice.  
- **Grado di Uscita (Out-Degree)** → numero di archi che partono da un vertice.  
- **Percorso (Path)** → sequenza di vertici connessi da archi direzionati.  
- **Ciclo (Cycle)** → percorso chiuso (inizio = fine).  
- **Componente Fortemente Connessa** → sottoinsieme di vertici in cui ogni coppia 
  è raggiungibile reciprocamente.  

## OPERAZIONI PRINCIPALI

- `aggiungiVertice(v)` → inserisce un nuovo vertice.  
- `aggiungiArco(v1, v2)` → crea un arco orientato da `v1` a `v2`.  
- `rimuoviArco(v1, v2)` → elimina l'arco orientato da `v1` a `v2`.  
- `rimuoviVertice(v)` → elimina un vertice e tutti i suoi archi.  
- `verificaConnesso()` → controlla se il grafo è fortemente connesso.  
- `visitaAmpiezza(v)` → BFS a partire da un vertice.  
- `visitaProfondità(v)` → DFS a partire da un vertice.  

## RAPPRESENTAZIONE

- **Lista di adiacenza** (più comune):  
  Esempio → { A: [B, C], B: [D], C: [], D: [B] }  
- **Matrice di adiacenza** (più adatta in grafi densi).  

## EFFICIENZA

- Inserimento vertice → **O(1)**  
- Inserimento arco → **O(1)**  
- Rimozione arco → **O(d)** (d = grado di uscita del vertice).  
- Attraversamento BFS/DFS → **O(V + E)**  

## APPLICAZIONI

- Reti sociali con relazioni asimmetriche.  
- Modellazione di flussi di dati.  
- Reti di computer.  
- Pianificazione di percorsi con direzione.  
- Analisi di dipendenze in sistemi complessi.  

## VANTAGGI

- Modellano in modo naturale relazioni asimmetriche.  
- Utili per processi sequenziali e dipendenze.  

## LIMITAZIONI

- Più complessi da visualizzare rispetto ai grafi non orientati.  
- La connettività richiede algoritmi specifici.  

## NOTE

- Base per algoritmi fondamentali:  
  - calcolo delle componenti fortemente connesse,  
  - rilevamento di cicli orientati,  
  - calcolo dei percorsi minimi.  

## CODICE
```typescript
/**
 * Classe che rappresenta un arco orientato e pesato
 */
export class Edge<E> {
    nodo: E;
    peso: number;

    constructor(nodo: E, peso: number) {
        this.nodo = nodo;
        this.peso = peso;
    }
}

/**
 * Classe che rappresenta un grafo orientato pesato
 */
export class DirectedGraph<E> {
    private adjacencyList: Map<E, Edge<E>[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    /**
     * Aggiunge un vertice al grafo.
     * Se il vertice esiste già, non fa nulla.
     */
    aggiungiVertice(vertex: E): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

	/**
	 * Fornisce la lista di adiacenza dei nodi del grafo 
	 * @returns lista di adiacenza
	 */
	getAdjacencyList(){
		return this.adjacencyList;
	}

    /**
     * Aggiunge un arco orientato e pesato tra due vertici.
     * Se i vertici non esistono, vengono creati automaticamente.
     */
    aggiungiArco(from: E, to: E, peso: number = 1): void {
        if (!this.adjacencyList.has(from)) this.aggiungiVertice(from);
        if (!this.adjacencyList.has(to)) this.aggiungiVertice(to);

        this.adjacencyList.get(from)!.push(new Edge(to, peso));
    }

    /**
     * Rimuove un arco orientato dal grafo.
     */
    rimuoviArco(from: E, to: E): void {
        if (this.adjacencyList.has(from)) {
            this.adjacencyList.set(
                from,
                this.adjacencyList.get(from)!.filter((edge) => edge.nodo !== to)
            );
        }
    }

    /**
     * Rimuove un vertice e tutti gli archi entranti/ uscenti.
     */
    rimuoviVertice(vertex: E): void {
        this.adjacencyList.delete(vertex);

        for (const [key, edges] of this.adjacencyList.entries()) {
            this.adjacencyList.set(
                key,
                edges.filter((edge) => edge.nodo !== vertex)
            );
        }
    }

    /**
     * Visualizza il grafo (lista di adiacenza).
     */
    display(): void {
        for (const [vertex, edges] of this.adjacencyList.entries()) {
            const out = edges.map((e) => `${e.nodo}(${e.peso})`).join(", ");
            console.log(`${vertex} -> ${out || "NULL"}`);
        }
    }

    /**
     * Verifica se il grafo è fortemente connesso.
     * (Semplificato: controlla raggiungibilità da un nodo di partenza)
     */
    verificaConnesso(): boolean {
        const vertices = Array.from(this.adjacencyList.keys());
        if (vertices.length === 0) return true;

        const visitati = new Set<E>();

        const dfs = (start: E) => {
            const stack: E[] = [start];
            visitati.add(start);

            while (stack.length) {
                const v = stack.pop()!;
                for (const vicino of this.adjacencyList.get(v)!) {
                    if (!visitati.has(vicino.nodo)) {
                        visitati.add(vicino.nodo);
                        stack.push(vicino.nodo);
                    }
                }
            }
        };

        dfs(vertices[0]);
        return visitati.size === vertices.length;
    }

    /**
     * Visita in ampiezza (BFS).
     */
    visitaAmpiezza(start: E): E[] {
        const visitati = new Set<E>();
        const risultato: E[] = [];
        const coda: E[] = [start];

        visitati.add(start);

        while (coda.length > 0) {
            const nodo = coda.shift()!;
            risultato.push(nodo);

            for (const vicino of this.adjacencyList.get(nodo)!) {
                if (!visitati.has(vicino.nodo)) {
                    visitati.add(vicino.nodo);
                    coda.push(vicino.nodo);
                }
            }
        }

        return risultato;
    }

    /**
     * Visita in profondità (DFS).
     */
    visitaProfondita(start: E): E[] {
        const visitati = new Set<E>();
        const risultato: E[] = [];

        const dfs = (v: E) => {
            visitati.add(v);
            risultato.push(v);

            for (const vicino of this.adjacencyList.get(v)!) {
                if (!visitati.has(vicino.nodo)) {
                    dfs(vicino.nodo);
                }
            }
        };

        dfs(start);
        return risultato;
    }
}

// =============================
// Test della struttura dati
// =============================
let graphTest = new DirectedGraph<string>();

graphTest.aggiungiVertice("A");
graphTest.aggiungiVertice("B");
graphTest.aggiungiVertice("C");

graphTest.aggiungiArco("A", "B", 2);
graphTest.aggiungiArco("A", "C", 5);
graphTest.aggiungiArco("B", "C", 1);

graphTest.display();

console.log("\nGrafo fortemente connesso:", graphTest.verificaConnesso());
console.log("Visita in ampiezza da A:", graphTest.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graphTest.visitaProfondita("A"));

graphTest.rimuoviArco("A", "C");
console.log("\nDopo aver rimosso l'arco A->C:");
graphTest.display();

graphTest.rimuoviVertice("B");
console.log("\nDopo aver rimosso il vertice B:");
graphTest.display();
```
