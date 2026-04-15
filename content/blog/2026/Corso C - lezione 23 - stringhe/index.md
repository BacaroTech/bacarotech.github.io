+++
title = "Corso C - lezione 23 - stringhe"
date = 2026-02-25T14:01:05Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# STRING IN C

Nel linguaggio C, le stringhe non sono un tipo di dato primitivo, ma vengono rappresentate come array di caratteri terminati da un carattere speciale che indica la fine della sequenza.

## COSA SONO?

Una stringa è una sequenza di caratteri memorizzata in memoria in modo contiguo. La sua particolarità è la presenza di un terminatore finale che segnala dove la stringa finisce, permettendo alle funzioni di riconoscerne la lunghezza.

## COME MANIPOLARLE?

Le stringhe in C possono essere manipolate lavorando direttamente sui singoli caratteri oppure utilizzando funzioni dedicate. È possibile copiarle, confrontarle, concatenarle o calcolarne la lunghezza, sempre tenendo conto della gestione manuale della memoria.

## COME INTERAGIRCI?

Per interagire con le stringhe è possibile leggerle da input, modificarle o stamparle a schermo. Questo avviene trattandole come array di caratteri e utilizzando funzioni di input/output o operazioni sui singoli elementi.

## STRING.H -> LIBRERIA PER LE STRINGHE

Il linguaggio C mette a disposizione una libreria standard dedicata alle stringhe, che include funzioni utili per semplificare le operazioni più comuni. Questa libreria permette di evitare di implementare manualmente operazioni frequenti, rendendo il codice più semplice e leggibile.

## CODICE
```c
#include <stdio.h>
#include <string.h>

void stampaPerCarattere(char str[]){
    //stampa per carattere
    int i = 0;
    while(str[i] != '\0'){
        printf("%c ", str[i]);
        i++;
    }
    printf("\n");
}

int main() {
    //definizione
    char str[] = "Giorgio1"; //['G', 'i', ... '\0']
    char str2[10] = "Giorgio2";
    char str3[20];

    //leggere
    //scanf("%s", str3);

    //stampare
    printf("%s %s %s\n", str, str2, str3);
    stampaPerCarattere(str);

    //strcmp(str1, str2) -> int (<0, 0, >0)ù
    //<0 quando la str1 viene prima di str2 in ordine alfabetico
    //0 quando le stringhe sono uguali
    //>0 quando la str2 viene prima di str1 in ordine alfabetico

    if(strcmp(str, str2) == 0){
        printf("stringhe uguali\n");
    }else{
        printf("stringhe diverse\n");
    }

    //strcpy(dest, src)
    strcpy(str3, str2);
    printf("%s %s %s\n", str, str2, str3);
    
    
    return 0;
}
```

