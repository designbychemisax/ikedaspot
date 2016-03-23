var React = require('react');


module.exports = function() {

    return (


    <div ref="iscroll" className="about_scroll" style={{
                height: this.getDocHeight(),
                overflow : "hidden"
            }}>
        <div className="about_content">

            <div className="page_title">
                <span className="close" onTouchStart={this.onShowTop} onClick={this.onShowTop}></span>
                ABOUT
            </div>

            <div>

                <div className="licence">

                    <p><strong>This software makes use of the following third party libraries:</strong></p>

                    <p>
                    <strong>cBeacon</strong><br />
                        By José María Campaña Rojas <br />
                        Distributed under The MIT licence<br />
                        <br />
                        &copy; 2015<br />
                        design by chemisax<br />
                        www.chemisax.com<br />
                        <br />
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:<br />
                        <br />
                        The above copyright notice and this permission notice shall be included in
                        all copies or substantial portions of the Software.<br />
                        <br />
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                        THE SOFTWARE.
                    </p>

                    <p>
                        <strong>React.js</strong><br />
                        <br />
                        BSD License<br />
                        <br />
                        For React software<br />
                        <br />
                        Copyright (c) 2013-2015, Facebook, Inc.<br />
                        All rights reserved.<br />
                        <br />
                        Redistribution and use in source and binary forms, with or without modification,
                        are permitted provided that the following conditions are met:<br />
                        <br />
                        * Redistributions of source code must retain the above copyright notice, this
                        list of conditions and the following disclaimer.<br />
                        <br />
                        * Redistributions in binary form must reproduce the above copyright notice,
                        this list of conditions and the following disclaimer in the documentation
                        and/or other materials provided with the distribution.<br />
                        <br />
                        * Neither the name Facebook nor the names of its contributors may be used to
                        endorse or promote products derived from this software without specific
                        prior written permission.<br />
                        <br />
                        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
                        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
                        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
                        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
                        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
                        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
                        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
                        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
                        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
                        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                    </p>

                    <p>
                        <strong>iScroll</strong><br />
                        Copyright (c) 2008-2013 Matteo Spinelli, http://cubiq.org<br />
                        <br />
                        Permission is hereby granted, free of charge, to any person
                        obtaining a copy of this software and associated documentation
                        files (the "Software"), to deal in the Software without
                        restriction, including without limitation the rights to use,
                        copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the
                        Software is furnished to do so, subject to the following
                        conditions:<br />
                        <br />
                        The above copyright notice and this permission notice shall be
                        included in all copies or substantial portions of the Software.<br />
                        <br />
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                        OTHER DEALINGS IN THE SOFTWARE.
                    </p>

                    <p>
                        <strong>Apache Cordova</strong><br />
                        Released under the Apache License Version 2.0
                    </p>

                    <p>
                        <strong>jQuery</strong><br />
                        Released under The MIT License
                    </p>

                    <p>
                        <strong>Apache Cordova</strong><br />
                        Released under the Apache License Version 2.0
                    </p>

                    <p>
                        <strong>Cordova Text-to-Speech Plugin</strong><br />
                        https://github.com/vilic/cordova-plugin-tts
                    </p>

                    <p>
                        <div className="data_reset" onTouchStart={this.onAppReset} onClick={this.onAppReset}>データを消去</div>
                    </p>

                </div>

            </div>

        </div>
    </div>

    );

};