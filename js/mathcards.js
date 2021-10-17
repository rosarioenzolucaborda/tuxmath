// TuxMath JS
//
// Author: Julien Marin - projet Afrikalan  
// Contact: julien.marin@afrikalan.org
// Licence: AGPL-3.0-or-later, see COPYING file

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

  
  questionText(withResponse=false)
  {
    let genString=this.operands[0].toString();
    let txtOperator;

    for (let i = 0; i < this.operators.length; i++) 
    {
      txtOperator=this.operators[i];
      if (txtOperator=="*") txtOperator="x";
      if (txtOperator=="/") txtOperator="÷";
      genString+=txtOperator;
      
      if ((this.questionLocation!=i) || (withResponse))
        genString+=this.operands[i+1].toString();
      else 
        genString+="?";
    }

    genString+="=";
    if ((this.questionLocation==MATHCARD_QUESTION_LOC_END) && (!withResponse))
      genString+="?";
    else
      genString+=this.calcResult().toString();
    
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
      "mul_multiplacand_min": 1,
      "mul_multiplacand_max": 10,
      "mul_multiplacand_zeroallowed": true,
      "div_dividand_min": 0,
      "div_dividand_max": 100,
      "div_divisor_min": 1,
      "div_divisor_max": 10,
      "div_result_min": -10,
      "div_result_max": 10,
      "min_operators" : 1,
      "max_operators" : 1
    };
  }
  

  checkGenParams()
  {
    if ((this.genSettings.oper.indexOf("div")!=-1) && (this.genSettings.max_operators>1) && (this.genSettings.oper.length==1))
    {
      throw "many chained division are note possible for now on...";
    }
    
    if ((! this.genSettings.sub_negative_result_allowed) && (this.genSettings.oper.indexOf("sub")!=-1) && ( (this.genSettings.oper.indexOf("mul")!=-1) || (this.genSettings.oper.indexOf("div")!=-1) ) )
    {
      throw "sub_negative_result_allowed can't be correcctly enforced when sub mixed with higher priority ops like mul or div.";
    }
    
    if ((this.genSettings.oper.indexOf("div")!=-1) &&  (this.genSettings.max_operators>1) && (! this.genSettings.oper_mix_allowed))
    {
      throw "many chained division are note possible for now on... but you asked more than one operator without allowing mixing of operation types";
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
        case "mul":
          let multiplicand=getRandomInt(this.genSettings.mul_multiplacand_min, this.genSettings.mul_multiplacand_max);
          if ((multiplicand==0) && (!this.genSettings.mul_multiplacand_zeroallowed))
            multiplicand=getRandomInt(1, this.genSettings.mul_multiplacand_max);
          mathcard.operands.push(multiplicand);
          mathcard.operators.push("*");
        break;
        case "div":
          if (mathcard.operators.length>0) continue; //can't handle cases where division is not in first place
          let divisor=getRandomInt(this.genSettings.div_divisor_min, this.genSettings.div_divisor_max);
          let minResult=Math.ceil(this.genSettings.div_dividand_min/divisor);
          let maxResult=Math.floor(this.genSettings.div_dividand_max/divisor);
          minResult=Math.max(minResult, this.genSettings.div_result_min);
          maxResult=Math.min(maxResult, this.genSettings.div_result_max);
          let result=getRandomInt(minResult, maxResult);
          mathcard.operands[0]=result*divisor;
          mathcard.operands[1]=divisor;
          mathcard.operators[0]='/';
          //only 
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
