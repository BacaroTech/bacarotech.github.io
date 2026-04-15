+++
title = "DesignPatternTeoria - Creational - factory method"
date = 2026-02-25T14:01:08Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["DesingPatternTeoria"]
+++

# DESIGN PATTERN: FACTORY METHOD

Il Factory Method è un pattern creazionale che definisce un'interfaccia
per la creazione di oggetti, delegando alle sottoclassi la decisione
su quale classe concreta istanziare.

Questo approccio separa la logica di creazione dal codice che utilizza
gli oggetti, migliorando flessibilità e manutenibilità.

## QUANDO UTILIZZARLO

- Quando non conosci a priori la classe concreta da istanziare.
- Quando vuoi centralizzare la logica di creazione degli oggetti.
- Quando desideri ridurre le dipendenze dirette da classi specifiche.

## VANTAGGI

- **Separazione delle responsabilità**: isola la logica di istanziazione dal codice client.
- **Estendibilità**: per supportare nuovi tipi di oggetti basta estendere la factory.
- **Open/Closed Principle**: il codice client dipende da interfacce, non da implementazioni concrete.
- **Codice più pulito e modulare**: la creazione è incapsulata.

## POTENZIALI SVANTAGGI

- Potrebbe richiedere molte sottoclassi o rami condizionali per gestire vari tipi di oggetti.
- Non è ottimale per oggetti con numerose varianti di configurazione.
- L'aggiunta di nuovi tipi può richiedere modifiche alla factory esistente.

## CODICE
```typescript
/**
 * Interfaccia di base(necessaria)
 */
interface Notifica {
    invia(messaggio: string): void;
}

/**
 * Classi specializzate che implementano l'interfaccia di partenza
 */
class NotificaEmail implements Notifica {
    //Override del metodo
    invia(messaggio: string): void {
        console.log(`Invio email con messaggio: ${messaggio}`);
    }
}

/**
 * Classi specializzate che implementano l'interfaccia di partenza
 */
class NotificaSMS implements Notifica {
    //Override del metodo
    invia(messaggio: string): void {
        console.log(`Invio SMS con messaggio: ${messaggio}`);
    }
}

/**FACTORY
* Andremo a eseguire le new passando per il metodo statico della factory
* Deleghiamo come avviene la creazione/costruzione dell'oggetto alla factory
* Per funzionare le classi devono avere un padre comune(interfaccia o classe)
*/
class NotificaFactory {
    static creaNotifica(tipo: string) {
        switch (tipo) {
            case "email":
                return new NotificaEmail();
            case "sms":
                return new NotificaSMS();
            default:
                throw new Error("Tipo di notifica non supportato");
        }
    }
}

//USO FACORY
//Nelle righe a seguire io non so come viene creata una notifica -> delego questa logica alla 'NotificaFactory'
let notifica = NotificaFactory.creaNotifica("sms");
notifica.invia("Ciao utente!");
notifica = NotificaFactory.creaNotifica("email");
notifica.invia("Come stai?");

```
