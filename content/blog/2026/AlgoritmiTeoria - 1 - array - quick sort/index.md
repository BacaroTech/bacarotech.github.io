+++
title = "AlgoritmiTeoria - 1 - array - quick sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: QUICK SORT

Il Quick Sort è un algoritmo di ordinamento **Divide et Impera** che
suddivide ricorsivamente l'array intorno a un elemento chiamato **pivot**.  
Gli elementi minori del pivot vengono posizionati a sinistra, quelli
maggiori a destra, e il processo viene ripetuto su entrambe le sotto-sezioni.

Visualizzazione:  
https://en.wikipedia.org/wiki/Quicksort#/media/File:Sorting_quicksort_anim.gif


## QUANDO USARLO

- Vuoi un algoritmo di ordinamento **rapido** e con buona performance media.
- L'array è di grandi dimensioni.
- Puoi tollerare casi peggiori rari (O(n²)) con scelte di pivot non ottimali.
- È utile quando serve un algoritmo in-place (senza array aggiuntivi significativi).


## FUNZIONAMENTO

1. **Scelta del pivot:**  
   - Si seleziona un elemento dell'array (spesso primo, ultimo o centrale).
2. **Partizionamento:**  
   - Gli elementi minori del pivot vengono spostati a sinistra.
   - Gli elementi maggiori del pivot vengono spostati a destra.
   - Il pivot viene posizionato nella sua posizione finale.
3. **Ricorsione:**  
   - La procedura viene applicata ricorsivamente alla sotto-sezione sinistra e destra del pivot.
4. L'array diventa ordinato quando tutte le sotto-sezioni sono ordinate.


## OUTPUT

- Restituisce l'array ordinato come **side effect** (modifica in-place).


## COMPLESSITÀ

- **Caso migliore:** O(n log n)  
  (pivot divide sempre in modo bilanciato).
- **Caso medio:** O(n log n)  
- **Caso peggiore:** O(n²)  
  (pivot scelto male, ad esempio array già ordinato e pivot sempre massimo/minimo).


## NOTE

- È un algoritmo **non stabile** (l'ordine relativo di elementi uguali può cambiare).  
- Molto efficiente in media e con poca memoria aggiuntiva.  
- L'uso di strategie di pivot migliori (es. pivot casuale) riduce il rischio di caso peggiore.

## CODICE
```typescript
/**
 * Funzione ausiliaria del quickSort per individuare e posizionare correttamente il pivot
 * @param arr array da ordinare
 * @param low estremo sx dell'array
 * @param high estremo dx dell'array
 * @returns la posizione del pivot una volta ordinato
 */
function partition(arr: any, low: number, high: number): number {
	const pivot = arr[high]; // pivot finale
	let i = low - 1;

	for (let j = low; j <= high - 1; j++) {
		if (arr[j] < pivot) { // nessun !
			i++;
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}

	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
	return i + 1;
}

/**
 * Ordina l'array seguendo le logiche del quickSort
 * @param arr array da ordinare
 * @param low estremo sx dell'array, valore di partenza 0
 * @param high estremo dx dell'array, valore di partenza "dimensione dell'array - 1"
 * @returns array ordinato
 */
function quickSort(arr: number[], low: number, high: number): number[] {
	if (low < high) {
		const pi = partition(arr, low, high);
		quickSort(arr, low, pi - 1);
		quickSort(arr, pi + 1, high);
		return arr;
	} else {
		return [];
	}
}

// Test
const arr = [10, 7, 8, 9, 1, 5];
console.log("TEST DEL QUICKSORT");
console.log("Pre ordinamento:", arr);
const sorted = quickSort(arr, 0, arr.length - 1);
console.log("Post ordinamento:", sorted);

```
