var React = require('react');
var ReactDOM = require('react-dom');

var actions = require('../actions/actions');
var template = require('./cycling.react.jsx');

var scroller;

var Main = React.createClass({

    getInitialState : function () {
        return  {
            currentBeacon : this.props.currentBeacon || null
        };
    },

    componentWillReceiveProps : function (nextProps) {
        this.setState({
            currentBeacon : nextProps.currentBeacon
        });
    },

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

    componentWillUnmount : function () {
        scroller.destroy();
        scroller = null;
    },

    forEachBeacon : function (callback) {
        return this.getCyclingBeacons().map(function (beacon, i) {
            var props = {
              key : i,
              className : "beacon__list-element"
            };

            if (beacon.visited) {
                props.onClick = this.handleTalk.bind(this, {locale : this.props.locale, tts : beacon.tts, minor : beacon.minor})
            }

            if (this.props.speaking && this.state.currentBeacon == beacon.minor) {
                props.className += " cycling-playing";
            }

            if (beacon.visited) {
                props.style = {
                    backgroundColor : beacon.color
                };
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

    getCyclingBeacons : function () {
        var beacons = [];
        for (var i in this.props.beacons) {
            if (this.props.beacons[i].type == "cycling") {
                beacons.push(this.props.beacons[i]);
            }
        }
        return beacons;
    },

    onShowTop : function (evt) {

        if (this.props.speaking) {
            actions.stop();
        }

        actions.showTop();
    },

    handleTalk : function (data) {

        actions.changeBeacon(data.minor);

        if (this.props.speaking) {
            actions.stop();
        } else {
            actions.speak(data.locale, data.tts);
        }

    },

    getDocHeight : function () {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

});

module.exports = Main;