+++
title = "AlgoritmiTeoria - 7 - graph - prim"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: PRIM

L'**algoritmo di Prim** è utilizzato per trovare un **albero ricoprente minimo (Minimum Spanning Tree - MST)**
in un grafo **connesso e pesato**.  
L'MST collega tutti i vertici senza formare cicli e minimizza la somma dei pesi degli archi inclusi.

## TERMINOLOGIA

- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con un peso associato.  
- **Albero Ricoprente (Spanning Tree)** → sottoinsieme di archi che collega tutti i vertici senza cicli.  
- **MST (Minimum Spanning Tree)** → albero ricoprente con somma minima dei pesi degli archi.  
- **Nodo Visitato / Non Visitato** → stato dei vertici durante l'esecuzione dell'algoritmo.  

## FUNZIONAMENTO DELL'ALGORITMO

1. Scegli un nodo sorgente e aggiungilo al MST.  
2. Seleziona l'**arco più leggero** che connette un nodo del MST con un nodo **non ancora incluso**.  
3. Aggiungi il nodo collegato al MST e marca come visitato.  
4. Ripeti fino a includere tutti i nodi.  

## STRUTTURE DI SUPPORTO

- **Coda di priorità (Min-Heap)** → per selezionare rapidamente l'arco di peso minimo.  
- **Array / Lista di adiacenza** → per memorizzare il grafo pesato.  

## COMPLESSITÀ

- Tempo → **O(E log V)** con coda di priorità.  
- Spazio → **O(V + E)** per memorizzare il grafo e le strutture ausiliarie.  

## ESEMPIO DI UTILIZZO

Grafo con archi pesati:
A - B(4), A - C(2), B - C(1), B - D(5), C - D(3)

Passaggi:
1. Partenza da A → aggiungi A al MST.  
2. Seleziona arco più leggero tra quelli che collegano MST a nodi non visitati → A-C(2).  
3. Include C → aggiornamento archi candidati: C-B(1), C-D(3).  
4. Include B (arco B-C) → aggiornamento archi candidati: B-D(5).  
5. Include D (arco C-D) → MST completato.  

MST finale → { A-C, C-B, C-D }, costo totale = 2 + 1 + 3 = 6

## APPLICAZIONI

- Progettazione di **reti di comunicazione**.  
- Progettazione di **circuiti elettrici** e infrastrutture.  
- Reti di **distribuzione di energia o dati**.  
- Problemi di **ottimizzazione dei costi** in grafi connessi.  

## VANTAGGI

- Seleziona sempre l'arco più leggero disponibile → MST corretto.  
- Efficienza elevata su grafi densi o sparsi con coda di priorità.  
- Non richiede l'ordinamento iniziale di tutti gli archi (a differenza di Kruskal).  

## LIMITAZIONI

- Necessita che il grafo sia **connesso**.  
- La gestione della coda di priorità può aggiungere complessità implementativa.  
- Più efficiente su grafi con vertici numerosi e densità variabile rispetto a Kruskal nei grafi sparsi.  

## CODICE
```typescript
import { NotOrientedGraph, Edge } from "../structure/notOrientedGraph";

/**
 * Algoritmo di Prim per trovare l'albero ricoprente minimo (MST)
 * @param graph Grafo non orientato pesato
 * @param start Nodo di partenza
 * @returns Array di archi MST: { from, to, weight }
 */
function prim<E>(
    graph: NotOrientedGraph<E>,
    start: E
): { from: E; to: E; weight: number }[] {
    const visited = new Set<E>();
    const mst: { from: E; to: E; weight: number }[] = [];
    const edgesQueue: { from: E; to: E; weight: number }[] = [];

    visited.add(start);

    // Inserisco tutti gli archi del nodo di partenza
    for (const edge of graph.getAdjacencyList()[String(start)] || []) {
        edgesQueue.push({ from: start, to: edge.node, weight: edge.weight });
    }

    // Min-heap semplice tramite ordinamento array
    while (visited.size < graph.getVertices().length && edgesQueue.length > 0) {
        // Ordina per peso crescente
        edgesQueue.sort((a, b) => a.weight - b.weight);
        const smallestEdge = edgesQueue.shift()!;
        if (visited.has(smallestEdge.to)) continue;

        // Aggiungi arco all'MST
        mst.push(smallestEdge);
        visited.add(smallestEdge.to);

        // Aggiungi tutti gli archi del nuovo nodo visitato
        for (const edge of graph.getAdjacencyList()[String(smallestEdge.to)] || []) {
            if (!visited.has(edge.node)) {
                edgesQueue.push({ from: smallestEdge.to, to: edge.node, weight: edge.weight });
            }
        }
    }

    return mst;
}

const grafo = new NotOrientedGraph<string>();

grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 5);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 3);
grafo.aggiungiArco('C', 'E', 6);
grafo.aggiungiArco('D', 'E', 7);

// Visualizza grafo
console.log("Grafo:");
grafo.display();

// Esecuzione algoritmo di Prim partendo dal nodo 'A'
const mst = prim(grafo, 'A');
console.log("\nAlbero Ricoprente Minimo (MST) con Prim:");
mst.forEach(edge => {
    console.log(`${edge.from} - ${edge.to} : peso ${edge.weight}`);
});
```
