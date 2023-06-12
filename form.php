 <?php $dichvulist = $d->rawQuery("select ten$lang, tenkhongdauvi, tenkhongdauen, id,gia from #_news where type = ? and hienthi > 0 order by stt,id desc",array('dich-vu')); ?>
 <div id="popup_datlich">
    <form class="form-datlich validation-datlich-index" novalidate method="post" action="dat-lich" enctype="multipart/form-data">
        <div class="input_datlich">
            <input required="" class="box" type="text" name="hoten-datlich" placeholder="Họ tên" value="<?= (isset($_SESSION[$login_member]['username']) && $_SESSION[$login_member]['username'] != '') ? htmlspecialchars_decode($_SESSION[$login_member]['username']) : '' ?>">
            <div class="invalid-feedback"><?= vuilongnhaphoten ?></div>
        </div>  
        <div class="input_datlich">
            <input required="" class="box" type="text" name="dienthoai-datlich" placeholder="SĐT" value="<?= (isset($_SESSION[$login_member]['dienthoai']) && $_SESSION[$login_member]['dienthoai'] != '') ? htmlspecialchars_decode($_SESSION[$login_member]['dienthoai']) : '' ?>">
            <div class="invalid-feedback"><?= vuilongnhapsodienthoai ?></div>
        </div> 
        <div class="input_datlich">
            <div class="btn-themdichvu">
                Chọn dịch vụ Barber
            </div>
            <div class="box-choose-combo">
                <?php if(isset($_SESSION[$login_member]['id'])){ ?>
                    <div class="box-choose-combo-top">
                        <?php foreach($dichvulist as $k=>$v){ ?>
                            <div class="li-combo flex_row">
                                <p class="choose-combo " data-id="<?= $v['id']?>" data-name="<?= $v['ten'.$lang]?>">
                                    <i class="far fa-square"></i>
                                    <?= $v['ten' . $lang] ?>
                                </p>
                                <span class="li-combo-price"><?=number_format($v['gia']) ?> $</span>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="box-choose-combo-bottom">
                       Tổng tiền: <span>0 $</span>
                   </div>
               <?php }else{echo 'Vui  lòng đăng  nhập tài  khoản';} ?>
           </div>
       </div>
       <div class="box-dichvu-choose">
           
       </div>
       <div class="tongtiendichvu">
        Tổng tiền: <span>0 $</span>
    </div>
    <div class="datlich-button">
        <input type="submit" id="submit-datlich" name="submit-datlich" disabled value="Xác nhận">
        <input type="hidden" name="recaptcha_response_datlich" id="recaptchaResponsedatlich">
        <input type="hidden" name="type-datlich" value="datlich">
    </div>
</form>
</div>