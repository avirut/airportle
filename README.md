# Airportle

A daily airport code guessing game. Each day presents a new three-letter IATA airport code to guess in six tries, with three feedback modes: letter-based (Wordle-style), distance/direction hints, or both.

Inspired by the original Airportle, which no longer seems to exist, as well as Worldle, and Wordle, and all the other -dles.

## Development

```
cd web
pnpm install
pnpm dev
```

## Data pipeline

Airport data is generated from the [airportsdata](https://pypi.org/project/airportsdata/) library and [OurAirports](https://ourairports.com/), filtered to large airports only. To regenerate:

```
cd data
pip install airportsdata
python create-airports.py
cp airports.json ../web/src/assets/airports.json
```
