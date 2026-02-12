# bacarotech.github.io

## Cosa ti serve per cominciare

- da [questo sito](https://github.com/gohugoio/hugo/releases) scaricare la versione '_extended' più recente, compatibile con il vostro sistema operativo
- seguire da [questa pagina](https://github.com/gohugoio/hugo?tab=readme-ov-file#installation) la guida per l'installazione di hugo, go ed npm

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

NB: il sito è dotato di Hot realod, quindi non è necessario ricompilare ogni volta lo stesso dopo qualsiasi modifica

## Utility e creazione nuovi post

Perché ricordarsi tutti i comandi e come funzionano le cose é un casino, sono stati predisposti dei comandi make utili per la creazione di nuovi post.
Una volta installato é possibile lanciare il seguente comando e rispondere alle sue domande per generare un nuovo post e, se necessario, il file ics collegato

~~~ bash
make new
~~~

seguire lo step successivo per la creazione completa del post

## Scrivere un post

Una volta creato il post (vedi punto prima) é possibile iniziare la scrittura del post.
Ogni post é diviso in due parti:

- Una prima parte, autogenerata da Hugo, che ha i metadati del post ([documentazione](https://gohugo.io/content-management/shortcodes/#embedded)) e che va completata in base al post
- Una seconda parte, vuota, che altro non é che il corpo del post, che usa delle parole chiave generate da Hugo e il markdown github ([documentazione della sintassi](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax))

Avviso che il metadata __*draft*__ é quello che comanda per la pubblicazione del post

## Social e Contatti

Se hai dei consigli facci sapere!
- 🌳 [Linkedin](https://www.linkedin.com/company/bacarotech)
- 📷 [Instagram](https://www.instagram.com/bacarotechofficial/)
- 🎵 [TikTok](https://www.tiktok.com/@bacarotech)
- 🎥 [Youtube](https://www.youtube.com/@Bacarotech)
- 📫 Email: **bacarotech@gmail.com**