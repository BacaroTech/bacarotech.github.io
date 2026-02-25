+++
title = "AlgoritmiTeoria - 1 - array"
date = 2026-02-25T14:00:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## search/binarysearch.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: RICERCA BINARIA
──────────────────────────────
La ricerca binaria è un algoritmo che consente di verificare se un
elemento è presente all’interno di un array ordinato.  
Funziona dividendo progressivamente l’array a metà fino a trovare
l’elemento cercato o determinare che non esiste.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Vuoi cercare un elemento in un array **ordinato** (crescente o decrescente).
- Vuoi ridurre i tempi di ricerca rispetto alla scansione sequenziale.
- Vuoi un algoritmo efficiente con complessità logaritmica.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si considerano gli estremi dell’array (inizialmente 0 e n-1).
2. Si calcola l’indice dell’elemento centrale.
3. Si confronta l’elemento centrale con quello da cercare:
   - **Se uguale**, restituisce la posizione.
   - **Se maggiore**, si ripete la ricerca nella prima metà.
   - **Se minore**, si ripete la ricerca nella seconda metà.
4. Il processo continua fino a trovare l’elemento o esaurire l’array.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce la posizione (tra 0 e n-1) se l’elemento è presente.
- Restituisce `-1` se l’elemento non è stato trovato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso peggiore:** O(log n)  
  (a ogni passo la dimensione del problema si dimezza).
*/

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

## search/linearsearch.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: RICERCA LINEARE
──────────────────────────────
La ricerca lineare è un algoritmo che consente di verificare se un
elemento è presente all’interno di un array.  
Non richiede che l’array sia ordinato: controlla gli elementi uno a uno
fino a trovare il valore cercato oppure fino alla fine dell’array.

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Vuoi cercare un elemento in un array **non ordinato**.
- L’array è di piccole dimensioni, quindi la semplicità conta più
  dell’efficienza.
- Non hai bisogno di strutture dati avanzate o logiche di ricerca complesse.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si scorre l’array dall’inizio alla fine.
2. Per ogni elemento si confronta con quello da cercare:
   - **Se uguale**, restituisce la posizione e termina.
   - **Se diverso**, continua con l’elemento successivo.
3. Se si arriva alla fine senza trovare l’elemento, l’algoritmo restituisce `-1`.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce la posizione (tra 0 e n-1) se l’elemento è presente.
- Restituisce `-1` se l’elemento non è stato trovato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(1)  
  (se l’elemento si trova subito all’inizio).
- **Caso medio:** O(n)  
  (in media deve scorrere metà dell’array).
- **Caso peggiore:** O(n)  
  (se l’elemento è alla fine o non è presente).
*/

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

## search/tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../../dist/array/search",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}

```

## sort/bubblesort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: BUBBLE SORT
──────────────────────────────
Il Bubble Sort è un algoritmo di ordinamento semplice che riordina un
array confrontando ripetutamente coppie di elementi adiacenti e
scambiandoli se sono nell’ordine sbagliato.  
Il processo continua finché l’array non risulta ordinato.

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
3. Una scansione completa dell’array si chiama **passata**.
4. Alla fine di ogni passata, l’elemento più grande “scivola” in fondo
   all’array, nella sua posizione definitiva.
5. L’algoritmo termina quando una passata non esegue alcuno scambio.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l’array ordinato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n)  
  (quando l’array è già ordinato, basta una sola passata).
- **Caso medio:** O(n²)  
  (numerosi scambi distribuiti tra le passate).
- **Caso peggiore:** O(n²)  
  (array ordinato al contrario, massimo numero di scambi).

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **semplice ma inefficiente** per array grandi.
- È stabile (non cambia l’ordine relativo di elementi uguali).
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

## sort/countingsort.ts

```typescript
/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Counting_sort#/media/File:Counting_Sort_Animation.gif

Descrizione dell'algoritmo
Questo algoritmo presenta una **precondizione fondamentale**:  
- Gli elementi dell'array devono trovarsi in un intervallo compreso tra **0** e **K**.  

Funzionamento
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

Output
l'array ordinato

Complessita' nel caso peggiore: O(n + k)
*/

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

## sort/insertionsort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: INSERTION SORT
──────────────────────────────
L’Insertion Sort è un algoritmo di ordinamento semplice e intuitivo, che
costruisce progressivamente una parte ordinata dell’array inserendo ogni
nuovo elemento nella posizione corretta.  
Funziona in modo simile al processo di ordinare manualmente le carte da
gioco in mano.

Visualizzazione:  
https://it.wikipedia.org/wiki/Insertion_sort#/media/File:Sorting_insertion_sort_anim.gif

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- L’array ha **piccole dimensioni** o è già **quasi ordinato**.
- Vuoi un algoritmo semplice da implementare e stabile.
- È utile come parte di algoritmi più complessi (es. **Shell Sort**).

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si assume che il primo elemento sia già ordinato.
2. Per ogni elemento successivo (dal secondo fino all’ultimo):
   - Si confronta l’elemento con quelli nella parte ordinata.
   - Se l’elemento è maggiore del massimo ordinato → viene posto in
	 fondo alla parte ordinata.
   - Altrimenti, si spostano (shift) gli elementi più grandi di lui per
	 fare spazio e inserirlo nella posizione corretta.
3. La parte ordinata cresce progressivamente di un elemento per volta,
   fino a includere l’intero array.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l’array ordinato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n)  
  (array già ordinato → basta un confronto per elemento).
- **Caso medio:** O(n²)  
  (inserimenti distribuiti con vari spostamenti).
- **Caso peggiore:** O(n²)  
  (array ordinato in senso opposto, massimo numero di spostamenti).

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **stabile** (mantiene l’ordine relativo di elementi uguali).
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

## sort/mergesort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: MERGE SORT
──────────────────────────────
Il Merge Sort è un algoritmo di ordinamento basato sul paradigma
**Divide et Impera**.  
Divide ricorsivamente l’array in parti sempre più piccole, le ordina e
poi le ricompone fino a ottenere l’array ordinato completo.

Visualizzazione:  
https://it.wikipedia.org/wiki/Merge_sort#/media/File:Merge_sort_animation2.gif

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- L’array è di **grandi dimensioni**.
- Vuoi un algoritmo **stabile** e con complessità garantita O(n log n).
- È utile quando serve un ordinamento prevedibile, indipendente dalla disposizione iniziale dei dati.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. **Divisione:**  
   - L’array viene suddiviso ricorsivamente in due metà fino a ottenere
	 micro-array di un solo elemento.
2. **Ricombinazione ordinata (Merge):**  
   - Due micro-array vengono uniti confrontando i loro elementi e
	 inserendoli in ordine crescente in un array temporaneo.
   - Questo processo si ripete risalendo la ricorsione, fino a
	 ricomporre l’intero array ordinato.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l’array ordinato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n log n)  
- **Caso medio:** O(n log n)  
- **Caso peggiore:** O(n log n)  

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **stabile**.
- Richiede **memoria aggiuntiva** proporzionale alla dimensione dell’array.
- Particolarmente efficiente su array grandi e distribuzioni casuali.
*/

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

## sort/quicksort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: QUICK SORT
──────────────────────────────
Il Quick Sort è un algoritmo di ordinamento **Divide et Impera** che
suddivide ricorsivamente l’array intorno a un elemento chiamato **pivot**.  
Gli elementi minori del pivot vengono posizionati a sinistra, quelli
maggiori a destra, e il processo viene ripetuto su entrambe le sotto-sezioni.

Visualizzazione:  
https://en.wikipedia.org/wiki/Quicksort#/media/File:Sorting_quicksort_anim.gif

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Vuoi un algoritmo di ordinamento **rapido** e con buona performance media.
- L’array è di grandi dimensioni.
- Puoi tollerare casi peggiori rari (O(n²)) con scelte di pivot non ottimali.
- È utile quando serve un algoritmo in-place (senza array aggiuntivi significativi).

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. **Scelta del pivot:**  
   - Si seleziona un elemento dell’array (spesso primo, ultimo o centrale).
2. **Partizionamento:**  
   - Gli elementi minori del pivot vengono spostati a sinistra.
   - Gli elementi maggiori del pivot vengono spostati a destra.
   - Il pivot viene posizionato nella sua posizione finale.
3. **Ricorsione:**  
   - La procedura viene applicata ricorsivamente alla sotto-sezione sinistra e destra del pivot.
4. L’array diventa ordinato quando tutte le sotto-sezioni sono ordinate.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l’array ordinato come **side effect** (modifica in-place).

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n log n)  
  (pivot divide sempre in modo bilanciato).
- **Caso medio:** O(n log n)  
- **Caso peggiore:** O(n²)  
  (pivot scelto male, ad esempio array già ordinato e pivot sempre massimo/minimo).

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **non stabile** (l’ordine relativo di elementi uguali può cambiare).  
- Molto efficiente in media e con poca memoria aggiuntiva.  
- L’uso di strategie di pivot migliori (es. pivot casuale) riduce il rischio di caso peggiore.
*/

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

## sort/radicsort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: RADIX SORT
──────────────────────────────
Il Radix Sort è un algoritmo di ordinamento **non basato sui confronti** che
ordina i numeri considerando le loro cifre, dalla meno significativa
alla più significativa (LSD – Least Significant Digit).  
È molto efficiente quando gli elementi hanno un numero limitato di cifre.

Visualizzazione:  
https://it.wikipedia.org/wiki/Radix_sort#/media/File:Radix.JPG

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- Gli elementi sono **numeri interi non negativi**.
- Le cifre dei numeri si trovano in un intervallo limitato **[0, K]**.
- Vuoi un ordinamento stabile e più efficiente di O(n log n) per insiemi di numeri con range limitato.
- Utile come base per algoritmi più complessi di ordinamento di grandi dataset.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si considerano tutti i numeri dell’array.
2. Si ordina ogni numero **cifra per cifra**, partendo dalla cifra meno significativa (unità) fino alla più significativa:
   - Esempio: Array iniziale: 142, 456, 228  
	 - Passo 1: ordino le cifre meno significative → 142, 228, 456  
	 - Passo 2: ordino le cifre successive → 142, 228, 456  
	 - Passo 3: ordino le cifre più significative → 142, 228, 456
3. Dopo l’ultima iterazione, l’array risulta completamente ordinato.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l’array ordinato in modo **stabile**.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(m(n + K))  
- **Caso medio:** O(m(n + K))  
- **Caso peggiore:** O(m(n + K))  
  Dove:  
  - m = numero di elementi nell’array  
  - n = numero di cifre di ciascun elemento  
  - K = valore massimo possibile delle cifre

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **stabile**, quindi mantiene l’ordine relativo di elementi uguali.
- Non utilizza confronti diretti tra numeri.
- Particolarmente efficiente per grandi array di numeri con cifre limitate.
*/

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

## sort/selectionsort.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: SELECTION SORT
──────────────────────────────
Il Selection Sort è un algoritmo di ordinamento semplice che funziona
selezionando ripetutamente il **minimo elemento** da un sotto-array non
ordinato e scambiandolo con il primo elemento non ordinato.  
Ripetendo questo processo, l’array diventa ordinato.

Visualizzazione:  
https://en.wikipedia.org/wiki/Selection_sort#/media/File:Selection-Sort-Animation.gif

──────────────────────────────
  QUANDO USARLO
──────────────────────────────
- L’array è di piccole dimensioni.
- Vuoi un algoritmo semplice da implementare.
- Non hai necessità di stabilità nell’ordinamento.

──────────────────────────────
  FUNZIONAMENTO
──────────────────────────────
1. Si individua l’elemento minimo nell’array o sotto-array corrente.
2. Si scambia il minimo con il primo elemento non ordinato.
3. Si ripete la procedura sul sotto-array che va dalla posizione successiva
   fino alla fine dell’array.
4. L’array è ordinato quando tutti gli elementi sono stati posizionati.

──────────────────────────────
  OUTPUT
──────────────────────────────
- Restituisce l’array ordinato.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- **Caso migliore:** O(n²)  
- **Caso medio:** O(n²)  
- **Caso peggiore:** O(n²)  

──────────────────────────────
  NOTE
──────────────────────────────
- È un algoritmo **non stabile** (l’ordine relativo degli elementi uguali può cambiare).  
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

## sort/tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../../dist/array/sort",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}

```

