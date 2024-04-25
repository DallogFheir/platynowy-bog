from bs4 import BeautifulSoup
import json
from pathlib import Path
import re
import requests
from concurrent.futures import ThreadPoolExecutor


def clean_name(link):
    raw_name_match = re.search(
        r"^https://bindingofisaacrebirth.fandom.com/wiki/(.+)$", link
    )

    if raw_name_match is None:
        raise ValueError("No match for name.")

    raw_name = raw_name_match.group(1)
    name = " ".join(
        name_part
        for name_part in raw_name.replace("%27", "'")
        .replace("%3F", "?")
        .replace("%3D", "=")
        .split("_")
        if name_part != "(Item)"
    )

    replacements = {
        "Less Than Three": "<3",
        "Forever alone": "Forever Alone",
        "Cat-o-nine-tails": "Cat-O-Nine-Tails",
        "BOGO Bombs": "Bogo Bombs",
        "D infinity": "D Infinity",
    }

    return replacements[name] if name in replacements else name


def get_quality(link):
    resp = requests.get(link)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.content, "lxml")

    quality_el = soup.select_one("div[data-source='quality'] > div > span > b")

    if quality_el is None:
        raise ValueError("No quality element.")

    quality = int(quality_el.get_text())
    name = clean_name(link)
    print(f"Got {name} ({quality})")
    return (name, quality)


def main():
    with open(Path(__file__).parent / "items_links.txt", encoding="utf-8") as f:
        links = f.read().splitlines()

    res = {}
    with ThreadPoolExecutor() as exec:
        qualities = exec.map(get_quality, links)

        for name, quality in qualities:
            res[name] = quality

    with open(Path(__file__).parent / "results.json", "w", encoding="utf-8") as f:
        json.dump(res, f)


if __name__ == "__main__":
    main()
