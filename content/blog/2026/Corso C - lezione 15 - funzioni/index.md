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

# FUNZIONI

Nel linguaggio C, le funzioni sono blocchi di codice riutilizzabili progettati per svolgere un compito specifico. Permettono di suddividere un programma in parti più piccole, migliorandone organizzazione e leggibilità.

## COSA SONO

Una funzione è una sequenza di istruzioni identificata da un nome, che può essere eseguita ogni volta che viene richiamata. Può ricevere dei dati in ingresso e, opzionalmente, restituire un risultato.

## COME SI SCRIVONO

Una funzione in C è definita specificando un tipo di ritorno, un nome e un insieme di parametri. Il suo corpo contiene le istruzioni da eseguire. Questa struttura permette di isolare una logica precisa dal resto del programma.

## DIFFERENZZAZIONE

Le funzioni si differenziano principalmente in base alla presenza o meno di parametri e di un valore di ritorno. Alcune funzioni eseguono operazioni senza restituire nulla, mentre altre elaborano dati e producono un risultato.

## COME VENGONO UTILIZZATE

Le funzioni vengono utilizzate richiamandole tramite il loro nome. Questo permette di evitare duplicazione di codice, rendere il programma più modulare e facilitare la manutenzione e il riutilizzo delle varie parti.

## SPAGHETTI CODE

Lo “spaghetti code” si verifica quando un programma è disorganizzato, difficile da seguire e privo di una struttura chiara. L’uso corretto delle funzioni aiuta a evitare questo problema, suddividendo il codice in blocchi logici ben definiti e migliorandone la leggibilità.

## CODICE

```c
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

