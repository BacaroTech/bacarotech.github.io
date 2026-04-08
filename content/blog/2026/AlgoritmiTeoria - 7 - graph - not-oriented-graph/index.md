+++
title = "AlgoritmiTeoria - 7 - graph - not-oriented-graph"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# STRUTTURA DATI: GRAFO NON ORIENTATO

Un **grafo non orientato** è una collezione di nodi (vertici) 
connessi da archi che rappresentano relazioni bidirezionali.  

## PROPRIETÀ PRINCIPALI

- Rappresentato come coppia (V, E):  
  - V → insieme dei vertici (nodi).  
  - E → insieme degli archi (coppie non ordinate di vertici).  
- Gli archi non hanno direzione:  
  se esiste un arco tra `A` e `B`, si può navigare sia da `A` a `B` 
  che da `B` a `A`.  

## TERMINOLOGIA

- **Vertice (Vertex)** → un nodo del grafo.  
- **Arco (Edge)** → connessione tra due vertici.  
- **Grado (Degree)** → numero di archi connessi a un vertice.  
- **Percorso (Path)** → sequenza di vertici connessi da archi.  
- **Ciclo (Cycle)** → percorso chiuso (inizio = fine).  
- **Componente Connessa** → sottoinsieme di vertici in cui 
  ogni coppia è collegata direttamente o indirettamente.  

## OPERAZIONI PRINCIPALI

- `aggiungiVertice(v)` → inserisce un nuovo vertice.  
- `aggiungiArco(v1, v2)` → crea un arco tra due vertici 
  (aggiunge i vertici se non esistono).  
- `rimuoviArco(v1, v2)` → elimina un arco se presente.  
- `rimuoviVertice(v)` → elimina un vertice e tutti i suoi archi.  
- `verificaConnesso(v1, v2)` → controlla se esiste un percorso tra due vertici.  
- `visitaAmpiezza(v)` → BFS a partire da un vertice.  
- `visitaProfondità(v)` → DFS a partire da un vertice.  

## RAPPRESENTAZIONE

- **Lista di adiacenza** (efficiente in grafi sparsi):  
  Esempio → { A: [B, C], B: [A, D], C: [A], D: [B] }  
- **Matrice di adiacenza** (più adatta in grafi densi).  

## EFFICIENZA

- Inserimento vertice → **O(1)**  
- Inserimento arco → **O(1)**  
- Rimozione arco → **O(d)** (d = grado massimo tra i due vertici).  
- Attraversamento BFS/DFS → **O(V + E)**  

## APPLICAZIONI

- Reti sociali.  
- Mappe stradali.  
- Reti di computer.  
- Pianificazione di percorsi senza direzione.  
- Analisi di sistemi complessi.  

## VANTAGGI

- Struttura flessibile, adatta a molti problemi reali.  
- Operazioni ottimizzabili a seconda della rappresentazione.  

## LIMITAZIONI

- Grafi densi → memoria elevata.  
- Operazioni come rimozione arco o verifica connessione 
  possono essere costose rispetto a strutture specializzate.  

## NOTE

- Base per algoritmi fondamentali:  
  - calcolo delle componenti connesse,  
  - rilevamento cicli,  
  - cammino minimo.  

## CODICE
```typescript
/**
 * Interfaccia che rappresenta un arco pesato.
 */
export interface Edge<E> {
    node: E;
    weight: number;
}

/**
 * Implementazione di un grafo generico pesato e non orientato.
 * @typeParam E - Tipo dei vertici
 */
export class NotOrientedGraph<E> {
    private adjacencyList: Record<string, Edge<E>[]>;

    constructor() {
        this.adjacencyList = {};
    }

    /**
     * Aggiunge un vertice al grafo.
     * Se il vertice è già presente, non fa nulla.
     * @param vertex - Il vertice da aggiungere
     */
    aggiungiVertice(vertex: E): void {
        const key = String(vertex);
        if (!this.adjacencyList[key]) {
            this.adjacencyList[key] = [];
        }
    }

    /**
     * Aggiunge un arco pesato non orientato tra due vertici.
     * Se i vertici non esistono, vengono creati automaticamente.
     * @param vertex1 - Primo vertice
     * @param vertex2 - Secondo vertice
     * @param weight - Peso dell'arco
     */
    aggiungiArco(vertex1: E, vertex2: E, weight: number): void {
        const v1 = String(vertex1);
        const v2 = String(vertex2);

        if (!this.adjacencyList[v1]) {
            this.aggiungiVertice(vertex1);
        }
        if (!this.adjacencyList[v2]) {
            this.aggiungiVertice(vertex2);
        }

        this.adjacencyList[v1].push({
            node: vertex2, weight
        });
        this.adjacencyList[v2].push({
            node: vertex1, weight
        });
    }

    /**
     * Rimuove un arco tra due vertici, se esiste.
     * @param vertex1 - Primo vertice
     * @param vertex2 - Secondo vertice
     */
    rimuoviArco(vertex1: E, vertex2: E): void {
        const v1 = String(vertex1);
        const v2 = String(vertex2);

        this.adjacencyList[v1] = this.adjacencyList[v1]?.filter(edge => edge.node !== vertex2) || [];
        this.adjacencyList[v2] = this.adjacencyList[v2]?.filter(edge => edge.node !== vertex1) || [];
    }

    /**
     * Rimuove un vertice e tutti i relativi archi.
     * @param vertex - Il vertice da rimuovere
     */
    rimuoviVertice(vertex: E): void {
        const v = String(vertex);
        while (this.adjacencyList[v]?.length) {
            const adjacentEdge = this.adjacencyList[v].pop() as Edge<E>;
            this.rimuoviArco(vertex, adjacentEdge.node);
        }
        delete this.adjacencyList[v];
    }

    /**
     * Visualizza il grafo in console.
     */
    display(): void {
        for (const vertex in this.adjacencyList) {
            const edges = this.adjacencyList[vertex];
            const rappresentazione = edges.length > 0
                ? edges.map(e => `${e.node}(${e.weight})`).join(", ")
                : "NULL";
            console.log(`${vertex} -> ${rappresentazione}`);
        }
    }

    /**
     * Verifica se il grafo è connesso.
     * @returns true se il grafo è connesso, false altrimenti
     */
    verificaConnesso(): boolean {
        const visitati = new Set<string>();
        const vertices = Object.keys(this.adjacencyList);

        if (vertices.length === 0) return true; // grafo vuoto = connesso

        const dfs = (vertex: string) => {
            visitati.add(vertex);
            for (const edge of this.adjacencyList[vertex]) {
                const key = String(edge.node);
                if (!visitati.has(key)) {
                    dfs(key);
                }
            }
        };

        dfs(vertices[0]);

        return vertices.length === visitati.size;
    }

    /**
     * Visita in ampiezza (BFS) a partire da un vertice.
     * @param start - Vertice di partenza
     * @returns Lista dei vertici visitati in ordine BFS
     */
    visitaAmpiezza(start: E): E[] {
        const result: E[] = [];
        const visitati = new Set<string>();
        const queue: E[] = [start];

        visitati.add(String(start));

        while (queue.length > 0) {
            const nodo = queue.shift() as E;
            result.push(nodo);

            for (const edge of this.adjacencyList[String(nodo)]) {
                const key = String(edge.node);
                if (!visitati.has(key)) {
                    visitati.add(key);
                    queue.push(edge.node);
                }
            }
        }

        return result;
    }

    /**
     * Visita in profondità (DFS) a partire da un vertice.
     * @param start - Vertice di partenza
     * @returns Lista dei vertici visitati in ordine DFS
     */
    visitaProfondita(start: E): E[] {
        const result: E[] = [];
        const visitati = new Set<string>();

        const dfs = (vertex: E) => {
            visitati.add(String(vertex));
            result.push(vertex);

            for (const edge of this.adjacencyList[String(vertex)]) {
                if (!visitati.has(String(edge.node))) {
                    dfs(edge.node);
                }
            }
        };

        dfs(start);
        return result;
    }

    /**
     * Restituisce tutti i vertici del grafo
     * @returns tutti i vertici del grafo
     */
    getVertices(): E[] {
        const verticesSet = new Set<E>();
        for (const key in this.adjacencyList) {
            verticesSet.add(key as unknown as E);
            for (const edge of this.adjacencyList[key]) {
                verticesSet.add(edge.node);
            }
        }
        return Array.from(verticesSet);
    }
    
    /**
     * Restituisce tutti gli archi senza duplicati
     * @returns tutti gli archi senza duplicati
     */
    getEdges(): { from: E; to: E; weight: number }[] {
        const edges: { from: E; to: E; weight: number }[] = [];
        const visited = new Set<string>();

        for (const key in this.adjacencyList) {
            for (const edge of this.adjacencyList[key]) {
                // Crea un id unico indipendente dall'ordine dei nodi
                const id = [String(key), String(edge.node)].sort().join('-');
                if (!visited.has(id)) {
                    edges.push({ from: key as unknown as E, to: edge.node, weight: edge.weight });
                    visited.add(id);
                }
            }
        }

        return edges;
    }

    /**
     * Fornisce la lista di adiacenza dei nodi del grafo 
     * @returns lista di adiacenza
     */
    getAdjacencyList(){
      return this.adjacencyList;
    }
}

// =============================
// Test della struttura dati
// =============================

const graph = new NotOrientedGraph<string>();

graph.aggiungiVertice("A");
graph.aggiungiVertice("B");
graph.aggiungiVertice("C");

graph.aggiungiArco("A", "B", 5);
graph.aggiungiArco("A", "C", 2);
graph.aggiungiArco("B", "C", 3);

graph.display();

console.log("\nGrafo connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));

graph.rimuoviArco("A", "C");
console.log("\nDopo aver rimosso l'arco A-C:");
graph.display();

graph.rimuoviVertice("B");
console.log("\nDopo aver rimosso il vertice B:");
graph.display();

console.log("\nGrafo connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));
```
