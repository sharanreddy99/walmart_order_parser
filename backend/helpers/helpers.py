import sys
from backend.entities.entities import *
from backend import db
from sqlalchemy import update


def add_or_update_walmart_order(orderID, date):
    existing_order = db.session.execute(db.select(WalmartOrder).filter(
        (WalmartOrder.orderID == orderID), (WalmartOrder.date == date)
   )).fetchall()

    if len(existing_order) == 0:
        new_order = WalmartOrder(orderID=orderID, date=date)
        db.session.add(new_order)
        db.session.commit()
        
    return True    


def add_or_update_walmart_order_raw_items(orderID, ordersArr):
    for order in ordersArr:
        existing_order_raw_item = db.session.execute(db.select(WalmartOrderRawItems).filter(
            (WalmartOrderRawItems.walmart_order_id == orderID),
            (WalmartOrderRawItems.name == order.name)
        )).first()

        if existing_order_raw_item is not None:
            stmt = update(WalmartOrderRawItems).where(WalmartOrderRawItems.walmart_order_id == orderID, WalmartOrderRawItems.name == order.name).values(status = order.status, price = order.price, quantity = order.quantity, per_item_cost = order.perItemCost)
            db.session.execute(stmt)
            db.session.commit()
        else:
            new_order_raw_item = WalmartOrderRawItems(
                walmart_order_id=orderID,
                name=order.name,
                status=order.status,
                price=order.price,
                quantity=order.quantity,
                per_item_cost=order.perItemCost,
            )
            db.session.add(new_order_raw_item)
            db.session.commit()

    return True
