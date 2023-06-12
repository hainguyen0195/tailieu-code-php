<?php
	include "config.php";
	
	$id_google = (string)$_POST['id'];
	$ten = (string)$_POST['name'];
	$email = (string)$_POST['email'];
	$check_gg = $d->rawQuery("select * from #_member where (id_google = ? or email = ?) and hienthi > 0 limit 0,1",array($id_google,$email));

	//Chưa có trong bảng thành viên
	if(count($check_gg) == 0)
	{
		$data = array();
		$data['id_google'] = $id_google;
		$data['name'] = $ten;
		$data['email'] = $email;
		$maxacnhan = $func->digitalRandom(0,3,6);
		$data['linkshare'] = $maxacnhan.$func->stringRandom(5);
		$data['typeaccount'] = 3;
		$data['hienthi'] = 1;
		if($d->insert('member',$data)){
			$id_insert = $d->getLastInsertId();
			$_SESSION[$login_member]['active'] = true;
			$_SESSION[$login_member]['id'] = $id_insert;
			$_SESSION[$login_member]['email'] = $email;
			$_SESSION[$login_member]['name'] = $ten;
			echo 1;
		}else{
			echo 0;
		}
	}
	else
	{
		$_SESSION[$login_member]['active'] = true;
		$_SESSION[$login_member]['id'] = $check_gg[0]['id'];
		$_SESSION[$login_member]['name'] = $check_gg[0]['name'];
		$_SESSION[$login_member]['email'] = $check_gg[0]['email'];
		echo 1;
	}
?>