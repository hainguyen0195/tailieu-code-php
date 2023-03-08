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