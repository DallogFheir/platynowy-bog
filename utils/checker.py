import json
from pathlib import Path


def main():
    with open(
        Path(__file__).parent.parent / "backend/resources/items.json", encoding="utf-8"
    ) as f:
        items_by_id = json.load(f)
    items = {
        value["name"]: value["quality"]
        for _, value in items_by_id.items()
        if "quality" in value
    }

    with open(Path(__file__).parent / "results.json", encoding="utf-8") as f:
        correct_items = json.load(f)

    not_in_items = []
    incorrect = []
    for item, quality in correct_items.items():
        if item not in items:
            not_in_items.append(item)
        elif items[item] != quality:
            incorrect.append(item)
    not_in_correct_items = [item for item in items if item not in correct_items]

    print(f"not in items: {not_in_items}")
    print(f"incorrect: {incorrect}")
    print(f"not in correct items: {not_in_correct_items}")


if __name__ == "__main__":
    main()
