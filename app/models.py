from app import db
from sqlalchemy.dialects.postgresql import JSON

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

class Currency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    def __init__(self, id, name):
        self.id = id
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