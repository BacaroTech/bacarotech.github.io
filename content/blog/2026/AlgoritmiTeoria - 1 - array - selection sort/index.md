+++
title = "AlgoritmiTeoria - 1 - array - selection sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## sort/selectionsort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: SELECTION SORT
──────────────────────────────
Il Selection Sort è un algoritmo di ordinamento semplice che funziona
selezionando ripetutamente il **minimo elemento** da un sotto-array non
ordinato e scambiandolo con il primo elemento non ordinato.  
Ripetendo questo processo, l'array diventa ordinato.

Visualizzazione:  
https://en.wikipedia.org/wiki/Selection_sort#/media/File:Selection-Sort-Animation.gif

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- L'array è di piccole dimensioni.
- Vuoi un algoritmo semplice da implementare.
- Non hai necessità di stabilità nell'ordinamento.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si individua l'elemento minimo nell'array o sotto-array corrente.
2. Si scambia il minimo con il primo elemento non ordinato.
3. Si ripete la procedura sul sotto-array che va dalla posizione successiva
   fino alla fine dell'array.
4. L'array è ordinato quando tutti gli elementi sono stati posizionati.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l'array ordinato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n²)  
- **Caso medio:** O(n²)  
- **Caso peggiore:** O(n²)  

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **non stabile** (l'ordine relativo degli elementi uguali può cambiare).  
- Funziona bene su array piccoli ma inefficiente su array grandi.  
- Ha il vantaggio di fare un numero minimo di scambi rispetto ad altri algoritmi O(n²).
*/

/**
 * Ordina l'array seguendo le logiche del selectionSort
 * @param arr array da ordinare
 * @returns array ordinato
 */
function selectionSort(arr: number[]): number[] {
	const arrToSort = [...arr]; // copia locale
	const n = arrToSort.length;

	for (let i = 0; i < n; i++) {
		let min = i;
		for (let j = i + 1; j < n; j++) {
			if (arrToSort[j] && arrToSort[min] && arrToSort[j]! < arrToSort[min]!) {
				min = j;
			}
		}
		if (min !== i && arrToSort[i] && arrToSort[min]) {
			const tmp = arrToSort[i]!;
			arrToSort[i] = arrToSort[min]!;
			arrToSort[min] = tmp;
		}
	}

	return arrToSort;
}

// Test sort
let arr: number[] = [234, 43, 55, 63, 5, 6, 235, 547];
console.log("TEST DEL SELECTIONSORT");
console.log("Pre ordinamento:", arr);
const sorted = selectionSort(arr);
console.log("Post ordinamento:", sorted);
```
