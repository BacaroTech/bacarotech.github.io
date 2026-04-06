+++
title = "DesignPatternTeoria - Behavioral - state"
date = 2026-02-25T14:01:07Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++


# DESIGN PATTERN: STATE

Lo State è un pattern comportamentale che permette a un oggetto di 
modificare il proprio comportamento quando cambia il suo stato interno.  
È come se l'oggetto cambiasse "classe" in modo dinamico.


## QUANDO USARLO

- Un oggetto deve cambiare comportamento in base al suo stato.
- Vuoi evitare grandi istruzioni `if` o `switch` che controllano lo stato.
- Vuoi centralizzare i comportamenti di uno stato in una classe dedicata.


## VANTAGGI

- Elimina `if-else` o `switch-case` complessi.
- Ogni stato è isolato in una classe separata (Single Responsibility Principle).
- Facile aggiungere nuovi stati senza modificare quelli esistenti.
- Migliora leggibilità e manutenzione del codice.


## POTENZIALI SVANTAGGI

- Aumenta il numero di classi nel sistema.
- Può risultare eccessivo per macchine a stati semplici.

## CODICE

```typescript
/**
 * Classe con internamente il riferimento a uno degli stati esterni
 */
class Semaforo {
    //Determino solo che esiste uno stato, non mi interessa la logica di aggiornamento
    private stato: StatoSemaforo = new Rosso();

    aggiornataStato(): void {
        this.stato = this.stato.cambia();
    }

    getStato(): void {
        this.stato.mostra();
    }
}

/**
 * STATE
 * State interfaccia comune
 */
interface StatoSemaforo {
    cambia(): StatoSemaforo;
    mostra(): void;
}

/**
 * Stati concreto => Rosso 
 * Slego il cambio stato dalla "classe con stato" agli "stati effettivi"
 */
class Rosso implements StatoSemaforo {
    cambia(): StatoSemaforo {
        console.log('Cambio da ROSSO a VERDE');
        return new Verde();
    }

    mostra(): void {
        console.log('Rosso: STOP');
    }
}

/**
 * Stati concreto => Verde 
 * Slego il cambio stato dalla "classe con stato" agli "stati effettivi"
 */
class Verde implements StatoSemaforo {
    cambia(): StatoSemaforo {
        console.log('Cambio da VERDE a GIALLO');
        return new Giallo();
    }

    mostra(): void {
        console.log('Verde: VAI');
    }
}

/**
 * Stati concreto => Giallo 
 * Slego il cambio stato dalla "classe con stato" agli "stati effettivi"
 */
class Giallo implements StatoSemaforo {
    cambia(): StatoSemaforo {
        console.log('Cambio da GIALLO a ROSSO');
        return new Rosso();
    }

    mostra(): void {
        console.log('Giallo: ATTENZIONE');
    }
}

// USO STATE
const semaforo = new Semaforo();

semaforo.getStato();
semaforo.aggiornataStato();

semaforo.getStato();
semaforo.aggiornataStato();

semaforo.getStato();
semaforo.aggiornataStato();

```
