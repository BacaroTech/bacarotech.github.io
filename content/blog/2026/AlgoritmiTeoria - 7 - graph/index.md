+++
title = "AlgoritmiTeoria - 7 - graph"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'json', 'typescript']
authors = []
series = ["AlgoritmiTeoria"]
+++

## maximumFlow/edmondsKarp.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: EDMONDS-KARP
──────────────────────────────
L’**algoritmo di Edmonds-Karp** è una specifica implementazione 
dell’**algoritmo di Ford-Fulkerson** per il calcolo del flusso massimo 
in un grafo connesso e pesato.  
La differenza principale è l’uso della **ricerca in ampiezza (BFS)** per trovare i percorsi aumentanti.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco con Capacità (Capacity Edge)** → connessione tra due vertici con capacità massima.  
- **Flusso (Flow)** → quantità di risorsa trasportata lungo un arco.  
- **Percorso Aumentante (Augmenting Path)** → percorso dalla sorgente al pozzo con capacità residua disponibile.  
- **Sorgente (Source)** → nodo iniziale del flusso.  
- **Pozzo / Destinazione (Sink)** → nodo finale del flusso.  

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Inizializza il flusso di tutti gli archi a 0.  
2. Usa **BFS** per trovare il percorso aumentante più corto (minimo numero di archi) dalla sorgente alla destinazione.  
3. Determina il flusso massimo possibile lungo questo percorso (minima capacità residua).  
4. Aggiorna il flusso lungo gli archi diretti e inversi del percorso.  
5. Ripeti finché non esistono più percorsi aumentanti.  

──────────────────────────────
  STRUTTURE DI SUPPORTO
──────────────────────────────
- **Grafo con capacità residua** → memorizza capacità disponibili sugli archi.  
- **Coda per BFS** → utilizzata per individuare il percorso aumentante più breve.  

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Tempo → **O(V * E²)** nel caso peggiore.  
- Spazio → **O(V + E)** per memorizzare il grafo e le capacità residue.  

──────────────────────────────
  ESEMPIO DI UTILIZZO
──────────────────────────────
Grafo con capacità:
S → A(10), S → B(5), A → B(15), A → T(10), B → T(10)

Passaggi:
1. BFS trova percorso S-A-T → flusso = 10  
2. Aggiorna capacità residua → S-A(0), A-T(0)  
3. BFS successivo trova percorso S-B-T → flusso = 5  
4. Nessun altro percorso aumentante → algoritmo termina  

Flusso massimo = 15

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- **Reti di comunicazione** → massimizzare il throughput.  
- **Reti di trasporto** → flusso di merci o dati.  
- **Sistemi di gestione delle risorse** → allocazione ottimale del flusso.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Garantisce percorsi aumentanti più brevi, riducendo il numero di iterazioni rispetto a DFS.  
- Complessità prevedibile **O(V * E²)**.  
- Basato su concetti intuitivi di percorsi aumentanti e capacità residua.  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Inefficiente su grafi molto grandi rispetto a versioni avanzate come Push-Relabel.  
- Richiede capacità non negative lungo gli archi.  
- Complessità dipendente da numero di archi e vertici.  
*/


import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * BFS ausiliaria per Edmonds-Karp
 * Ritorna true se esiste un percorso aumentante, aggiornando parent
 */
function bfsEK<E>(
    graph: DirectedGraph<E>,
    source: E,
    sink: E,
    parent: Map<E, E>,
    residualCapacity: Map<E, Map<E, number>>
): boolean {
    const visited = new Set<E>();
    const queue: E[] = [];

    queue.push(source);
    visited.add(source);

    while (queue.length > 0) {
        const u = queue.shift()!;
        const edges = graph.getAdjacencyList().get(u) || [];

        for (const edge of edges) {
            const v = edge.nodo;
            const cap = residualCapacity.get(u)?.get(v) ?? 0;

            if (!visited.has(v) && cap > 0) {
                queue.push(v);
                visited.add(v);
                parent.set(v, u);

                if (v === sink) return true; // trovato percorso aumentante
            }
        }
    }

    return false;
}

/**
 * Algoritmo di Edmonds-Karp per trovare il flusso massimo
 * @param graph Grafo orientato pesato
 * @param source Nodo sorgente
 * @param sink Nodo pozzo
 * @returns Flusso massimo dal source al sink
 */
export function edmondsKarp<E>(
    graph: DirectedGraph<E>,
    source: E,
    sink: E
): number {
    const vertices = Array.from(graph.getAdjacencyList().keys());
    const residualCapacity: Map<E, Map<E, number>> = new Map();

    // Inizializzazione capacità residua
    for (const u of vertices) {
        residualCapacity.set(u, new Map<E, number>());
        const edges = graph.getAdjacencyList().get(u) || [];
        for (const edge of edges) {
            residualCapacity.get(u)!.set(edge.nodo, edge.peso);
        }
    }

    const parent = new Map<E, E>();
    let maxFlow = 0;

    // Continua finché esistono percorsi aumentanti trovati dalla BFS
    while (bfsEK(graph, source, sink, parent, residualCapacity)) {
        // Trova capacità residua minima lungo il percorso
        let pathFlow = Infinity;
        let v = sink;
        while (v !== source) {
            const u = parent.get(v)!;
            pathFlow = Math.min(pathFlow, residualCapacity.get(u)!.get(v)!);
            v = u;
        }

        // Aggiorna capacità residua
        v = sink;
        while (v !== source) {
            const u = parent.get(v)!;

            // Sottrae capacità dal percorso diretto
            residualCapacity.get(u)!.set(v, residualCapacity.get(u)!.get(v)! - pathFlow);

            // Aggiorna capacità inversa
            if (!residualCapacity.get(v)!.has(u)) residualCapacity.get(v)!.set(u, 0);
            residualCapacity.get(v)!.set(u, residualCapacity.get(v)!.get(u)! + pathFlow);

            v = u;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}

// =============================
// Creazione del grafo
// =============================
const grafo = new DirectedGraph<string>();

// Aggiunta degli archi (orientati e pesati)
grafo.aggiungiArco('S', 'A', 10);
grafo.aggiungiArco('S', 'B', 5);
grafo.aggiungiArco('A', 'B', 15);
grafo.aggiungiArco('A', 'C', 10);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 10);
grafo.aggiungiArco('C', 'T', 10);
grafo.aggiungiArco('D', 'T', 10);

// Visualizza il grafo
console.log("Grafo orientato pesato:");
grafo.display();

// =============================
// Calcolo del flusso massimo
// =============================
const source = 'S';
const sink = 'T';

const flussoMassimo = edmondsKarp(grafo, source, sink);
console.log(`\nFlusso massimo da ${source} a ${sink}:`, flussoMassimo);
```

## maximumFlow/fordFulkerson.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: FORD-FULKERSON
──────────────────────────────
L’**algoritmo di Ford-Fulkerson** calcola il **flusso massimo** in un grafo **connesso e pesato**, 
dove i pesi rappresentano le capacità massime degli archi.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco con Capacità (Capacity Edge)** → connessione tra due vertici con capacità massima.  
- **Flusso (Flow)** → quantità di risorsa trasportata lungo un arco.  
- **Percorso Aumentante (Augmenting Path)** → percorso dalla sorgente al pozzo con capacità residua disponibile.  
- **Sorgente (Source)** → nodo iniziale del flusso.  
- **Pozzo / Destinazione (Sink)** → nodo finale del flusso.  

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Inizializza il flusso di tutti gli archi a 0.  
2. Cerca un **percorso aumentante** dalla sorgente alla destinazione con capacità residua > 0.  
3. Determina il **flusso massimo possibile** lungo questo percorso (minima capacità residua).  
4. Aumenta il flusso sugli archi del percorso di questa quantità.  
5. Aggiorna le capacità residue lungo gli archi diretti e inversi.  
6. Ripeti finché non esistono più percorsi aumentanti.  

──────────────────────────────
  STRUTTURE DI SUPPORTO
──────────────────────────────
- **Grafo con capacità residua** → memorizza capacità disponibili lungo gli archi.  
- **Algoritmo di ricerca** → BFS (Edmonds-Karp) o DFS per trovare percorsi aumentanti.  

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Dipende dalla scelta della tecnica di ricerca:  
  - Con BFS (Edmonds-Karp) → **O(V * E²)**  
  - Con DFS → complessità può variare e dipende dai valori dei flussi.  
- Spazio → **O(V + E)** per memorizzare il grafo e le capacità residue.  

──────────────────────────────
  ESEMPIO DI UTILIZZO
──────────────────────────────
Grafo con capacità:
S → A(10), S → B(5), A → B(15), A → T(10), B → T(10)

Passaggi:
1. Percorso aumentante: S-A-T → flusso = min(10, 10) = 10  
2. Aggiornamento capacità residue: S-A(0), A-T(0)  
3. Percorso aumentante successivo: S-B-T → flusso = min(5, 10) = 5  
4. Nessun altro percorso aumentante disponibile → algoritmo termina.  

Flusso massimo = 10 + 5 = 15

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- **Reti di comunicazione** → massimizzare il throughput.  
- **Trasporto di risorse** → flusso di merci o acqua in reti distribuite.  
- **Flusso di dati su reti informatiche**.  
- Pianificazione e ottimizzazione in sistemi logistici.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Calcolo semplice del flusso massimo in grafi con capacità note.  
- Basato su concetti intuitivi di percorsi aumentanti e capacità residua.  
- Adattabile a varie strategie di ricerca (BFS, DFS).  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Può essere inefficiente su grafi grandi se non si usa BFS (Edmonds-Karp).  
- Richiede capacità non negative lungo gli archi.  
- La scelta della tecnica di ricerca influisce fortemente sulle prestazioni.  
*/
/*
──────────────────────────────
  ALGORITMO: FORD-FULKERSON
──────────────────────────────
L’**algoritmo di Ford-Fulkerson** calcola il **flusso massimo** in un grafo **connesso e pesato**, 
dove i pesi rappresentano le capacità massime degli archi.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco con Capacità (Capacity Edge)** → connessione tra due vertici con capacità massima.  
- **Flusso (Flow)** → quantità di risorsa trasportata lungo un arco.  
- **Percorso Aumentante (Augmenting Path)** → percorso dalla sorgente al pozzo con capacità residua disponibile.  
- **Sorgente (Source)** → nodo iniziale del flusso.  
- **Pozzo / Destinazione (Sink)** → nodo finale del flusso.  

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Inizializza il flusso di tutti gli archi a 0.  
2. Cerca un **percorso aumentante** dalla sorgente alla destinazione con capacità residua > 0.  
3. Determina il **flusso massimo possibile** lungo questo percorso (minima capacità residua).  
4. Aumenta il flusso sugli archi del percorso di questa quantità.  
5. Aggiorna le capacità residue lungo gli archi diretti e inversi.  
6. Ripeti finché non esistono più percorsi aumentanti.  

──────────────────────────────
  STRUTTURE DI SUPPORTO
──────────────────────────────
- **Grafo con capacità residua** → memorizza capacità disponibili lungo gli archi.  
- **Algoritmo di ricerca** → BFS (Edmonds-Karp) o DFS per trovare percorsi aumentanti.  

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Dipende dalla scelta della tecnica di ricerca:  
  - Con BFS (Edmonds-Karp) → **O(V * E²)**  
  - Con DFS → complessità può variare e dipende dai valori dei flussi.  
- Spazio → **O(V + E)** per memorizzare il grafo e le capacità residue.  

──────────────────────────────
  ESEMPIO DI UTILIZZO
──────────────────────────────
Grafo con capacità:
S → A(10), S → B(5), A → B(15), A → T(10), B → T(10)

Passaggi:
1. Percorso aumentante: S-A-T → flusso = min(10, 10) = 10  
2. Aggiornamento capacità residue: S-A(0), A-T(0)  
3. Percorso aumentante successivo: S-B-T → flusso = min(5, 10) = 5  
4. Nessun altro percorso aumentante disponibile → algoritmo termina.  

Flusso massimo = 10 + 5 = 15

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- **Reti di comunicazione** → massimizzare il throughput.  
- **Trasporto di risorse** → flusso di merci o acqua in reti distribuite.  
- **Flusso di dati su reti informatiche**.  
- Pianificazione e ottimizzazione in sistemi logistici.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Calcolo semplice del flusso massimo in grafi con capacità note.  
- Basato su concetti intuitivi di percorsi aumentanti e capacità residua.  
- Adattabile a varie strategie di ricerca (BFS, DFS).  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Può essere inefficiente su grafi grandi se non si usa BFS (Edmonds-Karp).  
- Richiede capacità non negative lungo gli archi.  
- La scelta della tecnica di ricerca influisce fortemente sulle prestazioni.  
*/

import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * BFS ausiliaria per trovare un percorso aumentante.
 * Aggiorna il parent per risalire il percorso.
 */
function bfs<E>(
    graph: DirectedGraph<E>,
    source: E,
    sink: E,
    parent: Map<E, E>,
    residualCapacity: Map<E, Map<E, number>>
): boolean {
    const visited = new Set<E>();
    const queue: E[] = [];

    queue.push(source);
    visited.add(source);

    while (queue.length > 0) {
        const u = queue.shift()!;
        const edges = graph.getAdjacencyList().get(u) || [];

        for (const edge of edges) {
            const v = edge.nodo;
            const cap = residualCapacity.get(u)?.get(v) ?? 0;
            if (!visited.has(v) && cap > 0) {
                queue.push(v);
                visited.add(v);
                parent.set(v, u);
                if (v === sink) return true;
            }
        }
    }

    return false;
}

/**
 * Algoritmo di Ford-Fulkerson per trovare il flusso massimo in un grafo orientato pesato.
 * @param graph Grafo orientato pesato
 * @param source Nodo sorgente
 * @param sink Nodo pozzo
 * @returns Flusso massimo dal source al sink
 */
export function fordFulkerson<E>(
    graph: DirectedGraph<E>,
    source: E,
    sink: E
): number {
    const vertices = Array.from(graph.getAdjacencyList().keys());
    const residualCapacity: Map<E, Map<E, number>> = new Map();

    // Inizializzazione capacità residua
    for (const u of vertices) {
        residualCapacity.set(u, new Map<E, number>());
        const edges = graph.getAdjacencyList().get(u) || [];
        for (const edge of edges) {
            residualCapacity.get(u)!.set(edge.nodo, edge.peso);
        }
    }

    const parent = new Map<E, E>();
    let maxFlow = 0;

    // Continua finché esistono percorsi aumentanti
    while (bfs(graph, source, sink, parent, residualCapacity)) {
        // Trova capacità residua minima lungo il percorso
        let pathFlow = Infinity;
        let v = sink;
        while (v !== source) {
            const u = parent.get(v)!;
            pathFlow = Math.min(pathFlow, residualCapacity.get(u)!.get(v)!);
            v = u;
        }

        // Aggiorna capacità residua
        v = sink;
        while (v !== source) {
            const u = parent.get(v)!;

            // Sottrae capacità dal percorso diretto
            residualCapacity.get(u)!.set(v, residualCapacity.get(u)!.get(v)! - pathFlow);

            // Aggiorna capacità inversa
            if (!residualCapacity.get(v)!.has(u)) residualCapacity.get(v)!.set(u, 0);
            residualCapacity.get(v)!.set(u, residualCapacity.get(v)!.get(u)! + pathFlow);

            v = u;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}


// =============================
// Main di prova
// =============================
const grafo = new DirectedGraph<string>();

grafo.aggiungiArco('S', 'A', 10);
grafo.aggiungiArco('S', 'B', 5);
grafo.aggiungiArco('A', 'B', 15);
grafo.aggiungiArco('A', 'C', 10);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 10);
grafo.aggiungiArco('C', 'T', 10);
grafo.aggiungiArco('D', 'T', 10);

console.log("Grafo:");
grafo.display();

const flussoMassimo = fordFulkerson(grafo, 'S', 'T');
console.log("\nFlusso massimo da S a T:", flussoMassimo);


```

## maximumFlow/tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "outDir": "../../dist/graph/maximumFlow",

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "libReplacement": true,                           /* Enable lib replacement. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```

## minimumSpanningTree/kruskal.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: KRUSKAL
──────────────────────────────
L’**algoritmo di Kruskal** è utilizzato per trovare un **albero ricoprente minimo (Minimum Spanning Tree - MST)**
in un grafo **connesso e pesato**.  
L’MST collega tutti i vertici senza formare cicli e minimizza la somma dei pesi degli archi inclusi.

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con un peso associato.  
- **Albero Ricoprente (Spanning Tree)** → sottoinsieme di archi che collega tutti i vertici senza cicli.  
- **MST (Minimum Spanning Tree)** → albero ricoprente con somma minima dei pesi degli archi.  
- **Union-Find / Disjoint Set** → struttura dati per rilevare cicli durante l’inclusione degli archi.

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Ordina tutti gli archi del grafo in **ordine crescente di peso**.  
2. Inizia con un grafo MST vuoto.  
3. Per ciascun arco `(u, v)` nell’ordine ordinato:
   - Se aggiungendo l’arco **non si forma un ciclo** → includilo nel MST.  
   - Altrimenti → scartalo.  
4. Ripeti fino a includere **V - 1 archi**, dove V è il numero di vertici.  

──────────────────────────────
  STRUTTURE DI SUPPORTO
──────────────────────────────
- **Union-Find (Disjoint Set)** → per verificare rapidamente se due vertici appartengono allo stesso sottoalbero (evita cicli).  
- **Array / Lista di archi** → per ordinare gli archi in base al peso.  

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Tempo → **O(E log E)**, principalmente per l’ordinamento degli archi.  
- Spazio → **O(V + E)** per memorizzare il grafo e le strutture ausiliarie.  

──────────────────────────────
  ESEMPIO DI UTILIZZO
──────────────────────────────
Grafo con archi pesati:
A - B(4), A - C(2), B - C(1), B - D(5), C - D(3)

Passaggi:
1. Ordina gli archi: B-C(1), A-C(2), C-D(3), A-B(4), B-D(5)  
2. Inizia con MST vuoto.  
3. Include archi uno ad uno senza formare cicli:  
   - B-C(1), A-C(2), C-D(3) → MST completato  

MST finale → { B-C, A-C, C-D }, costo totale = 1 + 2 + 3 = 6

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Progettazione di **reti di telecomunicazione**.  
- Distribuzione efficiente di **risorse**.  
- Progettazione di **reti di trasporto** e infrastrutture.  
- Problemi di **ottimizzazione di costi** in grafi connessi.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Semplice e intuitivo da implementare con Union-Find.  
- Garantisce il **MST corretto** per qualsiasi grafo connesso e pesato.  
- Funziona bene anche su grafi sparsi (low density).  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Necessita che il grafo sia **connesso**.  
- Ordinamento degli archi può diventare costoso in grafi molto densi.  
- Non adatto per grafi dinamici in cui archi vengono aggiunti/rimossi frequentemente.
*/


import { NotOrientedGraph, Edge } from "../structure/notOrientedGraph";

/**
 * Struttura Union-Find (Disjoint Set Union)
 */
class UnionFind<E> {
  private parent: Map<E, E>;
  private rank: Map<E, number>;

  constructor(elements: E[]) {
    this.parent = new Map();
    this.rank = new Map();

    for (const e of elements) {
      this.parent.set(e, e);
      this.rank.set(e, 0);
    }
  }

  find(u: E): E {
    let parentU = this.parent.get(u);
    if (!parentU) throw new Error("Elemento non presente in UnionFind");
    if (parentU !== u) {
      const root = this.find(parentU);
      this.parent.set(u, root);
      return root;
    }
    return u;
  }

  union(u: E, v: E): boolean {
    const rootU = this.find(u);
    const rootV = this.find(v);
    if (rootU === rootV) return false;

    const rankU = this.rank.get(rootU) ?? 0;
    const rankV = this.rank.get(rootV) ?? 0;

    if (rankU < rankV) {
      this.parent.set(rootU, rootV);
    } else if (rankU > rankV) {
      this.parent.set(rootV, rootU);
    } else {
      this.parent.set(rootV, rootU);
      this.rank.set(rootU, rankU + 1);
    }
    return true;
  }
}

/**
 * Algoritmo di Kruskal esterno
 * @param graph Grafo non orientato pesato
 * @returns Array di Edge<E> che rappresentano l'MST
 */
function kruskal<E>(graph: NotOrientedGraph<E>): { from: E; to: E; weight: number }[] {
  const edges = graph.getEdges(); // Archi {from, to, weight}
  const vertices = graph.getVertices(); // Tutti i vertici

  // Ordina archi per peso crescente
  edges.sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind<E>(vertices);
  const mst: { from: E; to: E; weight: number }[] = [];

  for (const edge of edges) {
    if (uf.union(edge.from, edge.to)) {
      mst.push(edge);
    }
  }

  return mst;
}

// =============================
// Esempio di utilizzo
// =============================
const grafo = new NotOrientedGraph<string>();
grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 5);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 3);
grafo.aggiungiArco('C', 'E', 6);
grafo.aggiungiArco('D', 'E', 7);

grafo.display();

const mst = kruskal<string>(grafo);
console.log("Albero Ricoprente Minimo (MST):", mst);
```

## minimumSpanningTree/prim.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: PRIM
──────────────────────────────
L’**algoritmo di Prim** è utilizzato per trovare un **albero ricoprente minimo (Minimum Spanning Tree - MST)**
in un grafo **connesso e pesato**.  
L’MST collega tutti i vertici senza formare cicli e minimizza la somma dei pesi degli archi inclusi.

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con un peso associato.  
- **Albero Ricoprente (Spanning Tree)** → sottoinsieme di archi che collega tutti i vertici senza cicli.  
- **MST (Minimum Spanning Tree)** → albero ricoprente con somma minima dei pesi degli archi.  
- **Nodo Visitato / Non Visitato** → stato dei vertici durante l’esecuzione dell’algoritmo.  

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Scegli un nodo sorgente e aggiungilo al MST.  
2. Seleziona l’**arco più leggero** che connette un nodo del MST con un nodo **non ancora incluso**.  
3. Aggiungi il nodo collegato al MST e marca come visitato.  
4. Ripeti fino a includere tutti i nodi.  

──────────────────────────────
  STRUTTURE DI SUPPORTO
──────────────────────────────
- **Coda di priorità (Min-Heap)** → per selezionare rapidamente l’arco di peso minimo.  
- **Array / Lista di adiacenza** → per memorizzare il grafo pesato.  

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Tempo → **O(E log V)** con coda di priorità.  
- Spazio → **O(V + E)** per memorizzare il grafo e le strutture ausiliarie.  

──────────────────────────────
  ESEMPIO DI UTILIZZO
──────────────────────────────
Grafo con archi pesati:
A - B(4), A - C(2), B - C(1), B - D(5), C - D(3)

Passaggi:
1. Partenza da A → aggiungi A al MST.  
2. Seleziona arco più leggero tra quelli che collegano MST a nodi non visitati → A-C(2).  
3. Include C → aggiornamento archi candidati: C-B(1), C-D(3).  
4. Include B (arco B-C) → aggiornamento archi candidati: B-D(5).  
5. Include D (arco C-D) → MST completato.  

MST finale → { A-C, C-B, C-D }, costo totale = 2 + 1 + 3 = 6

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Progettazione di **reti di comunicazione**.  
- Progettazione di **circuiti elettrici** e infrastrutture.  
- Reti di **distribuzione di energia o dati**.  
- Problemi di **ottimizzazione dei costi** in grafi connessi.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Seleziona sempre l’arco più leggero disponibile → MST corretto.  
- Efficienza elevata su grafi densi o sparsi con coda di priorità.  
- Non richiede l’ordinamento iniziale di tutti gli archi (a differenza di Kruskal).  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Necessita che il grafo sia **connesso**.  
- La gestione della coda di priorità può aggiungere complessità implementativa.  
- Più efficiente su grafi con vertici numerosi e densità variabile rispetto a Kruskal nei grafi sparsi.  
*/


import { NotOrientedGraph, Edge } from "../structure/notOrientedGraph";

/**
 * Algoritmo di Prim per trovare l'albero ricoprente minimo (MST)
 * @param graph Grafo non orientato pesato
 * @param start Nodo di partenza
 * @returns Array di archi MST: { from, to, weight }
 */
function prim<E>(
    graph: NotOrientedGraph<E>,
    start: E
): { from: E; to: E; weight: number }[] {
    const visited = new Set<E>();
    const mst: { from: E; to: E; weight: number }[] = [];
    const edgesQueue: { from: E; to: E; weight: number }[] = [];

    visited.add(start);

    // Inserisco tutti gli archi del nodo di partenza
    for (const edge of graph.getAdjacencyList()[String(start)] || []) {
        edgesQueue.push({ from: start, to: edge.node, weight: edge.weight });
    }

    // Min-heap semplice tramite ordinamento array
    while (visited.size < graph.getVertices().length && edgesQueue.length > 0) {
        // Ordina per peso crescente
        edgesQueue.sort((a, b) => a.weight - b.weight);
        const smallestEdge = edgesQueue.shift()!;
        if (visited.has(smallestEdge.to)) continue;

        // Aggiungi arco all'MST
        mst.push(smallestEdge);
        visited.add(smallestEdge.to);

        // Aggiungi tutti gli archi del nuovo nodo visitato
        for (const edge of graph.getAdjacencyList()[String(smallestEdge.to)] || []) {
            if (!visited.has(edge.node)) {
                edgesQueue.push({ from: smallestEdge.to, to: edge.node, weight: edge.weight });
            }
        }
    }

    return mst;
}

const grafo = new NotOrientedGraph<string>();

grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 5);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 3);
grafo.aggiungiArco('C', 'E', 6);
grafo.aggiungiArco('D', 'E', 7);

// Visualizza grafo
console.log("Grafo:");
grafo.display();

// Esecuzione algoritmo di Prim partendo dal nodo 'A'
const mst = prim(grafo, 'A');
console.log("\nAlbero Ricoprente Minimo (MST) con Prim:");
mst.forEach(edge => {
    console.log(`${edge.from} - ${edge.to} : peso ${edge.weight}`);
});

```

## minimumSpanningTree/tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "outDir": "../../dist/graph/minimumSpanningTree",

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "libReplacement": true,                           /* Enable lib replacement. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```

## shortestPath/belmanFord.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: BELLMAN-FORD
──────────────────────────────
L’**algoritmo di Bellman-Ford** calcola i percorsi minimi da un nodo sorgente a tutti gli altri nodi
in un **grafo orientato o non orientato pesato**, anche con **archi a peso negativo**, 
a condizione che non siano presenti cicli negativi raggiungibili dalla sorgente.

──────────────────────────────
  PRECONDIZIONI
──────────────────────────────
- Il grafo può contenere archi con **peso negativo**.  
- Non devono esserci **cicli negativi** raggiungibili dalla sorgente.  
- Funziona su grafi orientati e non orientati pesati.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con un peso (positivo o negativo).  
- **Distanza** → costo cumulativo minimo dal nodo sorgente a un nodo.  
- **Predecessore (Parent/Predecessor)** → nodo precedente lungo il percorso minimo.  
- **Rilassamento (Relaxation)** → operazione che aggiorna la distanza di un nodo se si trova un percorso più corto.

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `aggiungiVertice(v)` → inserisce un nuovo vertice nel grafo.  
- `aggiungiArco(v1, v2, peso)` → aggiunge un arco orientato o non orientato con peso.  
- `bellmanFord(start)` → calcola i percorsi minimi dal nodo sorgente `start` a tutti gli altri nodi, restituendo:
  - le **distanze minime**  
  - i **predecessori** per ricostruire i percorsi.  
- Rileva **cicli negativi**: se dopo |V|-1 rilassamenti un arco può ancora essere rilassato, esiste un ciclo negativo raggiungibile dalla sorgente.

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Inizializza tutte le distanze a **∞**, eccetto il nodo sorgente (distanza = 0).  
2. Ripeti **|V| - 1 volte** (dove |V| è il numero di vertici):
   - Per ogni arco `(u, v)` con peso `w`:  
     - Se `distanza[u] + w < distanza[v]` → aggiorna `distanza[v]` e imposta `u` come predecessore.  
3. Controlla tutti gli archi una volta in più per rilevare eventuali cicli negativi.  
4. Al termine:
   - le **distanze minime** sono corrette se non ci sono cicli negativi.  
   - è possibile ricostruire i percorsi minimi seguendo i predecessori.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Tempo → **O(V * E)**  
- Spazio → **O(V)** per memorizzare distanze e predecessori  

──────────────────────────────
  ESEMPIO DI USCITA
──────────────────────────────
Grafo:
A -> B(4), C(2)
B -> C(-1), D(5)
C -> D(3), E(4)
D -> E(7)
E -> 

Distanze minime da A: { A: 0, B: 4, C: 2, D: 5, E: 6 }  
Predecessori: { A: null, B: 'A', C: 'A', D: 'C', E: 'C' }  

Percorso minimo da A a E: **A → C → E**, costo 6.

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Reti di telecomunicazione con costi variabili.  
- Calcolo di percorsi minimi in grafi con pesi negativi.  
- Rilevamento di cicli negativi nei grafi.  
- Pianificazione di percorsi e analisi di dipendenze complesse.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Gestisce archi con pesi negativi.  
- Rileva cicli negativi.  
- Funziona su grafi orientati e non orientati pesati.  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Più lento di Dijkstra per grafi senza pesi negativi (O(V*E) vs O(V+E log V)).  
- Non può essere utilizzato se esistono cicli negativi raggiungibili dalla sorgente.  

──────────────────────────────
  NOTE
──────────────────────────────
- Adatto per scenari in cui i pesi degli archi possono essere negativi.  
- La struttura dati utilizzata può essere semplice (array/lista) poiché l’algoritmo visita tutti gli archi ripetutamente.  
- Può essere combinato con Dijkstra per ottimizzazioni in grafi misti.
*/


import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * Algoritmo di Bellman-Ford esterno
 * @param graph Grafo orientato pesato (può avere pesi negativi, ma non cicli negativi)
 * @param start Nodo sorgente
 * @returns Oggetto contenente distanze minime e predecessori, o null se ciclo negativo rilevato
 */
export function bellmanFord<E>(
    graph: DirectedGraph<E>,
    start: string
): { distanze: Record<string, number>; predecessori: Record<string, string | null> } | null {
    const distanze: Record<string, number> = {};
    const predecessori: Record<string, string | null> = {};

    const adjacencyList = graph.getAdjacencyList(); // Map<E, Edge<E>[]>

    // Inizializzazione
    for (const [vertice] of adjacencyList) {
        const key = String(vertice);
        distanze[key] = Infinity;
        predecessori[key] = null;
    }
    distanze[start] = 0;

    const vertices = Array.from(adjacencyList.keys());

    // Relaxation |V|-1 volte
    for (let i = 0; i < vertices.length - 1; i++) {
        for (const [u] of adjacencyList) {
            const uKey = String(u);
            const edges = adjacencyList.get(u) ?? [];
            for (const edge of edges) {
                const vKey = String(edge.nodo);
                if (distanze[uKey] + edge.peso < distanze[vKey]) {
                    distanze[vKey] = distanze[uKey] + edge.peso;
                    predecessori[vKey] = uKey;
                }
            }
        }
    }

    // Verifica cicli negativi
    for (const [u] of adjacencyList) {
        const uKey = String(u);
        const edges = adjacencyList.get(u) ?? [];
        for (const edge of edges) {
            const vKey = String(edge.nodo);
            if (distanze[uKey] + edge.peso < distanze[vKey]) {
                console.error("Grafo contiene un ciclo negativo!");
                return null;
            }
        }
    }

    return { distanze, predecessori };
}

// =============================
// Esempio di utilizzo
// =============================
const graph = new DirectedGraph<string>();

graph.aggiungiArco('A', 'B', 4);
graph.aggiungiArco('A', 'C', 2);
graph.aggiungiArco('B', 'C', 5);
graph.aggiungiArco('B', 'D', 10);
graph.aggiungiArco('C', 'D', 3);
graph.aggiungiArco('D', 'E', 7);
graph.aggiungiArco('C', 'E', 4);

graph.display();

const risultato = bellmanFord<string>(graph, 'A');
if (risultato) {
    console.log('Distanze minime da A:', risultato.distanze);
    console.log('Predecessori:', risultato.predecessori);
} else {
    console.log('Grafo contiene un ciclo negativo.');
}


```

## shortestPath/dijkstra.ts

```typescript
/*
──────────────────────────────
  ALGORITMO: DIJKSTRA
──────────────────────────────
L’**algoritmo di Dijkstra** calcola i percorsi minimi da un nodo sorgente a tutti gli altri nodi
in un **grafo orientato o non orientato pesato**, con pesi **non negativi**.  
È uno degli algoritmi fondamentali per il calcolo di percorsi minimi in informatica e nelle reti.

──────────────────────────────
  PRECONDIZIONI
──────────────────────────────
- Il grafo può essere orientato o non orientato.  
- I pesi degli archi devono essere **non negativi**.  
- Non gestisce correttamente grafi con archi a peso negativo (per quelli serve Bellman-Ford).

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → nodo del grafo.  
- **Arco Pesato (Weighted Edge)** → connessione tra due vertici con peso associato.  
- **Distanza** → costo cumulativo minimo dal nodo sorgente a un nodo.  
- **Predecessore (Parent/Predecessor)** → nodo precedente lungo il percorso minimo.  
- **Coda di Priorità (Priority Queue / Min-Heap)** → struttura utilizzata per selezionare il nodo con distanza minima.

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `aggiungiVertice(v)` → inserisce un nuovo vertice nel grafo.  
- `aggiungiArco(v1, v2, peso)` → aggiunge un arco orientato o non orientato con peso.  
- `dijkstra(start)` → calcola i percorsi minimi dal nodo sorgente `start` a tutti gli altri nodi, restituendo:
  - le **distanze minime**  
  - i **predecessori** per ricostruire i percorsi.

──────────────────────────────
  RAPPRESENTAZIONE
──────────────────────────────
- **Lista di adiacenza con pesi**:  
  Esempio → `{ A: [{node: B, peso: 4}, {node: C, peso: 2}], B: [{node: C, peso: 5}], ... }`  

──────────────────────────────
  FUNZIONAMENTO DELL’ALGORITMO
──────────────────────────────
1. Inizializza tutte le distanze a **∞**, eccetto il nodo sorgente (distanza = 0).  
2. Inserisci tutti i nodi in una **coda di priorità** basata sulla distanza minima.  
3. Finché la coda non è vuota:
   - Estrai il nodo con distanza minima.  
   - Aggiorna le distanze dei suoi vicini se si trova un percorso più corto.  
   - Aggiorna i predecessori dei vicini per tracciare il percorso minimo.  
4. Al termine, si ottengono:
   - la **distanza minima** da sorgente a ogni nodo  
   - il **cammino più breve** ricostruibile seguendo i predecessori.

──────────────────────────────
  COMPLESSITÀ
──────────────────────────────
- Inserimento vertice → **O(1)**  
- Inserimento arco → **O(1)**  
- Calcolo percorso minimo:
  - Con **min-heap / coda di priorità** → **O(V + E log V)**  
  - Con semplice array → **O(V^2)**  

──────────────────────────────
  ESEMPIO DI USCITA
──────────────────────────────
Grafo:
A -> B(4), C(2)
B -> C(5), D(10)
C -> D(3), E(4)
D -> E(7)
E -> 

Distanze minime da A: { A: 0, B: 4, C: 2, D: 5, E: 6 }  
Predecessori: { A: null, B: 'A', C: 'A', D: 'C', E: 'C' }  

Percorso minimo da A a E: **A → C → E**, costo 6.

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Reti stradali e navigazione GPS.  
- Routing nei protocolli di rete (es. OSPF).  
- Pianificazione dei percorsi in sistemi di trasporto.  
- Problemi di logistica e distribuzione.  

──────────────────────────────
  NOTE
──────────────────────────────
- Adatto **solo a pesi non negativi**.  
- Per grafi con pesi negativi → usare **Bellman-Ford**.  
- La scelta della struttura dati per la coda di priorità influisce direttamente sulle prestazioni.  
- Supporta sia grafi orientati che non orientati.  
- Può essere esteso per trovare percorsi minimi verso un singolo nodo o verso tutti i nodi.
*/


import { DirectedGraph, Edge } from "../structure/orientedGraph";

/**
 * Trova il nodo non visitato con distanza minima
 */
function minDistanza<E>(
    distanze: Record<string, number>,
    visitati: Set<string>
): string | null {
    let min = Infinity;
    let minNode: string | null = null;

    for (const node in distanze) {
        if (!visitati.has(node) && distanze[node] < min) {
            min = distanze[node];
            minNode = node;
        }
    }

    return minNode;
}

/**
 * Algoritmo di Dijkstra esterno
 * @param graph Grafo orientato pesato
 * @param start Nodo sorgente
 * @returns Oggetto contenente distanze minime e predecessori
 */
export function dijkstra<E>(
    graph: DirectedGraph<E>,
    start: string
): { distanze: Record<string, number>; predecessori: Record<string, string | null> } {
    const distanze: Record<string, number> = {};
    const predecessori: Record<string, string | null> = {};
    const visitati = new Set<string>();

    const adjacencyList = graph.getAdjacencyList(); // Map<E, Edge<E>[]>

    // Inizializzazione
    for (const [vertice] of adjacencyList) {
        const key = String(vertice);
        distanze[key] = Infinity;
        predecessori[key] = null;
    }
    distanze[start] = 0;

    while (visitati.size < adjacencyList.size) {
        const nodoCorrente = minDistanza(distanze, visitati);
        if (!nodoCorrente) break;

        visitati.add(nodoCorrente);

        const edges = adjacencyList.get(nodoCorrente as unknown as E) ?? [];
        for (const edge of edges) {
            const targetKey = String(edge.nodo);
            const nuovaDistanza = distanze[nodoCorrente] + edge.peso;
            if (nuovaDistanza < distanze[targetKey]) {
                distanze[targetKey] = nuovaDistanza;
                predecessori[targetKey] = nodoCorrente;
            }
        }
    }

    return { distanze, predecessori };
}

// =============================
// Esempio di utilizzo
// =============================
const graph = new DirectedGraph<string>();

graph.aggiungiArco('A', 'B', 4);
graph.aggiungiArco('A', 'C', 2);
graph.aggiungiArco('B', 'C', 5);
graph.aggiungiArco('B', 'D', 10);
graph.aggiungiArco('C', 'D', 3);
graph.aggiungiArco('D', 'E', 7);
graph.aggiungiArco('C', 'E', 4);

graph.display();

const risultato = dijkstra<string>(graph, 'A');
console.log('Distanze minime da A:', risultato.distanze);
console.log('Predecessori:', risultato.predecessori);

```

## shortestPath/tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "outDir": "../../dist/graph/shortestPath",

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "libReplacement": true,                           /* Enable lib replacement. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```

## structure/notOrientedGraph.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: GRAFO NON ORIENTATO
──────────────────────────────
Un **grafo non orientato** è una collezione di nodi (vertici) 
connessi da archi che rappresentano relazioni bidirezionali.  

──────────────────────────────
  PROPRIETÀ PRINCIPALI
──────────────────────────────
- Rappresentato come coppia (V, E):  
  - V → insieme dei vertici (nodi).  
  - E → insieme degli archi (coppie non ordinate di vertici).  
- Gli archi non hanno direzione:  
  se esiste un arco tra `A` e `B`, si può navigare sia da `A` a `B` 
  che da `B` a `A`.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → un nodo del grafo.  
- **Arco (Edge)** → connessione tra due vertici.  
- **Grado (Degree)** → numero di archi connessi a un vertice.  
- **Percorso (Path)** → sequenza di vertici connessi da archi.  
- **Ciclo (Cycle)** → percorso chiuso (inizio = fine).  
- **Componente Connessa** → sottoinsieme di vertici in cui 
  ogni coppia è collegata direttamente o indirettamente.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `aggiungiVertice(v)` → inserisce un nuovo vertice.  
- `aggiungiArco(v1, v2)` → crea un arco tra due vertici 
  (aggiunge i vertici se non esistono).  
- `rimuoviArco(v1, v2)` → elimina un arco se presente.  
- `rimuoviVertice(v)` → elimina un vertice e tutti i suoi archi.  
- `verificaConnesso(v1, v2)` → controlla se esiste un percorso tra due vertici.  
- `visitaAmpiezza(v)` → BFS a partire da un vertice.  
- `visitaProfondità(v)` → DFS a partire da un vertice.  

──────────────────────────────
  RAPPRESENTAZIONE
──────────────────────────────
- **Lista di adiacenza** (efficiente in grafi sparsi):  
  Esempio → { A: [B, C], B: [A, D], C: [A], D: [B] }  
- **Matrice di adiacenza** (più adatta in grafi densi).  

──────────────────────────────
  EFFICIENZA
──────────────────────────────
- Inserimento vertice → **O(1)**  
- Inserimento arco → **O(1)**  
- Rimozione arco → **O(d)** (d = grado massimo tra i due vertici).  
- Attraversamento BFS/DFS → **O(V + E)**  

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Reti sociali.  
- Mappe stradali.  
- Reti di computer.  
- Pianificazione di percorsi senza direzione.  
- Analisi di sistemi complessi.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Struttura flessibile, adatta a molti problemi reali.  
- Operazioni ottimizzabili a seconda della rappresentazione.  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Grafi densi → memoria elevata.  
- Operazioni come rimozione arco o verifica connessione 
  possono essere costose rispetto a strutture specializzate.  

──────────────────────────────
  NOTE
──────────────────────────────
- Base per algoritmi fondamentali:  
  - calcolo delle componenti connesse,  
  - rilevamento cicli,  
  - cammino minimo.  
*/

/**
 * Interfaccia che rappresenta un arco pesato.
 */
export interface Edge<E> {
    node: E;
    weight: number;
}

/**
 * Implementazione di un grafo generico pesato e non orientato.
 * @typeParam E - Tipo dei vertici
 */
export class NotOrientedGraph<E> {
    private adjacencyList: Record<string, Edge<E>[]>;

    constructor() {
        this.adjacencyList = {};
    }

    /**
     * Aggiunge un vertice al grafo.
     * Se il vertice è già presente, non fa nulla.
     * @param vertex - Il vertice da aggiungere
     */
    aggiungiVertice(vertex: E): void {
        const key = String(vertex);
        if (!this.adjacencyList[key]) {
            this.adjacencyList[key] = [];
        }
    }

    /**
     * Aggiunge un arco pesato non orientato tra due vertici.
     * Se i vertici non esistono, vengono creati automaticamente.
     * @param vertex1 - Primo vertice
     * @param vertex2 - Secondo vertice
     * @param weight - Peso dell'arco
     */
    aggiungiArco(vertex1: E, vertex2: E, weight: number): void {
        const v1 = String(vertex1);
        const v2 = String(vertex2);

        if (!this.adjacencyList[v1]) {
            this.aggiungiVertice(vertex1);
        }
        if (!this.adjacencyList[v2]) {
            this.aggiungiVertice(vertex2);
        }

        this.adjacencyList[v1].push({
            node: vertex2, weight
        });
        this.adjacencyList[v2].push({
            node: vertex1, weight
        });
    }

    /**
     * Rimuove un arco tra due vertici, se esiste.
     * @param vertex1 - Primo vertice
     * @param vertex2 - Secondo vertice
     */
    rimuoviArco(vertex1: E, vertex2: E): void {
        const v1 = String(vertex1);
        const v2 = String(vertex2);

        this.adjacencyList[v1] = this.adjacencyList[v1]?.filter(edge => edge.node !== vertex2) || [];
        this.adjacencyList[v2] = this.adjacencyList[v2]?.filter(edge => edge.node !== vertex1) || [];
    }

    /**
     * Rimuove un vertice e tutti i relativi archi.
     * @param vertex - Il vertice da rimuovere
     */
    rimuoviVertice(vertex: E): void {
        const v = String(vertex);
        while (this.adjacencyList[v]?.length) {
            const adjacentEdge = this.adjacencyList[v].pop() as Edge<E>;
            this.rimuoviArco(vertex, adjacentEdge.node);
        }
        delete this.adjacencyList[v];
    }

    /**
     * Visualizza il grafo in console.
     */
    display(): void {
        for (const vertex in this.adjacencyList) {
            const edges = this.adjacencyList[vertex];
            const rappresentazione = edges.length > 0
                ? edges.map(e => `${e.node}(${e.weight})`).join(", ")
                : "NULL";
            console.log(`${vertex} -> ${rappresentazione}`);
        }
    }

    /**
     * Verifica se il grafo è connesso.
     * @returns true se il grafo è connesso, false altrimenti
     */
    verificaConnesso(): boolean {
        const visitati = new Set<string>();
        const vertices = Object.keys(this.adjacencyList);

        if (vertices.length === 0) return true; // grafo vuoto = connesso

        const dfs = (vertex: string) => {
            visitati.add(vertex);
            for (const edge of this.adjacencyList[vertex]) {
                const key = String(edge.node);
                if (!visitati.has(key)) {
                    dfs(key);
                }
            }
        };

        dfs(vertices[0]);

        return vertices.length === visitati.size;
    }

    /**
     * Visita in ampiezza (BFS) a partire da un vertice.
     * @param start - Vertice di partenza
     * @returns Lista dei vertici visitati in ordine BFS
     */
    visitaAmpiezza(start: E): E[] {
        const result: E[] = [];
        const visitati = new Set<string>();
        const queue: E[] = [start];

        visitati.add(String(start));

        while (queue.length > 0) {
            const nodo = queue.shift() as E;
            result.push(nodo);

            for (const edge of this.adjacencyList[String(nodo)]) {
                const key = String(edge.node);
                if (!visitati.has(key)) {
                    visitati.add(key);
                    queue.push(edge.node);
                }
            }
        }

        return result;
    }

    /**
     * Visita in profondità (DFS) a partire da un vertice.
     * @param start - Vertice di partenza
     * @returns Lista dei vertici visitati in ordine DFS
     */
    visitaProfondita(start: E): E[] {
        const result: E[] = [];
        const visitati = new Set<string>();

        const dfs = (vertex: E) => {
            visitati.add(String(vertex));
            result.push(vertex);

            for (const edge of this.adjacencyList[String(vertex)]) {
                if (!visitati.has(String(edge.node))) {
                    dfs(edge.node);
                }
            }
        };

        dfs(start);
        return result;
    }

    /**
     * Restituisce tutti i vertici del grafo
     * @returns tutti i vertici del grafo
     */
    getVertices(): E[] {
        const verticesSet = new Set<E>();
        for (const key in this.adjacencyList) {
            verticesSet.add(key as unknown as E);
            for (const edge of this.adjacencyList[key]) {
                verticesSet.add(edge.node);
            }
        }
        return Array.from(verticesSet);
    }
    
    /**
     * Restituisce tutti gli archi senza duplicati
     * @returns tutti gli archi senza duplicati
     */
    getEdges(): { from: E; to: E; weight: number }[] {
        const edges: { from: E; to: E; weight: number }[] = [];
        const visited = new Set<string>();

        for (const key in this.adjacencyList) {
            for (const edge of this.adjacencyList[key]) {
                // Crea un id unico indipendente dall'ordine dei nodi
                const id = [String(key), String(edge.node)].sort().join('-');
                if (!visited.has(id)) {
                    edges.push({ from: key as unknown as E, to: edge.node, weight: edge.weight });
                    visited.add(id);
                }
            }
        }

        return edges;
    }

    /**
     * Fornisce la lista di adiacenza dei nodi del grafo 
     * @returns lista di adiacenza
     */
    getAdjacencyList(){
      return this.adjacencyList;
    }
}

// =============================
// Test della struttura dati
// =============================

const graph = new NotOrientedGraph<string>();

graph.aggiungiVertice("A");
graph.aggiungiVertice("B");
graph.aggiungiVertice("C");

graph.aggiungiArco("A", "B", 5);
graph.aggiungiArco("A", "C", 2);
graph.aggiungiArco("B", "C", 3);

graph.display();

console.log("\nGrafo connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));

graph.rimuoviArco("A", "C");
console.log("\nDopo aver rimosso l'arco A-C:");
graph.display();

graph.rimuoviVertice("B");
console.log("\nDopo aver rimosso il vertice B:");
graph.display();

console.log("\nGrafo connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));

```

## structure/orientedGraph.ts

```typescript
/*
──────────────────────────────
  STRUTTURA DATI: GRAFO ORIENTATO
──────────────────────────────
Un **grafo orientato** è una collezione di nodi (vertici) connessi da archi direzionati, 
dove ciascun arco rappresenta una relazione unidirezionale tra due nodi.  

──────────────────────────────
  PROPRIETÀ PRINCIPALI
──────────────────────────────
- Rappresentato come coppia (V, E):  
  - V → insieme dei vertici (nodi).  
  - E → insieme degli archi (coppie ordinate di vertici).  
- Gli archi hanno direzione:  
  se esiste un arco da `A` a `B`, si può navigare **solo da A a B** e non viceversa.  

──────────────────────────────
  TERMINOLOGIA
──────────────────────────────
- **Vertice (Vertex)** → un nodo del grafo.  
- **Arco (Edge)** → connessione direzionata tra due vertici.  
- **Grado di Entrata (In-Degree)** → numero di archi che arrivano a un vertice.  
- **Grado di Uscita (Out-Degree)** → numero di archi che partono da un vertice.  
- **Percorso (Path)** → sequenza di vertici connessi da archi direzionati.  
- **Ciclo (Cycle)** → percorso chiuso (inizio = fine).  
- **Componente Fortemente Connessa** → sottoinsieme di vertici in cui ogni coppia 
  è raggiungibile reciprocamente.  

──────────────────────────────
  OPERAZIONI PRINCIPALI
──────────────────────────────
- `aggiungiVertice(v)` → inserisce un nuovo vertice.  
- `aggiungiArco(v1, v2)` → crea un arco orientato da `v1` a `v2`.  
- `rimuoviArco(v1, v2)` → elimina l’arco orientato da `v1` a `v2`.  
- `rimuoviVertice(v)` → elimina un vertice e tutti i suoi archi.  
- `verificaConnesso()` → controlla se il grafo è fortemente connesso.  
- `visitaAmpiezza(v)` → BFS a partire da un vertice.  
- `visitaProfondità(v)` → DFS a partire da un vertice.  

──────────────────────────────
  RAPPRESENTAZIONE
──────────────────────────────
- **Lista di adiacenza** (più comune):  
  Esempio → { A: [B, C], B: [D], C: [], D: [B] }  
- **Matrice di adiacenza** (più adatta in grafi densi).  

──────────────────────────────
  EFFICIENZA
──────────────────────────────
- Inserimento vertice → **O(1)**  
- Inserimento arco → **O(1)**  
- Rimozione arco → **O(d)** (d = grado di uscita del vertice).  
- Attraversamento BFS/DFS → **O(V + E)**  

──────────────────────────────
  APPLICAZIONI
──────────────────────────────
- Reti sociali con relazioni asimmetriche.  
- Modellazione di flussi di dati.  
- Reti di computer.  
- Pianificazione di percorsi con direzione.  
- Analisi di dipendenze in sistemi complessi.  

──────────────────────────────
  VANTAGGI
──────────────────────────────
- Modellano in modo naturale relazioni asimmetriche.  
- Utili per processi sequenziali e dipendenze.  

──────────────────────────────
  LIMITAZIONI
──────────────────────────────
- Più complessi da visualizzare rispetto ai grafi non orientati.  
- La connettività richiede algoritmi specifici.  

──────────────────────────────
  NOTE
──────────────────────────────
- Base per algoritmi fondamentali:  
  - calcolo delle componenti fortemente connesse,  
  - rilevamento di cicli orientati,  
  - calcolo dei percorsi minimi.  
*/

/**
 * Classe che rappresenta un arco orientato e pesato
 */
export class Edge<E> {
    nodo: E;
    peso: number;

    constructor(nodo: E, peso: number) {
        this.nodo = nodo;
        this.peso = peso;
    }
}

/**
 * Classe che rappresenta un grafo orientato pesato
 */
export class DirectedGraph<E> {
    private adjacencyList: Map<E, Edge<E>[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    /**
     * Aggiunge un vertice al grafo.
     * Se il vertice esiste già, non fa nulla.
     */
    aggiungiVertice(vertex: E): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

	/**
	 * Fornisce la lista di adiacenza dei nodi del grafo 
	 * @returns lista di adiacenza
	 */
	getAdjacencyList(){
		return this.adjacencyList;
	}

    /**
     * Aggiunge un arco orientato e pesato tra due vertici.
     * Se i vertici non esistono, vengono creati automaticamente.
     */
    aggiungiArco(from: E, to: E, peso: number = 1): void {
        if (!this.adjacencyList.has(from)) this.aggiungiVertice(from);
        if (!this.adjacencyList.has(to)) this.aggiungiVertice(to);

        this.adjacencyList.get(from)!.push(new Edge(to, peso));
    }

    /**
     * Rimuove un arco orientato dal grafo.
     */
    rimuoviArco(from: E, to: E): void {
        if (this.adjacencyList.has(from)) {
            this.adjacencyList.set(
                from,
                this.adjacencyList.get(from)!.filter((edge) => edge.nodo !== to)
            );
        }
    }

    /**
     * Rimuove un vertice e tutti gli archi entranti/ uscenti.
     */
    rimuoviVertice(vertex: E): void {
        this.adjacencyList.delete(vertex);

        for (const [key, edges] of this.adjacencyList.entries()) {
            this.adjacencyList.set(
                key,
                edges.filter((edge) => edge.nodo !== vertex)
            );
        }
    }

    /**
     * Visualizza il grafo (lista di adiacenza).
     */
    display(): void {
        for (const [vertex, edges] of this.adjacencyList.entries()) {
            const out = edges.map((e) => `${e.nodo}(${e.peso})`).join(", ");
            console.log(`${vertex} -> ${out || "NULL"}`);
        }
    }

    /**
     * Verifica se il grafo è fortemente connesso.
     * (Semplificato: controlla raggiungibilità da un nodo di partenza)
     */
    verificaConnesso(): boolean {
        const vertices = Array.from(this.adjacencyList.keys());
        if (vertices.length === 0) return true;

        const visitati = new Set<E>();

        const dfs = (start: E) => {
            const stack: E[] = [start];
            visitati.add(start);

            while (stack.length) {
                const v = stack.pop()!;
                for (const vicino of this.adjacencyList.get(v)!) {
                    if (!visitati.has(vicino.nodo)) {
                        visitati.add(vicino.nodo);
                        stack.push(vicino.nodo);
                    }
                }
            }
        };

        dfs(vertices[0]);
        return visitati.size === vertices.length;
    }

    /**
     * Visita in ampiezza (BFS).
     */
    visitaAmpiezza(start: E): E[] {
        const visitati = new Set<E>();
        const risultato: E[] = [];
        const coda: E[] = [start];

        visitati.add(start);

        while (coda.length > 0) {
            const nodo = coda.shift()!;
            risultato.push(nodo);

            for (const vicino of this.adjacencyList.get(nodo)!) {
                if (!visitati.has(vicino.nodo)) {
                    visitati.add(vicino.nodo);
                    coda.push(vicino.nodo);
                }
            }
        }

        return risultato;
    }

    /**
     * Visita in profondità (DFS).
     */
    visitaProfondita(start: E): E[] {
        const visitati = new Set<E>();
        const risultato: E[] = [];

        const dfs = (v: E) => {
            visitati.add(v);
            risultato.push(v);

            for (const vicino of this.adjacencyList.get(v)!) {
                if (!visitati.has(vicino.nodo)) {
                    dfs(vicino.nodo);
                }
            }
        };

        dfs(start);
        return risultato;
    }
}

// =============================
// Test della struttura dati
// =============================
let graphTest = new DirectedGraph<string>();

graphTest.aggiungiVertice("A");
graphTest.aggiungiVertice("B");
graphTest.aggiungiVertice("C");

graphTest.aggiungiArco("A", "B", 2);
graphTest.aggiungiArco("A", "C", 5);
graphTest.aggiungiArco("B", "C", 1);

graphTest.display();

console.log("\nGrafo fortemente connesso:", graphTest.verificaConnesso());
console.log("Visita in ampiezza da A:", graphTest.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graphTest.visitaProfondita("A"));

graphTest.rimuoviArco("A", "C");
console.log("\nDopo aver rimosso l'arco A->C:");
graphTest.display();

graphTest.rimuoviVertice("B");
console.log("\nDopo aver rimosso il vertice B:");
graphTest.display();
```

## structure/tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "outDir": "../../dist/graph/structure",

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "libReplacement": true,                           /* Enable lib replacement. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```

