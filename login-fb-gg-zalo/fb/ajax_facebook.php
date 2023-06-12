<?php 
	include "config.php";

	$id_facebook = (string)$_POST['id'];
	$ten = (string)$_POST['name'];
	$email = (string)$_POST['email'];
	$check_fb = $d->rawQuery("select * from #_member where (id_facebook = ? or email = ?) and hienthi > 0 limit 0,1",array($id_facebook,$email));


	if(count($check_fb) == 0)
	{
		$data = array();
		$data['id_facebook'] = $id_facebook;
		$data['name'] = $ten;
		$data['email'] = $email;
		$maxacnhan = $func->digitalRandom(0,3,6);
		$data['linkshare'] = $maxacnhan.$func->stringRandom(5);
		$data['hienthi'] = 1;
		$data['typeaccount'] = 2;

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
		$_SESSION[$login_member]['id'] = $check_fb[0]['id'];
		$_SESSION[$login_member]['email'] = $check_fb[0]['email'];
		$_SESSION[$login_member]['name'] = $check_fb[0]['ten'];

		echo 1;
	}
?>