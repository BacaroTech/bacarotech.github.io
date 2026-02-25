+++
title = "CodingLeetCode - 121 - Best Time to Buy and Sell Stock"
date = 2026-02-25T14:00:23Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'javascript', 'python', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

## sol1.ts

```typescript
/*
brute force :(
function maxProfit(prices: number[]): number {
    let max = 0;

    for(let i = 0; i < prices.length; i++){
        for(let j = i+1; j < prices.length; j++){
            if(max < prices[j] - prices[i]){
                max = prices[j] - prices[i]
            }
        }
    }

    return max;
};*/

function maxProfit(prices: number[]): number {
    let min = prices[0];
    let minPos = 0;
    let max = prices[1];
    let maxPos = 1;
    let maxProfit = max - min;

    for(let i = 1; i < prices.length; i++){
        if(min > prices[i]){
            min = prices[i];
            minPos = i;
            maxPos = -1
        }else if(maxPos == -1 || max < prices[i] && i > minPos){
            max = prices[i];
            if(maxProfit < max - min){
                maxProfit = max - min
            }
        }
    }

    if(maxPos == 0 || maxProfit < 0 || prices.length == 1){
        maxProfit = 0;
    }

    return maxProfit;
};
```

## sol2.py

```python
class Solution(object):

    def maxProfit_bruteforce(self, prices):

        """

        :type prices: List[int]

        :rtype: int

        """

        best_profit = 0

        for idx_buy in range(len(prices)):

            idx_sell = idx_buy + 1

            while idx_sell < len(prices):

                best_profit = max(best_profit, prices[idx_sell] - prices[idx_buy])

                idx_sell += 1

        return best_profit

 

    def maxProfit(self, prices):
        min_array = [0]*len(prices)
        max_array = [0]*len(prices)
        curr_min= prices[0]

        for idx_buy in range(len(prices)):
            curr_min = min(curr_min, prices[idx_buy])
            min_array[idx_buy] = curr_min

        curr_max= prices[-1]
        for idx_sell in range(len(prices))[::-1]:
            curr_max = max(curr_max, prices[idx_sell])
            max_array[idx_sell] = curr_max

        best_profit = 0
        for idx in range(len(prices)):
            best_profit = max(best_profit, max_array[idx]-min_array[idx])

        return best_profit
```

## sol3.js

```javascript
/**
* @param {number[]} prices
* @return {number}
*/
var maxProfit = function(prices) {
    let max = 0;
    let currentIndex = 0;
    let minVal = prices[0];
    for(i = 0; i < prices.length; i++){
        if(prices[i] < minVal){
            minVal = prices[i];
            currentIndex = i;
        }
        if(prices[i]- prices[currentIndex] > max){
            max = prices[i]-prices[currentIndex];
        }
    }
    return max;
};
```

