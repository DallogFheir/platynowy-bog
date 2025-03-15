import json


def main():
    with open("../backend/resources/items.json", encoding="utf-8") as f:
        items = json.load(f)

    with open("item_to_pool.json", encoding="utf-8") as f:
        item_to_pool = json.load(f)

    for item_id, item_info in items.items():
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


if __name__ == "__main__":
    main()
