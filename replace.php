<?php 
    $str = "thietkewebsite-tka.com";
    $rec = "topvipvietnam.vn";

    foreach($config['website']['lang'] as $key => $value) 
    {
        # Thuc hien update duong dan trong noidung bang product
        $d->rawQuery("update #_product noidung".$key." set noidung".$key."=replace(noidung".$key.",'$str','$rec')");

        # Thuc hien update duong dan trong noidung bang news
        $d->rawQuery("update #_news noidung".$key." set noidung".$key."=replace(noidung".$key.",'$str','$rec')");

        # Thuc hien update duong dan trong noidung bang news_static
        $d->rawQuery("update #_static noidung".$key." set noidung".$key."=replace(noidung".$key.",'$str','$rec')");
    }
 ?>
<?php
$str = "baogiaepcocbetong.com";
$rec = "epcocbetongtienthanh.com";

# Thuc hien update duong dan trong noidung bang product

$d->reset();
$sql_setting = "update #_product noidung_vi set noidung_vi=replace(noidung_vi,'$str','$rec')";
$d->query($sql_setting);
$row_background = $d->result_array();

$d->reset();
$sql_setting = "update #_baiviet noidung_vi set noidung_vi=replace(noidung_vi,'$str','$rec')";
$d->query($sql_setting);
$row_background = $d->result_array();

?>
