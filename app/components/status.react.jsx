var React = require('react');


module.exports = function() {

    return (

        <div className="page status" style={{
            height : this.getDocHeight()
        }}>

            <div className="title">
                <img src="img/status.png" width="270" height="200" />
            </div>

            <div className={"setting"+(this.props.peripheral.location ? " check" : "")}>
                位置情報の許可
            </div>

            <div className={"setting"+(this.props.peripheral.ble ? " check" : "")}>
                BluetoothをON
            </div>

            <div className="text">
                「設定」の「プライバシー」から位置情報の許可をしてください。
            </div>

        </div>

    );

};