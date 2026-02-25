+++
title = "Corso C - lezione 4 - if else"
date = 2026-02-25T14:00:46Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 4 - if else.c

```c
/*
IF
cosa sono
programma a cascata/programma decisionale
struttura
uso
*/

#include <stdio.h>

int main()
{
    // l'else negli if è opzionale
    // il codice che si trova prima e dopo di un if verrà eseguito sempre => codice in comune
    // dentro gli if ed else => codice specifico

    /*
    = -> assegnamento => c = 5;
    == -> confronto matematico => 4 == 5(falso) oppure 5 == 5(vero)
    */

    /*if(codizione){ -> codizione booleana: > < >= <= == !=
        ...codice
        ...codice
        ...codice
    }else{
        ...codice
        ...codice
        ...codice
    }*/

    // stampa se il numero è pari o meno
    int n = 4;
    //%2 -> la divisione tramite resto => 5/2 = 2, 1 che è il resto => 5%2 = 1
    if (n % 2 == 0)
    {
        // 1 dispari
        // 0 pari
        printf("il numero %d è pari", n);
    }
    else
    {
        printf("il numero %d è dispari", n);
    }

    return 0;
}

```

