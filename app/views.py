import urllib
import urllib2
import json
import sys
import filewriter
import time
import copy

from pprint import pprint
from listManipulation import *
from wallet import *
from inventory import *
from bank import get_bank
from sharedInventory import getSharedInventory 
from material import *
from app import models, app
from flask import Blueprint, render_template, request, make_response, flash, session, jsonify
from tradingPost import *
from multiprocessing.pool import ThreadPool

API2_URL = 'https://api.guildwars2.com/v2'


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/snapshot', methods=['POST'])
def take_first_snapshot():
    api_key = request.form['key']
    key = {'access_token': api_key}
    encoded_key = urllib.urlencode(key)
    wallet_json = getWallet(API2_URL, encoded_key)
    if wallet_json == "Access denied!":
        return 'Access denied!'
    inventory_json = getAllInventory(API2_URL, encoded_key)
    inventory_data = json.dumps(inventory_json)
    print "Retrieved inventory data"
    shared_json = getSharedInventory(API2_URL, encoded_key)
    print "Retrieved shared data"
    bank_json = get_bank(API2_URL, encoded_key)
    print "Retrieved bank data"
    materials_json = getMaterials2(API2_URL, encoded_key)
    materials_data = json.dumps(materials_json)
    print "Retrieved materials data"
    exists = models.db.session.query(models.Snapshot.api_key).filter_by(
        api_key=api_key).scalar() is not None
    if exists:
        snapshot = models.Snapshot.query.filter_by(api_key=api_key).first_or_404()
        snapshot.inventory = inventory_data
        snapshot.materials = materials_data
        models.db.session.commit()
    else:
        snapshot = models.Snapshot(api_key, inventory_data, materials_data)
        models.db.session.add(snapshot)
        models.db.session.commit()
    models.db.session.close()
    print "Snapshot added to database"
    session['bank'] = bank_json
    session['shared'] = shared_json
    session['wallet'] = wallet_json
    session['time'] = time.time()
    return api_key


@app.route('/walletresults', methods=['POST'])
def take_wallet_snapshot():
    api_key = request.cookies.get('key')
    key = {'access_token' : api_key}
    encoded_key = urllib.urlencode(key)
    old_wallet_json = session['wallet']
    print "Loaded old snapshot"
    new_wallet_json = getWallet(API2_URL, encoded_key)
    print "Retrieved new data"
    wallet_delta_list = compare_wallet(old_wallet_json, new_wallet_json)
    print "Compared data"
    wallet_delta_list = remove_zero_value(wallet_delta_list)
    for currency in wallet_delta_list:
        currency['count'] = currency.pop('value')
    print "Removed zero count"
    p = ThreadPool(processes=20)
    p.map(add_name_to_currency, wallet_delta_list)
    p.close()
    p.terminate()
    models.db.session.close()
    return jsonify(list=wallet_delta_list)


@app.route('/itemresults', methods=['POST'])
def take_item_snapshot():
    api_key = request.cookies.get('key')
    key = {'access_token' : api_key}
    encoded_key = urllib.urlencode(key)
    p = ThreadPool(processes=10)
    new_inventory_json_response = p.apply_async(getAllInventory, (API2_URL, encoded_key))
    new_shared_json_response = p.apply_async(getSharedInventory, (API2_URL, encoded_key))
    new_bank_json_response = p.apply_async(get_bank, (API2_URL, encoded_key))
    new_materials_json_response = p.apply_async(getMaterials2, (API2_URL, encoded_key))
    #start_time = session['time']
    #minutes_elapsed = (time.time()-start_time)/60
    old_bank_json = session['bank']
    old_shared_json = session['shared']
    snapshot = models.Snapshot.query.filter_by(api_key=api_key).first_or_404()
    old_inventory_data = snapshot.inventory
    old_materials_data = snapshot.materials
    old_inventory_json = json.loads(old_inventory_data)
    old_materials_json = json.loads(old_materials_data)
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
    condensed_list = inventory_delta_list+shared_delta_list+bank_delta_list+materials_delta_list
    p.map(add_name_to_item, condensed_list)
    p.close()
    p.join()
    print "Item name retrieved"
    condensed_list2 = copy.deepcopy(condensed_list)
    condensed_list2 = compress_list(condensed_list2)
    condensed_list2 = remove_zero_count(condensed_list2)
    print "Removed zero count from condensed list"
    packaged_list = {'condensed_list2' : condensed_list2}
    p.close()
    p.terminate()
    models.db.session.close()
    return jsonify(data=packaged_list)
