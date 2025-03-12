import json
import re
from pathlib import Path


def main():
    with open(
        Path(__file__).parent.parent / "backend/resources/items.json", encoding="utf-8"
    ) as f:
        items_by_id = json.load(f)

    with open(Path(__file__).parent / "items_metadata.xml", encoding="utf-8") as f:
        items_xml = f.read()

    pattern = r"<item id=\"(.+?)\" quality=\"(.+?)\""
    item_matches = re.findall(pattern, items_xml)

    res = {}
    for item_match in item_matches:
        item_id, item_quality = item_match
        item_dict = items_by_id.get(item_id)

        if item_dict is None:
            print(f"not found: {item_id}")
            continue

        item_name = item_dict["name"]
        res[item_name] = int(item_quality)

    with open(Path(__file__).parent / "results.json", "w", encoding="utf-8") as f:
        json.dump(res, f)


if __name__ == "__main__":
    main()
