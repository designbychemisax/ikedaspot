var React = require('react');
var ReactDOM = require('react-dom');

var actions = require('../actions/actions');
var template = require('./Top.react.jsx');

var Top = React.createClass({

    render: function() {
        this.render = template.bind(this);
        return this.render();
    },

    componentDidMount : function () {


    },

    componentWillUnmount : function () {

    },

    getDocHeight : function () {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    },

    onShowMain : function (evt) {
        actions.showMain();
    },

    onShowCycling : function (evt) {
        actions.showCycling();
    },

    onShowAbout : function (evt) {
        actions.showAbout();
    }

});

module.exports = Top;