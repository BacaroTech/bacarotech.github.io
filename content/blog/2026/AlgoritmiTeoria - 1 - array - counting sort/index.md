+++
title = "AlgoritmiTeoria - 1 - array - counting sort"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++


# ALGORITMO: COUNTING SORT 
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Counting_sort#/media/File:Counting_Sort_Animation.gif

Descrizione dell'algoritmo
Questo algoritmo presenta una **precondizione fondamentale**:  
- Gli elementi dell'array devono trovarsi in un intervallo compreso tra **0** e **K**.  
- La grandezza dell'intervallo determina anche la sua efficenza

## FUNZIONAMENTO
1. **Creazione di un array di supporto:**  
   - Viene creato un array di supporto di dimensione **K** chiamato "array delle occorrenze" (o `countArray`).  
   - Tutti i valori di questo array vengono inizializzati a **0**.  
2. **Conteggio delle occorrenze:**  
   - L'algoritmo scorre l'array di partenza e utilizza ogni elemento come indice nell'array delle occorrenze.  
   - Incrementa il valore corrispondente in `countArray` di 1.  
     Esempio: se l'elemento è **5**, viene eseguito `countArray[5]++`.  
3. **Calcolo delle somme prefix:**  
   - Viene modificato l'array delle occorrenze per calcolare la somma cumulativa (o somma dei prefissi) per ogni indice.  
   - Ogni posizione di `countArray` conterrà il numero totale di elementi minori o uguali a quell'indice.  
4. **Ordinamento dell'array di partenza:**  
   - Utilizzando i prefissi calcolati nel passo precedente, l'algoritmo determina la posizione corretta di ogni elemento nell'array ordinato.  

Questo processo garantisce un ordinamento stabile e rapido per array che soddisfano la precondizione iniziale.  

## OUTPUT
L'array di partenza ordinato senza mai fare dei confronti tra gli elementi

## COMPLESSITÀ 
Nel caso peggiore: O(n + k)

## CODICE
```typescript
/**
 * Ordina l'array seguendo le logiche del countingSort
 * @param arr array da ordinare
 * @param min valore minimo dell'intervanno, di solito 1
 * @param max valore massimo dell'intervallo, di solito K
 * @returns array ordinato
 */
function countingSort(arr: number[], min: number, max: number): number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input non valido: deve essere un array non vuoto.");
    }

    // Inizializza l'array di conteggio
    const count = new Array(max - min + 1).fill(0);

    // Conta le occorrenze di ciascun elemento
    for (const num of arr) {
        if (num < min || num > max) {
            throw new Error(`Valore ${num} fuori dall'intervallo specificato [${min}, ${max}].`);
        }
        count[num - min]++;
    }

    // Ricostruisci l'array ordinato
    let index = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }

    return arr;
}

// Test sort
const arr = [4, 2, 2, 8, 3, 3, 1];
const min = 1, max = 8;
console.log("TEST DEL COUNTINGSORT");
console.log("Pre ordinamento:", arr);
const sorted = countingSort(arr, min, max);
console.log("Post ordinamento:", sorted);

```
