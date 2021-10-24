

class Lang
{
  constructor()
  {
    this.userLang=this.getBestLang();
    this.langSel=new tmGlobLangClasses["Lang_"+this.userLang];
    this.applyJqDom($("body"));
  }
  
  getBestLang()
  {
    if (false) //TODO: get+return lang cookie if exists
    {
    }
    else
    {
      let navLang=navigator.language || navigator.userLanguage;
      let navLangShort=navLang.substring(0,2);
      if (tmGlobLangClasses.hasOwnProperty("Lang_"+navLang)) return navLang;
      else if (tmGlobLangClasses.hasOwnProperty("Lang_"+navLangShort)) return navLangShort;
      else return "en"; //fallback to default english
    }
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
    
    //Level groups
    this.lgroup_sum="Additions";
    this.lgroup_sub="Subtractions";
    this.lgroup_mul="Multiplications";
    this.lgroup_div="Divisions";
    this.lgroup_relatives="Relative numbers";
    
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
    this.lgroup_mul="Multiplicaciónes";
    this.lgroup_div="Divisiónes";
  }
}


var tmGlobLangClasses={
  Lang_en: Lang_en,
  Lang_fr: Lang_fr,
  Lang_es: Lang_es
};
