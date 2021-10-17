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
    this.keyboardManager.fctCallBackKeyStroke.push(MusicPlayer.giveUserInputEvent.bind(MusicPlayer));
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
    MusicPlayer.play();
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
    
    let startOffset=0;
    if (this.waveNum>1) startOffset=2000;
    
    //Launching programming wave start events
    setTimeout(this.tuxConsole.setTuxImage.bind(this.tuxConsole, CONSOLE_TUX_PRESTART), 100); //overridden if called directly, override check not simple to implement...
    setTimeout(function(){
      tmGlob_objSfxPlayer.playSfx(SFX_LEVELSTART)
      this.tuxConsole.yellowBlink();
    }.bind(this), startOffset+2000);
    setTimeout(function(){
      this.tuxConsole.setTuxImage(CONSOLE_TUX_ANIMSTART);
    }.bind(this), startOffset+3000);    
    

    setTimeout(this.runningWave.startWave.bind(this.runningWave), startOffset+4000);
    
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
//const GAMEWAVE_ADDCOMET_DELAY=1000; //DEBUG HACK
const FALSE_LOCATION_SEARCH_TRIES=4;
const FALSE_LOCATION_SEARCH_MAXCOMETDISTANCEALLOWED=65;

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
    let cometsMatched=0;
    for (let i=this.arLaunchedCommets.length-1; i>=0; i--) //process array reverse order, to prevent index skip bugs
      if (this.arLaunchedCommets[i].answer==answer)
      {
        cometsMatched++;
        this.arLaunchedCommets[i].destroy();
        new Laser(this.objGame, this.arLaunchedCommets[i]);
        this.removeComet(this.arLaunchedCommets[i].getId()); //remove at end of iteration!
      }
      
    if (cometsMatched>1)
      tmGlob_objSfxPlayer.playSfx(SFX_COMETDESTROY_MULTIPLE);

    if (cometsMatched>0)
    {
      this.checkWaveFinished();
    }
    else
    {
      tmGlob_objSfxPlayer.playSfx(SFX_ANSWER_BAD);
      new Laser(this.objGame, this.searchFalseLocation());
      this.objGame.tuxConsole.redBlink();
    }
    
    return (cometsMatched>0); //return true if user writen validen answer, false otherwise.
  }
  
  searchFalseLocation()
  {
    let originJqObject=this.objGame.getObjJqContainer().find(".js-laser-origin");
    let br=originJqObject[0].getBoundingClientRect();
    let originCoords=[Math.round(br.x+br.width/2), Math.round(br.y+br.height/2)];
    let origLaserObj={x: originCoords[0], y: originCoords[1]};

    
    tryLoop: for (let triesLeft=FALSE_LOCATION_SEARCH_TRIES; triesLeft>0; triesLeft--)
    {
      //let targetCoords=[getRandomInt(0, this.objGame.getObjJqContainer().width()-1), getRandomInt(0,this.objGame.getObjJqContainer().height()*.8-1)]; //*.8 to prevent laser going down
      //target random plot of screen is not good, we shoud olny target borders
      
      let border=getRandomInt(0, 2);
      let targetCoords;
      if (border==0) targetCoords=[0, getRandomInt(0,this.objGame.getObjJqContainer().height()*.8-1)];
      if (border==1) targetCoords=[getRandomInt(0,this.objGame.getObjJqContainer().width()-1), 0];
      if (border==2) targetCoords=[this.objGame.getObjJqContainer().width(), getRandomInt(0,this.objGame.getObjJqContainer().height()*.8-1)];
      
      let targetLaserObj={x: targetCoords[0], y: targetCoords[1]};
      
      for (let i in this.arLaunchedCommets)
      {
        let commetCoords=this.arLaunchedCommets[i].getCenterCoords();
        let objCommetCoords={x: commetCoords[0], y: commetCoords[1]};
        
        if (distToSegment(objCommetCoords, origLaserObj, targetLaserObj)<FALSE_LOCATION_SEARCH_MAXCOMETDISTANCEALLOWED)
          continue tryLoop;
      }
      
      //continue not called, the point is correct
      return targetCoords;
    }
    
    //tries exhausted, firing vertical
    return [Math.round(this.objGame.getObjJqContainer().width()/2), 0];
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

