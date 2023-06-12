<?php 
	include "config.php";
	
	require_once __DIR__ . '/../zaloplatform/vendor/autoload.php';
	use Zalo\ZaloEndPoint; 
    use Zalo\Zalo;

    $config = array(
        'app_id' => '2977952951931845771',
        'app_secret' => 'M5M76tl1O1XJNtVVCjCN'
    );
    $zalo = new Zalo($config);

	$helper = $zalo -> getRedirectLoginHelper();

	$codeVerifier = $_SESSION['code_verifier'];

	$zaloToken = $helper->getZaloToken($codeVerifier); // get zalo token
	$accessToken = $zaloToken->getAccessToken();
	if($accessToken) {
		$accessToken = $accessToken;
		$params = ['fields' => 'id,name,picture'];
		$response = $zalo->get(ZaloEndpoint::API_GRAPH_ME, $accessToken, $params);
		$result = $response->getDecodedBody(); // result
		$id_zalo = $result['id'];
		$ten = (string)$result['name'];


		$check_zalo = $d->rawQuery("select * from #_member where id_zalo = ? and hienthi > 0 ",array($id_zalo));

		if(count($check_zalo) == 0)
		{
			$data_zalo = array();
			$data_zalo['id_zalo'] = $id_zalo;
			$data_zalo['name'] = $ten;
			$maxacnhan = $func->digitalRandom(0,3,6);
			$data_zalo['linkshare'] = $maxacnhan.$func->stringRandom(5);
			$data_zalo['typeaccount'] = 4;
			$data_zalo['hienthi'] = 1;
			if($d->insert('member',$data_zalo)){
				$id_insert = $d->getLastInsertId();
				$_SESSION[$login_member]['active'] = true;
				$_SESSION[$login_member]['id'] = $id_insert;
				$_SESSION[$login_member]['name'] = $ten;
				
			}
		}
		else
		{
			$_SESSION[$login_member]['active'] = true;
			$_SESSION[$login_member]['id'] = $check_zalo[0]['id'];
			$_SESSION[$login_member]['name'] = $check_zalo[0]['name'];
		}
		header("Location: /index.php");
	}

?>