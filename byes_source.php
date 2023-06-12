<?php
session_start();
define('LIBRARIES','../../../../libraries/'); 

/* Config */
require_once LIBRARIES."config.php";
require_once LIBRARIES.'autoload.php';
new AutoLoad();

$db = new PDODb($config['database']);
$d=$db->pdo();

$folder = trim((string)$config['database']['url'],'/'); //Ten thu mục cần nén
$db_name = $config['database']['dbname'];

$act = (isset($_GET['act']) && $_GET['act'] != '') ? htmlspecialchars($_GET['act']) : '';

$act_upload='upload'; /*Down load soure up lên kythuatnina*/
$act_download='download'; /*Down load soure up lên hosting*/
$check=false;

if($act) {

$act_upload='upload'; /*Down load soure up lên kythuatnina*/
$act_download='download'; /*Down load soure up lên hosting*/
$check=false;
if($act==$act_upload) { 
  $check=true;
}
/* Danh sách các table không cần giữ lại dữ liệu */

$table_all = array('table_counter','table_excel','table_gallery','table_lang','table_member','table_news','table_newsletter','table_news_cat','table_news_item','table_news_list','table_news_sub','table_order_detail',' table_permission','table_permission_group','table_product', 'table_product_brand', 'table_product_cat', ' table_product_item', 'table_product_list', 'table_product_mau', 'table_product_size','table_product_sub','table_size_color_price','table_thuoctinh','table_user_magiamgia','table_pushonesignal','table_seo','table_tags','table_magiamgia');

/* 2.Backup database */
function backup_db(){

  global $d,$db_name,$table_all,$check;
  
  $allTables = array();
  $result = $d->query('SHOW TABLES');

  while($row = $result->fetch(PDO::FETCH_NUM)){
       $allTables[] = $row[0];
  }
  
  foreach($allTables as $table){
  $result = $d->query('SELECT * FROM '.$table);
  $num_fields = $result->columnCount();

  $return.= 'DROP TABLE IF EXISTS '.$table.';';

  $result2 = $d->query('SHOW CREATE TABLE '.$table);
  $row2 = $result2->fetch(PDO::FETCH_NUM);

  $return.= "\n\n".$row2[1].";\n\n";
  
  for ($i = 0; $i < $num_fields; $i++) {
  while($row = $result->fetch(PDO::FETCH_NUM)){

    if($check==true) {  
      if(in_array($table, $table_all)) continue;
    }

    $return.= 'INSERT INTO '.$table.' VALUES(';
       for($j=0; $j<$num_fields; $j++){
         $row[$j] = addslashes($row[$j]);
         $row[$j] = str_replace("\n","\\n",$row[$j]);
         if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; }
         else { $return.= '""'; }
         if ($j<($num_fields-1)) { $return.= ','; }
    }
    $return.= ");\n";
  } 
  }
  $return.="\n\n";
  } 

  $folder = LIBRARIES.'/database/'; // database thư mục cần đặt database trong source

  if (!is_dir($folder))
  mkdir($folder, 0777, true);
  chmod($folder, 0777);
   
  $filename = $folder.$db_name;
   
  $handle = fopen($filename.'.sql','w+');
  fwrite($handle,$return);
  fclose($handle);
}
backup_db();

/* Copy thư mục */
function copy_directory( $source, $destination ) {
  if ( is_dir( $source ) ) {
    @mkdir( $destination );
    $directory = dir( $source );
    while ( FALSE !== ( $readdirectory = $directory->read() ) ) {
      if ( $readdirectory == '.' || $readdirectory == '..' ) {
        continue;
      }
      $PathDir = $source . '/' . $readdirectory; 
      if ( is_dir( $PathDir ) ) {
        copy_directory( $PathDir, $destination . '/' . $readdirectory );
        continue;
      }
      copy( $PathDir, $destination . '/' . $readdirectory );
    }

    $directory->close();
  }else {
    copy( $source, $destination );
  }
}
if($check==true) {  
  copy_directory(__DIR__.'/upload',__DIR__."/upload_copy");
}
function removeAllFile($dir,$check=false){
  if (is_dir($dir))
  {
    $structure = glob(rtrim($dir, "/").'/*');
    if (is_array($structure)) {
      foreach($structure as $file) {
        if (is_dir($file)) removeAllFile($file,$check);
        else if (is_file($file)) {
          if($file!='.htaccess') {
            @unlink($file);
          }
        }
      }
    }
    if($check==true)
    {
      rmdir($dir);
    }
  }
} 
$folder_zip=$folder.'_'.time();
function addFolderToZip($dir, $zipArchive){
  global $folder_zip;
  if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
      $newfolder=$folder_zip.'/'.str_replace('./','',$dir);
      $zipArchive->addEmptyDir($newfolder);
      while (($file = readdir($dh)) !== false) {
        if(!is_file($dir . $file)){
          if( ($file !== ".") && ($file !== "..") && ($file!='upload_copy') ){
            addFolderToZip($dir . $file . "/", $zipArchive);
          }
        }else{
          if($file !== basename(__FILE__)) {
            $zipArchive->addFile($dir . $file,$newfolder.$file);
          }
        }
      }
    }
  }
}
if($check==true) {  
  removeAllFile('assets/css');
  removeAllFile('assets/js');
  removeAllFile('libraries');
  removeAllFile('templates');
}
removeAllFile('thumbs',true);
removeAllFile('watermark',true);
removeAllFile('caches');
if($check==true) {  
  unlink(__FILE__); 
}
/* 4.Nén source*/
$zip = new ZipArchive();
$name_source=$folder.'_'.time().'.zip';
if ($zip->open($name_source, ZipArchive::CREATE) === TRUE){
  $zip->open('../'.$name_source, ZipArchive::CREATE); 
  $zip->addEmptyDir($folder_zip);
  addFolderToZip('./',$zip);
  $zip->close();
}
// Rename file có . //
function ChangeName($dir) {
  $handle = opendir($dir);
   while (false !== ($fileName = readdir($handle))) {
      if(!is_file($dir . $fileName)){
        if( ($fileName !== ".") && ($fileName !== "..") ){
          $check=explode('.',$fileName);
          if($check[0]=='') {
            $newName = str_replace(".","",$fileName);
            rename($dir.$fileName, $dir.$newName);
            ChangeName($dir . $newName . "/");
          }
          else {
            ChangeName($dir . $fileName . "/");
          }
        }
      }
      else{
        $check=explode('.',$fileName);
        if($check[0]=='') {
          $newName = str_replace(".","",$fileName);
          rename($dir.$fileName, $dir.$newName);
        }
      }
  }
  closedir($handle);
}
if($check==true) {  
ChangeName(__DIR__.'/upload/');
removeAllFile('upload',true);
rename(__DIR__.'/upload_copy' , __DIR__.'/upload');
rename(__DIR__ , __DIR__.'_up');
}
$filename = "../".$name_source;

/* Tải file về */
if (file_exists($filename)) {
  header('Content-Type: application/zip');
  header('Content-Disposition: attachment; filename="'.basename($filename).'"');
  header('Content-Length: ' . filesize($filename));
  ob_end_clean();
  readfile($filename);
     // delete file
  unlink($filename);
}
}else{
  $name_file=basename(__FILE__);
  $html='<a href="'.$name_file.'?act='.$act_upload.'">Bye</a>';
  $html.='<a href="'.$name_file.'?act='.$act_download.'" style="margin-left:25px">Download</a>';
  echo $html;
}
// /* 5. end-------------------------------------------------------*/
