+++
title = "AlgoritmiTeoria - 7 - graph - edmonds-karp"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: EDMONDS-KARP

L'**algoritmo di Edmonds-Karp** è una specifica implementazione 
dell'**algoritmo di Ford-Fulkerson** per il calcolo del flusso massimo 
in un grafo connesso e pesato.  
La differenza principale è l'uso della **ricerca in ampiezza (BFS)** per trovare i percorsi aumentanti.  

## TERMINOLOGIA

- **Vertice (Vertex)** → nodo del grafo.  
- **Arco con Capacità (Capacity Edge)** → connessione tra due vertici con capacità massima.  
- **Flusso (Flow)** → quantità di risorsa trasportata lungo un arco.  
- **Percorso Aumentante (Augmenting Path)** → percorso dalla sorgente al pozzo con capacità residua disponibile.  
- **Sorgente (Source)** → nodo iniziale del flusso.  
- **Pozzo / Destinazione (Sink)** → nodo finale del flusso.  

## FUNZIONAMENTO DELL'ALGORITMO

1. Inizializza il flusso di tutti gli archi a 0.  
2. Usa **BFS** per trovare il percorso aumentante più corto (minimo numero di archi) dalla sorgente alla destinazione.  
3. Determina il flusso massimo possibile lungo questo percorso (minima capacità residua).  
4. Aggiorna il flusso lungo gli archi diretti e inversi del percorso.  
5. Ripeti finché non esistono più percorsi aumentanti.  

## STRUTTURE DI SUPPORTO

- **Grafo con capacità residua** → memorizza capacità disponibili sugli archi.  
- **Coda per BFS** → utilizzata per individuare il percorso aumentante più breve.  

## COMPLESSITÀ

- Tempo → **O(V * E²)** nel caso peggiore.  
- Spazio → **O(V + E)** per memorizzare il grafo e le capacità residue.  

## ESEMPIO DI UTILIZZO

Grafo con capacità:
S → A(10), S → B(5), A → B(15), A → T(10), B → T(10)

Passaggi:
1. BFS trova percorso S-A-T → flusso = 10  
2. Aggiorna capacità residua → S-A(0), A-T(0)  
3. BFS successivo trova percorso S-B-T → flusso = 5  
4. Nessun altro percorso aumentante → algoritmo termina  

Flusso massimo = 15

## APPLICAZIONI

- **Reti di comunicazione** → massimizzare il throughput.  
- **Reti di trasporto** → flusso di merci o dati.  
- **Sistemi di gestione delle risorse** → allocazione ottimale del flusso.  

## VANTAGGI

- Garantisce percorsi aumentanti più brevi, riducendo il numero di iterazioni rispetto a DFS.  
- Complessità prevedibile **O(V * E²)**.  
- Basato su concetti intuitivi di percorsi aumentanti e capacità residua.  

## LIMITAZIONI

- Inefficiente su grafi molto grandi rispetto a versioni avanzate come Push-Relabel.  
- Richiede capacità non negative lungo gli archi.  
- Complessità dipendente da numero di archi e vertici.  

## CODICE
```typescript
import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * BFS ausiliaria per Edmonds-Karp
 * Ritorna true se esiste un percorso aumentante, aggiornando parent
 */
function bfsEK<E>(
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

                if (v === sink) return true; // trovato percorso aumentante
            }
        }
    }

    return false;
}

/**
 * Algoritmo di Edmonds-Karp per trovare il flusso massimo
 * @param graph Grafo orientato pesato
 * @param source Nodo sorgente
 * @param sink Nodo pozzo
 * @returns Flusso massimo dal source al sink
 */
export function edmondsKarp<E>(
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

    // Continua finché esistono percorsi aumentanti trovati dalla BFS
    while (bfsEK(graph, source, sink, parent, residualCapacity)) {
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
// Creazione del grafo
// =============================
const grafo = new DirectedGraph<string>();

// Aggiunta degli archi (orientati e pesati)
grafo.aggiungiArco('S', 'A', 10);
grafo.aggiungiArco('S', 'B', 5);
grafo.aggiungiArco('A', 'B', 15);
grafo.aggiungiArco('A', 'C', 10);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 10);
grafo.aggiungiArco('C', 'T', 10);
grafo.aggiungiArco('D', 'T', 10);

// Visualizza il grafo
console.log("Grafo orientato pesato:");
grafo.display();

// =============================
// Calcolo del flusso massimo
// =============================
const source = 'S';
const sink = 'T';

const flussoMassimo = edmondsKarp(grafo, source, sink);
console.log(`\nFlusso massimo da ${source} a ${sink}:`, flussoMassimo);
```
