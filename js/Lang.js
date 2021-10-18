

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
  }
}


var tmGlobLangClasses={
  Lang_en: Lang_en,
  Lang_fr: Lang_fr,
  Lang_es: Lang_es
};
