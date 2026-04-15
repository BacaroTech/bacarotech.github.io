+++
title = "AlgoritmiTeoria - 1 - array - binary search"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: RICERCA BINARIA
La ricerca binaria è un algoritmo che consente di verificare se un
elemento è presente all'interno di un array ordinato.
Funziona dividendo progressivamente l'array a metà fino a trovare
l'elemento cercato o determinare che non esiste.

## QUANDO USARLO
- Vuoi cercare un elemento in un array **ordinato** (crescente o decrescente).
- Vuoi ridurre i tempi di ricerca rispetto alla scansione sequenziale.
- Vuoi un algoritmo efficiente con complessità logaritmica.

## FUNZIONAMENTO
1. Si considerano gli estremi dell'array (inizialmente 0 e n-1).
2. Si calcola l'indice dell'elemento centrale.
3. Si confronta l'elemento centrale con quello da cercare:
- **Se uguale**, restituisce la posizione.
- **Se maggiore**, si ripete la ricerca nella prima metà.
- **Se minore**, si ripete la ricerca nella seconda metà.
4. Il processo continua fino a trovare l'elemento o esaurire l'array.

## OUTPUT
- Restituisce la posizione (tra 0 e n-1) se l'elemento è presente.
- Restituisce `-1` se l'elemento non è stato trovato.

## COMPLESSITÀ
**Caso peggiore:** O(log n) 
a ogni passo la dimensione del problema si dimezza.

## CODICE
```typescript
/**
 * Ricerca di un elmento all'interno dell'array tramite binary search
 * @param arr array sul quale dobbiamo fare la ricerca
 * @param x elemento da cercare
 * @param start estremo sinistro della ricerca, all'inizio deve essere 0
 * @param end estremo destro della ricerca, all'inizio deve essere lunghezza dell'array - 1
 * @returns posizione dell'elemento all'interno dell'array se esiste, altrimenti -1
 */
function binarySearch(arr: number[], x: number, start: number, end: number): number {
	// Base Condition
	if (start > end)
		return -1;

	// Find the middle index
	let mid: number = Math.floor((start + end) / 2);

	// Compare mid with given key x
	if (arr[mid] === x)
		return mid;

	// If element at mid is greater than x,
	// search in the left half of mid
	if (arr[mid]) {
		if (arr[mid] > x) {
			return binarySearch(arr, x, start, mid - 1);
		} else {
			// If element at mid is smaller than x,
			// search in the right half of mid
			return binarySearch(arr, x, mid + 1, end);
		}
	} else {
		return -1;
	}
}

let arr = [1, 3, 5, 7, 8, 9];
console.log("Visualizza array:", arr);
console.log("Ricerca all'interno dell'array dell'elemento 5 con ricerca binaria, indice:", binarySearch(arr, 5, 0, arr.length - 1));
console.log("Ricerca all'interno dell'array dell'elemento 12 con ricerca binaria, indice:", binarySearch(arr, 12, 0, arr.length - 1)); 
```
