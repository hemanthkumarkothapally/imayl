sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.db.imayl.imayl.controller.MainView", {
        onInit() {
        },
        _setToggleButtonTooltip: function (bLarge) {
			let oToggleButton = this.byId('sideNavigationToggleButton');
            let logolarge="https://cloud.imayl.com/Com/ProcessWeaver/IMAYL/Common/dist/img/logo.png";
            let logosmall="https://cloud.imayl.com/Com/ProcessWeaver/IMAYL/Common/dist/img/mlogo.png";
            let apagelogo=this.getView().byId("logoId").getSrc();
            console.log(apagelogo);
			if (bLarge || apagelogo==logolarge) {
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
        onAddReceiveAPackage:function(){
            this.getView().byId("ReceiveaPackage_main").setVisible(false);
            this.getView().byId("ReceiveaPackage_form").setVisible(true);
            this._setToggleButtonTooltip(true);
            this.byId("mainpage").setSideExpanded(false);
            // console.log(aReceive_a_Package_mainpage);
            // console.log(aReceive_a_Package_formpage);
        },
        oncancel:function(){
            this.getView().byId("ReceiveaPackage_main").setVisible(true);
            this.getView().byId("ReceiveaPackage_form").setVisible(false);
            this._setToggleButtonTooltip(false);
            this.byId("mainpage").setSideExpanded(true);

        }
    });
});