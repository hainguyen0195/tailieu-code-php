<?php
    //require_once 'sdk_zalo/vendor/autoload.php';
    
    require_once 'zaloplatform/vendor/autoload.php';

    use Zalo\Zalo;

    $config = array(
        'app_id' => '2977952951931845771',
        'app_secret' => 'M5M76tl1O1XJNtVVCjCN'
    );
    $zalo = new Zalo($config);

    $helper = $zalo -> getRedirectLoginHelper();

    function base64url_encode($text) {
        $base64 = base64_encode($text);
        $base64 = trim($base64, "=");
        $base64url = strtr($base64, "+/", "-_");
        return $base64url;
    }
    function generate_state_param() {
        // a random 8 digit hex, for instance
        return bin2hex(openssl_random_pseudo_bytes(4));
    }
    function generate_pkce_codes() {
        $random = bin2hex(openssl_random_pseudo_bytes(32)); // a random 64-digit hex
        $code_verifier = base64url_encode(pack('H*', $random));
        $_SESSION['code_verifier']=$code_verifier;
        $code_challenge = base64url_encode(pack('H*', hash('sha256', $code_verifier)));
        return array(
            "verifier" => $code_verifier,
            "challenge" => $code_challenge
        );
    }
    $codes = generate_pkce_codes();
    $callbackUrl = "https://earthlyglow.vn/api/ajax_zalo.php";
    $codeChallenge = $codes["challenge"];
    $state = generate_state_param();
    $loginUrl = $helper->getLoginUrl($callbackUrl, $codeChallenge, $state); // This is login url


?>
<div class="wrap-user">
    <div class="title-user">
        <span><?=dangnhap?></span>
    </div>
    <div class="row-dn">
        <div class="dn-form">
            <form class="form-user validation-user" novalidate method="post" action="account/log-in" enctype="multipart/form-data">
                <div class="input-group input-user">
                    <label for="email">Email *</label>
                    <input type="text" id="email" name="email" placeholder="Email" value="<?=(isset($_COOKIE['login_member_email']) && $_COOKIE['login_member_email'] != '') ? $_COOKIE['login_member_email'] : ''?>" required>
                    <div class="invalid-feedback"><?=vuilongnhapemail?></div>
                </div>
                <div class="input-group input-user">
                    <label for="email"><?=matkhau?> *</label>
                    <input type="password" id="password" name="password" placeholder="<?=matkhau?>" required value="<?=(isset($_COOKIE['login_member_password']) && $_COOKIE['login_member_password'] != '') ? $_COOKIE['login_member_password'] : ''?>" >
                    <div class="invalid-feedback"><?=vuilongnhapmatkhau?></div>
                </div>
                <div class="flex_row row_gioitinh_ngaysinh">
                    <div class="col_gtns">
                        <div class="button-user button-userleft">
                            <input type="submit" class="btn btn-primary" name="dangnhap" value="<?=dangnhap?>" disabled>
                        </div>
                    </div>
                    <div class="col_gtns flex_row">
                        <div class="checkbox-user custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" name="remember-user" id="remember-user" value="1"checked>
                            <label class="custom-control-label" for="remember-user"><?=nhomatkhau?></label>
                        </div>
                        <a href="account/forgot-password" title="<?=quenmatkhau?>"><?=quenmatkhau?> ?</a>
                    </div>
                </div>
                <div class="note-user">
                    <span><?=banchuacotaikhoan?> ! </span>
                    <a href="account/registration" title="<?=dangkytaiday?>"><?=dangkytaiday?></a>
                </div>
            </form>
        </div>
        <div class="dn-or">
           <span>Đăng nhập nhanh bằng</span>
        </div>
        <div class="dn-social">
            <div class="">
                <a class="btn-login-with-face" onclick="Login_fb(); return false;"><i class="fab fa-facebook-f mr-1"></i>Facebook</a>        
            </div>    
            <div class="">
                <a class="btn-login-with-gg" id="login_gg"><i class="fab fa-google mr-1"></i>Google</a>    
            </div>        
            <div class="">
                <a class="btn-login-with-zalo" href="<?=$loginUrl?>"><i>Z</i>Zalo</a>    
            </div>        
        </div>
    </div>
</div>