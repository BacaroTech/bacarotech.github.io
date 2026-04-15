+++
title = "Corso C - lezione 6 - tabelle di verita"
date = 2026-02-25T14:00:48Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# TABELLE DI VERITA

## NOT
Nel linguaggio C, l’operatore NOT serve per invertire il valore di una condizione booleana. È un operatore unario, quindi agisce su una sola espressione. Il simbolo utilizzato per rappresentare il NOT in C è il punto esclamativo. Viene posto prima della condizione che si vuole invertire.

!
1 -> 0
0 -> 1

## AND
Nel linguaggio C, l’operatore AND viene utilizzato per combinare due o più condizioni booleane. Il risultato è vero solo se tutte le condizioni coinvolte sono vere. L’AND lavora confrontando almeno due condizioni. Queste condizioni vengono valutate insieme per determinare un unico risultato logico. Il simbolo utilizzato per rappresentare l’AND in C è la doppia e commerciale. Serve per collegare più condizioni all’interno di un’unica espressione.

Date (almeno) 2 condizioni booleane A e B

&&      A vera A Falsa
B vera    vero   falso
B falsa  falso   falso

## OR
Nel linguaggio C, l’operatore OR viene utilizzato per verificare se almeno una tra più condizioni è vera. È meno restrittivo rispetto all’AND. Anche l’OR combina almeno due condizioni booleane per produrre un unico risultato logico. Il simbolo utilizzato per rappresentare l’OR in C è la doppia barra verticale. Serve per collegare condizioni alternative.

Date (almeno) 2 condizioni booleane A e B

||      A vera A Falsa
B vera    vero    vero
B falsa   vero   falso

## NOTE

AND OR e NOT possono essere combinati tra di loro per rappresentare delle condizioni booleane complesse

## CODICE

```c
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

