var errorHandler = function (fileName, e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    }
    console.log('Error (' + fileName + '): ' + msg);
};


var api = {

    actions : null,
    ranging : false,

    setActions : function (actions) {
      this.actions = actions;
    },

    //Beacons
    prepareBeacon : function () {

        var _api = this;

        console.log("connecting cbeacon");
        cBeacon.connect();

        console.log("creating callback for beacon");
        cBeacon.on("didRangeBeacons", function (params) {
            if (params.beacons.length > 0) {
                _api.actions.beaconsFound(params.beacons);
            }
        });

        console.log("booting beacon");
        cBeacon.getBeaconStatus(function (status) {
            if (status.permission && status.bluetooth) {
                console.log("permission ok");
                _api.startRanging();
                _api.actions.showTop();
            } else {
                console.log("insufficient permission, starting wait for permission");
                _api.waitForBluetooth();
            }
        });
    },

    waitForBluetooth : function () {

        var _api = this;

        _api.actions.showStatus();

        var wait = function () {
            cBeacon.getBeaconStatus(function (status) {

                _api.actions.showStatus();

                var passed = status.permission && status.bluetooth;
                //var passed = status.permission;

                _api.actions.setPeripheral({
                    location : status.permission,
                    ble : status.bluetooth
                });

                if (!status.permission)
                    cBeacon.requestAuthorization();

                if (passed) {
                    stopWaiting();
                    _api.startRanging();
                    _api.actions.showTop();
                }

            });
        };

        var waiting = setInterval(wait, 1000);
        var stopWaiting = function () {
            clearInterval(waiting);
        }
    },

    startRanging : function () {
        var _api = this;
        cBeacon.getBeaconStatus(function (status) {
            if (status.permission && status.bluetooth) {
                _api.ranging = true;
                cBeacon.startRangingBeaconsInRegion("36F800E0-DABA-4980-AAF9-0098F9E3E502", "ogakiBeacon");
            }
        });
    },

    load : function (callback) {

        if (window.dev) {
            $.getJSON("beacons.json", function( data ) {
                callback(data);
            });
        } else {

            this.prepareBeacon();

            $.getJSON(cordova.file.dataDirectory + "beacons.json")
                .done(function( data ) {
                    callback(data);
                })
            .fail(function( jqxhr, textStatus, error ) {
                    console.log("failed loading, will load from www.");
                    $.getJSON(cordova.file.applicationDirectory + "www/beacons.json")
                        .done(function( data ) {
                            callback(data);
                        });
            });
        }

    },

    speak : function (locale, text, callback) {
        var speed = 1.6;
        try {
            TTS
                .speak({
                    text: text,
                    locale: locale,
                    rate: speed
                }, function () {
                    callback();
                }, function (err) {
                    callback(err);
                });
        } catch (e) {
            console.warn("Cannot talk.");
        }
    },

    save : function (data) {
        this.writeToFile("beacons.json", data);
    },

    // Tanks to
    // https://www.neontribe.co.uk/cordova-file-plugin-examples/
    writeToFile : function writeToFile(fileName, data) {
        data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

};

module.exports = api;