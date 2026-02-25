+++
title = "Corso C - lezione 16 - esercizi funzioni"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 16 - esercizi funzioni.c

```c
// ESERCIZI SULLE FUNZIONI

#include <stdio.h>

/*
Esercizio 1 – Area del rettangolo
Scrivi una funzione area_rettangolo(base, altezza) che restituisca l’area di un rettangolo. 
Poi chiedi all’utente i valori di base e altezza e stampa il risultato.
*/
float area_rettangolo(float base, float altezza){
    return base * altezza;
}
/*
Esercizio 2 – Numero pari o dispari
Scrivi una funzione pari_o_dispari(n) che ritorni 
la valore 1 se il numero è pari e 0 se il numero è dispari.
*/
int pari_o_dispari(int n){
    if(n % 2 == 0){
        return 1;
    }else{
        return 0;
    }
}

// rifattorizzazione con singolo return
int pari_o_dispari_singolo_return(int n){
    int ris;
    if(n % 2 == 0){
        ris = 1;
    }else{
        ris = 0;
    }
    return ris;
}

/*
Esercizio 3 – Calcolatrice semplice
Scrivi una funzione calcola(a, b, operatore) che prenda due numeri e una carattere che rappresenta 
l’operazione ('+', '-', '*', '/'). La funzione deve restituire il risultato dell’operazione.
Poi crea un programma che chieda i due numeri e l’operatore all’utente e mostri il risultato.
*/

int calcola(int a, int b, char operatore){
    switch(operatore){
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            return a / b;
            break;
        default:
            printf("Caso non gestito!\n");
            return -1;
            break;
    }
}

void stampa_calcola(int a, int b, char operatore){
    int ris = calcola(a, b, operatore);
    if(operatore == '+' || operatore == '-' || operatore == '*' || operatore == '/'){
        printf("Risultato operazione: %d\n", ris);  
    }
}

int main() {
    printf("ES 1\n");
    int ris1 = area_rettangolo(7, 9);
    printf("%d\n", ris1);
    int ris2 = area_rettangolo(2, 6);
    printf("%d\n", ris2);
    
    printf("ES 2\n");
    int ris3 = pari_o_dispari(7);
    printf("%d\n", ris3);
    int ris4 = pari_o_dispari(2);
    printf("%d\n", ris4);

    printf("ES 3\n");
    stampa_calcola(6, 8, '*');
    stampa_calcola(2, 4, '-');
    stampa_calcola(2, 4, 'a');
    
    return 0;
}
```

