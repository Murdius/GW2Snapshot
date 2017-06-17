from sqlalchemy.dialects.postgresql import JSON

from app import db


class ItemContainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n = db.Column(db.Integer)
    wallet_result = db.Column(JSON)
    item_result = db.Column(JSON)
    level = db.Column(db.Integer)

    def __init__(self, item_id, n, wallet_result, item_result, level):
        self.id = item_id
        self.n = n
        self.wallet_result = wallet_result
        self.item_result = item_result
        self.level = level

    def __repr__(self):
        return 'Item ID: {} \n' \
               'n: {} \n' \
               'wallet_result: {} \n' \
               'item_result: {} \n' \
               'level: {}'.format(self.id, self.n, self.wallet_result, self.item_result, self.level)


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    def __init__(self, item_id, name):
        self.id = item_id
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name


class Currency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    def __init__(self, item_id, name):
        self.id = item_id
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name


class Snapshot(db.Model):
    api_key = db.Column(db.String(128), primary_key=True)
    inventory = db.Column(JSON)
    materials = db.Column(JSON)
    bank = db.Column(JSON)
    shared = db.Column(JSON)
    wallet = db.Column(JSON)

    def __init__(self, api_key, inventory, materials, bank, shared, wallet):
        self.api_key = api_key
        self.inventory = inventory
        self.materials = materials
        self.bank = bank
        self.shared = shared
        self.wallet = wallet

    def __repr__(self):
        return '<API Key %r>' % self.api_key
