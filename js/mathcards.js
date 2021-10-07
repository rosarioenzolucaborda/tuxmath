const MATHCARD_QUESTION_LOC_END=-1;

class MathCard
{
  constructor()
  {
    //this.questionText="";
    this.answer=false;
    
    this.operands=[];
    this.operators=[];
    this.questionLocation=MATHCARD_QUESTION_LOC_END;
  }
  
  getNumOperators()
  {
    return this.operators.length;
  }
  
  calcResult()
  {
    let calcString=this.operands[0].toString();
    
    for (let i = 0; i < this.operators.length; i++) 
    {
      calcString+=this.operators[i];
      calcString+=this.operands[i+1].toString();
    }
    
    return eval(calcString);
  }

  
  questionText()
  {
    let genString=this.operands[0].toString();
    let txtOperator;

    for (let i = 0; i < this.operators.length; i++) 
    {
      txtOperator=this.operators[i];
      if (txtOperator=="*") txtOperator="x";
      if (txtOperator=="/") txtOperator="÷";
      genString+=txtOperator;
      
      if (this.questionLocation!=i)
        genString+=this.operands[i+1].toString();
      else 
        genString+="?";
    }

    genString+="=";
    if (this.questionLocation==MATHCARD_QUESTION_LOC_END)
      genString+="?";
    else
      genString=this.calcResult().toString();
    
    return genString;
  }
  
  getAnswer()
  {
    if (this.questionLocation==MATHCARD_QUESTION_LOC_END)
      return this.calcResult();
    else
      return this.operands[this.questionLocation+1];
  }

}


class MathsCardsGenerator
{
  constructor()
  {
    this.genSettings=false;
  }
  
  loadGenSettings(settings)
  {
    this.genSettings=$.extend({}, this.defaultGenSettings(), settings);
  }
  
  defaultGenSettings()
  {
    return {
      "oper": ["add", "sub"],
      "oper_mix_allowed": false,
      
      "first_operand_min": 0,
      "first_operand_max": 10,
      "add_addend_min": 1,
      "add_addend_max": 10,
      "sub_subtrahend_min": 0,
      "sub_subtrahend_max": 10,
      "sub_negative_result_allowed": false,
      "min_operators" : 1,
      "max_operators" : 1
    };
  }
  

  checkGenParams()
  {
    if ((this.genSettings.oper.indexOf("div")!=1) && (this.genSettings.max_operators>1) && (this.genSettings.oper.length==1))
    {
      this.genSettings.max_operators=1;
      throw "many chained division are note possible, max_operators was set to 1";
    }
    
    if ((! this.genSettings.sub_negative_result_allowed) && (this.genSettings.oper.indexOf("sub")!=1) && ( (this.genSettings.oper.indexOf("mul")!=-1) || (this.genSettings.oper.indexOf("div")!=-1) ) )
    {
      throw "sub_negative_result_allowed can't be correcctly enforced when sub mixed with higher priority ops like mul or div.";
    }
  }
  
  genCard()
  {
    let actOperator;
    
    let targetedNumOperators=getRandomInt(this.genSettings.min_operators, this.genSettings.max_operators);
    
    let mathcard=new MathCard();
    
    this.checkGenParams();
    
    while (mathcard.getNumOperators()<targetedNumOperators)
    {
      if (mathcard.getNumOperators()==0)
      {
        mathcard.operands.push(getRandomInt(this.genSettings.first_operand_min, this.genSettings.first_operand_max));
        actOperator=getRandomArrayElt(this.genSettings.oper);
      }
      else
      {
        if (this.genSettings.oper_mix_allowed) //next rounds, oper type will change only if oper_mix_allowed is true.
          actOperator=getRandomArrayElt(this.genSettings.oper);
      }
      
      switch(actOperator)
      {
        case "add":
          mathcard.operands.push(getRandomInt(this.genSettings.add_addend_min, this.genSettings.add_addend_max));
          mathcard.operators.push("+");
        break;
        case "sub":
          let max_subtrahend=Math.min(this.genSettings.sub_subtrahend_max, mathcard.calcResult());
          mathcard.operands.push(getRandomInt(this.genSettings.sub_subtrahend_min, max_subtrahend));
          mathcard.operators.push("-");
        break;
        default:
          throw "unknown operator type: "+actOperator;
      }
    }
    
    return mathcard;
  }
}

class MathCardsCollection
{
  constructor()
  {
    this.arCards=[];
  }
  
  genCards(lvlId, num)
  {
    let cardGenerator=new MathsCardsGenerator();
    cardGenerator.loadGenSettings(tmGlob_levelsSettings[lvlId]);
    
    for (let i=0; i<num; i++)
      this.arCards.push(cardGenerator.genCard());
  }
  
  takeCards(num)
  {
    return this.arCards.splice(0, num);
  }
}
