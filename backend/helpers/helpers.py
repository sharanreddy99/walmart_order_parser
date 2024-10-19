import sys
from backend.WalmartItem.WalmartItem import WalmartItem
from backend.entities.entities import *
from backend import db
from sqlalchemy import update, select


def add_or_update_walmart_order(
    orderID,
    date,
    subTotal,
    savings,
    total,
    deliveryFee,
    tax,
    tip,
):
    existing_order = db.session.execute(
        db.select(WalmartOrder).filter(
            (WalmartOrder.orderID == orderID), (WalmartOrder.date == date)
        )
    ).fetchall()

    if len(existing_order) == 0:
        new_order = WalmartOrder(
            orderID=orderID,
            date=date,
            subTotal=subTotal,
            total=total,
            savings=savings,
            deliveryFee=deliveryFee,
            tax=tax,
            tip=tip,
        )
        db.session.add(new_order)
        db.session.commit()

    return True


def add_or_update_walmart_order_raw_items(orderID, ordersArr):
    for order in ordersArr:
        existing_order_raw_item = db.session.execute(
            db.select(WalmartOrderRawItems).filter(
                (WalmartOrderRawItems.walmart_order_id == orderID),
                (WalmartOrderRawItems.name == order.name),
            )
        ).first()

        if existing_order_raw_item is not None:
            stmt = (
                update(WalmartOrderRawItems)
                .where(
                    WalmartOrderRawItems.walmart_order_id == orderID,
                    WalmartOrderRawItems.name == order.name,
                )
                .values(
                    status=order.status,
                    price=order.price,
                    quantity=order.quantity,
                    per_item_cost=order.perItemCost,
                )
            )
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


def add_or_update_walmart_groups(orderID, name, groupUserIds):
    existing_group = db.session.execute(
        select(WalmartOrderGroups).filter(
            (WalmartOrderGroups.walmart_order_id == orderID),
            (WalmartOrderGroups.name == name),
        )
    ).fetchone()

    if existing_group is None:
        new_group = WalmartOrderGroups(
            walmart_order_id=orderID, name=name, groupUserIds=groupUserIds
        )
        db.session.add(new_group)
        db.session.commit()
        db.session.refresh(new_group)
        return new_group.ID

    return existing_group[0].ID


def clear_walmart_order_processed_items(orderID):
    db.session.execute(
        db.delete(WalmartOrderProcessedItems).where(
            (WalmartOrderProcessedItems.walmart_order_id == orderID),
        )
    )

    db.session.commit()


def add_or_update_walmart_order_processed_items(orderID, groupID, ordersArr):
    for order in ordersArr:
        walmartProcessedItem = WalmartOrderProcessedItems(
            walmart_order_id=orderID,
            walmart_order_group_id=groupID,
            name=order["name"],
            status=order["status"],
            price=order["price"],
            quantity=order["quantity"],
            per_item_cost=order["perItemCost"],
        )
        db.session.add(walmartProcessedItem)

    db.session.commit()


def fetch_processed_order_details(orderID, orderDate):
    stmt1 = select(WalmartOrder).where(
        WalmartOrder.orderID == orderID, WalmartOrder.date == orderDate
    )

    result = db.session.execute(stmt1).fetchone()
    if result is None:
        raise Exception()

    result = result[0]

    resultObject = {
        "orderName": result.orderID,
        "date": result.date,
        "subTotal": result.subTotal,
        "savings": result.savings,
        "total": result.total,
        "deliveryFee": result.deliveryFee,
        "tax": result.tax,
        "tip": result.tip,
    }

    stmt = (
        select(
            WalmartOrder.orderID,
            WalmartOrderGroups.name,
            WalmartOrderProcessedItems.name,
            WalmartOrderProcessedItems.status,
            WalmartOrderProcessedItems.quantity,
            WalmartOrderProcessedItems.price,
            WalmartOrderProcessedItems.per_item_cost,
        )
        .join(
            WalmartOrderGroups,
            WalmartOrder.orderID == WalmartOrderGroups.walmart_order_id,
        )
        .join(
            WalmartOrderProcessedItems,
            WalmartOrderGroups.ID == WalmartOrderProcessedItems.walmart_order_group_id,
        )
        .where(WalmartOrder.orderID == orderID, WalmartOrder.date == orderDate)
    )

    processedOrders = db.session.execute(stmt).all()
    groupsInfo = {}

    for row in processedOrders:
        groupsInfo[row[1]] = groupsInfo.get(row[1], [])
        groupsInfo[row[1]].append(
            WalmartItem(row[2], row[3], row[4], row[5], row[6]).toJSONObject()
        )

    resultObject["groupsInfo"] = groupsInfo
    return resultObject


def add_or_update_users(name, email):
    existing_user = db.session.execute(
        select(Users).filter(
            (Users.email == email),
        )
    ).fetchone()

    if existing_user is None:
        new_user = Users(name=name, email=email)
        db.session.add(new_user)
        db.session.commit()
        db.session.refresh(new_user)
        return new_user.ID

    return existing_user[0].ID, existing_user[0].name, existing_user[0].email
