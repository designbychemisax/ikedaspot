var React = require('react');


module.exports = function() {

    return (

        <div className="page page-detail">

            <div className="talk" onTouchStart={this.handleTTS} style={{
                            backgroundColor : this.props.color
                    }}>

                音声で説明を聞く

                <span className={"button" + ((this.props.speaking) ? " stop" : " play")}></span>
            </div>

            <div ref="iscroll" style={{
                height: this.getDocHeight(),
                overflow : "hidden"
            }}>
                <div className="scroll-wrap">

                    <div className="detailHeader" style={{
                            backgroundColor : this.props.color
                    }}>
                        <span className="back" onTouchStart={this.handleBack} onClick={this.handleBack}>BACK</span>

                        <div className="image">
                            <img src={"img/beacons/"+this.props.image}/>
                        </div>

                        <h1>{this.props.title}</h1>

                    </div>

                    <div className="text">
                        {this.props.text}
                    </div>
                </div>
            </div>
        </div>

    );

};