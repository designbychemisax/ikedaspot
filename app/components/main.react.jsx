var React = require('react');


module.exports = function() {

    return (

        <div className="page">

            <div ref="iscroll" style={{
                height: this.getDocHeight(),
                overflow : "hidden"
            }}>
                <div>

                    <div className="page_title">
                        <span className="close" onTouchStart={this.onShowTop} onClick={this.onShowTop}></span>
                        周遊モード
                    </div>

                    <ul className="beaconList">

                        {this.forEachBeacon(function (beacon, props) {
                            return <li {...props}>{beacon.title}</li>;
                        })}

                        {this.hasCoupon(function (props) {
                           return  <li id="coupon-button" {...props}> コンプリートしました！ </li>
                        })}

                    </ul>

                </div>

            </div>
        </div>

    );

};