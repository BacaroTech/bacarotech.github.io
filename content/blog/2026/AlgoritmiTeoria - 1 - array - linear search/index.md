+++
title = "AlgoritmiTeoria - 1 - array - linear search"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

# ALGORITMO: RICERCA LINEARE

La ricerca lineare è un algoritmo che consente di verificare se un
elemento è presente all'interno di un array.  
Non richiede che l'array sia ordinato: controlla gli elementi uno a uno
fino a trovare il valore cercato oppure fino alla fine dell'array.


## QUANDO USARLO

- Vuoi cercare un elemento in un array **non ordinato**.
- L'array è di piccole dimensioni, quindi la semplicità conta più
  dell'efficienza.
- Non hai bisogno di strutture dati avanzate o logiche di ricerca complesse.


## FUNZIONAMENTO

1. Si scorre l'array dall'inizio alla fine.
2. Per ogni elemento si confronta con quello da cercare:
   - **Se uguale**, restituisce la posizione e termina.
   - **Se diverso**, continua con l'elemento successivo.
3. Se si arriva alla fine senza trovare l'elemento, l'algoritmo restituisce `-1`.


## OUTPUT

- Restituisce la posizione (tra 0 e n-1) se l'elemento è presente.
- Restituisce `-1` se l'elemento non è stato trovato.


## COMPLESSITÀ

- **Caso migliore:** O(1)  
  (se l'elemento si trova subito all'inizio).
- **Caso medio:** O(n)  
  (in media deve scorrere metà dell'array).
- **Caso peggiore:** O(n)  
  (se l'elemento è alla fine o non è presente).

## CODICE
```typescript
/**
 * Ricerca di un elmento all'interno dell'array tramite scansione lineare
 * @param arr array sul quale dobbiamo fare la ricerca
 * @param x elemento da cercare
 * @returns posizione dell'elemento all'interno dell'array se esiste, altrimenti -1
 */
function linearSearch(array: number[], x: number): number {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === x) {
			return i;
		}
	}
	return -1;
}

let numbers = [1, 3, 5, 7, 8, 9];
console.log("Visualizza array:", numbers);
console.log("Ricerca all'interno dell'array dell'elemento 8, indice:", linearSearch(numbers, 8));
console.log("Ricerca all'interno dell'array dell'elemento 28, indice:", linearSearch(numbers, 28));  

```
