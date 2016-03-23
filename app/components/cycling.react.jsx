var React = require('react');


module.exports = function() {

    return (

        <div className="page page-cycling" style={{
                    height: this.getDocHeight(),
                    overflow : "hidden",
                    backgroundColor : "#92CBC6"
                }}>

            <div className="page_title" style={{backgroundColor : "#92CBC6"}}>
                <span onClick={this.onShowTop} onTouchStart={this.onShowTop} className="close"></span>
                サイクリングモード
            </div>

            <img className="cycling-img" src="img/cycling.png" style={{
                maxHeight : this.getDocHeight()-270
            }}/>

            <div>
                <div className="cycling-scroll-container" ref="iscroll" style={{
                    height: 270,
                    overflow : "hidden"
                }}>

                    <ul className="beaconListCycling">
                        {this.forEachBeacon(function (beacon, props) {
                            return <li {...props}>{beacon.title}</li>;
                        })}
                    </ul>

                </div>

            </div>
        </div>

    );

};