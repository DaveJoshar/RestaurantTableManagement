function __User(data) {
    var self = this;
    self.userId = ko.observable(data.userId);
    self.userName = ko.observable(data.userName);
    self.userContact = ko.observable(data.userContact);
    self.selectedTableId = ko.observable(data.selectedTableId());
}

var __FoodOrderModel = function () {
    var self = this;
    self.userId = 1;
    self.userName = ko.observable();
    self.userContact = ko.observable();
    self.users = ko.observableArray([]);
    self.selectedTableId = ko.observable();
    self.tables = ko.observableArray([
        { tableId: 1, tableType: 'Family Dining Table', status:1 },
        { tableId: 2, tableType: '2 Person Table', status:1},
        { tableId: 3, tableType: '4 Person Table', status:1 },
        { tableId: 4, tableType: 'OutDoor Table',status:1 },
    ]);
    //to bind available table only 
    self.availableTables = ko.observableArray([]);

    //to show only available tables
    self.updateAvailableTable = function () {
        
        for (i = 0; i < self.tables().length; i++) {
            if (self.tables()[i].status == 1) {
                self.availableTables.push(self.tables()[i]);
            }
        }
    }
    self.findTable = function (data) {
        return((self.tables().find(x => x.tableId == data().tableId)));
    }
    self.updateAvailableTable();
    //to add new user
    self.addUser = function () {
        if (self.verify()) {
            if (confirm("Are you sure?")) {
                var tempArray = {
                    userId: self.userId,
                    userName: self.userName(),
                    userContact: self.userContact(),
                    selectedTableId: self.selectedTableId
                };

                self.userId += 1;
                self.users.push(new __User(tempArray));
                var sucessMsg = "Table reserved";
                //(self.tables().find(x => x.tableId == self.selectedTableId().tableId)).status = 0;
                var t = self.findTable(self.selectedTableId);
                t.status = 0;
                self.contentClear();
                self.updateAvailableTable();
                alert(sucessMsg);
            }
        }
    };
    //to clear content
    self.contentClear = function () {
        self.userName(null);
        self.userContact(null);
        self.selectedTableId(null);
        self.availableTables.removeAll();
    };
    //to verify null
    self.verify = function () {
        if (self.userName() == null ||
            self.userContact() == null ||
            self.selectedTableId() == null ||
            self.userName() == undefined ||
            self.userContact() == undefined ||
            self.selectedTableId() == undefined)
        {
            alert("Enter data first");
            return false;
        } else {
            return true;
        }
    }

    //to cancel reservation
    self.cancelReservation = function (data) {
        if (confirm("Are you sure?")) {
            self.users.remove(data);
            //(self.tables().find(x => x.tableId == data.selectedTableId().tableId)).status = 1;
            self.contentClear();
            
            var t = self.findTable(data.selectedTableId);
            t.status = 1;
            self.updateAvailableTable();
            alert('Table Canceled');

        }
    }
}

ko.applyBindings(new __FoodOrderModel());