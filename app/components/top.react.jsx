var React = require('react');


module.exports = function() {

    return (

        <div className="page top" style={{
            height : this.getDocHeight()
        }}>

            <img className="top-img" src="img/top.png" style={{
                height: "100%",
                maxHeight : this.getDocHeight()-190
            }}/>

            <div className="main-menu-container">
                <div className="main-menu">
                    <div onClick={this.onShowAbout} onTouchEnd={this.onShowAbout} id="aboutButton">ABOUT</div>
                    <div onClick={this.onShowMain}>周遊モード</div>
                    <div onClick={this.onShowCycling}>サイクリングモード</div>
                </div>
            </div>

        </div>

    );

};