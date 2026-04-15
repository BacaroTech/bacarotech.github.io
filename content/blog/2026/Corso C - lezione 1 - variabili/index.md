+++
title = "Corso C - lezione 1 - variabili"
date = 2026-02-25T14:00:43Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# VARIABILI

Nel linguaggio C, le variabili rappresentano delle porzioni di memoria che vengono utilizzate per memorizzare dati durante l’esecuzione di un programma. Sono uno degli elementi fondamentali della programmazione, perché permettono di salvare informazioni, modificarle e riutilizzarle nel tempo.

## COSA SONO LE VARIABILI

Una variabile è essenzialmente un contenitore con un nome (identificatore) e un tipo. Il tipo definisce che tipo di dato può contenere (ad esempio numeri interi, numeri decimali o caratteri), mentre il nome serve per poterla richiamare all’interno del programma.

## COME CREARE UNA VARIABILE

Per creare una variabile in C è necessario dichiararla, specificando prima il tipo e poi il nome. Questa operazione serve a dire al compilatore quanta memoria deve essere allocata e come interpretare il valore che verrà inserito.

## COME MODIFICARE IL VALORE DI UNA VARIABILE

Una variabile può essere modificata assegnandole un nuovo valore. In C questo avviene tramite un’assegnazione: il valore precedente viene sovrascritto con quello nuovo. È importante che il nuovo valore sia compatibile con il tipo della variabile.

## COME VISUALIZZARE UNA VARIABILE SUL TERMINALE

Per visualizzare il valore di una variabile in C si utilizza una funzione di output standard che permette di inviare il contenuto della variabile al terminale. È necessario specificare anche il formato del dato, in modo che venga interpretato correttamente durante la stampa.

## COME INSERIRE UN VALORE DA TERMINALE

In C è possibile modificare il valore di una variabile leggendo un input da terminale. Questo avviene tramite una funzione che acquisisce dati inseriti dall’utente durante l’esecuzione del programma. Il valore inserito viene poi salvato nella variabile, permettendo così un’interazione dinamica con l’utente.

## CODICE
```c
#include <stdio.h>

int main()
{
    // tipo nome = valore
    int variabile = 5; // inizializzazione

    // tipo nome
    int varibile2; // creazione

    // i nomi delle varibili sono esclusivi
    // le varibili non posso iniziare con un numero
    // int 2varibile => errore

    varibile2 = 4; // assegnamento
    // il tipo viene messo solo in fare di dichiarazione di una varibile

    //%d viene usato solo per gli int
    printf("valore delle varibili: %d %d\n", variabile, varibile2);

    //%d viene usato solo per gli int
    // scanf("testo: %d", &variabile); -> NON POSSO INSERIRE TESTO NELLA SCANF

    printf("inserisci valore della varibile:");
    scanf("%d", &variabile);

    printf("valore delle varibili: %d %d\n", variabile, varibile2);
}
```

