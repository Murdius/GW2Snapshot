from app import models
from app.models import ItemContainer
from listManipulation import filter_list, combine_list


class ItemContainerHelper:
    def __init__(self):
        pass

    def handle(self, item_id, n, wallet_result, item_result, level):
        exists = models.db.session.query(models.ItemContainer.id).filter_by(
            id=item_id).scalar() is not None
        if exists:
            self.update(item_id, n, wallet_result, item_result, level)
        else:
            self.insert(item_id, n, wallet_result, item_result, level)

    @staticmethod
    def insert(item_id, n, wallet_result, item_result, level):
        new_item_container = ItemContainer(item_id, n, filter_list(wallet_result), filter_list(item_result), level)
        models.db.session.add(new_item_container)
        models.db.session.commit()

    @staticmethod
    def delete(item_id):
        current_item_container = ItemContainer.query.filter_by(id=item_id).first()
        models.db.session.delete(current_item_container)
        models.db.session.commit()

    @staticmethod
    def update(item_id, n, wallet_result, item_result, level):
        current_item_container = ItemContainer.query.filter_by(id=item_id).first()
        if level != current_item_container.level:
            print 'Level is different, should\'ve used composite primary keys...'
            return
        new_id = item_id
        new_n = current_item_container.n + n
        new_wallet_result = combine_list(wallet_result, current_item_container.wallet_result)
        new_item_result = combine_list(item_result, current_item_container.item_result)
        new_item_container = ItemContainer(new_id, new_n, new_wallet_result, new_item_result, level)
        models.db.session.delete(current_item_container)
        models.db.session.add(new_item_container)
        models.db.session.commit()
