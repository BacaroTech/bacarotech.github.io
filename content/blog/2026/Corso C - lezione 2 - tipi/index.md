+++
title = "Corso C - lezione 2 - tipi"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 2 - tipi.c

```c
/*
TIPI
quanti sono
variabili di template
esempi
spoiler: tipi custom
*/

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

