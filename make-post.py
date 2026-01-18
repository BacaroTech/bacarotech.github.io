import datetime
import os
import re
import typer
from typing import Annotated


def name_cleaning(name: str) -> str:

    title = re.sub("[^A-Za-z0-9 ]+", " ", name)
    title = title.replace("  ", " ")
    title = title.replace(" ", "-")
    title = title.lower()
    return title


def post_redirect():
    # get the current year as variable
    name = input("Give me the title\n")
    title = name_cleaning(name)
    os.system(f"hugo new redirect/{title}/index.md")


def post_fc():
    # get the current year as variable
    year = str(datetime.datetime.now().year)
    name = input("Give me the title\n")
    title = name_cleaning(name)
    os.system(f"hugo new blog/{year}/{title}/index.md")


ANSWER = {
    "post": post_fc,
    "redirect": post_redirect,
}


def main_checker():
    text = input("You need a new [post], a new [photo] or a new [micro]\n")  # Python 3
    # text = "post"
    ANSWER.get(text, main_checker)()


def main(text: Annotated[str, typer.Argument()] = None):
    if text is None:
        text = input(
            "You need a new [post], a new [photo], a new [micro], a [weekly_cover] or [now]\n"
        )
    ANSWER.get(text, main)()


if __name__ == "__main__":
    typer.run(main)
