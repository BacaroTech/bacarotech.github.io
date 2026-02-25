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

## sol1.ts

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

