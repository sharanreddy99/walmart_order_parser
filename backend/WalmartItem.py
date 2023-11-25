import json
from uuid import uuid4 as v4

class WalmartItem:
    def __init__(self, name, status=None, quantity=None, price=None):
        self.idx = v4().hex[:6].upper()
        self.name = name
        self.status = status
        self.quantity = quantity
        self.price = price
        self.perItemCost = None
    
    def __str__(self):
        return 'Name: %s | Status: %s | Quantity: %s | Price: %s'%(self.name, self.status, self.quantity, self.price)

    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)