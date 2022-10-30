<?php
const STATIC_MANIFEST_FILE="manifest.webmanifest";
const JS_LANGUAGE_FILE="js/Lang.js";

function sanitisePrmVal($val)
{
  return preg_replace(array('/^[^"]*"/', '/"[^"]*/'), "", stripslashes($val));
}

function get_js_lang_data()
{
  $ar_ret=array();

  $h=fopen(JS_LANGUAGE_FILE, "r");
  $aLang=false;
  while($ligne=fgets($h))
  {
    $lt=trim($ligne);
    if(substr($lt, 0, 11)=="class Lang_")
    {
      $aLang=substr($lt, 11, 2);
      $ar_ret[$aLang]=array();
    }
    
    if((substr($lt, 0, 15)=="this.meta_desc=") && ($aLang))
      $ar_ret[$aLang]["meta_desc"]=sanitisePrmVal(substr($lt, 15));
  }
  
  return $ar_ret;
}

function get_selLang($langData)
{
  if (isset($_GET["lang"])) 
    $lang=$_GET["lang"];
  else
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    
  $langSelData = isset($langData[$lang]) ? $langData[$lang] : $langData['en'];
  
  return $langSelData;
}


$langData=get_js_lang_data();
$manifest=json_decode(file_get_contents(STATIC_MANIFEST_FILE), true);
$selLang=get_selLang($langData);
$manifest["description"]=$selLang["meta_desc"];


echo json_encode($manifest);




?>
