+++
title = "Corso C - lezione 8 - switch"
date = 2026-02-25T14:00:50Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# SWITCH

Nel linguaggio C, lo switch è una struttura di controllo che permette di selezionare tra diversi blocchi di codice in base al valore di una variabile o espressione.

## COSA SONO

Gli switch sono costrutti decisionali alternativi agli if, pensati per gestire in modo più ordinato situazioni in cui una variabile può assumere diversi valori distinti. Ogni possibile valore corrisponde a un ramo specifico del programma.

## SINTASSI

La struttura di uno switch prevede un’espressione da valutare e una serie di casi associati a valori specifici. Quando il valore dell’espressione coincide con uno dei casi, viene eseguito il blocco di istruzioni corrispondente. È possibile anche definire un caso di default per gestire situazioni non previste.

## QUANDO VANNO USATI

Gli switch sono particolarmente utili quando si devono gestire molte condizioni basate sul confronto di una stessa variabile con valori costanti. Rendono il codice più leggibile e organizzato rispetto a una lunga sequenza di controlli condizionali.

## RIFLESSIONE IF E SWITCH

Gli if sono più flessibili perché permettono di valutare qualsiasi tipo di espressione logica, mentre gli switch sono più strutturati ma limitati a confronti diretti con valori specifici. In generale, si preferisce usare lo switch quando si hanno molti casi distinti e semplici, mentre gli if sono più adatti a condizioni complesse o intervalli di valori.

## CODICE
```c
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

