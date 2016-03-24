var React = require('react');

var store = require('../store/store');
var actions = require('../actions/actions');
var template = require('./app.react.jsx');

//Pages
var Main = require("./main.react");
var Detail = require("./detail.react");
var Top = require("./top.react");
var Status = require("./status.react");
var Cycling = require("./cycling.react");
var About = require("./about.react");
var Coupon = require("./coupon.react");

var app = React.createClass({

    getInitialState : function () {
        var state = store.getState();
        return state;
    },

    componentWillMount : function () {
        store.addChangeListener(this._onChange);
    },

    render: function() {
        this.render = template.bind(this);
        return this.render();
    },

    renderPage : function () {
        switch (this.state.currentPage) {
            case "main":
                return React.createElement(Main, {
                    beacons : this.getBeaconList(),
                    coupon : this.state.coupon
                });
                break;
            case "cycling":
                return React.createElement(Cycling, {
                    beacons : this.getBeaconList(),
                    currentBeacon : this.state.currentBeacon,
                    speaking : this.state.speaking,
                    locale : this.state.settings.language
                });
                break;
            case "detail":
                var props = this.getBeaconData();
                props.speaking = this.state.speaking;
                return React.createElement(Detail, props);
                break;
            case "top":
                var props = {};
                return React.createElement(Top, props);
                break;
            case "status":
                var props = {
                    peripheral : this.state.settings.peripheral
                };
                return React.createElement(Status, props);
                break;
            case "about":
                return React.createElement(About, props);
                break;
            case "coupon":
                return React.createElement(Coupon, props);
                break;
            default:
                return null;
        }
    },

    bluetooth : function (callback) {
        if (this.state.settings.alert && this.state.currentPage == "top") {
            return callback.call(this);
        }
        return null;
    },

    showStatus : function (evt) {
        actions.showStatusScreen();
    },

    getBeaconList : function () {
      var list = [];
      var locale = this.state.settings.language;
      for (var i = 0; i<this.state.beacons.length; i++) {
          var beacon = this.state.beacons[i];
          var content = beacon.content[locale];
          list.push({
              title: content.title,
              major: beacon.major,
              minor: beacon.minor,
              visited : beacon.visited,
              type : beacon.type,
              color : beacon.color,
              tts : content.tts
          });
      }
      return list;
    },

    getBeaconData : function () {
        var locale = this.state.settings.language;
        for (var i = 0; i < this.state.beacons.length; i++) {
            var beacon = this.state.beacons[i];
            if (beacon.major == this.state.currentBeacon.major && beacon.minor == this.state.currentBeacon.minor) {
                var content = beacon.content[locale];
                content.image = beacon.image;
                content.locale = this.state.settings.language;
                content.color = beacon.color;
                return content;
            }
        }
        throw new Error("beacon does not exists");
    },

    componentDidMount : function () {
        actions.loadBeacons();
    },

    _onChange : function () {
        this.setState(store.getState());
    }

});

module.exports = app;