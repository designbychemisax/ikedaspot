(function () {

    var React = require('react');
    var ReactDOM = require('react-dom');

    var App = require('./components/app.react');

    var attached = false;
    var target = "";

    var boot = function () {
        var targetElement = document.getElementById(target);
        var app = React.createElement(App);
        var beaconApp = ReactDOM.render(app, targetElement);
        attached = true;
    };

    var app = {
        attach : function (_target) {
            target = _target;
            boot();
        }
    };

    window.app = app;

})();