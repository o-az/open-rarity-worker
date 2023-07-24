import os

import requests
from open_rarity import Collection


# TODO: figure out how to figure out
def fetchCollectionFromOpenSea(slug: str) -> Collection:
    response = requests.get(
        f"https://api.opensea.io/api/v1/collection/{slug}",
        headers={
            "X-API-KEY": os.environ.get("OS_API_KEY"),
            "accept": "application/json",
        },
    )
    if response.status_code != 200:
        raise Exception(f"Failed to fetch collection {slug} from OpenSea")
    return response.json()["collection"]
