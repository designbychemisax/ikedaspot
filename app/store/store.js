var dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var actions = require('../actions/actions');

var CHANGE_EVENT = 'change';

/**
 *
 *    Private
 *
 */

var app = {

    currentPage : "top",
    currentBeacon : null,
    beacons : [],
    speaking : false,
    coupon : null,
    settings : {
        alert : false,
        statusOverlay : false,
        peripheral : {
            ble: false,
            location : false
        },
        language : "ja_JP"
    },

    getState : function () {
        return {
            beacons : this.beacons,
            settings : this.settings,
            currentPage : this.currentPage,
            currentBeacon : this.currentBeacon,
            speaking : this.speaking,
            coupon : this.coupon
        };
    },

    getSave : function () {
        return {
            beacons : this.beacons,
            coupon : this.coupon
        };
    },

    setPeripheral : function (data) {
        console.log("setting peripheral", data.ble, data.location);
        this.settings.peripheral = data;
        store.emitChange();
    },

    setBeacons : function (data) {
        this.beacons = data.data.beacons;
        this.coupon = data.data.coupon;
        store.emitChange();
    },

    changeLocale : function (locale) {
        this.settings.language = locale;
        store.emitChange();
    },

    showBeacon : function (beacon) {
        this.currentPage = "detail";
        this.currentBeacon = beacon;
        store.emitChange();
    },

    showMain : function () {
        this.currentPage = "main";
        this.currentBeacon = null;
        store.emitChange();
    },

    showTop : function () {
        this.settings.alert = false;
        this.currentPage = "top";
        this.currentBeacon = null;
        store.emitChange();
    },

    showCycling : function () {
        this.currentPage = "cycling";
        this.currentBeacon = null;
        store.emitChange();
    },

    showAbout : function () {
        this.currentPage = "about";
        this.currentBeacon = null;
        store.emitChange();
    },

    showCoupon : function () {
        this.currentPage = "coupon";
        this.currentBeacon = null;
        store.emitChange();
    },

    showStatusScreen : function () {
        this.currentPage = "top";
        this.currentBeacon = null;
        this.settings.statusOverlay = true;
        store.emitChange();
    },

    hideStatusScreen : function () {
        this.currentPage = "top";
        this.currentBeacon = null;
        this.settings.statusOverlay = false;
        store.emitChange();
    },

    showStatus : function () {
        this.settings.alert = true;
        store.emitChange();
    },

    changeBeacon : function (id) {
        console.log("change beacon to", id);
        this.currentBeacon = id;
        store.emitChange();
    },

    beaconsFound : function (beacons) {
        var nearestBeacon = beacons[0];
        var minor = String(nearestBeacon.minor);
        var major = String(nearestBeacon.major);

        if (this.currentPage == "main" || this.currentPage == "cycling" || this.currentPage == "detail") {

            if (this.currentBeacon != minor) {

                var index = null;
                var type = null;

                for (var i in this.beacons) {
                    var beacon = this.beacons[i];
                    if (beacon.minor == minor) {
                        index = i;
                        type = beacon.type;
                    }
                }

                console.log("Found beacon "+minor+"type: "+type);

                if (type) {
                    if (type == "normal" && (this.currentPage == "main" || this.currentPage == "detail")) {
                        if (!this.beacons[index].visited) {
                            this.beacons[index].visited = true;
                            actions.save(this.getSave());
                            setTimeout(function () {
                                actions.showBeacon({major : major, minor : minor});
                            }, 0);
                        }
                    } else if (type == "cycling" && this.currentPage == "cycling") {
                        if (!this.beacons[index].visited) {
                            console.log("first time viewing this beacon");
                            this.beacons[index].visited = true;
                            actions.save(this.getSave());

                            if (this.speaking) {
                                console.log("will stop speaking");
                                setTimeout(function () {
                                    actions.stop();
                                }, 0);
                            }

                            var _store = this;
                            console.log("will start speaking");

                            this.currentBeacon = this.beacons[index].minor;
                            store.emitChange();

                            setTimeout(function () {
                                actions.speak(_store.settings.language, _store.beacons[index].content[_store.settings.language].tts);
                            }, 0);

                        }

                    }
                }
            }
        }
    },

    resetCoupon : function () {
        var p = this;

        var reset = function () {
            p.coupon.reset = true;
            p.currentBeacon = null;
            p.currentPage = "main";
            actions.save(p.getSave());
            store.emitChange();
        };

        try {
            navigator.notification.confirm("クーポンを削除しますか?", function (buttonIndex) {
                if (buttonIndex == 1) {
                    reset();
                }
            });
        } catch (e) {
            console.log("cannot confirm");
            reset();
        }

    },

    appReset : function () {
        var p = this;

        var reset = function () {
            p.coupon.reset = false;
            p.currentBeacon = null;
            for (var i in p.beacons) {
                p.beacons[i].visited = false;
            }
            p.currentPage = "top";
            actions.save(p.getSave());
            store.emitChange();
        };

        try {
            navigator.notification.confirm("データをリセットしますか?", function (buttonIndex) {
                if (buttonIndex == 1) {
                    reset();
                }
            });
        } catch (e) {
            console.log("cannot confirm");
            reset();
        }

    },

    setSpeak : function (speak) {
        this.speaking = speak;
        store.emitChange();
    }
};


/**
 *
 *    EDITOR STORE
 *
 */


var store = assign(EventEmitter.prototype, {

    emitChange : function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getState : function () {
        return app.getState();
    },

    dispatcherIndex: dispatcher.register(function (payload) {

        //Action from Dispatcher
        var action = payload.action;

        switch (action.actionType) {
            //API ACTIONS

            //LOAD
            case constants.BEACONS_LOADED:
                app.setBeacons(action.payload);
                break;
            case constants.CHANGE_LOCALE:
                app.changeLocale(action.payload.locale);
                break;
            case constants.SHOW_BEACON:
                app.showBeacon(action.payload.beacon);
                break;
            case constants.SHOW_MAIN:
                app.showMain();
                break;
            case constants.SHOW_TOP:
                app.showTop();
                break;
            case constants.SHOW_CYCLING:
                app.showCycling();
                break;
            case constants.SHOW_ABOUT:
                app.showAbout();
                break;
            case constants.SPEAK_START:
                app.setSpeak(true);
                break;
            case constants.SPEAK_END:
                app.setSpeak(false);
                break;
            case constants.SHOW_COUPON:
                app.showCoupon();
                break;
            case constants.RESET_COUPON:
                app.resetCoupon();
                break;
            case constants.APP_RESET:
                app.appReset();
                break;
            case constants.SHOW_STATUS:
                app.showStatus();
                break;
            case constants.SHOW_STATUS_SCREEN:
                app.showStatusScreen();
                break;
            case constants.HIDE_STATUS_SCREEN:
                app.hideStatusScreen();
                break;
            case constants.SET_PERIPHERAL:
                app.setPeripheral(action.payload);
                break;
            case constants.BEACONS_FOUND:
                app.beaconsFound(action.payload);
                break;
            case constants.CHANGE_BEACON:
                app.changeBeacon(action.payload);
                break;
        }

        return true;
    })
});

module.exports = store;