import urllib
from multiprocessing.pool import ThreadPool
from pprint import pprint

from flask import jsonify
from flask_restful import Resource

from app import api
from listManipulation import *
from wallet import *


class WalletRest(Resource):
    def get(self, api_key):
        key = {'access_token': api_key}
        encoded_key = urllib.urlencode(key)
        snapshot = models.Snapshot.query.filter_by(api_key=api_key).first_or_404()
        old_wallet_json = snapshot.wallet
        print "Loaded old snapshot"
        new_wallet_json = get_wallet(encoded_key)
        print "Retrieved new data"
        wallet_delta_list = compare_wallet(old_wallet_json, new_wallet_json)
        print "Compared data"
        wallet_delta_list = remove_zero_value(wallet_delta_list)
        pprint(wallet_delta_list)
        for currency in wallet_delta_list:
            currency['count'] = currency.pop('value')
        print "Removed zero count"
        p = ThreadPool(processes=5)
        p.map(add_name_to_currency, wallet_delta_list)
        p.close()
        p.terminate()
        models.db.session.close()
        return jsonify(wallet_data=wallet_delta_list)


api.add_resource(WalletRest, '/wallet/<string:api_key>')
