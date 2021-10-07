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
    if (this.arLaunchedCommets.length==0) 
      this.objGame.evtWaveFinished();
  }

}

