+++
title = "Corso C - lezione 17 - puntatori"
date = 2026-02-25T14:00:59Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# PUNTATORI

Nel linguaggio C, i puntatori sono uno degli strumenti più potenti e caratteristici. Permettono di lavorare direttamente con la memoria, offrendo un controllo molto preciso sul comportamento del programma.

## COSA SONO

Un puntatore è una variabile che contiene l’indirizzo di memoria di un’altra variabile. Invece di memorizzare direttamente un valore, “punta” alla posizione in cui quel valore è salvato.

## COME SI SCRIVONO

Un puntatore viene dichiarato specificando il tipo di dato a cui fa riferimento e un simbolo che indica che si tratta di un indirizzo. Questo tipo deve essere coerente con il dato a cui il puntatore si riferisce.

## OPERAZIONI PERMESSE SUI PUNTATORI

Con i puntatori è possibile leggere e modificare il valore della variabile a cui fanno riferimento, oltre che eseguire operazioni aritmetiche sugli indirizzi per spostarsi in memoria. Questo è particolarmente utile quando si lavora con array o strutture dati complesse.

## COME MAI SONO PERICOLOSI

I puntatori sono considerati pericolosi perché un uso scorretto può portare a errori difficili da individuare, come accessi a memoria non valida o sovrascrittura di dati importanti. Questo può causare crash del programma o comportamenti imprevedibili.

## COME MAI SONO DIFFICILI (E COME CAPIRLI)

I puntatori risultano difficili perché richiedono di ragionare non solo sui valori, ma anche sugli indirizzi di memoria. Per capirli è utile visualizzare mentalmente la memoria come una serie di celle e ricordare che il puntatore contiene solo un riferimento. Con pratica ed esempi, diventano uno strumento estremamente potente e indispensabile.

## CODICE
```c
#include <stdio.h>

int main() {
    int n = 3;

    // tipo * -> puntatore di tipo
    // int * pn = n -> non va bene perchè stiamo mettendo un intero all'interno di un puntatore a intero(miss match di tipi);
    // &n estrae l'indirizzo di n ed è ideale per i puntatori
    int * pn = &n;

    // estrarre il valore del puntatore
    int risolta = *pn;
    printf("%d %d\n", n, risolta);

    *pn = 4;
    printf("%d %d\n", n, *pn);

    // operazioni
    int m = 2;
    int * pm = &m;

    // assegnamento tra puntatori
    // pn = pm; -> non servono altri siboli!!!
    // pm + 5; -> lo spostamento del puntatore di n posizioni(5)
    // pm - pn; -> numero di celle tra puntatore1 e punatore2

    return 0;
}
```

