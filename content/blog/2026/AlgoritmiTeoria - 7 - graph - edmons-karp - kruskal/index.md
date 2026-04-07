+++
title = "AlgoritmiTeoria - 7 - graph - edmons-karp - kruskal"
date = 2026-02-25T14:00:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++


# ALGORITMO: KRUSKAL

L'**algoritmo di Kruskal** è utilizzato per trovare un **albero ricoprente minimo (Minimum Spanning Tree - MST)**
in un grafo **connesso e pesato**.  
L'MST collega tutti i vertici senza formare cicli e minimizza la somma dei pesi degli archi inclusi.


## TERMINOLOGIA

- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con un peso associato.  
- **Albero Ricoprente (Spanning Tree)** → sottoinsieme di archi che collega tutti i vertici senza cicli.  
- **MST (Minimum Spanning Tree)** → albero ricoprente con somma minima dei pesi degli archi.  
- **Union-Find / Disjoint Set** → struttura dati per rilevare cicli durante l'inclusione degli archi.


## FUNZIONAMENTO DELL'ALGORITMO

1. Ordina tutti gli archi del grafo in **ordine crescente di peso**.  
2. Inizia con un grafo MST vuoto.  
3. Per ciascun arco `(u, v)` nell'ordine ordinato:
   - Se aggiungendo l'arco **non si forma un ciclo** → includilo nel MST.  
   - Altrimenti → scartalo.  
4. Ripeti fino a includere **V - 1 archi**, dove V è il numero di vertici.  


## STRUTTURE DI SUPPORTO

- **Union-Find (Disjoint Set)** → per verificare rapidamente se due vertici appartengono allo stesso sottoalbero (evita cicli).  
- **Array / Lista di archi** → per ordinare gli archi in base al peso.  


## COMPLESSITÀ

- Tempo → **O(E log E)**, principalmente per l'ordinamento degli archi.  
- Spazio → **O(V + E)** per memorizzare il grafo e le strutture ausiliarie.  


## ESEMPIO DI UTILIZZO

Grafo con archi pesati:
A - B(4), A - C(2), B - C(1), B - D(5), C - D(3)

Passaggi:
1. Ordina gli archi: B-C(1), A-C(2), C-D(3), A-B(4), B-D(5)  
2. Inizia con MST vuoto.  
3. Include archi uno ad uno senza formare cicli:  
   - B-C(1), A-C(2), C-D(3) → MST completato  

MST finale → { B-C, A-C, C-D }, costo totale = 1 + 2 + 3 = 6


## APPLICAZIONI

- Progettazione di **reti di telecomunicazione**.  
- Distribuzione efficiente di **risorse**.  
- Progettazione di **reti di trasporto** e infrastrutture.  
- Problemi di **ottimizzazione di costi** in grafi connessi.  


## VANTAGGI

- Semplice e intuitivo da implementare con Union-Find.  
- Garantisce il **MST corretto** per qualsiasi grafo connesso e pesato.  
- Funziona bene anche su grafi sparsi (low density).  


## LIMITAZIONI

- Necessita che il grafo sia **connesso**.  
- Ordinamento degli archi può diventare costoso in grafi molto densi.  
- Non adatto per grafi dinamici in cui archi vengono aggiunti/rimossi frequentemente.

## CODICE
```typescript
import { NotOrientedGraph, Edge } from "../structure/notOrientedGraph";

/**
 * Struttura Union-Find (Disjoint Set Union)
 */
class UnionFind<E> {
  private parent: Map<E, E>;
  private rank: Map<E, number>;

  constructor(elements: E[]) {
    this.parent = new Map();
    this.rank = new Map();

    for (const e of elements) {
      this.parent.set(e, e);
      this.rank.set(e, 0);
    }
  }

  find(u: E): E {
    let parentU = this.parent.get(u);
    if (!parentU) throw new Error("Elemento non presente in UnionFind");
    if (parentU !== u) {
      const root = this.find(parentU);
      this.parent.set(u, root);
      return root;
    }
    return u;
  }

  union(u: E, v: E): boolean {
    const rootU = this.find(u);
    const rootV = this.find(v);
    if (rootU === rootV) return false;

    const rankU = this.rank.get(rootU) ?? 0;
    const rankV = this.rank.get(rootV) ?? 0;

    if (rankU < rankV) {
      this.parent.set(rootU, rootV);
    } else if (rankU > rankV) {
      this.parent.set(rootV, rootU);
    } else {
      this.parent.set(rootV, rootU);
      this.rank.set(rootU, rankU + 1);
    }
    return true;
  }
}

/**
 * Algoritmo di Kruskal esterno
 * @param graph Grafo non orientato pesato
 * @returns Array di Edge<E> che rappresentano l'MST
 */
function kruskal<E>(graph: NotOrientedGraph<E>): { from: E; to: E; weight: number }[] {
  const edges = graph.getEdges(); // Archi {from, to, weight}
  const vertices = graph.getVertices(); // Tutti i vertici

  // Ordina archi per peso crescente
  edges.sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind<E>(vertices);
  const mst: { from: E; to: E; weight: number }[] = [];

  for (const edge of edges) {
    if (uf.union(edge.from, edge.to)) {
      mst.push(edge);
    }
  }

  return mst;
}

// =============================
// Esempio di utilizzo
// =============================
const grafo = new NotOrientedGraph<string>();
grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 5);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 3);
grafo.aggiungiArco('C', 'E', 6);
grafo.aggiungiArco('D', 'E', 7);

grafo.display();

const mst = kruskal<string>(grafo);
console.log("Albero Ricoprente Minimo (MST):", mst);
```
