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



const LEVEL_CARDS_NUM=40;

class Game
{
  constructor(objJqContainer)
  {
    this.objJqContainer=objJqContainer;
    this.init();
    
    this.running=false;
  }
  
  getObjJqContainer() { return this.objJqContainer; }
  
  init()
  {
    this.tuxConsole=new TuxConsole(this);
    this.keyboardManager=new KeyboardManager();
    this.keyboardManager.fctCallBackKeyStroke.push(this.tuxConsole.updateText.bind(this.tuxConsole));
    this.keyboardManager.fctCallBackKeyStroke.push(this.tuxConsole.evtTyping.bind(this.tuxConsole));
    this.keyboardManager.fctCallBackEntryValidated.push(this.evtUserValidatedAnswer.bind(this));
  }
  
  evtUserValidatedAnswer(answer)
  {
    if ((this.runningWave) && (this.runningWave.evtUserValidatedAnswer))
      this.runningWave.evtUserValidatedAnswer(answer);
  }
  
  startGame(levelId)
  {
    this.running=true;
    this.waveNum=0;
    
    this.mathCardsCollection=new MathCardsCollection();
    this.mathCardsCollection.genCards(levelId, LEVEL_CARDS_NUM);

    this.startWave();
    
    this.initIgloos();
  }
  
  getWaveComets(waveNum)
  {
    return(4+waveNum);
  }
  
  
  startWave()
  {
    this.waveNum++;
    this.objJqContainer.find(".js-background").css("background-image", "url('"+tmGlob_objTheme.chooseBackground()+"')");
    
    let waveCards=this.mathCardsCollection.takeCards(this.getWaveComets(this.waveNum));
    
    if (waveCards.length==0)
    {
      this.gameFinished(true);
      return false;
    }
    
    this.runningWave=new GameWave(this, waveCards);
    this.runningWave.startWave();
    
    this.tuxConsole.setTuxImage(CONSOLE_TUX_ANIMSTART);
  }
  
  initIgloos()
  {
    this.arIgloos=[]
    for (let i=1; i<=GAME_COLUMNS_NUMBER; i++)
      this.arIgloos.push(new Igloo(this, i));
  }
  
  gameFinished(boolSuccess)
  {
    this.running=false;
    this.cleanUp();
    
    if (boolSuccess)
      alert("Bravo tu as gagné!");
    else
      alert("Tu as perdu, ça ira mieux en t'entrainant...");
  }
  
  evtNotAnswered(cometId, mathCard, colNumber) //comet reached bottom and exploded...
  {
    this.arIgloos[colNumber-1].evtGotHit();
    this.tuxConsole.setTuxImage(CONSOLE_TUX_IGLOODESTROYED);
    this.checkGameOver();
    
    
    this.runningWave.evtNotAnswered(cometId, mathCard, colNumber);
  }
  
  cleanUp()
  {
    this.runningWave.cleanUp();
  }
  
  checkGameOver()
  {
    let gameOver=true;
    
    for (let i in this.arIgloos)
      if (! this.arIgloos[i].isDestroyed())
        gameOver=false;
      
    if (gameOver)
      this.gameFinished(false);
        
  }
  
  evtWaveFinished()
  {
    if (this.running)
      this.startWave();
  }
}





const GAMEWAVE_ADDCOMET_DELAY=6000;

class GameWave
{
  constructor(objGame, arMathCards)
  {
    this.objGame=objGame;
    this.arMathCardsToLaunch=arMathCards;
    this.arLaunchedCommets=[];
  }
  
  startWave()
  {
    this.objIntervalLaunchComet=setInterval(this.evtIntervLaunchComet.bind(this), GAMEWAVE_ADDCOMET_DELAY);
  }
  
  launchComet()
  {
    let mathCard=this.arMathCardsToLaunch.shift();
    this.arLaunchedCommets.push(new Comet(this.objGame, mathCard));
  }
  
  evtIntervLaunchComet()
  {
    if (this.arMathCardsToLaunch.length==0)
    {
      clearInterval(this.objIntervalLaunchComet);
      return false;
    }
    
    this.launchComet();
  }
  
  evtNotAnswered(cometId, mathCard, colNumber) //comet reached bottom and exploded...
  {
    this.removeComet(cometId);
    this.checkWaveFinished();
  }
  
  evtUserValidatedAnswer(answer)
  {
    let cometsMatched=false;
    for (let i=this.arLaunchedCommets.length-1; i>=0; i--) //process array reverse order, to prevent index skip bugs
      if (this.arLaunchedCommets[i].answer==answer)
      {
        cometsMatched=true;
        this.arLaunchedCommets[i].destroy();
        new Laser(this.objGame, this.arLaunchedCommets[i]);
        this.removeComet(this.arLaunchedCommets[i].getId()); //remove at end of iteration!
      }
      
    if (cometsMatched)
    {
      this.checkWaveFinished();
    }
    
    //TODO: manage if nothing matched
      
  }
  
  removeComet(cometId)
  {
    console.log("before", this.arLaunchedCommets.length);
    for (let i in this.arLaunchedCommets)
      if (this.arLaunchedCommets[i].getId()==cometId)
        this.arLaunchedCommets.splice(i, 1);
    console.log("after", this.arLaunchedCommets.length);
  }
  
  cleanUp()
  {
    for (let i in this.arLaunchedCommets)
      this.arLaunchedCommets[i].cleanUp();
  }
  
  checkWaveFinished()
  {
    if ((this.arLaunchedCommets.length==0)  && (this.arMathCardsToLaunch.length==0))
      this.objGame.evtWaveFinished();
  }

}

