var React = require('react');


module.exports = function() {

    return (

        <div className="beacon-app">

            {this.bluetooth(function () {
                return  (
                    <div className="nobl" onClick={this.showStatus}>
                        Bluetooth・位置情報を許可する
                    </div>
                );
            })}

            {this.renderPage()}

        </div>

    );

};