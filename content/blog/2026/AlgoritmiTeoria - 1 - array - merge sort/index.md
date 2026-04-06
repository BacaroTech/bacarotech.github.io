+++
title = "AlgoritmiTeoria - 1 - array - merge sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## sort/mergesort.ts



# ALGORITMO: MERGE SORT

Il Merge Sort è un algoritmo di ordinamento basato sul paradigma
**Divide et Impera**.  
Divide ricorsivamente l'array in parti sempre più piccole, le ordina e
poi le ricompone fino a ottenere l'array ordinato completo.

Visualizzazione:  
https://it.wikipedia.org/wiki/Merge_sort#/media/File:Merge_sort_animation2.gif


## QUANDO USARLO

- L'array è di **grandi dimensioni**.
- Vuoi un algoritmo **stabile** e con complessità garantita O(n log n).
- È utile quando serve un ordinamento prevedibile, indipendente dalla disposizione iniziale dei dati.


## FUNZIONAMENTO

1. **Divisione:**  
   - L'array viene suddiviso ricorsivamente in due metà fino a ottenere
	 micro-array di un solo elemento.
2. **Ricombinazione ordinata (Merge):**  
   - Due micro-array vengono uniti confrontando i loro elementi e
	 inserendoli in ordine crescente in un array temporaneo.
   - Questo processo si ripete risalendo la ricorsione, fino a
	 ricomporre l'intero array ordinato.


## OUTPUT

- Restituisce l'array ordinato sfruttando dei sottoarray


## COMPLESSITÀ

- **Caso migliore:** O(n log n)  
- **Caso medio:** O(n log n)  
- **Caso peggiore:** O(n log n)  

Nota di merito alla complessità spaziale aggiuntiva, che in questo caso è O(n) in quanto ho bisogno di un array di supporto grande quanto quello di input 

## NOTE

- È un algoritmo **stabile**.
- Richiede **memoria aggiuntiva** proporzionale alla dimensione dell'array.
- Particolarmente efficiente su array grandi e distribuzioni casuali.

## CODICE
```typescript
/**
 * Funzione ausiliaria merge che permette di combinare 2 array ordinati
 * @param left primo array da combinare
 * @param right secondo array da combinare
 * @returns array ordinato e combinato
 */
function merge(left: number[], right: number[]): number[] {
	const sortedArr: number[] = [];
	let i = 0, j = 0;

	while (i < left.length && j < right.length) {
		if(left[i] && right[j]){
			if (left[i]! < right[j]!) {
				sortedArr.push(left[i]!);
				i++;
			} else {
				sortedArr.push(right[j]!);
				j++;
			}
		}
	}

	// Aggiungi i restanti elementi
	return [...sortedArr, ...left.slice(i), ...right.slice(j)];
}

/**
 * Ordina l'array seguendo le logiche del mergeSort
 * @param arr array da ordinare
 * @returns array ordinato
 */
function mergeSort(arr: number[]): number[] {
	if (arr.length <= 1) return arr;

	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

// Test
const arr: number[] = [3, 5, 8, 5, 99, 1];
console.log("TEST DEL MERGESORT");
console.log("Pre ordinamento:", arr);
const sorted = mergeSort(arr);
console.log("Post ordinamento:", sorted);

```
