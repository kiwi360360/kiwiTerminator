<?php

// basic
function sendPost($url, $postdata = '', $cookie = ''){
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6"); 
    curl_setopt($ch, CURLOPT_TIMEOUT, 60); 
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_REFERER, $url); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata); 
    curl_setopt($ch, CURLOPT_POST, 1); 
    curl_setopt($ch, CURLOPT_COOKIE, $cookie);
    $result = curl_exec($ch); 
    curl_close($ch);
    return($result);  
}
function intotime(){
    // $_COOKIE['intotime']

    // 25%2F12%2F2021++07%3A05%3A35
    // 25%2F12%2F2021++07%3A09%3A13

    // %2F = '-'
    // %3A = ':'
    // + = ' '

    // 25-12-2021  07:09:13

    date_default_timezone_set('Asia/Taipei');
    $time = date('d-m-Y  H:i:s');
    $time = implode('%2F', explode('-',$time));
    $time = implode('%3A', explode(':',$time));
    $time = implode('+', explode(' ',$time));
    return($time);
}
function reBOM($str){
    if (substr($str, 0,3) == pack("CCC",0xef,0xbb,0xbf)){
        $str = substr($str, 3);
    }
    return($str);
}

// variable
$type = @$_POST['type'] ? $_POST['type'] : '';
$url = @$_POST['url'] ? $_POST['url'] : '';
$user = @$_POST['user'] ? $_POST['user'] : '';
$mode = @$_POST['mode'] ? $_POST['mode'] : '';
$sendMode = @$_POST['sendMode'] ? $_POST['sendMode'] : '';
$Q = @$_POST['Q'] ? $_POST['Q'] : '';
$R = @$_POST['R'] ? $_POST['R'] : '';
$U = @$_POST['U'] ? $_POST['U'] : '';
$K = @$_POST['K'] ? $_POST['K'] : '';
$M = @$_POST['M'] ? $_POST['M'] : '';
$V = @$_POST['V'] ? $_POST['V'] : '';
$F = @$_POST['F'] ? $_POST['F'] : '';
$ts = @$_POST['ts'] ? $_POST['ts'] : '';
$LevelNum = @$_POST['LevelNum'] ? $_POST['LevelNum'] : '';
$qTotal = @$_POST['Qtotal'] ? $_POST['Qtotal'] : '';
$aTotal = @$_POST['Atotal'] ? $_POST['Atotal'] : '';
$intotime = @$_POST['intotime'] ? $_POST['intotime'] : '';

// function
function examTotal(){
    global $url;
    global $Q;
    $urlf = $url.'QMap/'.$Q.'.txt';
    $response = sendPost($urlf, '');
    if(strpos($response, 'OkFlag') > -1){
        return(count(explode('[',$response))-1);
    }
    else{
        return(false);
    }
}
function methodTotal(){
    global $url;
    global $Q;
    global $F;
    global $K;
    sendPost($url.'method.php', 'folder='.$F.'&kind='.$K);
    $urlf = $url.'QMap/method.txt';
    $response = sendPost($urlf, '');
    if(strpos($response, 'OkFlag') > -1){
        return(count(explode('[',$response))-1);
    }
    else{
        return(false);
    }
}

// main
if($type != ''){
    if($type == 'get-score'){
        $url2 = $url.'Score/ScoreList.php?U='.$user;
        $response = sendPost($url2, '');
        echo($response);
    }
    else if($type == 'check-url'){
        $url2 = $url.'Score/ScoreList.php';
        $array = [
            'url' => $url2, 
            'response' => false
        ];
        $response = sendPost($url2, '');
        if(strpos($response, 'ScoreList') > -1 && strpos($response, 'canvas') > -1){
            $array['response'] = true;
        }
        echo(json_encode($array));
    }
    else if($type == 'check-user'){
        $url2 = $url.'Score/ScoreList.php?U='.$user;
        $array = [
            'url' => $url2, 
            'response' => false
        ];
        $response = sendPost($url2, '');
        if(strpos($response, 'ScoreList') > -1 && strpos($response, 'canvas') > -1 && strpos($response, 'score.name.push') > -1){
            $array['response'] = true;
        }
        echo(json_encode($array));
    }
    else if($type == 'check-exam'){
        $url2 = $url.'QMap/'.$Q.'.txt';
        $response = examTotal();
        $array = [
            'url' => $url2, 
            'response' => $response
        ];
        echo(json_encode($array));
    }
    else if($type == 'check-method'){
        $url2 = $url.'QMap/method.txt';
        $response = methodTotal();
        $array = [
            'url' => $url2, 
            'url0' => $url.'method.php?folder='.$F.'&kind='.$K, 
            'response' => $response
        ];
        echo(json_encode($array));
    }
    else if($type == 'send'){
        if($sendMode == 'qname'){
            $url2 = $url.'index.php';
            $postdata = 'Q='.$Q.'&V'.$V.'&M='.$M.'&U='.$U.'&ts'.$ts;
            $response = sendPost($url2, $postdata);

            $url2 = $url.'writescore/qname.php';
            $postdata = @$R != '' ? 'Qname='.$Q.'&LevelNum='.$LevelNum.'&R='.$R.'&U='.$U : 'Qname='.$Q.'&LevelNum='.$LevelNum.'&U='.$U;
            $response = sendPost($url2, $postdata);
            $data = [
                'url' => $url2.'?'.$postdata, 
                'index' => $response, 
                'response' => false, 
                'flag' => true, 
                'intotime' => intotime()
            ];
            if($mode == 'KJ' && examTotal() == false){
                $data['flag'] = false;
            }
            if($data['flag'] == true){
                if(strpos($response, '寫入qname') > -1){
                    $data['response'] = true;
                }
            }
            echo(json_encode($data));
        }
        else if($sendMode == 'writescore'){
            if($mode == 'KJ'){
                $qTotal = examTotal();
            }
            $url2 = $url.'writescore/writescore.php';
            $postdata = 'Qname='.$Q.'&Qtotal='.$qTotal.'&CorrectNo='.$aTotal.'&LevelNum='.$LevelNum.'&classnum='.$M.'&R='.$R.'&U='.$U;
            $response = sendPost($url2, $postdata, 'intotime='.$intotime);
            $data = [
                'url' => $url2.'?'.$postdata, 
                'index' => $response, 
                'response' => false
            ];
            if(strpos($response, 'UPDATE') > -1){
                $data['response'] = true;
            }
            echo(json_encode($data));
        }
        else if($sendMode == 'writeans'){
            if($mode == 'KJ'){
                $qTotal = examTotal();
            }
            $url2 = $url.'writescore/writeans.php';
            $postdata = 'classnum='.$M.'&Q='.$Q.'&U='.$U;
            $response = sendPost($url2, $postdata);
            $data = [
                'url' => $url2.'?'.$postdata, 
                'index' => $response, 
                'response' => true
            ];
            // $response = reBOM($response);
            // if($response == ''){
            //     $data['response'] = true;
            // }
            echo(json_encode($data));
        }
    }
}