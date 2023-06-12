<?php 

    session_start();
    define('LIBRARIES','../libraries/');
    define('THUMBS','thumbs');
    define('WATERMARK','watermark');

    if(!isset($_SESSION['lang'])) $_SESSION['lang'] = 'vi';
    $lang = $_SESSION['lang'];

    require_once LIBRARIES."config.php";
    require_once LIBRARIES.'autoload.php';
    new AutoLoad();
    $d = new PDODb($config['database']);

    $sluglang = 'tenkhongdauvi';

header("Content-type: text/xml");

 // Hàm chuyển đổi những ký tự đặc biệt để khỏi lỗi XML
function xml_entities($string) {
    return str_replace(
            array("&", "<", ">", '"', "'"), array("&amp;", "&lt;", "&gt;", "&quot;", "&apos;"), $string
    );
}
// Kết nối CSDL và lấy danh sách 10 tin mới nhất
$type=$_GET['id'];
if($type=='san-pham'){
    $result = $d->rawQuery("select ten$lang, tenkhongdauvi, tenkhongdauen, mota$lang, ngaytao, id, photo from #_product where type = ? and hienthi > 0 order by stt,id desc",array($type));
}else{
    $result = $d->rawQuery("select ten$lang, tenkhongdauvi, tenkhongdauen, mota$lang, ngaytao, id, photo from #_news where type = ? and hienthi > 0 order by stt,id desc",array($type));
}

$urlweb='https://maihienmaixepdidong.net/';
// Lặp dư liệu và đưa ra các items XML
$items = '';
foreach ($result as $k => $value) {
    $items .= '<item>';
        $items .= "<title>" . xml_entities($value['ten'.$lang]) . "</title>";
        $items .= "<link>" . xml_entities("{$urlweb}{$value[$sluglang]}-{$value['id']}.html") . "</link>";
        $items .= "<description>" . xml_entities($value['mota'.$lang]) . "</description>";
        $items .= "<guid>" . xml_entities("{$urlweb}{$value[$sluglang]}-{$value['id']}.html") . "</guid>";
        $items .= "<pubDate>{$result['ngaytao']}</pubDate>";
    $items .= '</item>';
}

// Xuất thông tin website và nối $items vào
echo '<?xml version="1.0"?>
<rss xmlns:slash="https://purl.org/rss/1.0/modules/slash/" version="2.0">
    <channel>
        <title> Tin tức mới nhất - Maihienmaixepdidong.net RSS </title>
        <description>Maihienmaixepdidong.net RSS</description>
        <image>
        <url>https://maihienmaixepdidong.net/thumbs/135x110x2/upload/photo/untitled-1-5329.png</url>
        <title>Tin Tức Mái Hiên Mái Xếp Đại Anh Kiệt</title>
        <link>'.$urlweb.'</link>
        </image>
        <pubDate>Mon, 16 May 2022 22:39:15 +0700</pubDate>
        <link>' . xml_entities($urlweb) . 'rss</link>
        <description> ' . xml_entities('MÁI HIÊN MÁI XẾP ĐẠI ANH KIỆT | MÁI HIÊN DI ĐỘNG BÌNH DƯƠNG') . ' </description>
        <language>vi_VN</language>
        '.$items.'
    </channel>
</rss>';