var React = require('react');


module.exports = function() {

    return (

        <div className="page status" style={{
            height : this.getDocHeight()
        }}>

            <div className="title">
                <img src="img/arrow.png" className="statusArrow" />
            </div>

            <div className="text">
                位置情報の許可は「設定」の「プライバシー」から位置情報の許可をしてください。
            </div>

            <div className="statusOkButton">
                OK
            </div>


        </div>

    );

};