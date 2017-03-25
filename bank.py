import json
import urllib2

from Constants import API2_URL
from listManipulation import compress_list


def get_bank(encoded_key):
    scope_url = '/account/bank'
    bank_data = []
    full_url = API2_URL + scope_url + '?' + encoded_key
    response = urllib2.urlopen(full_url)
    the_page = response.read()
    bank_data = json.loads(the_page)
    
    filtered = []
    for item in bank_data:
        if item != None:
            filtered.append(item)
                      
    #Filters out everything except 'count' and 'id'
    for attribute in filtered:
         attribute.pop('binding', None)
         attribute.pop('infusions', None)
         attribute.pop('skin', None)
         attribute.pop('upgrades', None)
         attribute.pop('bound_to', None)
    
    #Compress list of items have duplicate id
    compresesd_list = []
    compressed_list = compress_list(filtered)
    
    return compressed_list
