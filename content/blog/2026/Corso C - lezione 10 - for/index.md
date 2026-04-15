+++
title = "Corso C - lezione 10 - for"
date = 2026-02-25T14:00:52Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# FOR

Nel linguaggio C, il ciclo for è una struttura iterativa che permette di eseguire un blocco di istruzioni più volte, in modo controllato.

## COSA SONO

I for sono costrutti utilizzati per ripetere una sequenza di operazioni per un numero definito di volte. Sono particolarmente adatti quando si conosce in anticipo quante iterazioni devono essere eseguite.

## PERCHÈ SERVONO

Servono per automatizzare operazioni ripetitive, evitando di scrivere più volte lo stesso codice. Sono molto utilizzati, ad esempio, per scorrere sequenze di dati, eseguire calcoli ripetuti o iterare su strutture come array.

## SINTASSI

La struttura di un for in C include tre elementi principali: una fase di inizializzazione, una condizione che determina se il ciclo deve continuare e un aggiornamento che modifica lo stato a ogni iterazione. Questo schema permette di avere tutto il controllo del ciclo in un’unica struttura compatta.

## COMBINAZIONI

I cicli for possono essere combinati tra loro o con altre strutture come if e while per creare logiche più complesse. Ad esempio, è possibile avere cicli annidati o condizioni interne che modificano il comportamento del ciclo durante l’esecuzione.

## CODICE
```c
#include <stdio.h>

int main()
{
    // stessa istruzione ripetuta n volte => n = 3
    printf("ciao\n");
    printf("ciao\n");
    printf("ciao\n");
    printf("ciao\n");
    printf("ciao\n");

    printf("ESECUZIONE FOR\n");
    int volte;
    scanf("%d", &volte);
    // tramite for
    // inizio, test, incremento/decremento
    // test di persistenza -> se è vero rimaniamo nel for, altrimenti usciamo
    // inizio -> inidice
    int i;
    for (i = 0; i < volte; i++)
    {
        printf("ciao\n");
    }

    /*
    ciclo di un ciclo for
    inizio
    test
        vero -> corpo e incremento
        falso -> si esce dal ciclo
    test
        vero -> corpo e incremento
        falso -> si esce dal ciclo
    ...
    viene fatto finche non ci sarà un test che da falso
    */
}
```

