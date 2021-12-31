// log icon
console.log('%c😼本工具由貓虎皮開發', `
    color: orange;
    font-size: 10px;
    font-weight: bold;
    padding: 5px 1px;
    background: white;
    border-width: 0px 5px;
    border-style: solid;
    border-radius: 2px;
`);
console.log('%c😼', `
    text-align: center;
    padding: 10px;
    border-style: border-box;
    color: orange;
    font-size: 100px;
    text-shadow: 
        2px 2px 0vw white, 
        -2px 2px 0vw white, 
        2px -2px 0vw white, 
        -2px -2px 0vw white, 
        0px 0px 20px black, 
        10px 10px 0px #00000088;
    background: 
        radial-gradient(circle at 50% 50%, transparent 0%, transparent 50%, white 90%, white 100%
        ), 
        conic-gradient(red, orange, yellow, green, blue, indigo, purple, red);
    border-radius: 10px;
`);

// basic
function* counter(){
    var i = 1;
    while(true){
        yield(i++);
    }
}
const version = '1', 
$_GET = {}, 
counterHB = counter();
if(location.href.indexOf('?') > -1){
    location.href.split('?')[1].split('&').forEach(kv => {
        kv = kv.split('=');
        $_GET[kv[0]] = kv[1];
    });
}
if(!($_GET['debug'] == 'true')){console.log = function(){};}
function $(e, f = document){
    return(f.querySelector(e));
}
function $$(e, f = document){
    return(f.querySelectorAll(e));
}
function $n(e, f = document){
    return(f.getElementsByName(e));
}
function sendXmlhttp(name = '', value = '', responseFunction = t => {console.log(t);}, type = 'get'){
    let xmlhttp = new XMLHttpRequest();
    let rf = function (){
        if (xmlhttp.readyState==4) {
            responseFunction(xmlhttp.responseText);
        }
    }
    type = type.toLowerCase();
    xmlhttp.addEventListener("readystatechange", rf);
    if(type == 'get'){
        xmlhttp.open("GET", name+value);
        xmlhttp.send();
    }
    else if(type == 'post'){
        xmlhttp.open("POST", name,true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(value);
    }
}
function toUrlSP(data){
    return(new URLSearchParams(data).toString());
}
function LSCmd(type = 'all', key = '', value = ''){
    switch(type){
        case 'get':
            return(localStorage.getItem(key));
            break;
        case 'set':
            return(localStorage.setItem(key, value));
            break;
        case 'remove':
            return(localStorage.removeItem(key));
            break;
        case 'all':
            return(localStorage);
            break;
        case 'clear':
            localStorage.clear();
            break;
    }
    localStorage.setItem('myCat', 'Tom');
}
function timeStamp(){
    return(Math.floor(Date.now()/3600000));
}
function userIOKey01(m){
    if(m.charCodeAt(0)-64 < 0){
        return(-1);
    }
    else {
        return(m.charCodeAt(0)-64);
    }
}
Element.prototype.setOption = function(a){
    this.innerHTML = '';
    for(let i = 0; i < a.length; i++){
        let option = document.createElement('option');
        if(typeof(a[i]) == 'object'){
            option.innerText = a[i]['d'];
        }
        else{
            option.innerText = a[i];
        }
        option.value = i;
        this.appendChild(option);
    }
}

// https://gist.github.com/biesiad/889139
// (
    String.prototype.ljust = function(length, char) {
        var fill = [];
        while (fill.length + this.length < length) {
          fill[fill.length] = char;
        }
        return fill.join('') + this;
    }
    String.prototype.rjust = function(length, char) {
        var fill = [];
        while (fill.length + this.length < length) {
          fill[fill.length] = char;
        }
        return this + fill.join('');
    }
// )

// https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/271835/
// (
    Date.prototype.format = function(fmt){
        var o = {
            "Y": this.getFullYear(), 
            "y": this.getFullYear().toString().slice(2), 
            "M": this.getMonth()+1, 
            "d": this.getDate(), 
            "H": this.getHours(), 
            "h": this.getHours()%12 == 0 ? 12 : this.getHours()%12, 
            "m": this.getMinutes(), 
            "s": this.getSeconds().toString().ljust(2, '0'), 
            "q": Math.floor((this.getMonth()+3)/3), 
            "S": this.getMilliseconds()
        };
        if(/(y )/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
        if(new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return(fmt);
    }
// )

window.alert = function(text, type){
    let alertBox = document.createElement('div');
    alertBox.setAttribute('class', 'alertBox');
    alertBox.innerText = text;
    if(type !== undefined){
        alertBox.setAttribute('alert-type', type);
    }
    $('#alertDiv').appendChild(alertBox);
    setTimeout((e, E = alertBox) => {
        E.remove();
    }, 5000);
}

// json
let LTjson, MNjson;
sendXmlhttp('json/LT.json', '', t => {
    try {
        LTjson = JSON.parse(t)['index'];
    }
    catch (e) {
        console.error('LTjson!');
    }
    $('#LT-ibook').resetOption();
});
sendXmlhttp('json/HK.json', '', t => {
    try {
        HKjson = JSON.parse(t)['index'];
    }
    catch (e) {
        console.error('HKjson!');
    }
    $('#HK-ibook').resetOption();
    if(modes[mode] == 'HK' && $('#HK-ibook').innerHTML != ''){
        checkHKIbook.bind($('#HK-ibook'))();
    }
});
sendXmlhttp('json/MN.json', '', t => {
    try {
        MNjson = JSON.parse(t)['index'];
    }
    catch (e) {
        console.error('MNjson!');
    }
    $('#MN-ibook').resetOption();
    if(modes[mode] == 'MN' && $('#MN-ibook').innerHTML != ''){
        checkMNIbook.bind($('#MN-ibook'))();
    }
});

// url
let url = 'url' in LSCmd() ? LSCmd('get', 'url') : 'https://hinet.kiwi.com.tw/2021_beta/', 
url2 = url;
$('#iurl').value = url;
$('#iurl-check').innerHTML = 'url' in LSCmd() ? '先前使用' : '預設連結';
$('#iurl-check').style.color = 'var(--green)';
$('#iurl').addEventListener('change', checkUrl);
checkUrl.bind($('#iurl'))();
function checkUrl(){
    if(this.value == ''){
        url = '';
        $('#iurl-check').innerHTML = '';
    }
    else{
        url2 = this.value.split('?')[0];
        url2 = url2.indexOf('login.php') > -1 ? url2.replace('login.php', '') : (url2.indexOf('menu.php') ? url2.replace('menu.php', '') : url2);
        url2 = url2[url2.length-1] == '/' ? url2 : url2+'/';
        sendXmlhttp(
            'send.php', 
            toUrlSP({
                'type':'check-url', 
                'url':url2
            }), 
            t => {
                try{
                    t = JSON.parse(t);
                    flag = true;
                }catch(e){
                    flag = false;
                }
                if(flag){
                    let color, text;
                    if('response' in t && t['response'] == true){
                        color = 'var(--green)';
                        text = '網址可用';
                        $('#iurl').value = url2;
                        url = url2;
                        LSCmd('set', 'url', url2);
                    }
                    else{
                        color = 'var(--red)';
                        text = '網址有誤';
                    }
                    $('#iurl-check').style.color = color;
                    $('#iurl-check').innerText = text;
                    checkUser.bind($('#iuser'))();
                }
            }, 
            'post'
        );
    }
}

// user
let user = 'user' in LSCmd() ? LSCmd('get', 'user') : 'kiwi';
$('#iuser').value = user;
$('#iuser-check').innerHTML = 'user' in LSCmd() ? '先前使用' : '測試帳號';
$('#iuser-check').style.color = 'var(--green)';
$('#iuser').addEventListener('change', checkUser);
checkUser.bind($('#iuser'))();
function checkUser(){
    user = this.value;
    if(this.value == ''){
        $('#iuser-check').innerHTML = '';
    }
    else{
        sendXmlhttp(
            'send.php', 
            toUrlSP({
                'type':'check-user', 
                'url':url2, 
                'user':user
            }), 
            t => {
                try{
                    t = JSON.parse(t);
                    console.log(t)
                    flag = true;
                }catch(e){
                    flag = false;
                }
                if(flag){
                    let color, text;
                    if('response' in t && t['response'] == true){
                        color = 'var(--green)';
                        text = '帳號存在';
                        LSCmd('set', 'user', user);
                    }
                    else{
                        color = 'var(--red)';
                        text = '無此帳號';
                    }
                    $('#iuser-check').style.color = color;
                    $('#iuser-check').innerText = text;
                }
            }, 
            'post'
        );
    }
}

// iyear
let year = 'year' in LSCmd() ? LSCmd('get', 'year') : 0, 
years = ['1', '2', '3'];
years.forEach(yearName => {
    $(`#iyear-${yearName}`).addEventListener('change', function(){
        if(this.checked == true){
            $$(`[for|="iyear"]`).forEach(E => {E.style.color = '#ffffff';});
            $(`[for="iyear-${yearName}"]`).style.color = 'var(--green)';
            year = years.indexOf(yearName);
            LSCmd('set', 'year', year);
        }
    });
});

// kind
let kind = 'kind' in LSCmd() ? LSCmd('get', 'kind') : 0, 
kinds = ['1_Kn', '2_Nn', '3_Hn'];
kinds.forEach(kindName => {
    $(`#ikind-${kindName}`).addEventListener('change', function(){
        if(this.checked == true){
            $$(`[for|="ikind"]`).forEach(E => {E.style.color = '#ffffff';});
            $(`[for="ikind-${kindName}"]`).style.color = 'var(--green)';
            kind = kinds.indexOf(kindName);
            LSCmd('set', 'kind', kind);
        }
    });
});

// mode
let mode = 'mode' in LSCmd() ? LSCmd('get', 'mode') : 0, 
modes = ['LT', 'HK', 'MN', 'KJ', 'TC'];
modes.forEach(modeName => {
    $(`#imode-${modeName}`).addEventListener('change', function(){
        if(this.checked == true){
            $$(`[for|="imode"]`).forEach(E => {E.style.color = '#ffffff';});
            $(`[for="imode-${modeName}"]`).style.color = 'var(--green)';
            $$(`[id|="iqname"]`).forEach(E => {E.setAttribute('hidden', '');});
            $(`[id="iqname-${modeName}"]`).removeAttribute('hidden');
            mode = modes.indexOf(modeName);
            LSCmd('set', 'mode', mode);
            modeChange();
        }
    });
});
function modeChange(){
    if(modes[mode] == 'LT'){
        changeQtotal(LTQtotals[LTQtotal]);
    }
    else if(modes[mode] == 'HK' && $('#HK-ibook').innerHTML != ''){
        checkHKIbook.bind($('#HK-ibook'))();
    }
    else if(modes[mode] == 'MN' && $('#MN-ibook').innerHTML != ''){
        checkMNIbook.bind($('#MN-ibook'))();
    }
    else if(modes[mode] == 'KJ'){
        checkExam.bind($('#KJ-iname'))();
    }
}

// level
let level = 'level' in LSCmd() ? LSCmd('get', 'level') : 0, 
levels = ['A', 'B', 'C'];
levels.forEach(levelName => {
    $(`#ilevel-${levelName}`).addEventListener('change', function(){
        if(this.checked == true){
            $$(`[for|="ilevel"]`).forEach(E => {E.style.color = '#ffffff';});
            $(`[for="ilevel-${levelName}"]`).style.color = 'var(--green)';
            level = levels.indexOf(levelName);
            LSCmd('set', 'level', level);
        }
    });
});

// LTQtotal
let LTQtotal = 'LTQtotal' in LSCmd() ? LSCmd('get', 'LTQtotal') : 0, 
LTQtotals = ['5', '10', '20'];
LTQtotals.forEach(LTQtotalName => {
    $(`#iLTQtotal-${LTQtotalName}`).addEventListener('change', function(){
        if(this.checked == true){
            $$(`[for|="iLTQtotal"]`).forEach(E => {E.style.color = '#ffffff';});
            $(`[for="iLTQtotal-${LTQtotalName}"]`).style.color = 'var(--green)';
            LTQtotal = LTQtotals.indexOf(LTQtotalName);
            LSCmd('set', 'LTQtotal', LTQtotal);
            changeQtotal(LTQtotals[LTQtotal]);
        }
    });
});

// KJ-iname
let KJIname = 'KJIname' in LSCmd() ? LSCmd('get', 'KJIname') : '';
$('#KJ-iname').value = KJIname;
$('#KJ-iname-check').innerHTML = 'KJIname' in LSCmd() ? '先前使用' : '';
$('#KJ-iname-check').style.color = 'var(--green)';
$('#KJ-iname').addEventListener('change', checkExam);
checkExam.bind($('#KJ-iname'))();
function checkExam(){
    KJIname = this.value;
    if(this.value == ''){
        KJIname = '';
        $('#KJ-iname-check').innerHTML = '';
    }
    else{
        sendXmlhttp(
            'send.php', 
            toUrlSP({
                'type':'check-exam', 
                'url':url2, 
                'Q':`${kinds[kind]}/exam/${$('#KJ-iname').value}`
            }), 
            t => {
                try{
                    t = JSON.parse(t);
                    console.log(t);
                    flag = true;
                }catch(e){
                    flag = false;
                }
                if(flag){
                    let color, text;
                    if('response' in t && t['response'] != false){
                        color = 'var(--green)';
                        text = `考卷共${t['response']}題`;
                        LSCmd('set', 'KJIname', KJIname);
                        if(mode == 3){
                            changeQtotal(t['response']);
                        }
                    }
                    else{
                        color = 'var(--red)';
                        text = '無此考卷';
                    }
                    $('#KJ-iname-check').style.color = color;
                    $('#KJ-iname-check').innerText = text;
                }
            }, 
            'post'
        );
    }
}

// iatotal
let atotal = 'iatotal' in LSCmd() ? LSCmd('get', 'iatotal') : '0', 
qtotal = 0;
$$('[name="iatotal"]').forEach(E => {
    E.value = atotal;
    E.addEventListener('change', checkIatotal);
});
function changeQtotal(number){
    qtotal = number;
    $$('[name="iatotal"]').forEach(E => {
        E.max = number;
        checkIatotal.bind(E)();
    });
    $$('[name="qtotal"]').forEach(E => {
        E.innerText = ` / ${number}`;
    });
}
function checkIatotal(){
    if(parseInt(this.value) > parseInt(this.max)){
        this.value = this.max;
    }
    if(parseInt(this.value) < parseInt(this.min)){
        this.value = this.min;
    }
    atotal = this.value;
    LSCmd('set', 'iatotal', atotal);
    $$('[name="iatotal"]').forEach(E => {
        E.value = atotal;
    });
}

// TC-iname
let TCIname = 'TCIname' in LSCmd() ? LSCmd('get', 'TCIname') : '';
$('#TC-iname').value = TCIname;
$('#TC-iname').addEventListener('change', function(){
    TCIname = this.value;
    LSCmd('set', 'TCIname', this.value);
});

// LT-ibook
let LTIbook = 'LTIbook' in LSCmd() ? LSCmd('get', 'LTIbook') : '';
$('#LT-ibook').value = LTIbook;
$('#LT-ibook').addEventListener('change', function(){
    LTIbook = this.value;
    LSCmd('set', 'LTIbook', LTIbook);
    $('#LT-ibbok').resetOption();
});
$('#LT-ibook').resetOption = function(){
    this.setOption(LTjson);
    $('#LT-ibbok').resetOption();
    LTIbook = this.value;
}

// LT-ibbok
let LTIbbok = 'LTIbbok' in LSCmd() ? LSCmd('get', 'LTIbbok') : '';
$('#LT-ibbok').value = LTIbbok;
$('#LT-ibbok').addEventListener('change', function(){
    LTIbbok = this.value;
    LSCmd('set', 'LTIbbok', LTIbbok);
    $('#LT-ibbbk').resetOption();
});
$('#LT-ibbok').resetOption = function(){
    this.setOption(LTjson[LTIbook]['f']);
    $('#LT-ibbbk').resetOption();
    LTIbbok = this.value;
}

// LT-ibbbk
let LTIbbbk = 'LTIbbbk' in LSCmd() ? LSCmd('get', 'LTIbbbk') : '';
$('#LT-ibbbk').value = LTIbbbk;
$('#LT-ibbbk').addEventListener('change', function(){
    LTIbbbk = this.value;
    LSCmd('set', 'LTIbbbk', LTIbbbk);
});
$('#LT-ibbbk').resetOption = function(){
    this.setOption(LTjson[LTIbook]['f'][LTIbbok]['f']);
    LTIbbbk = this.value;
}

// HK-ibook
let HKIbook = 'HKIbook' in LSCmd() ? LSCmd('get', 'HKIbook') : '';
$('#HK-ibook').value = HKIbook;
$('#HK-ibook').addEventListener('change', checkHKIbook);
$('#HK-ibook').resetOption = function(){
    this.setOption(HKjson);
    HKIbook = this.value;
}
function checkHKIbook(){
    HKIbook = this.value;
    LSCmd('set', 'HKIbook', HKIbook);
    if(HKjson[HKIbook]['c'] == 'test'){
        sendXmlhttp(
            'send.php', 
            toUrlSP({
                'type':'check-method', 
                'url':url2, 
                'F':kinds[kind], 
                'K':'test'
            }), 
            t => {
                try{
                    t = JSON.parse(t);
                    console.log(t);
                    flag = true;
                }catch(e){
                    flag = false;
                }
                if(flag && 'response' in t && t['response'] != false){
                    changeQtotal(t['response']);
                }
            }, 
            'post'
        );
    }
    else{
        sendXmlhttp(
            'send.php', 
            toUrlSP({
                'type':'check-exam', 
                'url':url2, 
                'Q':`test/${HKjson[HKIbook]['c']}`
            }), 
            t => {
                try{
                    t = JSON.parse(t);
                    console.log(t);
                    flag = true;
                }catch(e){
                    flag = false;
                }
                if(flag && 'response' in t && t['response'] != false){
                    changeQtotal(t['response']);
                }
            }, 
            'post'
        );
    }
}

// MN-ibook
let MNIbook = 'MNIbook' in LSCmd() ? LSCmd('get', 'MNIbook') : '';
$('#MN-ibook').value = MNIbook;
$('#MN-ibook').addEventListener('change', checkMNIbook);
$('#MN-ibook').resetOption = function(){
    this.setOption(MNjson);
    MNIbook = this.value;
}
function checkMNIbook(){
    MNIbook = this.value;
    LSCmd('set', 'MNIbook', MNIbook);
    sendXmlhttp(
        'send.php', 
        toUrlSP({
            'type':'check-method', 
            'url':url2, 
            'F':kinds[kind], 
            'K':MNjson[MNIbook]['c']
        }), 
        t => {
            try{
                t = JSON.parse(t);
                console.log(t);
                flag = true;
            }catch(e){
                flag = false;
            }
            if(flag && 'response' in t && t['response'] != false){
                changeQtotal(t['response']);
            }
        }, 
        'post'
    );
}

// send
$$('[id|="isend"]').forEach(sendBtn => {
    sendBtn.addEventListener('click', function(){
        let data = {}, 
        name = 'undefined';
        if(mode == modes.indexOf('LT')){
            name = `第${+LTIbook+1}冊第${+LTIbbok+1}章第${+LTIbbbk+1}節(${['易', '中', '難'][level]})`;
            data['Q'] = `${kinds[kind]}/0_${LTjson[LTIbook]['c']}${+LTIbbok+1}${+LTIbbbk+1}`;
            data['V'] = version;
            data['M'] = `${levels[level]}${['A', 'B', 'C'][LTQtotal]}${years[year]}`;
            data['U'] = user;
            data['R'] = `<國中數學${{'1_Kn':'康軒', '2_Nn':'南一', '3_Hn':'翰林'}[kinds[kind]]}版>第${+LTIbook+1}冊第${+LTIbbok+1}章第${+LTIbbbk+1}節`;
            data['Qtotal'] = qtotal;
            data['Atotal'] = atotal;
        }
        else if(mode == modes.indexOf('HK')){
            name = HKjson[HKIbook]['d'];
            data['Q'] = HKjson[HKIbook]['c'];
            data['V'] = version;
            data['M'] = `00${years[year]}`;
            data['U'] = user;
            data['R'] = 'undefined';
            data['Qtotal'] = qtotal;
            data['Atotal'] = atotal;
        }
        else if(mode == modes.indexOf('MN')){
            name = MNjson[MNIbook]['d'];
            data['Q'] = MNjson[MNIbook]['c'];
            data['F'] = kinds[kind];
            data['V'] = version;
            data['M'] = `11${years[year]}`;
            data['U'] = user;
            data['R'] = 'undefined';
            data['Qtotal'] = qtotal;
            data['Atotal'] = atotal;
        }
        else if(mode == modes.indexOf('KJ')){
            name = KJIname;
            data['Q'] = `${kinds[kind]}/exam/${KJIname}`;
            data['V'] = version;
            data['M'] = `DD${years[year]}`;
            data['U'] = user;
            data['R'] = 'undefined';
            data['Qtotal'] = qtotal;
            data['Atotal'] = atotal;
        }
        else if(mode == modes.indexOf('TC')){
            name = TCIname;
            data['Q'] = TCIname;
            data['V'] = version;
            data['M'] = `DD${years[year]}`;
            data['U'] = user;
            data['R'] = 'undefined';
            data['Qtotal'] = atotal;
            data['Atotal'] = atotal;
        }
        data['url'] = url;
        data['type'] = 'send';
        data['mode'] = modes[mode];
        data['sendMode'] = this.id.replace('isend-', '');
        data['LevelNum'] = userIOKey01(data['M']);
        data['ts'] = timeStamp();
        data['intotime'] = LSCmd('get', 'intotime');
        sendXmlhttp(
            'send.php', 
            toUrlSP(data), 
            (t, sendMode = this.innerText, sendName = name) => {
                try{
                    t = JSON.parse(t);
                    console.log(t);
                    flag = true;
                }catch(e){
                    flag = false;
                }
                if(flag){
                    if('response' in t && t['response'] == true){
                        if('intotime' in t){
                            LSCmd('set', 'intotime', t['intotime']);
                        }
                        alert(`「${sendMode}」發送成功！`, 'done');
                        mode
                        addHistory(sendName, sendMode, '成功');
                    }
                    else{
                        alert(`「${sendMode}」發送失敗！`, 'error');
                        addHistory(sendName, sendMode, '失敗');
                    }
                }
            }, 
            'post'
        );
    });
});

// isettingsCmd
$('#isettingsCmd-input').addEventListener('click', function(){});
$('#isettingsCmd-output').addEventListener('click', function(){});
$('#isettingsCmd-clear').addEventListener('click', function(){
    LSCmd('clear');
    location.reload();
});

// tools
let pointScore;
$$('#toolsDiv > div > button').forEach(E => {
    E.addEventListener('click', function(){
        $$('#toolsDiv > div > button').forEach(E => {
            E.removeAttribute('tool-selected');
        });
        this.setAttribute('tool-selected', '');
        if(this.id.replace('TB-', '') == 'history'){
            // alert('done', 'done');
        }
        else if(this.id.replace('TB-', '') == 'score'){
            getPoint();
        }
    });
});
function addHistory(name = 'undefined', type = 'undefined', response = 'undefined'){
    if($('[pid="pHB"]')){
        [counterHB.next().value, name, user, type, new Date().format('Y-M-d H:m:s'), response].forEach(i => {
            let span = document.createElement('span');
            span.innerText = i;
            $('[pid="pHB"]').appendChild(span);
        });
    }
}
function getPoint(){
    sendXmlhttp(
        'send.php', 
        toUrlSP({
            'type':'get-score', 
            'url':url2, 
            'user':user
        }), 
        function(t){
            if($$('[pid="pU"]').length > 0){
                $$('[pid="pU"]').forEach(E => {E.innerText = user;});
            }
            eval('pointScore = ' + t.split('<script>var score = ')[1].split('</script>')[0].split('score').join('pointScore') +';');
            pointScore['point'] = {'m數寶':point, 'y數寶':T_point, 'm銜接':p_m, 'y銜接':p_t};
            if($('[pid="pGB"]')){
                let pGB = $('[pid="pGB"]');
                pGB.innerHTML = `
                    <span>編號</span>	
                    <span>名稱</span>
                    <span>題數</span>
                    <span>答對</span>
                    <span>開始</span>
                    <span>結束</span>
                `;
                let pA = ['name', 'qztno', 'correctno', 'qztime', 'posted'];
                for(let i = 0; i < pointScore.name.length; i++){
                    let nGridBox = document.createElement('span');
                    nGridBox.innerText = i+1;
                    pGB.appendChild(nGridBox);
                    for(let j = 0; j < 5; j++){
                        let sGridBox = document.createElement('span');
                        sGridBox.innerText = pointScore[pA[j]][i].split('  ').join(' ');
                        pGB.appendChild(sGridBox);
                    }
                }
            }
            ['m數寶', 'y數寶', 'm銜接', 'y銜接'].forEach(pid => {
                if(document.querySelector(`[pid=${pid}]`)){
                    document.querySelector(`[pid=${pid}]`).innerText = pointScore['point'][pid];
                }
            });
        }, 
        'post'
    );
}

// main
modeChange();
document.querySelector(`#iyear-${years[year]}`).click();
document.querySelector(`#imode-${modes[mode]}`).click();
document.querySelector(`#ikind-${kinds[kind]}`).click();
document.querySelector(`#ilevel-${levels[level]}`).click();
document.querySelector(`#iLTQtotal-${LTQtotals[LTQtotal]}`).click();
// LSCmd('clear');