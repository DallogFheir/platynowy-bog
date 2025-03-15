import json
import xml.etree.ElementTree as ET


def main():
    with open("itempools.xml", encoding="utf-8") as f:
        xml_data = f.read()

    root = ET.fromstring(xml_data)
    item_pool_map = {}

    pools_to_pool_paths = {}
    with open("pools.txt", encoding="utf-8") as f:
        lines = f.read().splitlines()
    for line in lines:
        orig_pool, pool_path = line.split(" : ")
        pools_to_pool_paths[orig_pool] = pool_path

    for pool in root.findall("Pool"):
        pool_name = pool.get("Name")

        for item in pool.findall("Item"):
            item_id = int(item.get("Id"))
            pools = item_pool_map.setdefault(item_id, [])
            pools.append(pools_to_pool_paths[pool_name])

    with open("item_to_pool.json", "w", encoding="utf-8") as f:
        json.dump(item_pool_map, f, indent=4)


if __name__ == "__main__":
    main()
