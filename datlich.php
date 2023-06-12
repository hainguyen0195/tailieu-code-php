<?php 
if(!defined('SOURCES')) die("Error");

if(isset($_POST['submit-datlich']))
{
	$responseCaptcha = $_POST['recaptcha_response_datlich'];
	$resultCaptcha = $func->checkRecaptcha($responseCaptcha);
	$scoreCaptcha = (isset($resultCaptcha['score'])) ? $resultCaptcha['score'] : 0;
	$actionCaptcha = (isset($resultCaptcha['action'])) ? $resultCaptcha['action'] : '';
	$testCaptcha = (isset($resultCaptcha['test'])) ? $resultCaptcha['test'] : false;

	if(($scoreCaptcha >= 0.5 && $actionCaptcha == 'datlich') || $testCaptcha == true)
	{
		$data = array();
		$data['ten'] = (isset($_REQUEST['hoten-datlich']) && $_REQUEST['hoten-datlich'] != '') ? htmlspecialchars($_REQUEST['hoten-datlich']) : '';


		$rowuser = $d->rawQueryOne("select id,mauser from #_member where id = ? and hienthi > 0 limit 0,1",array($_SESSION[$login_member]['id']));

		$data['mauser'] = (isset($rowuser['mauser']) && $rowuser['mauser'] != '') ? htmlspecialchars($rowuser['mauser']) : '';
		
		$data['email'] = (isset($_REQUEST['email-datlich']) && $_REQUEST['email-datlich'] != '') ? htmlspecialchars($_REQUEST['email-datlich']) : '';
		$data['dienthoai'] = (isset($_REQUEST['dienthoai-datlich']) && $_REQUEST['dienthoai-datlich'] != '') ? htmlspecialchars($_REQUEST['dienthoai-datlich']) : '';
		// $data['ngaydat'] = (isset($_REQUEST['ngaydat-datlich']) && $_REQUEST['ngaydat-datlich'] != '') ? htmlspecialchars($_REQUEST['ngaydat-datlich']) : '';
		// $data['giodat'] = (isset($_REQUEST['giodat-datlich']) && $_REQUEST['giodat-datlich'] != '') ? htmlspecialchars($_REQUEST['giodat-datlich']) : '';

		$tongtien=0;
		$tongten='';
		if(isset($_REQUEST['combo_checkeds'])){
			foreach ($_REQUEST['combo_checkeds'] as $key => $value) {
				$dichvuresult = $d->rawQueryOne("select ten$lang, tenkhongdauvi, tenkhongdauen, id, gia from #_news where id = ? ",array($value));
				$tongtien+=$dichvuresult['gia'];
				if($key>0){
					$tongten.=' - ';
				}
				$tongten.=$dichvuresult['ten'.$lang];
			}
		}

		$data['dichvu']=$tongten;
		$data['tongtien']=$tongtien;

		// $iddv = (isset($_REQUEST['dichvu-datlich']) && $_REQUEST['dichvu-datlich'] != '') ? htmlspecialchars($_REQUEST['dichvu-datlich']) : '';
		// $dichvuresult = $d->rawQueryOne("select ten$lang, tenkhongdauvi, tenkhongdauen, id, gia from #_news where id = ? ",array($iddv));

		// $data['dichvu']=$dichvuresult['ten'.$lang];
		//$data['tongtien']=$dichvuresult['gia'];
		// $data['dichvukhannong'] = (isset($_REQUEST['dichvukhannong-datlich']) && $_REQUEST['dichvukhannong-datlich'] != '') ? htmlspecialchars($_REQUEST['dichvukhannong-datlich']) : '';
		// $data['chinhanh'] = (isset($_REQUEST['chinhanh-datlich']) && $_REQUEST['chinhanh-datlich'] != '') ? htmlspecialchars($_REQUEST['chinhanh-datlich']) : '';
		$data['ngaytao'] = time();
		$data['type'] = (isset($_REQUEST['type-datlich']) && $_REQUEST['type-datlich'] != '') ? htmlspecialchars($_REQUEST['type-datlich']) : '';

		$params_hi = array($data['type']);
		$sqlNum = "select count(*) as 'num' from #_newsletter where type=? order by stt,id desc";
		$count = $d->rawQueryOne($sqlNum, $params_hi);
		$total = $count['num']+1;
		$data['stt'] = $total;

		if($d->insert('newsletter',$data))
		{
			$func->transfer("Đặt dịch vụ thành công. Chúng tôi sẽ liên hệ với bạn sớm.",$config_base);
		}
		else
		{
			$func->transfer("Đặt dịch vụ thất bại. Vui lòng thử lại sau.",$config_base, false);
		}
	}
	else
	{
		$func->transfer("Đặt dịch vụ thất bại. Vui lòng thử lại sau.",$config_base, false);
	}
}
/* SEO */
$seopage = $d->rawQueryOne("select * from #_seopage where type = ? limit 0,1",array('dat-lich'));
$seo->setSeo('h1',$title_crumb);
if($seopage['title'.$seolang]!='') $seo->setSeo('title',$seopage['title'.$seolang]);
else $seo->setSeo('title',$title_crumb);
$seo->setSeo('keywords',$seopage['keywords'.$seolang]);
$seo->setSeo('description',$seopage['description'.$seolang]);
$seo->setSeo('url',$func->getPageURL());
$img_json_bar = (isset($seopage['options']) && $seopage['options'] != '') ? json_decode($seopage['options'],true) : null;
if($img_json_bar['p'] != $seopage['photo'])
{
	$img_json_bar = $func->getImgSize($seopage['photo'],UPLOAD_SEOPAGE_L.$seopage['photo']);
	$seo->updateSeoDB(json_encode($img_json_bar),'seopage',$seopage['id']);
}
$seo->setSeo('photo',$config_base.THUMBS.'/'.$img_json_bar['w'].'x'.$img_json_bar['h'].'x2/'.UPLOAD_SEOPAGE_L.$seopage['photo']);
$seo->setSeo('photo:width',$img_json_bar['w']);
$seo->setSeo('photo:height',$img_json_bar['h']);
$seo->setSeo('photo:type',$img_json_bar['m']);

$datlich = $d->rawQueryOne("select noidung$lang from #_static where type = ? limit 0,1",array('datlich'));


$dichvukhannong = $d->rawQuery("select ten$lang, tenkhongdauvi, tenkhongdauen, mota$lang, ngaytao, id, photo from #_news where type = ? and hienthi > 0 order by stt,id desc",array('dich-vu-khan-nong'));
$chinhanh = $d->rawQuery("select ten$lang, tenkhongdauvi, tenkhongdauen, mota$lang, ngaytao, id, photo from #_news where type = ? and hienthi > 0 order by stt,id desc",array('chi-nhanh'));

/* breadCrumbs */
if(isset($title_crumb) && $title_crumb != '') $breadcr->setBreadCrumbs($com,$title_crumb);
$breadcrumbs = $breadcr->getBreadCrumbs();
?>