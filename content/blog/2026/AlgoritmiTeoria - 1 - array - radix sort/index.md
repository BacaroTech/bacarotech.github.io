+++
title = "AlgoritmiTeoria - 1 - array - radix sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: RADIX SORT

Il Radix Sort è un algoritmo di ordinamento **non basato sui confronti** che
ordina i numeri considerando le loro cifre, dalla meno significativa
alla più significativa (LSD – Least Significant Digit).  
È molto efficiente quando gli elementi hanno un numero limitato di cifre.

Visualizzazione:  
https://it.wikipedia.org/wiki/Radix_sort#/media/File:Radix.JPG

## QUANDO USARLO

- Gli elementi sono **numeri interi non negativi**.
- Le cifre dei numeri si trovano in un intervallo limitato **[0, K]**.
- Vuoi un ordinamento stabile e più efficiente di O(n log n) per insiemi di numeri con range limitato.
- Utile come base per algoritmi più complessi di ordinamento di grandi dataset.

## FUNZIONAMENTO

1. Si considerano tutti i numeri dell'array.
2. Si ordina ogni numero **cifra per cifra**, partendo dalla cifra meno significativa (unità) fino alla più significativa:
   - Esempio: Array iniziale: 142, 456, 228  
	 - Passo 1: ordino le cifre meno significative → 142, 228, 456  
	 - Passo 2: ordino le cifre successive → 142, 228, 456  
	 - Passo 3: ordino le cifre più significative → 142, 228, 456
3. Dopo l'ultima iterazione, l'array risulta completamente ordinato.

## OUTPUT

- Restituisce l'array ordinato in modo **stabile**.

## COMPLESSITÀ

- **Caso migliore:** O(m(n + K))  
- **Caso medio:** O(m(n + K))  
- **Caso peggiore:** O(m(n + K))  
  Dove:  
  - m = numero di elementi nell'array  
  - n = numero di cifre di ciascun elemento  
  - K = valore massimo possibile delle cifre

## NOTE

- È un algoritmo **stabile**, quindi mantiene l'ordine relativo di elementi uguali.
- Non utilizza confronti diretti tra numeri.
- Particolarmente efficiente per grandi array di numeri con cifre limitate.

## CODICE
```typescript
/**
 * Calcola la cifra di un numero in una certa posizione
 * @param num numero di partenza
 * @param place posizione di cui si vuole sapere la cifra
 * @returns la cifra in posizione "place" del numero "num"
 */
function getDigit(num: number, place: number) {
	return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
}

/**
 * Calcola il numero di cifre totali di un numero
 * @param num numero di partenza
 * @returns totale delle cifre del numero "num"
 */
function digitCount(num: number) {
	if (num === 0) return 1
	return Math.floor(Math.log10(Math.abs(num))) + 1
}

/**
 * Calcola quall'è il numero con piu cifre in assoluto di un array
 * @param nums array di numeri
 * @returns quante cifre ha il numero con più cifre all'interno di "nums"
 */
function mostDigits(nums: number[]) {
	let maxDigits = 0
	for (let i = 0; i < nums.length; i++) {
		maxDigits = Math.max(maxDigits, digitCount(nums[i]!))
	}
	return maxDigits
}

/**
 * Ordina l'array seguendo le logiche del radicSort
 * @param arr array da ordinare
 * @returns array ordinato
 */
function radixSort(arr: number[]): number[] {
	const maxDigitCount = mostDigits(arr);

	for (let k = 0; k < maxDigitCount; k++) {
		const digitBuckets: number[][] = Array.from({ length: 10 }, () => []);

		for (const num of arr) {
			const digit = getDigit(num, k);
			if (digitBuckets[digit]) { // controllo
				digitBuckets[digit].push(num);
			}
		}

		// Ricostruisci l'array in base ai buckets
		arr = ([] as number[]).concat(...digitBuckets);
	}

	return arr;
}

// Test sort
const arr = [1, 33, 444, 0, 3, 2];
console.log("TEST DEL RADICSORT");
console.log("Pre ordinamento:", arr);
const sorted = radixSort(arr)
console.log("Post ordinamento:", sorted);

```
