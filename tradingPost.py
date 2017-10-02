import json
import urllib2

from Constants import API2_URL


def get_sell_price(item_id):
    full_url = API2_URL + '/commerce/prices?ids=' + str(item_id)
    try:
        response = urllib2.urlopen(full_url)
        the_page = response.read()
        listing_data = json.loads(the_page)
        sells = listing_data[0]['sells']
        price = sells['unit_price']
    except:
        return 0
    return price


def add_sell_price_to_item(item):
    value = get_sell_price(item['id'])
    item['copper'] = item['count'] * value

def add_unit_prices_to_item(condensed_list2):
    listOfIds = []
    for item in condensed_list2:
        listOfIds.append(item['id'])
    idString = ",".join([str(x) for x in listOfIds])
    prices = get_sell_prices(idString)
    for item in condensed_list2:
        for price in prices:
            if price['id'] == item['id']:
                try:
                    item['unit_price'] = price['sells']['unit_price']
                except:
                    add_unit_price_to_item(item)
    for item in condensed_list2:
        if not item.has_key('unit_price'):
            add_unit_price_to_item(item)

def get_sell_prices(item_ids):
    full_url2 = API2_URL + '/commerce/prices?ids=' + str(item_ids)
    try:
        response = urllib2.urlopen(full_url2)
        the_page = response.read()
        listing_data = json.loads(the_page)
        prices = listing_data
    except:
        return []
    return prices

def add_unit_price_to_item(item):
    item['unit_price'] = get_sell_price(item['id'])
