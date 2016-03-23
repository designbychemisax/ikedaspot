document.ontouchmove = function(event){
    event.preventDefault();
};

var application = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.attach("app");
    }
};

//window.dev = true;
application.initialize();
//app.attach("app");
