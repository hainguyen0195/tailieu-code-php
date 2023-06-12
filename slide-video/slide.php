<?php
if ($source == 'index') {
    $slider = $d->rawQuery("select ten$lang, photo, link,link_video,taptin from #_photo where type = ? and hienthi > 0 order by stt,id desc", array('slide'));
    ?>
    <section class="amazingslider-wrapper" id="amazingslider-wrapper-1">
        <div class="amazingslider" id="amazingslider-1">
            <ul class="amazingslider-slides">
                <?php foreach ($slider as $k => $v) { ?>
                    <?php if ($v['taptin'] != '') { ?>
                        <li>
                            <video preload="none" src="<?= UPLOAD_FILE_L . @$v['taptin'] ?>"></video>
                        </li>
                    <?php } else { ?>
                        <?php if ($v['link_video'] != '') { ?>
                            <li>
                                <video preload="none"
                                src="https://www.youtube.com/embed/<?= $func->getYoutube($v['link_video']) ?>?v=<?= $func->getYoutube($v['link_video']) ?>"></video>
                            </li>
                        <?php } else { ?>
                            <li>
                                <a target="_blank" href="<?= $v['link'] ?>" title="<?= $v['ten' . $lang] ?>">
                                    <img onerror="this.src='<?= THUMBS ?>/1366x700x1/assets/images/noimage.png';"
                                    src="<?= UPLOAD_PHOTO_L . $v['photo'] ?>" alt="" />
                                </a>
                            </li>
                        <?php } ?>
                    <?php } ?>
                <?php } ?>
            </ul>
        </div>
    </section>
<?php } else {
    $slider = $d->rawQuery("select ten$lang, photo, link,link_video,taptin from #_photo where type = ? and hienthi > 0 order by stt,id desc", array('slide-' . $type));
    ?>
    <section>
        <div class="slider">
            <div class="slidephu-slick">
                <?php foreach ($slider as $k => $v) { ?>
                    <div class="">
                        <a target="_blank" href="<?= $v['link'] ?>" title="<?= $v['ten' . $lang] ?>">
                            <img onerror="this.src='<?= THUMBS ?>/1366x350x2/assets/images/noimage.png';"
                            src="<?= THUMBS ?>/1366x350x1/<?= UPLOAD_PHOTO_L . $v['photo'] ?>" alt="<?= $v['ten' . $lang] ?>"
                            title="<?= $v['ten' . $lang] ?>" />
                        </a>
                    </div>
                <?php } ?>
            </div>
			<?php if(count($slider)<2){ ?>
			<div class="slick-prevs"></div>
			<div class="slick-nexts"></div>
			<?php } ?>
            <?php if ($source != 'index') include TEMPLATE . LAYOUT . "breadcrumb.php"; ?>
        </div>
    </section>
    <?php } ?>