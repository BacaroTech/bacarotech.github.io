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

# IF

Nel linguaggio C, le istruzioni condizionali permettono di controllare il flusso del programma in base a determinate condizioni. L’istruzione più comune per questo scopo è l’if, che consente di eseguire porzioni di codice solo quando una certa condizione risulta vera.

## COSA SONO

Gli if sono costrutti decisionali che valutano un’espressione logica. Se il risultato della valutazione è vero, il programma esegue un certo blocco di istruzioni; in caso contrario, quel blocco viene saltato.

## PROGRAMMA A CASCATA/PROGRAMMA DECISIONALE

Un programma a cascata è caratterizzato da una sequenza lineare di istruzioni eseguite una dopo l’altra. Un programma decisionale, invece, introduce delle biforcazioni nel flusso, permettendo di scegliere tra più percorsi possibili in base a condizioni diverse. Gli if sono lo strumento principale per realizzare questa logica decisionale.

## STRUTTURA

La struttura di un if in C prevede una condizione racchiusa tra parentesi e un blocco di istruzioni che viene eseguito solo se la condizione è soddisfatta. È possibile estendere questa struttura con ulteriori controlli alternativi, creando catene decisionali più articolate.

## USO

Gli if vengono utilizzati ogni volta che è necessario prendere decisioni all’interno di un programma, ad esempio per controllare input, gestire errori o determinare comportamenti diversi in base ai dati. Sono fondamentali per rendere un programma dinamico e adattabile a situazioni diverse.

## CODICE
```c
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

