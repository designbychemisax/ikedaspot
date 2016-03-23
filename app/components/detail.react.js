var React = require('react');

var actions = require('../actions/actions');
var template = require('./detail.react.jsx');

var scroller;

var Detail = React.createClass({

    render: function() {
        this.render = template.bind(this);
        return this.render();
    },

    handleBack : function (evt) {
        setTimeout(function () {
            actions.stop();
        }, 0);
        actions.showMain();
    },

    handleTTS : function (evt) {
        if (this.props.speaking) {
            actions.stop();
        } else {
            actions.speak(this.props.locale, this.props.tts);
        }
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
    }
});

module.exports = Detail;