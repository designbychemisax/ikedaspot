var React = require('react');


module.exports = function() {

    return (

        <div className="beacon-app">

            {this.bluetooth(function () {
                return  (
                    <div className="nobl" onClick={this.showStatus}>
                        Bluetooth・位置情報を許可してください
                    </div>
                );
            })}

            {this.state.settings.statusOverlay ?
                <div className="status">

                    <div className="title">
                        <img src="img/arrow.png" className="statusArrow" />
                    </div>

                    <div className="text">
                        位置情報の許可は「設定」の「プライバシー」から位置情報の許可をしてください。
                    </div>

                    <div onClick={this.hideStatus} className="statusOkButton">
                        OK
                    </div>

                </div>
            : null }


            {this.renderPage()}

        </div>

    );

};