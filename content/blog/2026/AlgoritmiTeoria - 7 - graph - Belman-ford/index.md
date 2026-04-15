+++
title = "AlgoritmiTeoria - 7 - graph - belman-ford"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: BELLMAN-FORD

L'**algoritmo di Bellman-Ford** calcola i percorsi minimi da un nodo sorgente a tutti gli altri nodi
in un **grafo orientato o non orientato pesato**, anche con **archi a peso negativo**, 
a condizione che non siano presenti cicli negativi raggiungibili dalla sorgente.

## PRECONDIZIONI

- Il grafo può contenere archi con **peso negativo**.  
- Non devono esserci **cicli negativi** raggiungibili dalla sorgente.  
- Funziona su grafi orientati e non orientati pesati.  

## TERMINOLOGIA

- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con un peso (positivo o negativo).  
- **Distanza** → costo cumulativo minimo dal nodo sorgente a un nodo.  
- **Predecessore (Parent/Predecessor)** → nodo precedente lungo il percorso minimo.  
- **Rilassamento (Relaxation)** → operazione che aggiorna la distanza di un nodo se si trova un percorso più corto.

## OPERAZIONI PRINCIPALI

- `aggiungiVertice(v)` → inserisce un nuovo vertice nel grafo.  
- `aggiungiArco(v1, v2, peso)` → aggiunge un arco orientato o non orientato con peso.  
- `bellmanFord(start)` → calcola i percorsi minimi dal nodo sorgente `start` a tutti gli altri nodi, restituendo:
  - le **distanze minime**  
  - i **predecessori** per ricostruire i percorsi.  
- Rileva **cicli negativi**: se dopo |V|-1 rilassamenti un arco può ancora essere rilassato, esiste un ciclo negativo raggiungibile dalla sorgente.

## FUNZIONAMENTO DELL'ALGORITMO

1. Inizializza tutte le distanze a **∞**, eccetto il nodo sorgente (distanza = 0).  
2. Ripeti **|V| - 1 volte** (dove |V| è il numero di vertici):
   - Per ogni arco `(u, v)` con peso `w`:  
     - Se `distanza[u] + w < distanza[v]` → aggiorna `distanza[v]` e imposta `u` come predecessore.  
3. Controlla tutti gli archi una volta in più per rilevare eventuali cicli negativi.  
4. Al termine:
   - le **distanze minime** sono corrette se non ci sono cicli negativi.  
   - è possibile ricostruire i percorsi minimi seguendo i predecessori.

## COMPLESSITÀ

- Tempo → **O(V * E)**  
- Spazio → **O(V)** per memorizzare distanze e predecessori  

## ESEMPIO DI USCITA

Grafo:
A -> B(4), C(2)
B -> C(-1), D(5)
C -> D(3), E(4)
D -> E(7)
E -> 

Distanze minime da A: { A: 0, B: 4, C: 2, D: 5, E: 6 }  
Predecessori: { A: null, B: 'A', C: 'A', D: 'C', E: 'C' }  

Percorso minimo da A a E: **A → C → E**, costo 6.

## APPLICAZIONI

- Reti di telecomunicazione con costi variabili.  
- Calcolo di percorsi minimi in grafi con pesi negativi.  
- Rilevamento di cicli negativi nei grafi.  
- Pianificazione di percorsi e analisi di dipendenze complesse.  

## VANTAGGI

- Gestisce archi con pesi negativi.  
- Rileva cicli negativi.  
- Funziona su grafi orientati e non orientati pesati.  

## LIMITAZIONI

- Più lento di Dijkstra per grafi senza pesi negativi (O(V*E) vs O(V+E log V)).  
- Non può essere utilizzato se esistono cicli negativi raggiungibili dalla sorgente.  

## NOTE

- Adatto per scenari in cui i pesi degli archi possono essere negativi.  
- La struttura dati utilizzata può essere semplice (array/lista) poiché l'algoritmo visita tutti gli archi ripetutamente.  
- Può essere combinato con Dijkstra per ottimizzazioni in grafi misti.

## CODICE
```typescript
import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * Algoritmo di Bellman-Ford esterno
 * @param graph Grafo orientato pesato (può avere pesi negativi, ma non cicli negativi)
 * @param start Nodo sorgente
 * @returns Oggetto contenente distanze minime e predecessori, o null se ciclo negativo rilevato
 */
export function bellmanFord<E>(
    graph: DirectedGraph<E>,
    start: string
): { distanze: Record<string, number>; predecessori: Record<string, string | null> } | null {
    const distanze: Record<string, number> = {};
    const predecessori: Record<string, string | null> = {};

    const adjacencyList = graph.getAdjacencyList(); // Map<E, Edge<E>[]>

    // Inizializzazione
    for (const [vertice] of adjacencyList) {
        const key = String(vertice);
        distanze[key] = Infinity;
        predecessori[key] = null;
    }
    distanze[start] = 0;

    const vertices = Array.from(adjacencyList.keys());

    // Relaxation |V|-1 volte
    for (let i = 0; i < vertices.length - 1; i++) {
        for (const [u] of adjacencyList) {
            const uKey = String(u);
            const edges = adjacencyList.get(u) ?? [];
            for (const edge of edges) {
                const vKey = String(edge.nodo);
                if (distanze[uKey] + edge.peso < distanze[vKey]) {
                    distanze[vKey] = distanze[uKey] + edge.peso;
                    predecessori[vKey] = uKey;
                }
            }
        }
    }

    // Verifica cicli negativi
    for (const [u] of adjacencyList) {
        const uKey = String(u);
        const edges = adjacencyList.get(u) ?? [];
        for (const edge of edges) {
            const vKey = String(edge.nodo);
            if (distanze[uKey] + edge.peso < distanze[vKey]) {
                console.error("Grafo contiene un ciclo negativo!");
                return null;
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

const risultato = bellmanFord<string>(graph, 'A');
if (risultato) {
    console.log('Distanze minime da A:', risultato.distanze);
    console.log('Predecessori:', risultato.predecessori);
} else {
    console.log('Grafo contiene un ciclo negativo.');
}
```
