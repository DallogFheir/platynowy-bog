import json

path = "trinkets.json"


with open(path, encoding="utf-8") as f:
    data = json.load(f)

# {"method": "defeat", "target": "Mother", "character": "Lilith"}

id = 173
name = "Your Soul"
quote = "Give it to me"
description = "Trinket może zostać użyty do zapłaty za układ z Diabłem/Black Market bez zużycia serc. Po użyciu trinket znika.\nNie może zostać użyty do zakupu układu z Diabłem za pieniądze, np. jako Keeper lub z A Pound of Flesh.\nUżycie trinketu liczy się jako wzięcie układu z Diabłem do szansy na Angel Room."
setDrop = None
startingTrinket = None
unlock = {"boss": ["Isaac", "???", "Satan", "The Lamb"], "character": "Tainted Judas"}
color = "white"
img = "iVBORw0KGgoAAAANSUhEUgAAACEAAAArCAYAAAD2f+EJAAABjklEQVR4nNWYMVLDMBBF/zIpcElD7SuEGYYrOCUnoAhFXHISGmacghScgDI+QhgGcgXfwqVo2MFWtNbaCGb9W0lr6/l7tStyzkGjjEg30VPrHMXmnE0JnFokkZi685hCZGySkAi87vcAgKIoVIHrugYA3K5WwfEuEVskfAJjdx6TRKZ1jmyTaJX5Y6wy6v8cZkgsJC/8lTg+eyMjciZI0Dkw6AX+hr/1iB+n6w0TJBbSgO9iViwT+vlFitOVCRKiJ3Zvn72J65srALqdjY1jgsSJJ/ib4+Ly317CBgk+1zlzsuufDh/BBanyRSeekbNDGng/HgEA18tlkgdxvJBMkFDXmHfVMwBgu1mrAm+2OwDAS3kfHJ9PjflYVb2JD2WZ5IFm+w7x72DleQ5AX3E1TQPgh9xselGRBBMY23HxOhZ7bYiICRLRPDG1ExvquPy5JkiceEI6VSWl6FlNkBBvaljaGxuuM8Z4gWWCRDRj+jug78rIr9KnEGCZIBH1hKSYVzQEWPMmwQrc8KgJsL4AU93NOcHzVWUAAAAASUVORK5CYII="

data.append(
    {
        "id": id,
        "img": img,
        "name": name,
        "quote": quote,
        "description": description,
        "setDrop": setDrop,
        "unlock": unlock,
        "color": color,
        "startingTrinket": startingTrinket,
    }
)

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
