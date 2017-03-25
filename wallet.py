import json
import urllib2

from Constants import API2_URL
from app import models
from app.models import Currency


def get_wallet(encoded_key):
    scope_url = '/account/wallet'
    wallet_data = []
    full_url = API2_URL + scope_url + '?' + encoded_key
    try:
        response = urllib2.urlopen(full_url)
        the_page = response.read()
        wallet_data = json.loads(the_page)
        return wallet_data
    except urllib2.HTTPError, err:
        if err.code == 403:
            print "Access denied!"
            return "Access denied!"
        else:
            print "Something happened! Error code", err.code
            return "Some other error happened"
    except urllib2.URLError, err:
        print "Some other error happened:", err.reason
        return "Some other error happened: "
    

def wallet_id_to_name(wallet_id):
    scope_url = '/currencies/'
    full_url = API2_URL + scope_url + str(wallet_id)
    response = urllib2.urlopen(full_url)
    the_page = response.read()
    currency_json = json.loads(the_page)
    return currency_json['name']


def add_name_to_currency(currency):
    exists = models.db.session.query(Currency.name).filter_by(id=currency['id']).scalar() is not None
    if exists:
        name = (Currency.query.filter_by(id=currency['id']).first_or_404()).name
        currency['name'] = name
    else:
        name = wallet_id_to_name(currency['id'])
        db_currency = Currency(currency['id'], name)
        models.db.session.merge(db_currency)
        models.db.session.commit()
        currency['name'] = name
    models.db.session.close()