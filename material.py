import json
import urllib2

from Constants import API2_URL


def get_materials(encoded_key):
    full_url = API2_URL + '/account/materials?' + encoded_key
    response = urllib2.urlopen(full_url)
    the_page = response.read()
    material_data = json.loads(the_page)
    for attribute in material_data:
        attribute.pop('category', None)
    return material_data
