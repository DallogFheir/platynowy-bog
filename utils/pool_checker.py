import json

TO_IGNORE = {
    -1: "G-FUEL",
    6: "Number One",  # Bumbino
    12: "Magic Mushroom",  # mushrooms
    13: "The Virus",  # Lust
    15: "<3",  # Gluttony
    18: "Dollar",
    25: "Breakfast",
    34: "The Book of Belial",  # Judas
    36: "The Poop",  # Blue Baby & Bumbino
    37: "Mr. Boom",  # Wrath
    42: "Bob's Rotten Head",  # Sloth
    45: "Yum Heart",  # (Tainted) Magadalene & Bumbino
    46: "Lucky Foot",  # Cain
    49: "Shoop da Whoop",  # Envy
    50: "Steven",
    56: "Lemon Mishap",  # Bumbino
    64: "Steam Sale",  # Greed & shopkeepers
    65: "Anarchist Cookbook",  # Pride
    71: "Mini Mush",  # mushrooms
    73: "Cube of Meat",  # Harbingers
    74: "A Quarter",  # Super Greed & urns
    81: "Dead Cat",  # Super Pride
    86: "Monstro's Tooth",  # Bumbino
    90: "The Small Rock",  # obstacles
    96: "Little C.H.A.D.",  # bosses
    99: "Little Gish",  # bosses
    100: "Little Steven",  # bosses
    103: "The Common Cold",  # Bumbino
    105: "The D6",
    106: "Mr. Mega",  # bosses
    117: "Dead Bird",
    119: "Blood Bag",
    122: "Whore of Babylon",
    126: "Razor Blade",
    128: "Forever Alone",  # bosses
    129: "Bucket of Lard",  # bosses
    130: "A Pony",
    132: "A Lump of Coal",
    135: "IV Bag",
    140: "Bob's Curse",  # bosses
    157: "Bloody Lust",
    158: "Crystal Ball",
    163: "Ghost Baby",  # obstacles
    177: "Portable Slot",  # no Beggar nor Shop in pools in game files?
    181: "White Pony",
    207: "Ball of Bandages",  # bosses
    209: "Butt Bombs",  # ignore Shell Game pool
    218: "Placenta",  # obstacles
    238: "Key Piece 1",
    239: "Key Piece 2",
    254: "Blood Clot",  # obstacles"
    265: "Dry Baby",  # obstacles
    270: "Leech",  # obstacles
    293: "Head of Krampus",
    327: "Polaroid",
    328: "Negative",
    349: "Wooden Nickel",
    357: "Box of Friends",
    378: "No. 2",  # ignore Shell Game pool
    429: "Head of the Keeper",
    446: "Dead Tooth",
    453: "Compound Fracture",
    459: "Sinus Infection",
    474: "Broken Glass Cannon",
    477: "Void",
    484: "Wait What?",
    504: "Brown Nugget",  # ignore Shell Game pool
    576: "Dirty Mind",  # ignore Shell Game pool
    550: "Broken Shovel",
    551: "Broken Shovel",
    552: "Mom's Shovel",
    584: "Book of Virtues",
    609: "Eternal D6",
    626: "Knife Piece 1",
    627: "Knife Piece 2",
    633: "Dogma",
    650: "Plum Flute",
    668: "Dad's Note",
    673: "Redemption",
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
