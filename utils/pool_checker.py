import json

TO_IGNORE = {
    688: "Inner Child",
    705: "Dark Arts",
    706: "Abyss",
    710: "Bag of Crafting",
    711: "Flip",
    712: "Lemegeton",
    713: "Sumptorium",
    714: "Recall",
    715: "Hold",
    722: "Anima Sola",
}


def main():
    with open("../backend/resources/items.json", encoding="utf-8") as f:
        items = json.load(f)

    with open("item_to_pool.json", encoding="utf-8") as f:
        item_to_pool = json.load(f)

    for item_id, item_info in items.items():
        if int(item_id) in TO_IGNORE:
            continue

        if item_id not in item_to_pool:
            print(f"Item {item_id} not in item_to_pool.json")
            continue

        pools = set(item_to_pool[item_id])
        for pool in pools:
            pool_group, subpool = pool.split("/")

            pool = item_info["pool"]

            if pool_group not in pool:
                print(f"Item {item_id} not in pool {pool_group}")
                continue

            subpools = pool[pool_group]

            if subpool not in subpools:
                print(f"Item {item_id} not in pool {pool_group}/{subpool}")
                continue

        for item_pool_group_name, item_pool_group in item_info["pool"].items():
            for item_subpool in item_pool_group:
                if f"{item_pool_group_name}/{item_subpool}" not in pools:
                    print(
                        f"Item {item_id} excessive pool {item_pool_group_name}/{item_subpool}"
                    )


if __name__ == "__main__":
    main()
