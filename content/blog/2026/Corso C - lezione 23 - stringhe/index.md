+++
title = "Corso C - lezione 23 - stringhe"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 23 - stringhe.c

```c
/*
STRING IN C
- cosa sono?
- come manipolarle?
- come ierargirci?
- string.h -> libreria per le stringhe
*/

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

