const LEVEL_CARDS_NUM=40;

class Game
{
  constructor(objJqContainer)
  {
    this.objJqContainer=objJqContainer;
    this.init();
  }
  
  init()
  {
  }
  
  startGame(levelId)
  {
    this.waveNum=1;
    
    this.mathCardsCollection=new MathCardsCollection();
    this.mathCardsCollection.genCards(levelId, LEVEL_CARDS_NUM);

    this.startWave();
  }
  
  getWaveComet(waveNum)
  {
    return(4+waveNum);
  }
  
  
  startWave()
  {
    this.objJqContainer.find(".js-background").css("background-image", "url('"+tmGlob_objTheme.chooseBackground()+"')");
    
    let waveCards=this.mathCardsCollection.takeCards(this.getWaveComet(this.waveNum));
    
    if (waveCards.length==0)
    {
      this.gameFinished(true);
      return false;
    }
    
    this.runningWave=new GameWave(this, arMathCards);
    this.startWave();
  }
  
  gameFinished(boolSuccess)
  {
    if (boolSuccess)
      alert("Bravo tu as gagné!");
    else
      alert("Tu as perdu, ça ira mieux en t'entrainant...");
  }
}

const GAMEWAVE_ADDCOMET_DELAY=5000;

class GameWave
{
  constructor(objGame, arMathCards)
  {
    this.objGame=objGame;
    this.arMathCardsToLaunch=arMathCards;
    
  }
  
  startWave()
  {
    this.objIntervalLaunchComet=setTimeout(this.evtIntervLaunchComet, GAMEWAVE_ADDCOMET_DELAY);
  }
  
  launchComet()
  {
    let mathCard=this.arMathCardsToLaunch.shift();
    new Comet(this.objGame, mathCard);
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
}

