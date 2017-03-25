import json
import urllib2

from Constants import API2_URL
from app import models
from listManipulation import compress_list


def get_all_inventory(encoded_key):
    full_url = API2_URL + '/characters?page=0&&' + encoded_key
    response = urllib2.urlopen(full_url)
    the_page = response.read()
    characters_data = json.loads(the_page)

    filtered = []
    for character in characters_data:
        for bags in character['bags']:
            if bags is not None:
                for item in bags['inventory']:
                    if item is not None:
                        filtered.append(item)

    # Filters out everything except 'count' and 'id'
    for attribute in filtered:
        attribute.pop('binding', None)
        attribute.pop('skin', None)
        attribute.pop('upgrades', None)
        attribute.pop('bound_to', None)
        attribute.pop('stats', None)
        attribute.pop('infusions', None)

    # Compress list of items have duplicate id
    compresesd_list = []
    compressed_list = compress_list(filtered)
    return compressed_list


def item_id_to_name(item_id):
    scope_url = '/items/'
    full_url = API2_URL + scope_url + str(item_id)
    response = urllib2.urlopen(full_url)
    the_page = response.read()
    currency_json = json.loads(the_page)
    return currency_json['name']


def add_name_to_item(item):
    exists = models.db.session.query(models.Item.name).filter_by(id=item['id']).scalar() is not None
    if exists:
        name = (models.Item.query.filter_by(id=item['id']).first_or_404()).name
    else:
        name = item_id_to_name(item['id'])
        db_item = models.Item(item['id'], name)
        models.db.session.merge(db_item)
        models.db.session.commit()
    item['name'] = name
    models.db.session.close()
