# %%
import airportsdata
import json
import csv
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
# Load airportsdata and build filtered output
airports = airportsdata.load("IATA")

filtered = {
    iata: {
        "name": data["name"],
        "city": data["city"],
        "subd": data["subd"],
        "country": country_names.get(data["country"], data["country"]),
        "lat": data["lat"],
        "lon": data["lon"],
        "size": iata_size.get(iata, "unknown"),
    }
    for iata, data in airports.items()
    if len(iata) == 3
}

# %%
with open("airports.json", "w") as f:
    json.dump(filtered, f, indent=2)

print(f"Wrote {len(filtered)} airports to airports.json")

size_counts = {}
for airport in filtered.values():
    size_counts[airport["size"]] = size_counts.get(airport["size"], 0) + 1
for size, count in sorted(size_counts.items()):
    print(f"  {size}: {count}")

# %%
