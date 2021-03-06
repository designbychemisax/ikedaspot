/**
 * Created by chemisax on 23/11/15.
 */

var BeaconApp = function () {

    var app = this;

    app.speed = 1.6;
    app.speaking = false;
    app.speakButton = {
        talk : "話す",
        stop : "ストップ"
    };
    app.attempts = 0;
    app.beacons = null;
    app.currentBeacon = null;
    app.click = "touchstart";
    app.status = {
        bluetooth : true,
        location : true
    };
    app.ranging = true;

    this.const = {
        ok : "ok"
    };

    //Register cBeacon
    cBeacon.connect();

    //Listener for resume event
    document.addEventListener("resume", function () {
        app.resume.call(app);
    }, false);

    cBeacon.on("didRangeBeacons", function (params) {
       app.beaconBound(params.beacons);
    });

    //Hacks
    $(document).bind( 'touchmove', function(e) {
        e.preventDefault();
    });

    $(document).on('pagebeforeshow', '#index', function(){
        $('[data-role="content"]').trigger('create');
        $("#beacon").iscrollview("refresh");
    });

    //Buttons

    $("#speak").on(app.click, function (evt) {
        app.speak();
    });

    $(".back").on(app.click, function (evt) {
        app.gotoMain();
    });

};

BeaconApp.prototype.alert = function (_title, _message) {
    var title = _title || "";
    var message = _message || "";
    navigator.notification.alert(message, function () {}, title, this.const.ok)
};

//Setup & Status
BeaconApp.prototype.recheckStatus = function (attempt) {
    var app = this;

    app.attempts = attempt ? 0 : app.attempts+1;

    var alertWindow = app.attempts > 1;


};

//Beacon
BeaconApp.prototype.showBeacon = function () {
    if (this.currentBeacon != null) {
        this.setBeacon();
        this.goTo("beacon");
    }
};

BeaconApp.prototype.getBeacon = function (minor) {

    console.log("getting beacon", minor);

    if (this.currentBeacon != null) {
        if (this.currentBeacon.minor == minor) {
            return;
        }
    }

    this.currentBeacon = null;

    for (var i = 0; i < this.beacons.length; i++) {
        if (this.beacons[i].minor == minor) {
            this.currentBeacon = this.beacons[i];
            this.showBeacon(minor);
            break;
        }
    }

};

BeaconApp.prototype.setBeacon = function () {
    $("#beacon_text").html(this.currentBeacon.text);
    $("#beacon_image").attr("src", "img/beacons/"+this.currentBeacon.image);
};

//Utils
BeaconApp.prototype.speak = function () {
    var app = this;
    if (app.speaking) {
        this.stopTalking();
    } else {
        app.speaking = true;
        $("#speak").html(app.speakButton.stop);
        TTS
            .speak({
                text: this.currentBeacon.text,
                locale: 'ja_JP',
                rate: this.speed
            }, function () {
                app.speaking = false;
                $("#speak").html(app.speakButton.talk);
            }, function (reason) {
                $("#speak").html(app.speakButton.talk);
                app.speaking = false;
            });
    }
};

BeaconApp.prototype.stopTalking = function () {
    var app = this;
    TTS.speak('', function () {}, function (reason) {});
    $("#speak").html(app.speakButton.talk);
    app.speaking = false;
};

BeaconApp.prototype.gotoMain = function () {
    this.currentBeacon = null;
    this.goTo("main");
    if (this.speaking) {
        this.stopTalking();
    }
};

BeaconApp.prototype.goTo = function (page) {
    console.log("changing to "+page);
    $.mobile.changePage("#"+page);
};

BeaconApp.prototype.waitForBluetooth = function () {
    var app = this;

    var checkCurrentPage = function () {
        var currentPage = $.mobile.activePage.attr('id');

        if (currentPage != "status") {
            app.goTo("status");
        }
    }

    checkCurrentPage();

    var wait = function () {
        cBeacon.getBeaconStatus(function (status) {

            checkCurrentPage();

            var passed = status.permission && status.bluetooth;

            if (!status.permission)
                cBeacon.requestAuthorization();

            if (passed) {
                stopWaiting();
                app.startRanging();
                app.goTo("main");
            }

        });
    };

    var waiting = setInterval(wait, 1000);

    var stopWaiting = function () {
        clearInterval(waiting);
    }

};

BeaconApp.prototype.resume = function () {
    var app = this;
    cBeacon.getBeaconStatus(function (status) {
        if (!status.permission || !status.bluetooth) {
            app.waitForBluetooth();
        }
        //app.startRanging();
    });
};

BeaconApp.prototype.sleep = function () {
    var app = this;
    //Stop ranging
};

BeaconApp.prototype.startRanging = function () {
    var app = this;
    cBeacon.getBeaconStatus(function (status) {
        if (status.permission && status.bluetooth) {
            app.ranging = true;
            cBeacon.startRangingBeaconsInRegion("36F800E0-DABA-4980-AAF9-0098F9E3E502", "ogakiBeacon");
        }
    });
};

BeaconApp.prototype.beaconBound = function (beacons) {
    if (beacons.length >= 1) {
        var nearestBeacon = beacons[0];
        this.getBeacon(nearestBeacon.minor);
    }
};

//Boot
BeaconApp.prototype.boot = function () {
    var app = this;
    $.getJSON( "beacons.json", function( beacons ) {
        app.beacons = beacons;
        cBeacon.getBeaconStatus(function (status) {
            if (status.permission && status.bluetooth) {
                app.startRanging();
                app.goTo("main");
            } else {
                app.waitForBluetooth();
            }
        });
    });
};