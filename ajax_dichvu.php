<?php
include "ajax_config.php";

$array_value = (isset($_POST['array_value']) && $_POST['array_value'] > 0) ? $_POST['array_value'] : 0;
$tongtien=0;
$tongten='';

for ($i=0; $i < count($array_value); $i++) { 
	$dichvuresult = $d->rawQueryOne("select ten$lang, tenkhongdauvi, tenkhongdauen, id, gia from #_news where id = ? ",array($array_value[$i]['id']));
	$tongtien+=$dichvuresult['gia'];
	if($i>0){
		$tongten.=' - ';
	}
	$tongten.=$dichvuresult['ten'.$lang];
}

$data = array('ten' => $tongten,'tongtien' => $func->format_money($tongtien,'$'));
echo json_encode($data);