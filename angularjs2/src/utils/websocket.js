const wsUri = "ws://192.168.0.118:5061/";
let suspendConnect = 0;
const wsSingleton = function(ear) {
    let _ws;
    let timer;
    let _ear;
    return function(ear) {
        if (!_ws) {
            _ear = ear;
            suspendConnect = 0;
            _ws = new WebSocket(wsUri);
            _ws.onerror = e => {
                suspendConnect = 6;
                console.log('close or error');
            };
            _ws.onmessage = function onMessage(evt) {
                suspendConnect = 0;
                if (evt.data.length > 4) {
                    var callercalledinfo = '';
                    var json = JSON.parse(evt.data);
                    if (json.state === '0') { //ok                        
                        console.log('连接成功a');
                    }
                    if (json.state < 0) { //fail                        
                        console.log('连接失败a')
                    }
                    if (json.state === '1' || json.state === '3') //user callin                     
                    {                        
                        console.log('用户拨入a')
                    }
                    if (json.state === '2') //station callout
                    {                        
                        console.log('外拨a')
                    }

                    _ear && _ear(json.state);

                }
            }
            _ws.say = msg => {
                if (typeof msg === 'object') {
                    msg = JSON.stringify(msg);
                }
                suspendConnect = 0;
                if (_ws.readyState === 0) {
                    return new Promise(resolve => {
                        _ws.onopen = () => {
                            _ws.send(msg);
                            resolve();
                        }
                    });
                }
                if (_ws.readyState === 1) {
                    return Promise.resolve(_ws.send(msg));
                }
                if (_ws.readyState === 2) {
                    return new Promise(resolve => {
                        _ws.onclose = () => {
                            _ws = new WebSocket(wsUri);
                            _ws.onopen = () => {
                                _ws.send(msg);
                                resolve();
                            }
                        }
                    });
                }
                if (_ws.readyState === 3) {
                    return new Promise(resolve => {
                        _ws = new WebSocket(wsUri);
                        _ws.onopen = () => {
                            _ws.send(msg);
                            resolve();
                        }
                    });
                }
            }
            timer = setInterval(() => {
                if (suspendConnect++ > 6) {
                    _ws.close();
                    _ws = null;
                    clearInterval(timer);
                } else {
                    _ws.say('{}');
                }
            }, 5000);
        }
        _ws.listen = function(ear){
            _ear = ear;
        }
        return _ws;
    }
}

export default wsSingleton();