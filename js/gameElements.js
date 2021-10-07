const GAME_COLUMNS_NUMBER=4;
const COMTE_FALL_TIME=50;

let tmGlob_cometIdCounter=0;
class Comet
{
  constructor(objGame, mathCard)
  {
    this.objGame=objGame;
    this.mathCard=mathCard;
    this.answer=this.mathCard.getAnswer();
    this.colNumber=getRandomInt(1, GAME_COLUMNS_NUMBER);
    this.id=tmGlob_cometIdCounter;
    tmGlob_cometIdCounter++;
    console.log(this.id);
    
    this.draw();
  }
  
  getId() { return this.id; }
  
  draw()
  {
    this.objJq=$("<div class=\"obj_commet anim-cometfall\"></div>");
    this.objJqImage=$("<img src='"+tmGlob_objTheme.image_comet+"'>").appendTo(this.objJq);
    this.objJqQuestion=$("<div class=\"obj_commet__question\"></div>").text(this.mathCard.questionText()).appendTo(this.objJq).hide().fadeIn(3000);
    
    this.objJq.on("animationend", this.evtAnimationFallEnd.bind(this));
    this.objJq.css("animation-duration", COMTE_FALL_TIME+"s");
    
    let ojbJqTargetCol=this.objGame.getObjJqContainer().find(".layout-game__commetsIgloosColmuns__col.layout-col--"+this.colNumber);
    ojbJqTargetCol.append(this.objJq);
  }
  
  
  removeCometDraw()
  {
    this.objJq.remove();
  }
  
  evtExplodeFinished()
  { 
    this.objJqImage.remove();
    this.objJq.fadeOut(30000, this.removeCometDraw.bind(this));
  }
  
  evtAnimationFallEnd()
  {
    //CSS Animation ended, it's means comet reached screen bottom
    this.objJqImage[0].src=tmGlob_objTheme.image_steam; //known BUG: all images having the same URL will have there anuimations restarted
    setTimeout(this.evtExplodeFinished.bind(this), 700);
    this.objJq.addClass("obj_commet--exploded");
    this.objJqQuestion.text(this.answer);
    
    this.objGame.evtNotAnswered(this.id, this.mathCard, this.colNumber);
  }
  
  cleanUp()
  {
    this.removeCometDraw();
  }
}


const IGLOO_HEALTH_OK=2;
const IGLOO_HEALTH_HALF=1;
const IGLOO_HEALTH_DESTROYED=0;

class Igloo
{
  constructor(objGame, columnId)
  {
    this.objGame=objGame;
    this.columnId=columnId;
    this.health=IGLOO_HEALTH_OK;
    
    this.draw();
  }
  
  draw()
  {
    this.objJq=$("<div class=\"obj_igloo\"></div>");
    this.objJqImage=$("<img>").appendTo(this.objJq);
    this.updateImage();
    
    let ojbJqTargetCol=this.objGame.getObjJqContainer().find(".layout-game__commetsIgloosColmuns__col.layout-col--"+this.columnId);
    ojbJqTargetCol.append(this.objJq);
  }
  
  updateImage()
  {
    this.objJqImage[0].src=tmGlob_objTheme.image_iglooHealthStatus[this.health];
  }
  
  removeIglooDraw()
  {
    this.objJq.remove();
  }
  
  evtGotHit()
  {
    if (this.health==IGLOO_HEALTH_DESTROYED)
      return;
    
    this.health--;
    this.updateImage();
    
    if (this.isDestroyed())
      setTimeout(this.removeIglooDraw.bind(this), 3000); //prevent bug of redisplaying melting water animation when another igloo is destroyed.
  }
  
  isDestroyed()
  {
    return this.health==IGLOO_HEALTH_DESTROYED;
  }
}
