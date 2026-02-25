+++
title = "AlgoritmiTeoria - 5 - map"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## map.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: MYMAP
──────────────────────────────
La **MyMap** è una struttura dati che implementa il concetto di 
**mappa (o dizionario)**:  
➡ Consente di memorizzare e recuperare coppie **chiave-valore** 
in modo rapido ed efficiente.  

È ideale per scenari dove occorre associare un identificatore 
a un valore, ad esempio:  
- rubrica telefonica (nome → numero),  
- cache di dati,  
- configurazioni applicative.  

──────────────────────────────
  STRUTTURA INTERNA
──────────────────────────────
- Utilizza un **array** come struttura sottostante.  
- Una **funzione di hash** converte la chiave in un indice dell’array.  
- In caso di collisione (più chiavi con stesso indice), viene 
utilizzato il **chaining** → ogni bucket contiene una lista di coppie 
`[chiave, valore]`.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `set(key, value)` → inserisce una nuova coppia o aggiorna il valore se la chiave esiste già.  
- `get(key)` → restituisce il valore associato a una chiave, oppure `undefined` se non trovata.  
- `has(key)` → verifica se una chiave è presente nella mappa (true/false).  
- `delete(key)` → rimuove una coppia chiave-valore, restituisce `true` se eliminata, altrimenti `false`.  
- `keys()` → restituisce un array contenente tutte le chiavi.  
- `values()` → restituisce un array contenente tutti i valori.  
- `size()` → restituisce il numero totale di coppie presenti.  
- `clear()` → rimuove tutte le coppie chiave-valore.  

──────────────────────────────
  PRESTAZIONI
──────────────────────────────
- `set` → **O(1)** in media, **O(n)** in caso di collisioni estreme.  
- `get` → **O(1)** in media, **O(n)** in caso di collisioni estreme.  
- `has` → **O(1)** in media.  
- `delete` → **O(1)** in media.  
- `keys` / `values` → **O(n)** (serve attraversare tutti i bucket).  

➡ La mappa è molto efficiente per la maggior parte delle operazioni, 
ma la qualità della funzione di hash influisce notevolmente sulle prestazioni.  

──────────────────────────────
  NOTE
──────────────────────────────
- È concettualmente simile alla `Map` nativa di JavaScript.  
- L’efficienza dipende dal **load factor** e dalla funzione di hash.  
- Possibili estensioni:  
  • gestione dinamica della dimensione dell’array,  
  • funzioni hash più robuste,  
  • gestione di valori complessi come oggetti o array.  
*/

type Entry<K, V> = { key: K, value: V };

class MyMap<K extends string | number, V> {
    private buckets: Entry<K, V>[][] = [];
    private bucketCount: number = 10;
    private sizeCount = 0;

    /**
     * Costruttore
     * @param bucketCount numero massimo di elmenti che può ospitare la mappa
     */
    constructor(bucketCount = 10) {
        this.bucketCount = bucketCount;
        this.buckets = Array.from({ length: bucketCount }, () => []);
    }

    /**
     * Funzione hash che calcola, partendo da una key, il suo hash, e quindi, il suo indice all'interno della tabella
     * @param key da calcolare l'hash
     * @returns hash/indice
     */
    private hash(key: K): number {
        let hash = 0;
        const strKey = key.toString();
        for (let i = 0; i < strKey.length; i++) {
            hash += strKey.charCodeAt(i);
        }
        return hash % this.bucketCount;
    }

    /**
     * Inserisce per una certa chiave un certo valore
     * @param key 
     * @param value 
     */
    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index]!;
        const existing = bucket.find(entry => entry.key === key);
        if (existing) {
            existing.value = value;
        } else {
            bucket.push({ key, value });
            this.sizeCount++;
        }
    }

    /**
     * Restituisce il valore associato a una certa chiave
     * @param key 
     * @returns valore, se esiste, altrimenti undefined
     */
    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index]!;
        const entry = bucket.find(entry => entry.key === key);
        return entry?.value;
    }

    /**
     * Verifica se esiste una specifica chiave all'interno della tabella hash
     * @param key chiave da verificare
     * @returns true se esiste, false altrimenti
     */
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Cancella una chiave, e quindi anche il suo valore, dalla tabella hash
     * @param key chiave da eliminare
     * @returns true se la cancellazione è andata a buon fine, false altrimenti(es elemento non presente)
     */
    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index]!;
        const entryIndex = bucket.findIndex(entry => entry.key === key);
        if (entryIndex >= 0) {
            bucket.splice(entryIndex, 1);
            this.sizeCount--;
            return true;
        }
        return false;
    }

    /**
     * Restituisce l'array con tutte le key
     * @returns array con tutte le key
     */
    keys(): K[] {
        const allKeys: K[] = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                allKeys.push(entry.key);
            }
        }
        return allKeys;
    }

    /**
     * Restituisce l'array con tutti i valori associati
     * @returns array con tutti i valori associati
     */
    values(): V[] {
        const allValues: V[] = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                allValues.push(entry.value);
            }
        }
        return allValues;
    }

    /**
     * Stampa tutta la tabella hash, sia le chiavi che i valori
     */
    printAll(): void {
        this.buckets.forEach((insert: Entry<K, V>[]) => {
            if(insert.length != 0){
                console.log(insert);
            }
        })
    }

    /**
     * Calcola la dimensione effettiva della tabella hash
     * @returns dimensione effettiva della tabella hash
     */
    size(): number {
        return this.sizeCount;
    }

    /**
     * Reset completo della tabella hash 
     */
    clear(): void {
        this.buckets = Array.from({ length: this.bucketCount }, () => []);
        this.sizeCount = 0;
    }
}

// Test
const myMap = new MyMap<string, any>();
myMap.set("name", "Alice");
myMap.set("age", 25);
myMap.set("country", "Italy");
myMap.printAll();

console.log("Ricerca 'name':", myMap.get("name"));
console.log("Has 'age':", myMap.has("age"));
console.log("Size:", myMap.size());

myMap.delete("country");
myMap.printAll();
console.log("Has 'country' dopo delete:", myMap.has("country"));

myMap.clear();
console.log("Size dopo clear:", myMap.size());


```

## tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "../dist/map",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}

```

