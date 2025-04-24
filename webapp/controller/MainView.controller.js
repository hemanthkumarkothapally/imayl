sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller,MessageToast) => {
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
            let oModel= this.getOwnerComponent().getModel("requestpackageModel");
            oModel.setData({
                packageformDate: new Date(),
                popovertoDate: new Date(),
                popoverfromdate: new Date(),
                requestapackageformtablecount:1,
                tableData: [{
                    Image: "1234",
                    Status: "Received",
                    IntNumber: "",
                    RefNumber: "",
                    RefDate: "",
                    Package: "",
                    DeliveryLocation: "",
                    Weight: "",
                    Value: "",
                    MailBox: "",
                    StorageLocation: "",
                    Bin: "",
                    Notes: ""
                  }]
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
            this.getView().byId("ReceiveaPackage_main").setVisible(false);
            this.getView().byId("ReceiveaPackage_form").setVisible(true);
            this._setToggleButtonTooltip(true);
            this.byId("mainpage").setSideExpanded(false);
            // console.log(aReceive_a_Package_mainpage);
            // console.log(aReceive_a_Package_formpage);
        },
        oncancel: function () {
            this.getView().byId("ReceiveaPackage_main").setVisible(true);
            this.getView().byId("ReceiveaPackage_form").setVisible(false);
            this._setToggleButtonTooltip(false);
            this.byId("mainpage").setSideExpanded(true);
            this.getOwnerComponent().getModel("requestpackageModel").refresh();

        },
        formatDateRange: function (fromdate, toDate) {
            let oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MM/dd/yyyy" });
            return oDateFormat.format(fromdate) + " - " + oDateFormat.format(toDate);
        },
        calculateDays: function (fromDate, toDate) {
            if (!fromDate || !toDate) return "";
            let diffTime = toDate.getTime() - fromDate.getTime();
            let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if(days==0){
                return 1;
            }
            else{
                return days;
            }
            
        },
        onAddRow:function(){
            let oModel=this.getOwnerComponent().getModel("requestpackageModel");
            let aData=oModel.getProperty("/tableData");
            let aRowcount=oModel.getProperty("/requestapackageformtablecount");
            aData.push({
                Image: "1234",
                    Status: "Received",
                    IntNumber: "",
                    RefNumber: "",
                    RefDate: "",
                    Package: "",
                    DeliveryLocation: "",
                    Weight: "",
                    Value: "",
                    MailBox: "",
                    StorageLocation: "",
                    Bin: "",
                    Notes: ""
            });
            oModel.setProperty("/requestapackageformtablecount",aRowcount+1);

            oModel.setProperty("/tableData",aData);
            MessageToast.show("hgfds");
        },
        onOpenColumnftlter: function (oEvent) {
            if (!this.tablePopOver) {
                this.tablePopOver = sap.ui.xmlfragment("com.db.imayl.imayl.view.tableSettingPopoverRP", this);
                this.getView().addDependent(this.tablePopOver);
            }
            this.tablePopOver.openBy(oEvent.getSource());
        }
    });
});