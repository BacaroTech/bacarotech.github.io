+++
title = "Corso C - lezione 8 - switch"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 8 - switch.c

```c
/*
SWITCH
cosa sono
sintassi
quando vanno usati
riflessione if e switch
*/

#include <stdio.h>

int main()
{
    // variabile di riferimento
    int n = -1;

    switch (n)
    {
    case 1: // n == 1
        printf("numero: 1");
        break;
    case 2: // n == 2
        printf("numero: 2");
        break;
    case 3: // n == 3
        printf("numero: 3");
        break;
    default:
        printf("caso non gestito");
    }
}
```

