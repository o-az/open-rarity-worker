from open_rarity import Collection, OpenRarityScorer, Token
from open_rarity.rarity_ranker import RarityRanker


def collectionRarityRanker(collection: Collection):
    scorer = OpenRarityScorer()

    token_scores = scorer.score_collection(collection=collection)

    print(f"Token scores for collection: {token_scores}")

    ranked_tokens = RarityRanker.rank_collection(collection=collection)

    return ranked_tokens


def main():
    demoCollection = Collection(
        name="boredapeyachtclub",
        tokens=[
            Token.from_erc721(
                contract_address="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
                token_id=7733,
                metadata_dict={
                    "background": "army green",
                    "fur": "golden brown",
                    "mouth": "bored",
                    "hat": "fisherman's hat",
                    "eyes": "heart",
                },
            ),
        ],
    )
    ranked_tokens = collectionRarityRanker(collection=demoCollection)

    for ranked in ranked_tokens:
        print(
            f"Token {ranked.token.token_identifier}\n",
            f"rank {ranked.rank}\n",
            f"score {ranked.score}\n",
        )


if __name__ == "__main__":
    main()
