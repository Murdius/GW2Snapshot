import json
import urllib2

from Constants import API2_URL


def get_shared_inventory(encoded_key):
    full_url = API2_URL + '/account/inventory?' + encoded_key
    response = urllib2.urlopen(full_url)
    the_page = response.read()
    shared_inventory_data = json.loads(the_page)
    return [x for x in shared_inventory_data if x is not None]
