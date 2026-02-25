+++
title = "Corso C - lezione 15 - funzioni"
date = 2026-02-25T14:00:57Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 15 - funzioni.c

```c
/*
 * FUNZIONI
 * cosa sono
 * come si scrivono
 * differenzzazione
 * come vengono utilizzate
 * spaghetti code
 */

#include <stdio.h>

// le '' sono solo identificative
//'tipo di ritorno' 'nome' (parametri){ -> potrebbe non parametri
// corpo della funzione
//  eventuale return -> se la funzione è diversa da void è obbligatorio il return
//}

//creare una funzione che fa la somma di 2 numeri e la ritorna
//5,2 -> |somma| -> 7
//attenzione che l'ordine dei parametri è importante
//se io ho come par int, float anche il chiamante deve passarmi come int, float. Il contrario non va bene!
int somma(int n1, int n2) { //qua riceviamo valori -> prendiamo il valore e lo mappiamo in una nuova variabile
    int s = n1 + n2;
    return s;
}

void stampante(){
    printf("benvenuti al corso di c\n");
}

int main() {
    stampante();
    int a = 2;
    int b = 5;
    int r = somma(a, b); //qua passiamo valori -> non ci interessa il nome
    printf("somma: %d\n", r);
    r = somma(6, 8);
    printf("somma: %d\n", r);
    return 0;
}
```

