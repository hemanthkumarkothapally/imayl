sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.db.imayl.imayl.controller.MainView", {
        onInit() {
            // let newdate=new Date();
            // let obj={};
            // let packageformDate="packageformDate";
            // let popovertoDate="popovertoDate";
            // let popoverfromdate = "popoverfromdate";
            // obj[packageformDate] = newdate;
            // obj[popovertoDate] = newdate;
            // obj[popoverfromdate] = newdate;
            let oModel = this.getOwnerComponent().getModel("requestpackageModel");
            oModel.setData({
                packageformDate: new Date(),
                popovertoDate: new Date(),
                popoverfromdate: new Date(),
                requestapackageformtablecount: 1,
                tableData: [{
                    Image: "1234",
                    Status: "Received",
                    IntNumber: "",
                    RefNumber: "",
                    RefDate: new Date(),
                    Package: "",
                    DeliveryLocation: "",
                    Weight: "",
                    Value: "",
                    MailBox: "",
                    StorageLocation: "",
                    Bin: "",
                    Notes: ""
                }],
                aliasList:[{aliasName:"weer"}],
                tableCollection: [
                    { title: "Image" },
                    { title: "Status" },
                    { title: "Int #" },
                    { title: "Ref #" },
                    { title: "RefDate" },
                    { title: "Package" },
                    { title: "DeliveryLocation" },
                    { title: "Weight" },
                    { title: "Value" },
                    { title: "MailBox" },
                    { title: "StorageLocation" },
                    { title: "Bin" },
                    { title: "Notes" }
                ]
            });
            // let fromDate = oModel.getProperty("/popoverfromdate");
            // let toDate = oModel.getProperty("/popovertoDate");
            // this.calculateDays(fromDate, toDate);

        },
        _setToggleButtonTooltip: function (bLarge) {
            let oToggleButton = this.byId('sideNavigationToggleButton');
            let logolarge = "https://cloud.imayl.com/Com/ProcessWeaver/IMAYL/Common/dist/img/logo.png";
            let logosmall = "https://cloud.imayl.com/Com/ProcessWeaver/IMAYL/Common/dist/img/mlogo.png";
            let apagelogo = this.getView().byId("logoId").getSrc();
            console.log(apagelogo);
            if (bLarge || apagelogo == logolarge) {
                this.getView().byId("logoId").setSrc(logosmall);
                oToggleButton.setTooltip('Large Size Navigation');
            } else {
                oToggleButton.setTooltip('Small Size Navigation');
                this.getView().byId("logoId").setSrc(logolarge);
            }
        },
        onMenuButtonPress: function () {
            let oToolPage = this.byId("mainpage");
            let bSideExpanded = oToolPage.getSideExpanded();

            this._setToggleButtonTooltip(bSideExpanded);

            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },
        onItemSelect: function (oEvent) {
            let oItem = oEvent.getParameter("item").getKey();
            let oNavContainer = this.byId("maincontainer");
            switch (oItem) {
                case "1":
                    oNavContainer.to(this.byId("page1"));
                    break;
                case "2":
                    oNavContainer.to(this.byId("ReceiveaPackage_main"));
                    break;
                case "4":
                    oNavContainer.to(this.byId("UserManagementpage"));
                    break;
                default:
                    oNavContainer.to(this.byId("page1"));
                    break;
            }
        },
        onFilterselection: function (oEvent) {
            if (!this.filterPopOver) {
                this.filterPopOver = sap.ui.xmlfragment("com.db.imayl.imayl.view.filterPopoverRP", this);
                this.getView().addDependent(this.filterPopOver);
            }
            this.filterPopOver.openBy(oEvent.getSource());
        },
        handleApplyPress: function () {
            this.filterPopOver.close();
        },
        handleCancelPress: function () {
            this.filterPopOver.close();
        },
        onAddReceiveAPackage: function () {
            // this.getView().byId("ReceiveaPackage_main").setVisible(false);
            // this.getView().byId("ReceiveaPackage_form").setVisible(true);
            // this._setToggleButtonTooltip(true);
            // this.byId("mainpage").setSideExpanded(false);
            // // console.log(aReceive_a_Package_mainpage);
            // // console.log(aReceive_a_Package_formpage);
            // console.log("wertyut");
            let oNavContainer = this.byId("maincontainer");
            oNavContainer.to(this.byId("ReceiveaPackage_form"));

        },
        oncancel: function () {
            // this.getView().byId("ReceiveaPackage_main").setVisible(true);
            // this.getView().byId("ReceiveaPackage_form").setVisible(false);
            // this._setToggleButtonTooltip(false);
            // this.byId("mainpage").setSideExpanded(true);

            // Get the model
            let oModel = this.getOwnerComponent().getModel("requestpackageModel");

            // Create a new array with just one empty row
            let aNewData = [{
                Image: "",
                Status: "Received",
                IntNumber: "",
                RefNumber: "",
                RefDate: new Date(),
                Package: "Box",
                DeliveryLocation: "",
                Weight: "",
                Value: "",
                MailBox: "",
                StorageLocation: "",
                Bin: "",
                Notes: ""
            }];

            // Reset the row count to 1
            oModel.setProperty("/requestapackageformtablecount", 1);

            // Set the new data to the model
            oModel.setProperty("/tableData", aNewData);
            let oNavContainer = this.byId("maincontainer");
            oNavContainer.to(this.byId("ReceiveaPackage_main"));

        },
        formatDateRange: function (fromdate, toDate) {
            let oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MM/dd/yyyy" });
            return oDateFormat.format(fromdate) + " - " + oDateFormat.format(toDate);
        },
        calculateDays: function (fromDate, toDate) {
            if (!fromDate || !toDate) return "";
            let diffTime = toDate.getTime() - fromDate.getTime();
            let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (days == 0) {
                return 1;
            }
            else {
                return days;
            }

        },
        onAddRow: function () {
            let oModel = this.getOwnerComponent().getModel("requestpackageModel");
            let aData = oModel.getProperty("/tableData");
            let aRowcount = oModel.getProperty("/requestapackageformtablecount");
            aData.push({
                Image: "",
                Status: "Received",
                IntNumber: "",
                RefNumber: "",
                RefDate: new Date(),
                Package: "Box",
                DeliveryLocation: "",
                Weight: "",
                Value: "",
                MailBox: "",
                StorageLocation: "",
                Bin: "",
                Notes: ""
            });
            oModel.setProperty("/requestapackageformtablecount", aRowcount + 1);

            oModel.setProperty("/tableData", aData);
        },
        onDeleteRow: function (oEvent) {
            // Get the row context from the event's source
            let oSource = oEvent.getSource();
            let oBindingContext = oSource.getBindingContext("requestpackageModel");

            // If no binding context is found, exit
            if (!oBindingContext) {
                return;
            }

            // Get the row index (path) from the binding context
            let sPath = oBindingContext.getPath();
            let iIndex = parseInt(sPath.substring(sPath.lastIndexOf('/') + 1));

            // Get the model and data
            let oModel = this.getOwnerComponent().getModel("requestpackageModel");
            let aData = oModel.getProperty("/tableData");
            let aRowcount = oModel.getProperty("/requestapackageformtablecount");
            // Check if there's only one row in the table
            if (aData.length <= 1) {
                // Don't allow deletion if only one row exists
                sap.m.MessageToast.show("Cannot delete the row");
                return;
            }

            // Remove the row at the specified index
            if (iIndex >= 0 && iIndex < aData.length) {
                aData.splice(iIndex, 1);
                aRowcount = Math.max(0, aRowcount - 1);

                // Update model
                oModel.setProperty("/requestapackageformtablecount", aRowcount);
                oModel.setProperty("/tableData", aData);

                // Show success message
                sap.m.MessageToast.show("Row deleted successfully");
            }

        },
        onOpenColumnftlter: function (oEvent) {
            if (!this.tablePopOver) {
                this.tablePopOver = sap.ui.xmlfragment("com.db.imayl.imayl.view.tableSettingPopoverRP", this);
                this.getView().addDependent(this.tablePopOver);
            }
            this.tablePopOver.openBy(oEvent.getSource());
        },
        onSelectAllColumns: function (oEvent) {
            let aselected = oEvent.getParameter("selected");
            var oList = oEvent.getSource().getParent().getItems()[2];
            let aListitems = oEvent.getSource().getParent().getItems()[2].getItems();
            aListitems.forEach(function (oItem) {
                oList.setSelectedItem(oItem, aselected);
            });
        },
        onApplyColumnChanges: function () {
            var oTable = this.byId("formtable");
            var aColumns = oTable.getColumns();

            var oList = sap.ui.getCore().byId("CHKList");
            var aSelectedItems = oList.getSelectedItems();
            var aSelectedTitles = aSelectedItems.map(function (oItem) {
                return oItem.getTitle();
            });

            aColumns.forEach(function (oColumn) {
                // Try different approaches to get the header text
                var sHeaderText;

                // Try standard methods depending on the UI5 version and control type
                if (typeof oColumn.getLabel === "function") {
                    var oLabel = oColumn.getLabel();
                    if (oLabel && typeof oLabel.getText === "function") {
                        sHeaderText = oLabel.getText();
                    }
                } else if (typeof oColumn.getHeader === "function") {
                    var oHeader = oColumn.getHeader();
                    if (typeof oHeader === "string") {
                        sHeaderText = oHeader;
                    } else if (oHeader && typeof oHeader.getText === "function") {
                        sHeaderText = oHeader.getText();
                    }
                } else if (typeof oColumn.getHeaderText === "function") {
                    sHeaderText = oColumn.getHeaderText();
                }

                // If we have the header text, check if it's in the selected items
                if (sHeaderText) {
                    var bVisible = aSelectedTitles.includes(sHeaderText);
                    oColumn.setVisible(bVisible);
                }
            });

            this.tablePopOver.close();
        },
        onCancelColumnPopover: function () {
            this.tablePopOver.close();
        },
        onSearchColumn: function (oEvent) {
            // let sQuery=oEvent.getParameter("newValue").toLocaleLowerCase();
            // let aCheckboxIds=["ImageCHK","StatusCHK","IntCHK","RefCHK","RefDateCHK","PackageCHK","DeliveryCHK",""]
            // console.log(sQuery);
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter("title", FilterOperator.Contains, sQuery);
                aFilters.push(filter);
            }
            var oList = sap.ui.getCore().byId("CHKList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters);
        },
        onCreateUser:function(){
            if (!this.CreateUserdialog) {
                this.CreateUserdialog = sap.ui.xmlfragment("com.db.imayl.imayl.view.CreateAUser", this);
                this.getView().addDependent(this.CreateUserdialog);
            }
            this.CreateUserdialog.open();
        },
        onFileChange: function (oEvent) {
            const oUploader = oEvent.getSource();
            const aFiles = oUploader.oFileUpload.files;

            if (aFiles.length > 0) {
                const sFileName = aFiles[0].name;
                const oText = this.byId("fileNameText");
                const oDeleteBtn = this.byId("deleteButton");

                oText.setText(sFileName);
                oText.setVisible(true);
                oDeleteBtn.setVisible(true);
            }
            this.byId("uploader1").setVisible(false);
        },

        onUploadComplete: function (oEvent) {
            sap.m.MessageToast.show("File uploaded successfully: " + oEvent.getParameter("fileName"));
        },

        onDeleteFile: function () {
            const oUploader = this.byId("uploader1");
            const oText = this.byId("fileNameText");
            const oDeleteBtn = this.byId("deleteButton");

            // Reset input value
            oUploader.setValue("");
            oText.setText("");
            oText.setVisible(false);
            oDeleteBtn.setVisible(false);
            this.byId("uploader1").setVisible(true);
            sap.m.MessageToast.show("File removed.");
        },
        onAddAliasRow: function () {
            // Get the current alias model
            var oModel = this.getView().getModel("requestpackageModel");
            var aList = oModel.getProperty("/aliasList");
        
            // Push new alias entry
            aList.push({ aliasName: "New Alias" });
            oModel.setProperty("/aliasList", aList);
        
            sap.m.MessageToast.show("New alias row added.");
        },
        
        onDeleteAliasRow: function (oEvent) {
            // Get the item from binding context
            var oItem = oEvent.getSource().getParent();
            var oBindingContext = oItem.getBindingContext("requestpackageModel");
            var sPath = oBindingContext.getPath();
            if(oBindingContext.oModel.oData.aliasList.length>1){
            // Remove the item from the model
            var oModel = this.getView().getModel("requestpackageModel");
            var aList = oModel.getProperty("/aliasList");
            var iIndex = parseInt(sPath.split("/").pop());
        
            if (!isNaN(iIndex)) {
                aList.splice(iIndex, 1);
                oModel.setProperty("/aliasList", aList);
                sap.m.MessageToast.show("Alias row deleted.");
            }
        }
        }

    });
});