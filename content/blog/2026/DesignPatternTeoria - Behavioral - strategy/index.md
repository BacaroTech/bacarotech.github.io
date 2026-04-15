+++
title = "DesignPatternTeoria - Behavioral - strategy"
date = 2026-02-25T14:01:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++


# DESIGN PATTERN: STRATEGY

Lo Strategy è un pattern comportamentale che permette di definire una 
famiglia di algoritmi, incapsularli e renderli intercambiabili a runtime 
senza modificare il contesto che li utilizza.  
In pratica, consente di cambiare il "comportamento" di un oggetto in modo flessibile.

## QUANDO USARLO

- Più algoritmi alternativi devono essere scelti dinamicamente.
- Vuoi evitare lunghi `if-else` o `switch-case` pieni di logica condizionale.
- Vuoi rispettare l'Open/Closed Principle: estendere il comportamento senza modificare il codice esistente.

## VANTAGGI

- Possibilità di aggiungere nuovi algoritmi senza modificare il codice principale.
- Migliora leggibilità eliminando `if/switch` complessi.
- Promuove la composizione invece dell'ereditarietà.
- Algoritmi intercambiabili a runtime.

## POTENZIALI SVANTAGGI

- Aumenta il numero di classi/funzioni (una per strategia).
- Il contesto deve conoscere l'interfaccia comune.
- Più complesso rispetto a una semplice funzione inline per problemi banali.

## CODICE
```typescript
/**
 * Strategy astratta comune
 */
interface Strategy {
    esegui(a: number, b: number): number;
}

/**
 * Strategy concrete
 */
class StrategiaAddizione implements Strategy {
    esegui(a: number, b: number): number {
        return a + b;
    }
}

/**
 * Strategy concrete
 */
class StrategiaSottrazione implements Strategy {
    esegui(a: number, b: number): number {
        return a - b;
    }
}

/**
 * Strategy concrete
 */
class StrategiaMoltiplicazione implements Strategy {
    esegui(a: number, b: number): number {
        return a * b;
    }
}

/**
 * STRATEGY
 * Classe che utilizza una strategia interna
 */
class Calcolatrice {
    private StrategiaCalcolo: Strategy;

    constructor(strategia: Strategy) {
        this.StrategiaCalcolo = strategia;
    }

    setStrategia(strategia: Strategy): void {
        this.StrategiaCalcolo = strategia;
    }

    eseguiStrategia(a: number, b: number): number {
        return this.StrategiaCalcolo.esegui(a, b);
    }
}

// USO STRATEGY
const calcolatrice = new Calcolatrice(new StrategiaAddizione());
console.log("Risultato:", calcolatrice.eseguiStrategia(5, 3));

calcolatrice.setStrategia(new StrategiaSottrazione());
console.log("Risultato:", calcolatrice.eseguiStrategia(5, 3));

calcolatrice.setStrategia(new StrategiaMoltiplicazione());
console.log("Risultato:", calcolatrice.eseguiStrategia(5, 3));

```
