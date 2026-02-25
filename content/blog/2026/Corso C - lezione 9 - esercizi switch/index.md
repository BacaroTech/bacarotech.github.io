+++
title = "Corso C - lezione 9 - esercizi switch"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 9 - esercizi switch.c

```c
/*
ESERCIZI SWITCH
*/

#include <stdio.h>

int main()
{
    /*
    ES 1
    Scrivi un programma che, dato un numero da 1 a 7, stampi il nome del giorno corrispondente.
    1 → Lunedì
    2 → Martedì
    …
    7 → Domenica
    */
    int giorno = -6;
    switch (giorno)
    {
    case 1:
        printf("Lunedì");
        break;
    case 2:
        printf("Martedì");
        break;
    case 3:
        printf("Mercoledì");
        break;
    case 4:
        printf("Giovedì");
        break;
    case 5:
        printf("Venerdì");
        break;
    case 6:
        printf("Sabato");
        break;
    case 7:
        printf("Domenica");
        break;
    default:
        printf("Non esiste questo giorno");
        break;
    }

    /*
    ES 2
    Scrivi un programma che, dato un voto scolastico da 1 a 10, stampi il giudizio:
    1–4 → "Insufficiente"
    5 → "Mediocre"
    6 → "Sufficiente"
    7–8 → "Buono"
    9–10 → "Ottimo"
    */
    int voto = 9;

    switch (voto)
    {
    // sommare i casi
    // che sia 1,2,3 o 4 fai lo stesso case -> no codice duplicato
    case 1:
    case 2:
    case 3:
    case 4:
        printf("Insufficiente");
        break;
    case 5:
        printf("Mediocre");
        break;
    case 6:
        printf("Sufficiente");
        break;
    case 7:
    case 8:
        printf("Buono");
        break;
    case 9:
    case 10:
        printf("Ottimo");
        break;
    default:
        printf("Voto inesistente");
        break;
    }

    /*
    ES 3
    Chiedi all’utente di inserire due numeri e un’operazione (+, -, *, /).
    Utilizza uno switch per eseguire l’operazione scelta e stampare il risultato.
    */
    int n1 = 1;
    int n2 = 2;
    char segno = 'f';

    switch (segno)
    {
    case '+':
        printf("%d", n1 + n2);
        break;
    case '-':
        printf("%d", n1 - n2);
        break;
    case '*':
        printf("%d", n1 * n2);
        break;
    case '/':
        printf("%d", n1 / n2);
        break;
    default:
        printf("operazione non consentita");
        break;
    }
}

```

