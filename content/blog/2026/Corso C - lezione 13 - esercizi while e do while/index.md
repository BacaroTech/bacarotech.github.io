+++
title = "Corso C - lezione 13 - esercizi while e do while"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 13 - esercizi while e do while.c

```c
/*
 * ESERCIZI CICLI WHILE
 */

#include <stdio.h>
#include <stdlib.h> // Per le funzioni rand() e srand()
#include <time.h>   // Per la funzione time()

int main() {
    /*
    Esercizio 1 – Conto alla rovescia
    Scrivi un programma che chieda all’utente un numero intero positivo e stampi a video un conto alla rovescia fino a 0.
    */
    int secondi;
    printf("inserisci secondi per conto alla rovescia\n");
    scanf("%d", &secondi);
    while(secondi > 0){
        printf("%d...\n", secondi);
        secondi--;
    }

    /*
    Esercizio 2 – Somma fino a zero
    Chiedi all’utente di inserire numeri interi. Il programma continua a chiedere numeri fino a quando l’utente inserisce 0. 
    Alla fine stampa la somma di tutti i numeri inseriti (escluso lo zero).
    */
    int somma = 0;
    int letto;
    do{
        printf("inserisci un numero\n");
        scanf("%d", &letto);
        somma += letto;
    }while(letto != 0);
    printf("somma: %d", somma);
    
    /*
    Esercizio 3 – Indovina il numero
    Il computer sceglie un numero casuale tra 1 e 100. L’utente deve indovinare il numero. Dopo ogni tentativo il programma 
    dice se il numero da indovinare è più alto o più basso di quello inserito. Il ciclo termina quando l’utente indovina.
    */

    // Inizializza il generatore di numeri casuali
    // Questo assicura che venga generata una sequenza diversa ogni volta
    srand(time(NULL));

    // Genera un numero casuale tra 0 e 99 usando rand() % 100
    // Aggiunge 1 per ottenere un intervallo da 1 a 100
    int numeroCasuale = rand() % 100 + 1;
    printf("--%d--\n", numeroCasuale);

    int letto;
    do{
        printf("riesci a indovinare il numero?\n");
        scanf("%d", &letto);

        if(letto < numeroCasuale){
            printf("troppo basso, riprova!\n");
        }else if(letto > numeroCasuale){
            printf("troppo alto, riprova!\n");
        }
    }while(letto != numeroCasuale);

    printf("hai indovinato!!!");
    
    
    return 0;
}
```

