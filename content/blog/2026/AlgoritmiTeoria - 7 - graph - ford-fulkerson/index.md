+++
title = "AlgoritmiTeoria - 7 - graph - ford-fulkerson"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: FORD-FULKERSON

L'**algoritmo di Ford-Fulkerson** calcola il **flusso massimo** in un grafo **connesso e pesato**, 
dove i pesi rappresentano le capacità massime degli archi.  

## TERMINOLOGIA

- **Vertice (Vertex)** → nodo del grafo.  
- **Arco con Capacità (Capacity Edge)** → connessione tra due vertici con capacità massima.  
- **Flusso (Flow)** → quantità di risorsa trasportata lungo un arco.  
- **Percorso Aumentante (Augmenting Path)** → percorso dalla sorgente al pozzo con capacità residua disponibile.  
- **Sorgente (Source)** → nodo iniziale del flusso.  
- **Pozzo / Destinazione (Sink)** → nodo finale del flusso.  

## FUNZIONAMENTO DELL'ALGORITMO

1. Inizializza il flusso di tutti gli archi a 0.  
2. Cerca un **percorso aumentante** dalla sorgente alla destinazione con capacità residua > 0.  
3. Determina il **flusso massimo possibile** lungo questo percorso (minima capacità residua).  
4. Aumenta il flusso sugli archi del percorso di questa quantità.  
5. Aggiorna le capacità residue lungo gli archi diretti e inversi.  
6. Ripeti finché non esistono più percorsi aumentanti.  

## STRUTTURE DI SUPPORTO

- **Grafo con capacità residua** → memorizza capacità disponibili lungo gli archi.  
- **Algoritmo di ricerca** → BFS (Edmonds-Karp) o DFS per trovare percorsi aumentanti.  

## COMPLESSITÀ

- Dipende dalla scelta della tecnica di ricerca:  
  - Con BFS (Edmonds-Karp) → **O(V * E²)**  
  - Con DFS → complessità può variare e dipende dai valori dei flussi.  
- Spazio → **O(V + E)** per memorizzare il grafo e le capacità residue.  

## ESEMPIO DI UTILIZZO

Grafo con capacità:
S → A(10), S → B(5), A → B(15), A → T(10), B → T(10)

Passaggi:
1. Percorso aumentante: S-A-T → flusso = min(10, 10) = 10  
2. Aggiornamento capacità residue: S-A(0), A-T(0)  
3. Percorso aumentante successivo: S-B-T → flusso = min(5, 10) = 5  
4. Nessun altro percorso aumentante disponibile → algoritmo termina.  

Flusso massimo = 10 + 5 = 15

## APPLICAZIONI

- **Reti di comunicazione** → massimizzare il throughput.  
- **Trasporto di risorse** → flusso di merci o acqua in reti distribuite.  
- **Flusso di dati su reti informatiche**.  
- Pianificazione e ottimizzazione in sistemi logistici.  

## VANTAGGI

- Calcolo semplice del flusso massimo in grafi con capacità note.  
- Basato su concetti intuitivi di percorsi aumentanti e capacità residua.  
- Adattabile a varie strategie di ricerca (BFS, DFS).  

## LIMITAZIONI

- Può essere inefficiente su grafi grandi se non si usa BFS (Edmonds-Karp).  
- Richiede capacità non negative lungo gli archi.  
- La scelta della tecnica di ricerca influisce fortemente sulle prestazioni.  

## CODICE
```typescript
import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * BFS ausiliaria per trovare un percorso aumentante.
 * Aggiorna il parent per risalire il percorso.
 */
function bfs<E>(
    graph: DirectedGraph<E>,
    source: E,
    sink: E,
    parent: Map<E, E>,
    residualCapacity: Map<E, Map<E, number>>
): boolean {
    const visited = new Set<E>();
    const queue: E[] = [];

    queue.push(source);
    visited.add(source);

    while (queue.length > 0) {
        const u = queue.shift()!;
        const edges = graph.getAdjacencyList().get(u) || [];

        for (const edge of edges) {
            const v = edge.nodo;
            const cap = residualCapacity.get(u)?.get(v) ?? 0;
            if (!visited.has(v) && cap > 0) {
                queue.push(v);
                visited.add(v);
                parent.set(v, u);
                if (v === sink) return true;
            }
        }
    }

    return false;
}

/**
 * Algoritmo di Ford-Fulkerson per trovare il flusso massimo in un grafo orientato pesato.
 * @param graph Grafo orientato pesato
 * @param source Nodo sorgente
 * @param sink Nodo pozzo
 * @returns Flusso massimo dal source al sink
 */
export function fordFulkerson<E>(
    graph: DirectedGraph<E>,
    source: E,
    sink: E
): number {
    const vertices = Array.from(graph.getAdjacencyList().keys());
    const residualCapacity: Map<E, Map<E, number>> = new Map();

    // Inizializzazione capacità residua
    for (const u of vertices) {
        residualCapacity.set(u, new Map<E, number>());
        const edges = graph.getAdjacencyList().get(u) || [];
        for (const edge of edges) {
            residualCapacity.get(u)!.set(edge.nodo, edge.peso);
        }
    }

    const parent = new Map<E, E>();
    let maxFlow = 0;

    // Continua finché esistono percorsi aumentanti
    while (bfs(graph, source, sink, parent, residualCapacity)) {
        // Trova capacità residua minima lungo il percorso
        let pathFlow = Infinity;
        let v = sink;
        while (v !== source) {
            const u = parent.get(v)!;
            pathFlow = Math.min(pathFlow, residualCapacity.get(u)!.get(v)!);
            v = u;
        }

        // Aggiorna capacità residua
        v = sink;
        while (v !== source) {
            const u = parent.get(v)!;

            // Sottrae capacità dal percorso diretto
            residualCapacity.get(u)!.set(v, residualCapacity.get(u)!.get(v)! - pathFlow);

            // Aggiorna capacità inversa
            if (!residualCapacity.get(v)!.has(u)) residualCapacity.get(v)!.set(u, 0);
            residualCapacity.get(v)!.set(u, residualCapacity.get(v)!.get(u)! + pathFlow);

            v = u;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}

// =============================
// Main di prova
// =============================
const grafo = new DirectedGraph<string>();

grafo.aggiungiArco('S', 'A', 10);
grafo.aggiungiArco('S', 'B', 5);
grafo.aggiungiArco('A', 'B', 15);
grafo.aggiungiArco('A', 'C', 10);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 10);
grafo.aggiungiArco('C', 'T', 10);
grafo.aggiungiArco('D', 'T', 10);

console.log("Grafo:");
grafo.display();

const flussoMassimo = fordFulkerson(grafo, 'S', 'T');
console.log("\nFlusso massimo da S a T:", flussoMassimo);
```
