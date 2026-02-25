+++
title = "Corso C - lezione 7 - esercizi sulle tabelle di verita"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 7 - esercizi sulle tabelle di verita.c

```c
/*
ESERCIZI SULLE TABELLE DI VERITA'
*/

#include <stdio.h>

int main()
{
    // ES 1:
    /*
    Un utente può entrare in una stanza solo se ha la chiave e conosce il codice di sicurezza.
    Usare l’operatore AND per determinare se l’accesso è consentito.
    */
    int codice = 123;
    int codice_input;
    int chiave_input;

    printf("hai la chiave? (0/1)");
    scanf("%d", &chiave_input);

    printf("inserisci il codice");
    scanf("%d", &codice_input);

    if (chiave_input == 1 && codice_input == codice)
    {
        printf("accesso consentito");
    }
    else
    {
        printf("accesso non consentito");
    }

    // ES 2:
    /*
    Una persona può guidare un’auto se ha la patente oppure è accompagnata da un istruttore.
    Usare OR per stabilire se può guidare.
    */
    int presenza_patente = 0;
    int presenza_istruttore = 1;
    if (presenza_patente || presenza_istruttore)
    {
        printf("può guidare");
    }
    else
    {
        printf("non può guidare");
    }

    // ES 3:
    /*
    Un allarme deve scattare solo se la finestra è aperta e non c’è una persona autorizzata in casa.
    Usare NOT e AND.
    */
    int finestra_aperta = 0;
    int persona_autoizzata_presente = 1;

    if (finestra_aperta && !persona_autoizzata_presente)
    {
        printf("allarme in funzione");
    }
    else
    {
        printf("allarme spento");
    }

    return 0;
}
```

