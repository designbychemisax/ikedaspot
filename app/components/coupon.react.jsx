var React = require('react');


module.exports = function() {

    return (

        <div className="page about" ref="iscroll" style={{
                height: this.getDocHeight(),
                overflow : "hidden"
            }}>

            <div className="coupon_content">

                <div className="page_title">
                    <span className="close" onTouchStart={this.onShowMain} onClick={this.onShowMain}></span>
                    コンプリートしました！
                </div>

                <div>
                    <img src="img/onsen.png" width="185" height="185" style={{ "marginTop" : "50px" }}/>
                    {/* <div className="coupon-delete" onClick={this.onResetCoupon}>クーポンを削除</div> */}
                </div>
            </div>

        </div>

    );

};