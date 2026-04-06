+++
title = "Corso C - lezione 21 - matrici"
date = 2026-02-25T14:01:03Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# MATRICI

Nel linguaggio C, le matrici sono un’estensione degli array che permettono di organizzare i dati in più dimensioni, tipicamente in forma di tabella con righe e colonne.

## COSA SONO

Una matrice è una struttura dati bidimensionale composta da elementi dello stesso tipo, disposti in righe e colonne. Ogni elemento è identificato da una coppia di indici che rappresentano la sua posizione.

## REGOLE

Le matrici in C hanno dimensioni fisse definite al momento della dichiarazione. Gli indici partono da zero per ogni dimensione, quindi sia righe che colonne seguono questa convenzione. È fondamentale rispettare i limiti per evitare accessi a memoria non validi.

## DICHIARAZIONE

Una matrice viene dichiarata specificando il tipo degli elementi, il nome e le dimensioni (numero di righe e colonne). Questo consente al compilatore di allocare correttamente la memoria necessaria.


## CODICE
```c
#include <stdio.h>

int main() {

    int M[3][2] = {
        {1, 2},
        {3, 4},
        {5, 6}
    };

    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
            printf("%d ", M[i][j]);
        }
        printf("\n");
    }

    int somma = 0;
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
            somma = somma + M[i][j];        
        }
    }

    printf("%d", somma);
    
    return 0;
}
```

