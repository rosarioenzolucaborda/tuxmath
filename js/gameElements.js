const GAME_COLUMNS_NUMBER=4;

class Comet
{
  constructor(objGame, mathCard)
  {
    this.objGame=objGame;
    this.mathCard=mathCard;
    this.colNumber=getRandomInt(1, GAME_COLUMNS_NUMBER);
  }
  
  draw()
  {
    this.objJq=$("<div class=obj_commet><img src='"+tmGlob_objTheme.image_comet+"'></div>");
  }
  
  
}
