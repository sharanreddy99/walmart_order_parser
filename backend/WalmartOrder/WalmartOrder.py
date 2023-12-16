import json

from backend.WalmartItem.WalmartItem import WalmartItem

class WalmartOrder:
    def __init__(self, orderName):
        self.orderName = orderName
        self.date = None
        self.ordersArr = []
        self.subTotal = 0
        self.total = 0
        self.deliveryFee = 0
        self.tax = 0
        self.tip = 0
        self.groups = {}

    def getGroups(self):
        while True:
            groupLabel = input("Enter group members separated by comma or q to quit: ")
            if groupLabel == "q":
                return
            
            self.groups[groupLabel] = {}

    def __str__(self):
        return 'Order: %s\nSubTotal (Without tax): %s and Total(With tax): %s\nDelivery Fee: %s Tax: %s Tip: %s\n\nOrders:\n%s'%(self.orderName, self.subTotal, self.total, self.deliveryFee, self.tax, self.tip, self.printOrders())
    
    def printOrders(self):
        res = ''
        for order in self.ordersArr:
            res += order.__str__() + "\n"
        
        return res
    
    def clearUnavailableItemPrices(self):
        for i in range(len(self.ordersArr)):
            if self.ordersArr[i].status.lower() == 'unavailable':
                self.ordersArr[i].price = 0

    def createTaxItem(self):
        if float(self.tax) > 0:
            obj = WalmartItem('Tax', 'Shopped', 1, float(self.tax))
            obj.perItemCost = obj.price
            self.ordersArr.append(obj)

    def toJSON(self, includeTax = False):
        self.clearUnavailableItemPrices()
        if includeTax:
            self.createTaxItem()
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)