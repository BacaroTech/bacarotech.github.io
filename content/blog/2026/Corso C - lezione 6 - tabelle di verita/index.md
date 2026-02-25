+++
title = "Corso C - lezione 6 - tabelle di verita"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 6 - tabelle di verita.c

```c
/*
TABELLE DI VERITA
*/

/*
NOT
!
1 -> 0
0 -> 1
*/

/*
AND
Date (almeno) 2 condizioni booleane A e B

&&      A vera A Falsa
B vera    vero   falso
B falsa  falso   falso
*/

/*
OR
Date (almeno) 2 condizioni booleane A e B

||      A vera A Falsa
B vera    vero    vero
B falsa   vero   falso

AND E OR POSSONO ESSERE COMBINATI TRA LORO
*/

#include <stdio.h>

int main()
{
    int a = 2;
    int b = 3;
    // esempio not
    printf("%d\n", !(a < b));
    // esempio and
    printf("%d\n", a < b && b == 34);
    // esempio or
    printf("%d\n", a < b || b == 34);
    // esempio and e or
    printf("%d\n", b == 34 || (a > b && a == 2));
    return 0;
}
```

