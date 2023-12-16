from backend import db


class WalmartOrder(db.Model):
    orderID = db.Column(db.String(50), primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    deliveryFee = db.Column(db.Float, nullable=False)
    savings = db.Column(db.Float, nullable=False)
    subTotal = db.Column(db.Float, nullable=False)
    tax = db.Column(db.Float, nullable=False)
    tip = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)


class WalmartOrderRawItems(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    walmart_order_id = db.Column(
        db.String(50), db.ForeignKey("walmart_order.orderID"), nullable=True
    )
    name = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    per_item_cost = db.Column(db.Float, nullable=False)


class WalmartOrderGroups(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    walmart_order_id = db.Column(
        db.String(50), db.ForeignKey("walmart_order.orderID"), nullable=True
    )
    name = db.Column(db.String(255), nullable=False)


class WalmartOrderProcessedItems(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    walmart_order_group_id = db.Column(
        db.Integer, db.ForeignKey("walmart_order_groups.ID"), nullable=True
    )
    name = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    per_item_cost = db.Column(db.Float, nullable=False)
