

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
    
    //Levels
    this.level_add1="Add 1";
    this.level_add2="Add 2";
    this.level_sub1="Sub 1";
    this.level_sub2="Sub 2";
    this.level_mul1="Mul 1";
    this.level_div1="Div 1";
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
