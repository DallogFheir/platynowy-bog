import json
from pathlib import Path

with open(Path(__file__).parent / "items.json") as f:
    data = json.load(f)

s = set()
for item in data.values():
    if "rechargeTime" in item:
        if "unit" in item["rechargeTime"]:
            s.add(item["rechargeTime"]["unit"])

print(s)