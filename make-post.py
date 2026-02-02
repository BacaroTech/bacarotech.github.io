import datetime
import os
import re
import uuid
import typer
import dateparser
from typing import Annotated


def name_cleaning(name: str) -> str:
    title = re.sub("[^A-Za-z0-9 ]+", " ", name)
    title = title.replace("  ", " ")
    title = title.replace(" ", "-")
    title = title.lower()
    return title


def format_date_ics(date_obj: datetime.datetime) -> str:
    """Trasforma un oggetto datetime nel formato ICS: AAAAMMGGTHHMMSS"""
    return date_obj.strftime('%Y%m%dT%H%M%S')


def genera_ics(directory_path: str, titolo_evento: str):
    print(f"\n--- 📅 Configurazione Evento (Linguaggio Naturale) ---")

    # Input "umano"
    inizio_raw = input("Quando inizia? (es: domani alle 10, 20 maggio ore 15): ")
    fine_raw = input("Quando finisce? (es: tra due ore, 20 maggio ore 18): ")

    # Parsing delle date
    # 'languages=['it']' permette di capire "domani", "prossimo lunedì", ecc.
    inizio_dt = dateparser.parse(
        inizio_raw, settings={'PREFER_DATES_FROM': 'future'}, languages=['it']
    )
    fine_dt = dateparser.parse(fine_raw, settings={'RELATIVE_BASE': inizio_dt}, languages=['it'])

    if not inizio_dt or not fine_dt:
        print("❌ Errore: Non ho capito le date. Riprova con un formato più chiaro.")
        return

    desc = input("Breve descrizione: ")

    ics_content = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        f"UID:{uuid.uuid4()}",
        f"DTSTAMP:{datetime.datetime.now().strftime('%Y%m%dT%H%M%SZ')}",
        f"DTSTART:{format_date_ics(inizio_dt)}",
        f"DTEND:{format_date_ics(fine_dt)}",
        f"SUMMARY:{titolo_evento}",
        f"DESCRIPTION:{desc}",
        "END:VEVENT",
        "END:VCALENDAR",
    ]

    file_path = os.path.join(directory_path, "evento.ics")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write("\n".join(ics_content))

    print(
        f"✅ Evento creato: {inizio_dt.strftime('%d/%m/%Y %H:%M')} -> {fine_dt.strftime('%H:%M')}"
    )
    print(f"📍 Salvato in: {file_path}")


def post_fc():
    year = str(datetime.datetime.now().year)
    name = input("Give me the title\n")
    title = name_cleaning(name)

    os.system(f"hugo new blog/{year}/{title}/index.md")

    # Modifica questo path se la tua cartella hugo non è 'content'
    target_dir = f"content/blog/{year}/{title}"

    add_ics = input("\nVuoi aggiungere un file .ics a questo post? (s/n): ")
    if add_ics.lower() == 's':
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)
        genera_ics(target_dir, name)


def post_redirect():
    name = input("Give me the title\n")
    title = name_cleaning(name)
    os.system(f"hugo new redirect/{title}/index.md")


ANSWER = {
    "post": post_fc,
    "redirect": post_redirect,
}


def main(text: Annotated[str, typer.Argument()] = None):
    if text is None:
        text = input("You need a new [post]?\n")

    action = ANSWER.get(text)
    if action:
        action()
    else:
        print("Opzione non valida.")


if __name__ == "__main__":
    typer.run(main)
