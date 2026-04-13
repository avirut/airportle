# %%
import airportsdata
import json
import csv
import random
import urllib.request

# %%
# Load country code -> name mapping
country_names = {}
with open("countrycodes.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        country_names[row["Code"]] = row["Name"]

# %%
# Download OurAirports data
urllib.request.urlretrieve(
    "https://davidmegginson.github.io/ourairports-data/airports.csv",
    "ourairportsdotcom.csv",
)
print("Downloaded ourairportsdotcom.csv")

# %%
# Build IATA -> size mapping from OurAirports data
TYPE_MAP = {
    "small_airport": "small",
    "medium_airport": "medium",
    "large_airport": "large",
}

iata_size = {}
with open("ourairportsdotcom.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        iata = row["iata_code"].strip()
        if len(iata) == 3:
            iata_size[iata] = TYPE_MAP.get(row["type"], "other")

# %%
# Load all airports from airportsdata
airports = airportsdata.load("IATA")

# %%
# Preserve existing puzzle order from current airports.json if it exists,
# otherwise generate a new shuffled order
import os

existing_order = []
if os.path.exists("airports.json"):
    with open("airports.json", encoding="utf-8") as f:
        existing = json.load(f)
    # Handle both old format (flat map) and new format (puzzles array)
    if "puzzles" in existing:
        existing_order = [p["code"] for p in existing["puzzles"]]
    else:
        existing_order = list(existing.keys())
    print(f"Preserved existing puzzle order ({len(existing_order)} puzzles)")

# %%
# Build the large airports set for puzzles
large_iatas = {
    iata
    for iata, data in airports.items()
    if len(iata) == 3 and iata_size.get(iata) == "large"
}

# Use existing order if available, otherwise shuffle fresh
if existing_order:
    # Keep only codes that are still valid large airports
    puzzle_codes = [code for code in existing_order if code in large_iatas]
    # Add any new large airports not in the existing order
    new_codes = [code for code in large_iatas if code not in set(existing_order)]
    if new_codes:
        random.seed(42)
        random.shuffle(new_codes)
        puzzle_codes.extend(new_codes)
        print(f"  Added {len(new_codes)} new large airports to puzzle list")
else:
    puzzle_codes = list(large_iatas)
    random.seed(42)
    random.shuffle(puzzle_codes)
    print(f"Generated new shuffled puzzle order ({len(puzzle_codes)} puzzles)")

# %%
# Build puzzles array (large airports with display metadata, no lat/lon)
puzzles = []
for code in puzzle_codes:
    data = airports[code]
    puzzles.append(
        {
            "code": code,
            "name": data["name"],
            "city": data["city"],
            "subd": data["subd"],
            "country": country_names.get(data["country"], data["country"]),
        }
    )

# %%
# Build coords map (ALL valid IATA codes with lat/lon)
coords = {}
for iata, data in airports.items():
    if len(iata) == 3:
        coords[iata] = [round(data["lat"], 4), round(data["lon"], 4)]

# %%
# Write combined output
output = {"puzzles": puzzles, "coords": coords}
with open("airports.json", "w") as f:
    json.dump(output, f, separators=(",", ":"))

print(f"\nWrote airports.json:")
print(f"  {len(puzzles)} puzzle airports (large only)")
print(f"  {len(coords)} total IATA codes with coordinates")

# %%
