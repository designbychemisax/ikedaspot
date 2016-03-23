var React = require('react');
var ReactDOM = require('react-dom');

var actions = require('../actions/actions');
var template = require('./main.react.jsx');

var scroller;

var Main = React.createClass({

    render: function() {
        this.render = template.bind(this);
        return this.render();
    },

    componentDidMount : function () {

        scroller = new IScroll(this.refs.iscroll, {
            click : true
        });

        setTimeout(function () {
            scroller.refresh();
        }, 100);

    },

    componentDidUpdate : function (nextProps) {
        scroller.refresh();
    },

    componentWillUnmount : function () {
        scroller.destroy();
        scroller = null;
    },

    forEachBeacon : function (callback) {
        return this.getNormalBeacons().map(function (beacon, i) {
            var props = {
              key : i,
              className : "beacon__list-element"
            };
            if (beacon.visited) {
                props.onClick = this.handleShowBeaconDetail.bind(this, {major : beacon.major, minor : beacon.minor})
                props.style = {
                    backgroundColor : beacon.color
                }
            }
            return callback.apply(this, [beacon, props]);
        }, this);
    },

    handleLanguageChange : function (locale) {
        actions.changeLocale(locale);
    },

    handleShowBeaconDetail : function (beacon) {
        actions.showBeacon(beacon);
    },

    getNormalBeacons : function () {
        var beacons = [];
        for (var i in this.props.beacons) {
            if (this.props.beacons[i].type == "normal") {
                beacons.push(this.props.beacons[i]);
            }
        }
        return beacons;
    },

    onShowTop : function (evt) {
        actions.showTop();
    },

    getDocHeight : function () {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    },

    hasCoupon : function (callback) {

        var visited = this.allVisited();

        if (visited && !this.props.coupon.reset) {
            var props = {
                className : "coupon-button",
                onClick : this.onShowCoupon
            };
            return callback.apply(this, [props]);
        }

    },

    allVisited : function () {
        for (var i in this.props.beacons) {
            if (this.props.beacons[i].visited == false && this.props.beacons[i].type == "normal") {
                return false;
            }
        }
        return true;
    },

    onShowCoupon : function (evt) {
        actions.showCoupon();
    }

});

module.exports = Main;