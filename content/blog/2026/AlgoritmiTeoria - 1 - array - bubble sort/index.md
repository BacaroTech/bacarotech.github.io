+++
title = "AlgoritmiTeoria - 1 - array - bubble sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## sort/bubblesort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: BUBBLE SORT
──────────────────────────────
Il Bubble Sort è un algoritmo di ordinamento semplice che riordina un
array confrontando ripetutamente coppie di elementi adiacenti e
scambiandoli se sono nell'ordine sbagliato.  
Il processo continua finché l'array non risulta ordinato.

Visualizzazione:  
https://en.wikipedia.org/wiki/Bubble_sort#/media/File:Bubble-sort-example-300px.gif

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Vuoi un algoritmo di ordinamento **semplice da comprendere e implementare**.
- Stai lavorando con array di piccole dimensioni.
- Vuoi un algoritmo didattico per introdurre i concetti di ordinamento.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si confrontano due elementi consecutivi:
   - **Se il primo ≤ il secondo**, non si fa nulla.
	 Esempio: (1, 3) → (1, 3)
   - **Se il primo > il secondo**, si scambiano.
	 Esempio: (3, 2) → (2, 3)
2. Questo confronto viene fatto per tutte le coppie di elementi.
3. Una scansione completa dell'array si chiama **passata**.
4. Alla fine di ogni passata, l'elemento più grande "scivola" in fondo
   all'array, nella sua posizione definitiva.
5. L'algoritmo termina quando una passata non esegue alcuno scambio.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l'array ordinato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n)  
  (quando l'array è già ordinato, basta una sola passata).
- **Caso medio:** O(n²)  
  (numerosi scambi distribuiti tra le passate).
- **Caso peggiore:** O(n²)  
  (array ordinato al contrario, massimo numero di scambi).

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **semplice ma inefficiente** per array grandi.
- È stabile (non cambia l'ordine relativo di elementi uguali).
- Non è adatto a contesti pratici di ordinamento su grandi dataset.
*/

/**
 * Ordina l'array seguendo le logiche del bubbleSort
 * @param arr array da ordinare
 * @returns array ordinato
 */
function bblSort(arr: number[]): number[] {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] && arr[j + 1] && arr[j]! > arr[j + 1]!) {
				const temp: number = arr[j]!;
				arr[j] = arr[j + 1]!;
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}

// Test sort
const arr = [234, 43, 55, 63, 5, 6, 235, 547];
console.log("TEST DEL BUBBLESORT");
console.log("Pre ordinamento:", arr);
const sorted = bblSort(arr)
console.log("Post ordinamento:", sorted);

```
