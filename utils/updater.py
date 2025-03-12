import json
from pathlib import Path


def main():
    with open(
        Path(__file__).parent.parent / "backend/resources/items.json", encoding="utf-8"
    ) as f:
        items = json.load(f)

    with open(Path(__file__).parent / "results.json", encoding="utf-8") as f:
        correct_items = json.load(f)

    for item in items.values():
        name = item["name"]
        quality = correct_items.get(name)

        if quality is None:
            print(f"not found: {name}")
            continue

        item["quality"] = quality

    with open(
        Path(__file__).parent.parent / "backend/resources/items.json",
        "w",
        encoding="utf-8",
    ) as f:
        json.dump(items, f, indent=2)


if __name__ == "__main__":
    main()
