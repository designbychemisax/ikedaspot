var React = require('react');
var ReactDOM = require('react-dom');

var actions = require('../actions/actions');
var template = require('./coupon.react.jsx');

var scroller;

var Coupon = React.createClass({

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

    onResetCoupon : function (evt) {
        actions.resetCoupon();
    }

});

module.exports = Coupon;