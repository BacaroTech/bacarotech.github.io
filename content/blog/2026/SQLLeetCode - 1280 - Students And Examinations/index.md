+++
title = "SQLLeetCode - 1280 - Students And Examinations"
date = 2026-02-25T14:01:33Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the number of examinations each student attended for each subject.
>
> Return the result table sorted by student_id and subject_name.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono tre tabelle: Students (con student_id, student_name), Subjects (con subject_name), e Examinations (con student_id, subject_name).

L'obiettivo è trovare per ogni combinazione studente-materia, quante volte lo studente ha sostenuto quell'esame. Dobbiamo includere tutti gli studenti e tutte le materie, anche se lo studente non ha sostenuto alcun esame per quella materia (in quel caso il conteggio sarà 0).

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT 
    S.student_id,
    S.student_name,
    SU.subject_name,
    COUNT(E.student_id) AS attended_exams
FROM Students S
CROSS JOIN Subjects SU
LEFT JOIN Examinations E
    ON S.student_id = E.student_id
    AND SU.subject_name = E.subject_name
GROUP BY S.student_id, S.student_name, SU.subject_name
ORDER BY S.student_id, SU.subject_name
```

In questa query:
- `CROSS JOIN` tra Students e Subjects crea tutte le possibili combinazioni studente-materia
- `LEFT JOIN` con Examinations associa gli esami sostenuti, mantenendo tutte le combinazioni anche se non ci sono esami (COUNT sarà 0)
- La condizione `ON S.student_id = E.student_id AND SU.subject_name = E.subject_name` collega correttamente studenti e materie
- `COUNT(E.student_id)` conta gli esami sostenuti (sarà 0 se non ci sono esami per quella combinazione)
- `GROUP BY` raggruppa per studente e materia
- `ORDER BY` ordina i risultati

Questo esercizio richiede un CROSS JOIN per generare tutte le combinazioni possibili e un LEFT JOIN per contare gli esami.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)