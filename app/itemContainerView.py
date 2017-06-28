from flask import jsonify
from flask_restful import Resource

from app import api


class Container(Resource):
    def get(self, item_id):
        from ItemContainerHelper import ItemContainerHelper
        container = ItemContainerHelper.get(item_id)
        print container
        json = {}
        json['n'] = container.n
        json['id'] = container.id
        json['wallet_result'] = container.wallet_result
        json['item_result'] = container.item_result
        json['level'] = container.level
        return jsonify(json)


api.add_resource(Container, '/container/<int:item_id>')
