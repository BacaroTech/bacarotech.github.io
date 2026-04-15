+++
title = "Corso C - lezione 12 - while e do while"
date = 2026-02-25T14:00:54Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# CICLI WHILE

Nel linguaggio C, i cicli while sono strutture iterative che permettono di eseguire un blocco di codice finché una determinata condizione rimane vera.

## COSA SONO

I while sono cicli “a controllo iniziale”, ovvero valutano la condizione prima di ogni iterazione. Se la condizione è vera, il ciclo continua; se è falsa, il ciclo termina.

## COME SI SCRIVONO

La struttura di un while prevede una condizione logica e un blocco di istruzioni associato. Il programma verifica la condizione e, se soddisfatta, esegue il blocco, ripetendo il processo fino a quando la condizione non diventa falsa.

## PERICOLOSITÀ

I while possono essere pericolosi se la condizione non viene aggiornata correttamente all’interno del ciclo. In questi casi si rischia di creare cicli infiniti, che bloccano il programma e consumano risorse senza mai terminare.

## ALTERNATIVA: CICLO DO WHILE

Il ciclo do while è una variante del while che esegue il blocco di istruzioni almeno una volta, perché la condizione viene verificata solo alla fine dell’iterazione. È utile quando si vuole garantire che il codice venga eseguito almeno una volta, indipendentemente dalla condizione iniziale.

## CODICE
```c
#include <stdio.h>

int main() {
    //inizializzazione, condizione, incremento/decremento
    for(int i = 0; i < 10; i++){
        printf("%d ", i);
    }
    printf("\n");

    /*
    while(condizione){
        ...corpo del ciclo...
    }
    */

    int i = 0; //inizializzazione
    while(i < 10){ //condizione
        printf("%d ", i);
        i++; //incremento/decremento
    }

    printf("\n");
    
    //leggeri numeri finche non leggo il -1
    int letto;
    /*scanf("%d", &letto);
    while(letto != -1){
        scanf("%d", &letto);
    }*/

    //ricostruzione col do while
    do{
        scanf("%d", &letto);
    }while(letto != -1);
    
    return 0;
}
```

