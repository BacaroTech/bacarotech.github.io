+++
title = "Corso C - lezione 2 - tipi"
date = 2026-02-25T14:00:44Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# TIPI

Nel linguaggio C, i tipi di dato definiscono la natura delle informazioni che una variabile può contenere. Sono fondamentali perché permettono al compilatore di sapere come interpretare i dati e quanta memoria allocare.

## QUANTI SONO

In C esistono diversi tipi di dato primitivi, come numeri interi, numeri con virgola, caratteri e valori booleani (anche se questi ultimi non sono nativi nelle versioni più vecchie). Ogni tipo ha caratteristiche specifiche in termini di dimensione e utilizzo.

## VARIABILI DI TEMPLATE

In C non esistono vere e proprie “variabili di template” come in altri linguaggi più moderni. Tuttavia, il concetto può essere avvicinato all’idea di usare lo stesso schema logico con tipi diversi, grazie a strumenti come le macro o la programmazione generica limitata.

## ESEMPI

Un esempio concettuale di tipi in C include variabili che rappresentano numeri interi per contatori, numeri decimali per misure più precise e caratteri per rappresentare simboli o lettere. Ogni scelta del tipo dipende dal contesto in cui viene utilizzata la variabile.

## SPOILER: TIPI CUSTOM

Oltre ai tipi primitivi, in C è possibile creare tipi personalizzati. Questo avviene tramite strutture, unioni o definizioni di tipo, che permettono di modellare dati più complessi e organizzati, rendendo il codice più leggibile e modulare.

## CODICE
```c
#include <stdio.h>
#include <stdbool.h> // Per il tipo bool

int main()
{
    // Interi
    char c = 'A';
    int sc = -100;
    unsigned int uc = 200;
    short s = -32000;
    unsigned short us = 65000;
    int i = -2147483647;
    unsigned int ui = 4294967295U;
    long l = -9223372036854775807L;
    unsigned long ul = 18446744073709551615UL;
    long long ll = -9223372036854775807LL;
    unsigned long long ull = 18446744073709551615ULL;

    // Floating point
    float f = 3.14f;
    double d = 2.718281828459;
    long double ld = 1.6180339887L;

    // Booleano (da stdbool.h)
    bool b = true;
    int b2 = 1; // 1(true) e 0(false)

    // Stampa
    printf("Tipi interi:\n");
    printf("char: %c, valore ASCII: %d\n", c, c);
    printf("int: %d\n", sc);
    printf("unsigned char: %u\n", uc);
    printf("short: %hd\n", s);
    printf("unsigned short: %hu\n", us);
    printf("int: %d\n", i);
    printf("unsigned int: %u\n", ui);
    printf("long: %ld\n", l);
    printf("unsigned long: %lu\n", ul);
    printf("long long: %lld\n", ll);
    printf("unsigned long long: %llu\n", ull);

    printf("\nTipi floating point:\n");
    printf("float: %f\n", f);
    printf("double: %lf\n", d);
    printf("long double: %Lf\n", ld);

    printf("\nTipo booleano:\n");
    printf("bool: %s\n", b ? "true" : "false");
    printf("bool nativo: %d", b2);

    return 0;
}

```

