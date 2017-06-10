import urllib

from flask import render_template, request, session
from flask_restful import Resource

from app import app, api
from bank import get_bank
from inventory import *
from material import *
from sharedInventory import get_shared_inventory
from wallet import *


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


class Snapshot(Resource):
    def post(self):
        api_key = request.cookies.get('key')
        key = {'access_token': api_key}
        encoded_key = urllib.urlencode(key)
        wallet_json = get_wallet(encoded_key)
        if wallet_json == "Access denied!":
            return 'Access denied!'
        inventory_json = get_all_inventory(encoded_key)
        print "Retrieved inventory data"
        shared_json = get_shared_inventory(encoded_key)
        print "Retrieved shared data"
        bank_json = get_bank(encoded_key)
        print "Retrieved bank data"
        materials_json = get_materials(encoded_key)
        print "Retrieved materials data"
        exists = models.db.session.query(models.Snapshot.api_key).filter_by(
            api_key=api_key).scalar() is not None
        if exists:
            snapshot = models.Snapshot.query.filter_by(api_key=api_key).first_or_404()
            snapshot.inventory = inventory_json
            snapshot.materials = materials_json
            snapshot.bank = bank_json
            snapshot.shared = shared_json
            snapshot.wallet = wallet_json
            models.db.session.commit()
        else:
            snapshot = models.Snapshot(api_key, inventory_json, materials_json, bank_json, shared_json, wallet_json)
            models.db.session.add(snapshot)
            models.db.session.commit()
        models.db.session.close()

        print "Snapshot added to database"
        session['wallet'] = wallet_json
        return api_key


api.add_resource(Snapshot, '/snapshot')

