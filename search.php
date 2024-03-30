NN_FRAMEWORK.Search = function(){
    if($(".item-sr").exists())
    {
        var show = 0;
        $('a.search').click(function() {
            if (show == 1) {
                $('.form-row-search').css({'width': 0, 'opacity':0});
                $('a.search').removeClass('active');
                show = 0;
                var keyword = $('#keyword').val();
                if (keyword != '') {
                    window.location.href="tim-kiem?keyword="+keyword;
                    return false;
                }
            } else {
                if ($(window).width() <= 1100) {
                    $('.form-row-search').css({'width': 250, 'opacity':1});
                }else{
                    $('.form-row-search').css({'width': 250, 'opacity':1});
                }
                $('a.search').addClass('active');
                document.getElementById("frm_search").reset();
                show = 1;
            }
        });
    }
};

 <div class="item-sr">
            <a href="javascript:void(0);" class="search ">Search</a>
            <div class="form-row-search" >
                <form method="GET" name="frm_search" id="frm_search" onsubmit="return false;">
                    <input id="keyword" name="keyword" type="text" onkeypress="doEnter(event,'keyword');" value="<?=(isset($tukhoa) && $tukhoa != '') ? $tukhoa : ''?>" class="search-field" placeholder="Nhập từ khóa ">
                </form>
            </div>
            <div class="clearfix"></div>
        </div>

        /* Search */
.item-sr{
    position: absolute;
    width: 75px;
    height: 45px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.item-sr a.search {
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 100;
    background: url(../images/timkiem.png) no-repeat center center;
    font-size: 0;
    text-indent: -9999px;
    display: block;
    padding: 0;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    border-radius: 50%;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    border: 1px solid #fff;
}
.form-row-search {
    position: absolute;
    display: block;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    border-radius: 25px;
    overflow: hidden;
    border: 1px solid var(--bgmain);
    background-color: #fff;
    opacity: 0;
    width: 0px;
    height: 40px;
    top: 103%;
    right: 0;
    z-index: 99;
}
.form-row-search input[type="text"] {
    border: none;
    background: none;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: var(--bgmain);
    line-height: 35px;
    position: absolute;
    display: block;
    opacity: 0.7;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    border-radius: 25px;
    text-indent: 10px;
}
.form-row-search input[type="text"]::-webkit-input-placeholder{
    color: var(--bgmain);
}
.form-row-search input[type="text"]:focus ,.search-form:focus{
    outline: 0;
}
