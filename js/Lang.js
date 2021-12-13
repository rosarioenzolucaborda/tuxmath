

class Lang
{
  constructor()
  {
    this.applyLang();
  }
  
  getBestLang(langSel=false)
  {
    let selLang;
    
    let optLang=tmGlob_Options.get(OPT_LANG);
    
    if (langSel!==false)
      selLang=langSel;
    else if (optLang!==false)
      selLang=optLang;
    else
      selLang=navigator.language || navigator.userLanguage;

    let selLangShort=selLang.substring(0,2);
    if (tmGlobLangClasses.hasOwnProperty("Lang_"+selLang)) return selLang;
    else if (tmGlobLangClasses.hasOwnProperty("Lang_"+selLangShort)) return selLangShort;
    else return "en"; //fallback to default english
  }
  
  
  applyLang(selLang=false)
  {
    let appliedLang=this.getBestLang(selLang);
    this.langSel=new tmGlobLangClasses["Lang_"+appliedLang];
    this.applyJqDom($("body"));
  }
  
  applyJqDom(objJq)
  {
    let that=this;
    objJq.find("[data-lang-item]").each(function(){
      let txt=that.getitem(this.getAttribute("data-lang-item"));
      this.innerHTML=txt;
    });
  }
  
  getitem(itemId)
  {
    return this.langSel[itemId];
  }
}



class Lang_en
{
  constructor()
  {
    //top screen counters
    this.counters_level="Level";
    
    //Mobile Keypad
    this.kp_enter="Enter";
    
    //Level groups and main menu options
    this.lgroup_sum="Additions";
    this.lgroup_sub="Subtractions";
    this.lgroup_mul="Multiplications";
    this.lgroup_div="Divisions";
    this.lgroup_relatives="Relative numbers";
    this.menuitem_options="Options";
    this.menuitem_back="Back";

    
    // Level group additions
    this.level_add_1_to_3="Sum from 1 to 3";
    this.level_add_0_to_5="Sum from 0 to 5";
    this.level_add_sum_to_10="Sum up to 10";
    this.level_add_sum_to_15="Sum up to 15";
    this.level_add_sum_to_20="Sum up to 20"; 
    this.level_add_2_digits="Any 2 digits numbers"; 
    this.level_add_miss_num="Add with missing numbers";
    this.level_add_3_terms_0_10="Sum 3 numbers, 0 to 10";
    this.level_add_3_terms_0_20="Sum 3 numbers, 0 to 20";
    this.level_add_up_to_5_terms="Sum up to 5 numbers";
    this.level_add_3_digits="Sum up to 1000";
    this.level_add_harder="Harder sums";
    
    // Level group subtractions
    this.level_sub_0_to_5="Subtract from 0 to 5";
    this.level_sub_0_to_10="Subtract from 0 to 10";
    this.level_sub_0_to_20_10="Subtract from 0 to 20 easy";
    this.level_sub_0_to_20_20="Subtract from 0 to 20";
    this.level_mix_add_sum_0_20="additions et subtraction 0 to 20";
    this.level_sub_miss_num="Subtract with missing numbers"
    this.level_sub_3_terms_0_10="Subtract 3 numbers";
    this.level_mix_add_sum_0_15_3_terms="additions et subtraction 3 numbers";
    this.level_mix_add_sum_0_15_up_to_5_terms="additions et subtraction up to 5 numbers",
    this.level_sub_2_digits="Subtract from 0 to 100";
    this.level_sub_3_digits="Subtract from 0 to 1000";
    this.level_sub_harder="Harder subtractions";
    
    // Level group multiplications
    this.level_mul_table_2="2 times table";
    this.level_mul_table_3="3 times table";
    this.level_mul_table_4="4 times table";
    this.level_mul_table_5="5 times table";
    this.level_mul_table_1_to_5="1 to 5 times tables";
    this.level_mul_table_6="6 times table";
    this.level_mul_table_7="7 times table";
    this.level_mul_table_0_to_7="0 to 7 times tables";
    this.level_mul_table_8="8 times table";
    this.level_mul_table_9="9 times table";
    this.level_mul_table_10="10 times table";
    this.level_mul_table_0_to_10="0 to 10 times tables";
    this.level_mul_table_2_3_miss_num="2 and 3 times tables (missing numbers)";
    this.level_mul_table_4_5_miss_num="4 and 5 times tables (missing numbers)";
    this.level_mul_table_6_7_miss_num="6 and 7 times tables (missing numbers)";
    this.level_mul_table_8_9_miss_num="8 and 9 times tables (missing numbers)";
    this.level_mul_table_0_to_10_miss_num="0 to 10 times tables (missing numbers)";
    this.level_mul_table_11_to_12="11 to 12 times tables";
    this.level_mul_table_13_to_15="13 to 15 times tables";
    
    // Level group divisions
    this.level_div_by_2="Division by 2";
    this.level_div_by_3="Division by 3";
    this.level_div_by_4="Division by 4";
    this.level_div_by_5="Division by 5";
    this.level_div_by_1_to_5="Division by 1 to 5";
    this.level_div_by_6="Division by 6";
    this.level_div_by_7="Division by 7";
    this.level_div_by_8="Division by 8";
    this.level_div_by_9="Division by 9";
    this.level_div_by_10="Division by 10";
    this.level_div_by_1_to_10="Division by 1 to 10";
    this.level_mix_div_mul="Multiplication and Division, from 1 to 10";
    this.level_div_by_1_to_10_missnum="Division by 1 to 10, missing numbers";
    this.level_div_by_11_to_12="Division by 11 to 12";
    this.level_div_by_13_to_15="Division by 13 to 15";
    
    // Level group relatives
    this.level_sub_0_to_20_negresults="Subtract with negatives results";
    this.level_add_0_to_10_relatives="Sum relative numbers -10 to 10";
    this.level_add_0_to_20_relatives="Sum relative numbers -20 to 20";
    this.level_sub_0_to_10_relatives="Subtract relative numbers -10 to 10";
    this.level_sub_0_to_20_relatives="Subtract relative numbers -20 to 20";
    this.level_mix_add_sub_relatives_3_terms="Add and subtract relative numbers -10 to 10, 3 terms";
    this.level_mix_add_sub_relatives_up_to_5_terms="Add and subtract relative numbers, up to 5 terms";
    this.level_mul_table_0_to_10_relatives="Multiply relatives numbers -10 to 10";
    this.level_div_by_1_to_10_relatives="Divide relatives numbers -10 to 10";
    this.level_mix_mul_div_relatives_up_to_4_terms="Multiply and divide up to 4 relatives numbers";
    
    
    //option items
    this.optionitem_lang="Language";
    this.optionitem_theme="Theme";
    this.optionitem_autolevel="Autolevel";
    this.options_back="Back to menu";
    
    //option choices
    this.optionchoice_yes="Yes";
    this.optionchoice_no="No";
    this.optionitem_autolevel_description="When autolevel in on the game automaticaly jumps to another level if it detects that the selected level is too easy or too hard for player.";
    this.optionchoice_theme_classic="Classic";
    this.optionchoice_theme_original="Original";
    this.optionchoice_theme_afrikalan="Afrikalan";

    
    //Messages
    this.message_al_toast_jumpbackward="Autolevel: jumped to an easier level";
    this.message_al_toast_jumpforward="Autolevel: jumped to a more advanced level";
  }
}




class Lang_fr extends Lang_en
{
  constructor()
  {
    super();
    
    //top screen counters
    this.counters_level="Niveau";
    
    //Mobile Keypad
    this.kp_enter="Valider";
    
    //Level groups
    this.lgroup_sum="Additions";
    this.lgroup_sub="Soustractions";
    this.lgroup_mul="Multiplications";
    this.lgroup_div="Divisions";
    this.lgroup_relatives="Nombres relatifs";
    this.menuitem_options="Options";
    this.menuitem_back="Retour";
    
    
    // Level group additions
    this.level_add_1_to_3="Additions de 1 à 3";
    this.level_add_0_to_5="Additions de 0 à 5";
    this.level_add_sum_to_10="Additions jusqu'à 10";
    this.level_add_sum_to_15="Additions jusqu'à 15";
    this.level_add_sum_to_20="Additions jusqu'à 20"; 
    this.level_add_2_digits="Additions nombres à 2 chiffres"; 
    this.level_add_miss_num="Additions à trous";
    this.level_add_3_terms_0_10="Addition 3 nombres de 0 à 10";
    this.level_add_3_terms_0_20="Addition 3 nombres de 0 à 20";
    this.level_add_up_to_5_terms="Addition jusque 5 nombres";
    this.level_add_3_digits="Additions jusqu'à 1000";
    this.level_add_harder="Additions plus difficiles";
    
    // Level group subtractions
    this.level_sub_0_to_5="Soustractions de 0 à 5";
    this.level_sub_0_to_10="Soustractions de 0 à 10";
    this.level_sub_0_to_20_10="Soustractions de 0 à 20 faciles";
    this.level_sub_0_to_20_20="Soustractions de 0 à 20";
    this.level_mix_add_sum_0_20="Additions et soustractions de 0 à 20";
    this.level_sub_miss_num="Soustractions à trous"
    this.level_sub_3_terms_0_10="Soustractions, 3 nombres";
    this.level_mix_add_sum_0_15_3_terms="additions et soustractions, 3 nombres";
    this.level_mix_add_sum_0_15_up_to_5_terms="additions et soustractions, jusqu'à 5 nombres",
    this.level_sub_2_digits="Soustractions de 0 à 100";
    this.level_sub_3_digits="Soustractions de 0 à 1000";
    this.level_sub_harder="Soustractions plus difficiles";
    
    // Level group multiplications
    this.level_mul_table_2="table de 2";
    this.level_mul_table_3="table de 3";
    this.level_mul_table_4="table de 4";
    this.level_mul_table_5="table de 5";
    this.level_mul_table_1_to_5="tables de 1 à 5";
    this.level_mul_table_6="table de 6";
    this.level_mul_table_7="table de 7";
    this.level_mul_table_0_to_7="tables de 0 à 7";
    this.level_mul_table_8="table de 8";
    this.level_mul_table_9="table de 9";
    this.level_mul_table_10="table de 10";
    this.level_mul_table_0_to_10="tables de 0 à 10";
    this.level_mul_table_2_3_miss_num="multiplications à trous, tables de 2 et 3";
    this.level_mul_table_4_5_miss_num="multiplications à trous, tables de 4 et 5";
    this.level_mul_table_6_7_miss_num="multiplications à trous, tables de 6 et 7";
    this.level_mul_table_8_9_miss_num="multiplications à trous, tables de 8 et 9";
    this.level_mul_table_0_to_10_miss_num="multiplications à trous, tables de 0 à 10";
    this.level_mul_table_11_to_12="table de 11";
    this.level_mul_table_13_to_15="table de 12";
    
    // Level group divisions
    this.level_div_by_2="Division par 2";
    this.level_div_by_3="Division par 3";
    this.level_div_by_4="Division par 4";
    this.level_div_by_5="Division par 5";
    this.level_div_by_1_to_5="Division, de 1 à 5";
    this.level_div_by_6="Division par 6";
    this.level_div_by_7="Division par 7";
    this.level_div_by_8="Division par 8";
    this.level_div_by_9="Division par 9";
    this.level_div_by_10="Division par 10";
    this.level_div_by_1_to_10="Division, de 1 à 10";
    this.level_mix_div_mul="Multiplication et Division, de 1 à 10";
    this.level_div_by_1_to_10_missnum="Division à trous, de 1 à 10";
    this.level_div_by_11_to_12="Division par 11 ou 12";
    this.level_div_by_13_to_15="Division par 13 ou 15";
    
    // Level group relatives
    this.level_sub_0_to_20_negresults="Soustractions avec resultats négatifs";
    this.level_add_0_to_10_relatives="Addition de -10 à 10";
    this.level_add_0_to_20_relatives="Addition de -20 à 20";
    this.level_sub_0_to_10_relatives="Soustractions de -10 à 10";
    this.level_sub_0_to_20_relatives="Soustractions de -20 à 20";
    this.level_mix_add_sub_relatives_3_terms="Additions et soustractions, de -10 à 10, 3 nombres";
    this.level_mix_add_sub_relatives_up_to_5_terms="Additions et soustractions, jusqu'à 5 nombres";
    this.level_mul_table_0_to_10_relatives="Multiplication des nombres de -10 à 10";
    this.level_div_by_1_to_10_relatives="Division des nombres de -10 à 10";
    this.level_mix_mul_div_relatives_up_to_4_terms="Multiplication et division, jusqu'à 4 nombres";
    
    //option items
    this.optionitem_lang="Langue";
    this.optionitem_theme="Thème";
    this.optionitem_autolevel="Niveau auto";
    this.options_back="Revenir au menu";

    
    
    //option choices
    this.optionchoice_yes="Oui";
    this.optionchoice_no="Non";
    this.optionitem_autolevel_description="Lorsque le niveau automatique est activé, le jeu passe automatiquement à un autre niveau s'il détecte que le niveau sélectionné est trop facile ou trop difficile pour le joueur.";
    this.optionchoice_theme_classic="Classique";
    this.optionchoice_theme_original="Original";
    this.optionchoice_theme_afrikalan="Afrikalan";
    

    //Messages
    this.message_al_toast_jumpbackward="Niveau auto: a sauté vers un niveau plus simple";
    this.message_al_toast_jumpforward="Niveau auto: a sauté vers un niveau plus avancé";
  }
}

class Lang_es extends Lang_en
{
  constructor()
  {
    super();
    
    //top screen counters
    this.counters_level="Nivel";
    
    //Mobile Keypad
    this.kp_enter="Validar";
    
    //Level groups
    this.lgroup_sum="Sumas";
    this.lgroup_sub="Restas";
    this.lgroup_mul="Multiplicaciones";
    this.lgroup_div="Divisiones";
    this.lgroup_relatives="Números relativos";
    this.menuitem_options="Opciones";
    this.menuitem_back="Volver";
    
    
    // Level group additions
    this.level_add_1_to_3="Sumas de 1 a 3";
    this.level_add_0_to_5="Sumas de 0 a 5";
    this.level_add_sum_to_10="Sumas hasta 10";
    this.level_add_sum_to_15="Sumas hasta 15";
    this.level_add_sum_to_20="Sumas hasta 20"; 
    this.level_add_2_digits="Sumas números de 2 dígitos"; 
    this.level_add_miss_num="Sumas con huecos";
    this.level_add_3_terms_0_10="Sumas, 3 números de 0 a 10";
    this.level_add_3_terms_0_20="Sumas, 3 números de 0 a 20";
    this.level_add_up_to_5_terms="Sumas hasta 5 números";
    this.level_add_3_digits="Sumas hasta 1000";
    this.level_add_harder="Adiciones más difíciles";
    
    // Level group subtractions
    this.level_sub_0_to_5="Restas de 0 a 5";
    this.level_sub_0_to_10="Restas de 0 a 10";
    this.level_sub_0_to_20_10="Restas de 0 a 20 fáciles";
    this.level_sub_0_to_20_20="Restas de 0 a 20";
    this.level_mix_add_sum_0_20="Sumas y restas de 0 a 20";
    this.level_sub_miss_num="Restas con huecos"
    this.level_sub_3_terms_0_10="Restas, 3 números";
    this.level_mix_add_sum_0_15_3_terms="Sumas y restas, 3 números";
    this.level_mix_add_sum_0_15_up_to_5_terms="Sumas y restas, hasta 5 números",
    this.level_sub_2_digits="Restas de 0 a 100";
    this.level_sub_3_digits="Restas de 0 a 1000";
    this.level_sub_harder="Restas más difíciles";
    
    // Level group multiplications
    this.level_mul_table_2="tabla de 2";
    this.level_mul_table_3="tabla de 3";
    this.level_mul_table_4="tabla de 4";
    this.level_mul_table_5="tabla de 5";
    this.level_mul_table_1_to_5="tablea de 1 a 5";
    this.level_mul_table_6="tabla de 6";
    this.level_mul_table_7="tabla de 7";
    this.level_mul_table_0_to_7="tablas de 0 a 7";
    this.level_mul_table_8="tabla de 8";
    this.level_mul_table_9="tabla de 9";
    this.level_mul_table_10="tabla de 10";
    this.level_mul_table_0_to_10="tablas de 0 a 10";
    this.level_mul_table_2_3_miss_num="Multiplicaciones con huecos, tablas de 2 y 3";
    this.level_mul_table_4_5_miss_num="Multiplicaciones con huecos, tablas de 4 y 5";
    this.level_mul_table_6_7_miss_num="Multiplicaciones con huecos, tablas de 6 y 7";
    this.level_mul_table_8_9_miss_num="Multiplicaciones con huecos, tablas de 8 y 9";
    this.level_mul_table_0_to_10_miss_num="Multiplicaciones con huecos, tablas de 0 a 10";
    this.level_mul_table_11_to_12="tabla de 11";
    this.level_mul_table_13_to_15="tabla de 12";
    
    // Level group divisions
    this.level_div_by_2="División por 2";
    this.level_div_by_3="División por 3";
    this.level_div_by_4="División por 4";
    this.level_div_by_5="División por 5";
    this.level_div_by_1_to_5="División, de 1 a 5";
    this.level_div_by_6="División por 6";
    this.level_div_by_7="División por 7";
    this.level_div_by_8="División por 8";
    this.level_div_by_9="División por 9";
    this.level_div_by_10="División por 10";
    this.level_div_by_1_to_10="División, de 1 à 10";
    this.level_mix_div_mul="Multiplicationes et división, de 1 a 10";
    this.level_div_by_1_to_10_missnum="Divisiones con huecos, de 1 a 10";
    this.level_div_by_11_to_12="Divisiones por 11 o 12";
    this.level_div_by_13_to_15="Divisiones por 13, 14, 15";
    
    // Level group relatives
    this.level_sub_0_to_20_negresults="Restas con resultados negativos";
    this.level_add_0_to_10_relatives="Sumas de -10 a 10";
    this.level_add_0_to_20_relatives="Sumas de -20 a 20";
    this.level_sub_0_to_10_relatives="Restas de -10 a 10";
    this.level_sub_0_to_20_relatives="Restas de -20 a 20";
    this.level_mix_add_sub_relatives_3_terms="Sumas y restas, de -10 à 10, 3 números";
    this.level_mix_add_sub_relatives_up_to_5_terms="Sumas y restas, hasta 5 números";
    this.level_mul_table_0_to_10_relatives="Multiplicaciones, de -10 a 10";
    this.level_div_by_1_to_10_relatives="Divisiones, números de -10 a 10";
    this.level_mix_mul_div_relatives_up_to_4_terms="Multiplicaciones y Divisiones, hasta 4 números";
    
    
    //option items
    this.optionitem_lang="Idioma";
    this.optionitem_theme="Tema";
    this.optionitem_autolevel="Nivel auto";
    this.options_back="Volver al menú";


    
    //option choices
    this.optionchoice_yes="Sí";
    this.optionchoice_no="No";
    this.optionitem_autolevel_description="Cuando el nivel automático está activado, el juego salta automáticamente a otro nivel si detecta que el nivel seleccionado es demasiado fácil o demasiado difícil para el jugador.";
    this.optionchoice_theme_classic="Clásico";
    this.optionchoice_theme_original="Original";
    this.optionchoice_theme_afrikalan="Afrikalan";


    //Messages
    this.message_al_toast_jumpbackward="Nivel automático: saltó a un nivel más simple";
    this.message_al_toast_jumpforward="Nivel automático: saltó a un nivel más avanzado";
  }
}


var tmGlobLangClasses={
  Lang_en: Lang_en,
  Lang_fr: Lang_fr,
  Lang_es: Lang_es
};
