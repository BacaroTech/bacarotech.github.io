+++
title = "CodingLeetCode - 217 - Contains Duplicate"
date = 2026-02-25T14:00:27Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Possiamo risolvere questo problema ordinando l’array e controllando elementi consecutivi, come nel codice proposto.

L’idea chiave è:

- ordiniamo l’array utilizzando un algoritmo di ordinamento (in questo caso merge sort)
- una volta ordinato, eventuali duplicati saranno adiacenti
- scorriamo l’array a partire dal secondo elemento
- confrontiamo ogni elemento con il precedente
- se troviamo due elementi uguali consecutivi, esiste un duplicato
- altrimenti, se arriviamo alla fine senza trovare uguaglianze, tutti gli elementi sono distinti

Questo approccio permette di ottenere una complessità O(n log n) a causa dell’ordinamento. Tuttavia, utilizza più operazioni del necessario: una soluzione più efficiente sfrutta una struttura dati come un set per ottenere una complessità O(n), evitando l’ordinamento.

```typescript
function containsDuplicate(nums: number[]): boolean {
    let checked = false;
    nums = mergeSort(nums);
    for(let i = 1; i < nums.length; i++){
        if(nums[i] == nums[i-1]){
            checked = true;
        }
    }
    return checked;
};

function mergeSort(arr) {
  // Base case
  if (arr.length <= 1) return arr
  let mid = Math.floor(arr.length / 2)
  // Recursive calls
  let left = mergeSort(arr.slice(0, mid))
  let right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

function merge(left, right) {
  let sortedArr = [] // the sorted items will go here
  while (left.length && right.length) {
    // Insert the smallest item into sortedArr
    if (left[0] < right[0]) {
      sortedArr.push(left.shift())
    } else {
      sortedArr.push(right.shift())
    }
  }
  // Use spread operators to create a new array, combining the three arrays
  return [...sortedArr, ...left, ...right]
}

```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)