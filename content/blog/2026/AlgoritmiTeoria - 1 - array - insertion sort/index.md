+++
title = "AlgoritmiTeoria - 1 - array - insertion sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## sort/insertionsort.ts

```typescript
/*

  ALGORITMO: INSERTION SORT

L'Insertion Sort è un algoritmo di ordinamento semplice e intuitivo, che
costruisce progressivamente una parte ordinata dell'array inserendo ogni
nuovo elemento nella posizione corretta.  
Funziona in modo simile al processo di ordinare manualmente le carte da
gioco in mano.

Visualizzazione:  
https://it.wikipedia.org/wiki/Insertion_sort#/media/File:Sorting_insertion_sort_anim.gif


  QUANDO USARLO

- L'array ha **piccole dimensioni** o è già **quasi ordinato**.
- Vuoi un algoritmo semplice da implementare e stabile.
- È utile come parte di algoritmi più complessi (es. **Shell Sort**).


  FUNZIONAMENTO

1. Si assume che il primo elemento sia già ordinato.
2. Per ogni elemento successivo (dal secondo fino all'ultimo):
   - Si confronta l'elemento con quelli nella parte ordinata.
   - Se l'elemento è maggiore del massimo ordinato → viene posto in
	 fondo alla parte ordinata.
   - Altrimenti, si spostano (shift) gli elementi più grandi di lui per
	 fare spazio e inserirlo nella posizione corretta.
3. La parte ordinata cresce progressivamente di un elemento per volta,
   fino a includere l'intero array.


  OUTPUT

- Restituisce l'array ordinato.


  COMPLESSITÀ

- **Caso migliore:** O(n)  
  (array già ordinato → basta un confronto per elemento).
- **Caso medio:** O(n²)  
  (inserimenti distribuiti con vari spostamenti).
- **Caso peggiore:** O(n²)  
  (array ordinato in senso opposto, massimo numero di spostamenti).


  NOTE

- È un algoritmo **stabile** (mantiene l'ordine relativo di elementi uguali).
- Funziona bene su insiemi **piccoli o quasi ordinati**.
- Per array grandi non è efficiente rispetto a QuickSort, MergeSort, ecc.
*/

/**
 * Ordina l'array seguendo le logiche del insertionSort
 * @param arr array da ordinare
 * @returns array ordinato
 */
function insertionSort(arr: number[]): number[] {
	for (let i = 1; i < arr.length; i++) {
		const key = arr[i]!;
		let j = i - 1;

		// Sposta gli elementi maggiori di "key" una posizione avanti
		while (j >= 0 && arr[j] && arr[j]! > key) {
			arr[j + 1] = arr[j]!;
			j = j - 1;
		}
		arr[j + 1] = key;
	}
	return arr;
}

// Test sort
const arr = [12, 11, 13, 5, 6];
console.log("TEST DELL'INSERTIONSORT");
console.log("Pre ordinamento:", arr);
const sorted = insertionSort(arr);
console.log("Post ordinamento:", sorted);
```
