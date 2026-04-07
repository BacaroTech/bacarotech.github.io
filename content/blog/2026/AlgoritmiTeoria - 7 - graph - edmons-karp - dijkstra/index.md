+++
title = "AlgoritmiTeoria - 7 - graph - edmons-karp - dijkstra"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++


# ALGORITMO: DIJKSTRA

L'**algoritmo di Dijkstra** calcola i percorsi minimi da un nodo sorgente a tutti gli altri nodi
in un **grafo orientato o non orientato pesato**, con pesi **non negativi**.  
È uno degli algoritmi fondamentali per il calcolo di percorsi minimi in informatica e nelle reti.


## PRECONDIZIONI

- Il grafo può essere orientato o non orientato.  
- I pesi degli archi devono essere **non negativi**.  
- Non gestisce correttamente grafi con archi a peso negativo (per quelli serve Bellman-Ford).


## TERMINOLOGIA

- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con peso associato.  
- **Distanza** → costo cumulativo minimo dal nodo sorgente a un nodo.  
- **Predecessore (Parent/Predecessor)** → nodo precedente lungo il percorso minimo.  
- **Coda di Priorità (Priority Queue / Min-Heap)** → struttura utilizzata per selezionare il nodo con distanza minima.


## OPERAZIONI PRINCIPALI

- `aggiungiVertice(v)` → inserisce un nuovo vertice nel grafo.  
- `aggiungiArco(v1, v2, peso)` → aggiunge un arco orientato o non orientato con peso.  
- `dijkstra(start)` → calcola i percorsi minimi dal nodo sorgente `start` a tutti gli altri nodi, restituendo:
  - le **distanze minime**  
  - i **predecessori** per ricostruire i percorsi.


## RAPPRESENTAZIONE

- **Lista di adiacenza con pesi**:  
  Esempio → `{ A: [{node: B, peso: 4}, {node: C, peso: 2}], B: [{node: C, peso: 5}], ... }`  


## FUNZIONAMENTO DELL'ALGORITMO

1. Inizializza tutte le distanze a **∞**, eccetto il nodo sorgente (distanza = 0).  
2. Inserisci tutti i nodi in una **coda di priorità** basata sulla distanza minima.  
3. Finché la coda non è vuota:
   - Estrai il nodo con distanza minima.  
   - Aggiorna le distanze dei suoi vicini se si trova un percorso più corto.  
   - Aggiorna i predecessori dei vicini per tracciare il percorso minimo.  
4. Al termine, si ottengono:
   - la **distanza minima** da sorgente a ogni nodo  
   - il **cammino più breve** ricostruibile seguendo i predecessori.


## COMPLESSITÀ

- Inserimento vertice → **O(1)**  
- Inserimento arco → **O(1)**  
- Calcolo percorso minimo:
  - Con **min-heap / coda di priorità** → **O(V + E log V)**  
  - Con semplice array → **O(V^2)**  


## ESEMPIO DI USCITA

Grafo:
A -> B(4), C(2)
B -> C(5), D(10)
C -> D(3), E(4)
D -> E(7)
E -> 

Distanze minime da A: { A: 0, B: 4, C: 2, D: 5, E: 6 }  
Predecessori: { A: null, B: 'A', C: 'A', D: 'C', E: 'C' }  

Percorso minimo da A a E: **A → C → E**, costo 6.


## APPLICAZIONI

- Reti stradali e navigazione GPS.  
- Routing nei protocolli di rete (es. OSPF).  
- Pianificazione dei percorsi in sistemi di trasporto.  
- Problemi di logistica e distribuzione.  


## NOTE

- Adatto **solo a pesi non negativi**.  
- Per grafi con pesi negativi → usare **Bellman-Ford**.  
- La scelta della struttura dati per la coda di priorità influisce direttamente sulle prestazioni.  
- Supporta sia grafi orientati che non orientati.  
- Può essere esteso per trovare percorsi minimi verso un singolo nodo o verso tutti i nodi.

## CODICE
```typescript
import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * Trova il nodo non visitato con distanza minima
 */
function minDistanza<E>(
    distanze: Record<string, number>,
    visitati: Set<string>
): string | null {
    let min = Infinity;
    let minNode: string | null = null;

    for (const node in distanze) {
        if (!visitati.has(node) && distanze[node] < min) {
            min = distanze[node];
            minNode = node;
        }
    }

    return minNode;
}

/**
 * Algoritmo di Dijkstra esterno
 * @param graph Grafo orientato pesato
 * @param start Nodo sorgente
 * @returns Oggetto contenente distanze minime e predecessori
 */
export function dijkstra<E>(
    graph: DirectedGraph<E>,
    start: string
): { distanze: Record<string, number>; predecessori: Record<string, string | null> } {
    const distanze: Record<string, number> = {};
    const predecessori: Record<string, string | null> = {};
    const visitati = new Set<string>();

    const adjacencyList = graph.getAdjacencyList(); // Map<E, Edge<E>[]>

    // Inizializzazione
    for (const [vertice] of adjacencyList) {
        const key = String(vertice);
        distanze[key] = Infinity;
        predecessori[key] = null;
    }
    distanze[start] = 0;

    while (visitati.size < adjacencyList.size) {
        const nodoCorrente = minDistanza(distanze, visitati);
        if (!nodoCorrente) break;

        visitati.add(nodoCorrente);

        const edges = adjacencyList.get(nodoCorrente as unknown as E) ?? [];
        for (const edge of edges) {
            const targetKey = String(edge.nodo);
            const nuovaDistanza = distanze[nodoCorrente] + edge.peso;
            if (nuovaDistanza < distanze[targetKey]) {
                distanze[targetKey] = nuovaDistanza;
                predecessori[targetKey] = nodoCorrente;
            }
        }
    }

    return { distanze, predecessori };
}

// =============================
// Esempio di utilizzo
// =============================
const graph = new DirectedGraph<string>();

graph.aggiungiArco('A', 'B', 4);
graph.aggiungiArco('A', 'C', 2);
graph.aggiungiArco('B', 'C', 5);
graph.aggiungiArco('B', 'D', 10);
graph.aggiungiArco('C', 'D', 3);
graph.aggiungiArco('D', 'E', 7);
graph.aggiungiArco('C', 'E', 4);

graph.display();

const risultato = dijkstra<string>(graph, 'A');
console.log('Distanze minime da A:', risultato.distanze);
console.log('Predecessori:', risultato.predecessori);
```
