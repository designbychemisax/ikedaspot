var constants = require('../constants/constants');
var dispatcher = require('../dispatcher/dispatcher');

var api = require('../utils/api');

var actions = {
    //API ACTIONS
    loadBeacons : function () {

        api.load(function (data) {
            dispatcher.handleAPIAction({
                actionType : constants.BEACONS_LOADED,
                payload : {
                    data : data
                }
            });
        });

    },

    changeLocale : function (locale) {

        dispatcher.handleViewAction({
            actionType : constants.CHANGE_LOCALE,
            payload : {
                locale : locale
            }
        });

    },

    showBeacon : function (beacon) {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_BEACON,
            payload : {
                beacon : beacon
            }
        });

    },

    showMain : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_MAIN,
            payload : {}
        });

    },

    showTop : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_TOP,
            payload : {}
        });

    },

    showCycling : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_CYCLING,
            payload : {}
        });

    },

    showAbout : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_ABOUT,
            payload : {}
        });

    },

    resetCoupon : function () {

        dispatcher.handleViewAction({
            actionType : constants.RESET_COUPON,
            payload : {}
        });

    },

    showCoupon : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_COUPON,
            payload : {}
        });

    },

    showStatus : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_STATUS,
            payload : {}
        });

    },

    showStatusScreen : function () {

        dispatcher.handleViewAction({
            actionType : constants.SHOW_STATUS_SCREEN,
            payload : {}
        });

    },

    reset : function () {

        dispatcher.handleViewAction({
            actionType : constants.APP_RESET,
            payload : {}
        });

    },

    setPeripheral : function (data) {

        dispatcher.handleViewAction({
            actionType : constants.SET_PERIPHERAL,
            payload : data
        });

    },

    speak : function (locale, text) {

        dispatcher.handleViewAction({
            actionType : constants.SPEAK_START,
            payload : {}
        });

        api.speak(locale, text, function (err) {

            if (err) {
                console.log("Stopped speaking because an error: "+err);
            }

            dispatcher.handleViewAction({
                actionType : constants.SPEAK_END,
                payload : {}
            });
        });

    },

    stop : function () {
        api.speak("en_US", "", function (err) {
            dispatcher.handleViewAction({
                actionType : constants.SPEAK_END,
                payload : {}
            });
        });
    },

    save : function (data) {
        api.save(data);
    },

    changeBeacon : function (id) {
        dispatcher.handleAPIAction({
            actionType : constants.CHANGE_BEACON,
            payload : id
        });
    },

    beaconsFound: function (beacons) {

        dispatcher.handleAPIAction({
            actionType : constants.BEACONS_FOUND,
            payload : beacons
        });

    }
};

api.setActions(actions);

module.exports = actions;