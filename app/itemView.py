import urllib
from multiprocessing.pool import ThreadPool

from flask import jsonify
from flask_restful import Resource

from app import api
from bank import get_bank
from inventory import *
from listManipulation import *
from material import *
from sharedInventory import get_shared_inventory
from tradingPost import *
from wallet import *


class ItemRest(Resource):
    def get(self, api_key):
        key = {'access_token': api_key}
        encoded_key = urllib.urlencode(key)
        p = ThreadPool(processes=5)
        new_inventory_json_response = p.apply_async(get_all_inventory, [encoded_key])
        new_shared_json_response = p.apply_async(get_shared_inventory, [encoded_key])
        new_bank_json_response = p.apply_async(get_bank, [encoded_key])
        new_materials_json_response = p.apply_async(get_materials, [encoded_key])
        snapshot = models.Snapshot.query.filter_by(api_key=api_key).first_or_404()
        old_inventory_json = snapshot.inventory
        old_materials_json = snapshot.materials
        old_bank_json = snapshot.bank
        old_shared_json = snapshot.shared
        print "Loaded old snapshot"
        new_inventory_json = new_inventory_json_response.get(timeout=10)
        new_shared_json = new_shared_json_response.get(timeout=10)
        new_bank_json = new_bank_json_response.get(timeout=10)
        new_materials_json = new_materials_json_response.get(timeout=10)
        print "Retrieved new data"
        inventory_delta_list = compare_inventory(old_inventory_json, new_inventory_json)
        shared_delta_list = compare_inventory(old_shared_json, new_shared_json)
        bank_delta_list = compare_inventory(old_bank_json, new_bank_json)
        materials_delta_list = compare_inventory(old_materials_json, new_materials_json)
        print "Compared data"
        inventory_delta_list = remove_zero_count(inventory_delta_list)
        shared_delta_list = remove_zero_count(shared_delta_list)
        bank_delta_list = remove_zero_count(bank_delta_list)
        materials_delta_list = remove_zero_count(materials_delta_list)
        print "Removed zero count"
        condensed_list = inventory_delta_list + shared_delta_list + bank_delta_list + materials_delta_list
        p = ThreadPool(processes=20)
        p.map(add_name_to_item, condensed_list)
        p.map(add_unit_price_to_item, condensed_list)
        p.close()
        p.terminate()
        print "Item name retrieved"
        condensed_list2 = copy.deepcopy(condensed_list)
        condensed_list2 = compress_list(condensed_list2)
        condensed_list2 = remove_zero_count(condensed_list2)
        print "Removed zero count from condensed list"
        p.close()
        p.terminate()
        models.db.session.close()
        return jsonify(item_data=condensed_list2)


api.add_resource(ItemRest, '/item/<string:api_key>')
