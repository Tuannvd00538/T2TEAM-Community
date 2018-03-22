<?php
set_time_limit(0);
error_reporting(0);
define('HASHTAG_NAMESPACE', '#bfg_');
$token = 'EAACW5Fg5N2IBACZADNy9dOuZAZAWDPp01rmYkKZA31aZBO24o0eZBdaW9ZA5JCeqHhGunx3uVZCk4ZCa402cFOOzMUt0QT970lHltLJdbPfH7FzZCfzF4TBNzZCiMXSZBsKeAhaFSjbKR44cI6nxrMZA70qkZC754r5mGpCuwNSVPBzAxZAZCoKOge6PY320UVAF1dPhqLYZD'; 
$idgroup = '614878965530147';
$post = json_decode(request('https://graph.facebook.com/v2.9/' .$idgroup. '/feed?fields=id,message,created_time,from&limit=100&access_token=' . $token), true);
$timelocpost = date('Y-m-d');
$logpost     = file_get_contents("log.txt");
for ($i = 0; $i < 100; $i++) {
    $idpost      = $post['data'][$i]['id'];
    $messagepost = $post['data'][$i]['message'];
    $time        = $post['data'][$i]['created_time'];
    if (strpos($time, $timelocpost) !== false) {
        if (strpos(strtolower($messagepost), HASHTAG_NAMESPACE) === FALSE) {
            if (strpos($logpost, $idpost) === FALSE) {
                $comment = $post['data'][$i]['from']['name'] . 'ơi, bổ sung #hashtag vào bài viết nhé!' . "\n\n" . '-------------------' . "\n\n" . 
                    'DANH SÁCH #HASTAG DÙNG TRONG NHÓM:' . "\n\n" . 
                    '- #BFG_SHARE: Dùng cho bài share thứ gì đó.' . "\n\n" . 
                    '- #BFG_QUESTION: Dùng cho bài để hỏi một vấn đề nào đó.' . "\n\n" . 
                    '- #BFG_REPORT: Dùng để tố cáo thứ gì đó.' . "\n\n" . 
                    '- #BFG_FEELING: Đăng bài cá nhân không liên quan blog.' . "\n\n" . 
                    '- #BFG_LIVE: Live sờ chim trong group.' . "\n\n" . 
                    '- #BFG_RELAX : Dùng cho những bài vui, giải trí,...';
				request('https://graph.facebook.com/' . urlencode($idpost) . '/comments?method=post&message=' . urlencode($comment) . '&access_token=' . $token);
                $luulog = fopen("log.txt", "a");
                fwrite($luulog, $idpost . "\n");
                fclose($luulog);
            } else {
                echo 'Đã nhắc hashtag';
            }
        }
        
    }
}
function request($url)
{
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return FALSE;
    }
    
    $options = array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HEADER => FALSE,
        CURLOPT_FOLLOWLOCATION => TRUE,
        CURLOPT_ENCODING => '',
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36',
        CURLOPT_AUTOREFERER => TRUE,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_SSL_VERIFYPEER => 0
    );
    
    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $response  = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    unset($options);
    return $http_code === 200 ? $response : FALSE;
}
?>
