+++
title = "CodingLeetCode - 1603 - Design Parking System"
date = 2026-02-25T14:00:38Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Design a parking system for a parking lot.
> The parking lot has three types of parking spaces: big, medium, and small.
> Each type has a fixed number of slots.

> Implement the ParkingSystem class:

> ParkingSystem(int big, int medium, int small)
> bool addCar(int carType)

Possiamo risolvere questo problema modellando direttamente lo stato del parcheggio, come nel codice proposto.

L’idea chiave è:

- memorizziamo il numero di posti disponibili per ogni tipo di auto: big, medium, small
- nel costruttore inizializziamo la disponibilità di ciascuna categoria
- quando arriva una richiesta addCar(carType):
    - se il tipo è 1 (big) e c’è disponibilità, decrementiamo e ritorniamo true
    - se il tipo è 2 (medium) e c’è disponibilità, decrementiamo e ritorniamo true
    - se il tipo è 3 (small) e c’è disponibilità, decrementiamo e ritorniamo true
    - se non c’è spazio disponibile per quel tipo, ritorniamo false

Questo approccio permette di ottenere una complessità O(1) per ogni operazione, ed è efficiente perché rappresenta direttamente lo stato del sistema senza strutture dati aggiuntive o logica complessa.

```typescript
class ParkingSystem {
    big: number;
    medium: number;
    small: number;

    constructor(big: number, medium: number, small: number) {
        this.big = big;
        this.medium = medium;
        this.small = small;
    }

    addCar(carType: number): boolean {
        if(carType == 1 && this.big > 0){
            this.big--;
            return true;
        }
        if(carType == 2 && this.medium > 0){
            this.medium--;
            return true;
        }
        if(carType == 3 && this.small > 0){
            this.small--;
            return true;
        }
        return false;
    }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
```

