import unittest

import ItemContainerHelper


# Testing setup:
# All masterwork and lower gear is salvaged with Copper-Fed Salvage-o-Matic
# Almost all Essences of Luck were automatically used not will not be seen in the results
# All junk items and masterwork sigils/runes were sold to vendor


class ItemContainerTest(unittest.TestCase):
    @staticmethod
    def testInsertUpdate():
        level = 50
        primary_item_data = {
            "count": -15,
            "id": 44216,
            "name": "Patchwork Knapsack",
            "unit_price": 0
        }

        new_id = primary_item_data['id']
        count = primary_item_data['count']
        new_n = -count
        item_data = [
            {
                "count": 1,
                "id": 649,
                "name": "Strong Reinforced Scale Boots of the Dolyak",
                "unit_price": 713
            },

            {
                "count": 4,
                "id": 19699,
                "name": "Iron Ore",
                "unit_price": 243
            },
            {
                "count": 3,
                "id": 19730,
                "name": "Coarse Leather Section",
                "unit_price": 508
            },
            {
                "count": 1,
                "id": 19727,
                "name": "Seasoned Wood Log",
                "unit_price": 258
            },
            {
                "count": 4,
                "id": 19702,
                "name": "Platinum Ore",
                "unit_price": 167
            },
            {
                "count": 5,
                "id": 19743,
                "name": "Linen Scrap",
                "unit_price": 354
            },
            {
                "count": 5,
                "id": 19731,
                "name": "Rugged Leather Section",
                "unit_price": 625
            },
            {
                "count": 3,
                "id": 19724,
                "name": "Hard Wood Log",
                "unit_price": 200
            },
            {
                "count": 3,
                "id": 19748,
                "name": "Silk Scrap",
                "unit_price": 38
            },
            {
                "count": 13,
                "id": 19700,
                "name": "Mithril Ore",
                "unit_price": 46
            },
            {
                "count": 1,
                "id": 19745,
                "name": "Gossamer Scrap",
                "unit_price": 55
            },
            {
                "count": 1,
                "id": 19732,
                "name": "Hardened Leather Section",
                "unit_price": 3094
            },
            {
                "count": 1,
                "id": 19701,
                "name": "Orichalcum Ore",
                "unit_price": 220
            },
            {
                "count": 2,
                "id": 24283,
                "name": "Powerful Venom Sac",
                "unit_price": 3130
            },
            {
                "count": 3,
                "id": 24294,
                "name": "Vial of Potent Blood",
                "unit_price": 153
            },
            {
                "count": 3,
                "id": 24276,
                "name": "Pile of Incandescent Dust",
                "unit_price": 296
            },
            {
                "count": 3,
                "id": 24288,
                "name": "Large Scale",
                "unit_price": 167
            },
            {
                "count": 18,
                "id": 24299,
                "name": "Intricate Totem",
                "unit_price": 92
            },
            {
                "count": 6,
                "id": 24282,
                "name": "Potent Venom Sac",
                "unit_price": 61
            }
        ]
        new_item_data = item_data
        wallet_data = [
            {
                "count": 2852,
                "id": 1,
                "name": "Coin"
            },
            {
                "count": 150,
                "id": 2,
                "name": "Karma"
            },
            {
                "count": 1,
                "id": 23,
                "name": "Spirit Shard"
            }
        ]
        new_wallet_data = wallet_data
        item_container = ItemContainerHelper.ItemContainerHelper()
        item_container.handle(new_id, new_n, new_wallet_data, new_item_data, level)

        # @staticmethod
        # def testDelete():
        #     item_container = ItemContainerHelper.ItemContainerHelper()
        #     item_container.delete(9276)


if __name__ == '__main__':
    unittest.main()
