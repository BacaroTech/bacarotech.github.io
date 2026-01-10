# bacarotech.github.io

All'interno di questa repo potrai trovare:
1. Il nostro sito, che puoi trovare nella main folder: https://bacarotech.github.io/
2. Il nostro tree link realizzato, senza tool esterni, sotto la cartella link: https://bacarotech.github.io/link/

La metodologia che abbiamo scelto è quella frameworkless, ovvero lavorare senza l’utilizzo di framework o librerie esterne (ad eccezione di Tailwind, adottata solo come libreria grafica).

Si tratta di un approccio molto sfidante che, in senso positivo, ti costringe a sfruttare al massimo le potenzialità del linguaggio di riferimento – nel nostro caso HTML e CSS. Lo stesso principio si può applicare anche ad altri linguaggi in contesti analoghi.

È un ottimo esercizio per ripassare le basi e consolidare le proprie competenze, soprattutto oggi che, grazie alle librerie esterne, molti passaggi vengono dati per scontati.

## Social e Contatti
Se hai dei consigli facci sapere!
- 🌳 [Link Tree Homemade](https://bacarotech.github.io/)
- 📷 [Instagram](https://www.instagram.com/bacarotechofficial/)
- 🎵 [TikTok](https://www.tiktok.com/@bacarotech)
- 🎥 [Youtube](https://www.youtube.com/@Bacarotech)
- 📫 Email: **bacarotech@gmail.com**


## Dev

Per lanciare il sito in dev devi prima lanciare il comando per le dipendenze (lo fai solo la prima volta)

~~~ bash
make install
~~~

o se non hai make

~~~ bash
npm install
hugo mod get -u
~~~

## Lanciare il sito in locale

Fatto questo con il comando qui sotto lanci il sito in locale. Il log ti dice anche a che indirizzo é disponibile in locale

~~~ bash
make run
~~~

o se non hai make 

~~~ bash
hugo server --disableFastRender --renderToMemory
~~~ 
