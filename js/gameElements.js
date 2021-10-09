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
    this.alive=true;
    this.ojbJqTargetCol=this.objGame.getObjJqContainer().find(".layout-game__commetsIgloosColmuns__col.layout-col--"+this.colNumber);
    
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
    
    this.ojbJqTargetCol.append(this.objJq);
  }
  
  
  removeCometDraw()
  {
    this.objJq.remove();
  }
  
  hideImage()
  {
    this.objJqImage.hide();
  }
  
  destroy()
  {
    this.objJqImage[0].src=tmGlob_objTheme.image_comet_explode;
    this.alive=false;
    this.objJq.addClass("obj_commet--destroyed");
    this.objJqQuestion.text(this.mathCard.questionText(true)).fadeOut(3000);
    setTimeout(this.hideImage.bind(this), 1500);
    setTimeout(this.removeCometDraw.bind(this), 3100);
  }
  
  evtExplodeFinished()
  { 
    this.objJqImage.remove();
    this.objJq.fadeOut(10000, this.removeCometDraw.bind(this));
  }
  
  evtAnimationFallEnd()
  {
    if (! this.alive) return;
    
    //CSS Animation ended, it's means comet reached screen bottom
    this.objJqImage[0].src=tmGlob_objTheme.image_steam; //known BUG: all images having the same URL will have there anuimations restarted
    setTimeout(this.evtExplodeFinished.bind(this), 700);
    this.objJq.addClass("obj_commet--exploded");
    this.objJqQuestion.text(this.mathCard.questionText(true));
    
    this.objGame.evtNotAnswered(this.id, this.mathCard, this.colNumber);
  }
  
  cleanUp()
  {
    this.removeCometDraw();
  }
  
  getCenterCoords()
  {
//     this.objJq.css("border-color", "yellow");
//     this.objJq.css("border-style", "solid");
//     this.objJq.css("border-width", "1px");
    
    
    let  br=this.objJq[0].getBoundingClientRect();
    let yOffset=50; //target the core of the comet as the center of drawing is on tail...
    console.log("br compute", [Math.round(br.x+br.width/2), Math.round(br.y+br.height/2)]);
    return [Math.round(br.x+br.width/2), Math.round(br.y+br.height/2+yOffset)];
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





const CONSOLE_TUX_NORMAL=0;
const CONSOLE_TUX_ANIMSTART=1;
const CONSOLE_TUX_TYPING=2;
const CONSOLE_TUX_MISTAKE=3;
const CONSOLE_TUX_IGLOODESTROYED=4;

class TuxConsole
{
  constructor(objGame)
  {
    this.objGame=objGame;
    
    this.draw();
  }
  
  draw()
  {
    this.objJq=$("<div class=\"obj_console js-laser-origin\"></div>");
    this.objJq.css({backgroundImage: "url('"+tmGlob_objTheme.image_console+"')", width: tmGlob_objTheme.image_console_dims[0]+"px", height: tmGlob_objTheme.image_console_dims[1]+"px"});

    this.objJqImgTux=$("<img class=\"obj_console__tux\">").appendTo(this.objJq);
    this.setTuxImage(CONSOLE_TUX_NORMAL);

    this.objJqDisplay=$("<div class=\"obj_console__display\"></div>").appendTo(this.objJq);
    this.updateText("0");

    let ojbJqTargetCol=this.objGame.getObjJqContainer().find(".layout-game__tuxComand");
    ojbJqTargetCol.append(this.objJq);
  }
  
  setTuxImage(imageId)
  {
    switch(imageId)
    {
      case CONSOLE_TUX_NORMAL:    this.objJqImgTux[0].src=tmGlob_objTheme.image_consoletux_normal; break;
      case CONSOLE_TUX_ANIMSTART: this.objJqImgTux[0].src=tmGlob_objTheme.image_consoletux_animstart; break;
      case CONSOLE_TUX_MISTAKE:   this.objJqImgTux[0].src=tmGlob_objTheme.image_consoletux_mistake; break;
      case CONSOLE_TUX_IGLOODESTROYED:  this.objJqImgTux[0].src=tmGlob_objTheme.image_consoletux_animigloodestroyed; break;
      case CONSOLE_TUX_TYPING:    
        this.objJqImgTux[0].src=getRandomArrayElt(tmGlob_objTheme.images_consoletux_typing); 
      break;
    }
  }
  
  updateText(txt)
  {
    this.objJqDisplay.text(txt);
  }
}




class Laser
{
  constructor(objGame, target)
  {
    this.objGame=objGame;
    
    
    this.fireLaser(target);
  }
  
  fireLaser(target)
  {
    let originJqObject=this.objGame.getObjJqContainer().find(".js-laser-origin");
    let br=originJqObject[0].getBoundingClientRect();
    let originCoords=[Math.round(br.x+br.width/2), Math.round(br.y+br.height/2)];
    
    let targetCoords;
    if (target instanceof Comet)
      targetCoords=target.getCenterCoords();
    else 
    {
      console.log("NO TARGET FOUND");
      targetCoords=[0, 0];
    }
    
    this.objJqLaser=this.drawLaser(originCoords[0], originCoords[1], targetCoords[0], targetCoords[1]);
    //let objJqLaser=this.drawLaser(originCoords[0], originCoords[1], 500, 100);
    this.objJqLaser.fadeOut(750, this.removeLaser.bind(this));
  }
  
  removeLaser() { this.objJqLaser.remove(); }
  
  drawLaser(oX, oY, tX, tY)
  {
    console.log(oX, oY, tX, tY);
    
    let deltaX=oX-tX;
		let deltaY=oY-tY;
		let longeur=Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    let angle;
		if(Math.abs(deltaX)>Math.abs(deltaY)) angle=(Math.acos(Math.abs(deltaX)/longeur)*180)/Math.PI;
		else angle=(Math.asin(Math.abs(deltaY)/longeur)*180)/Math.PI;
		if(deltaX*deltaY<0) angle=180-angle;
		if(deltaY>0) angle+=180;
		
    let objJqContainer=this.objGame.getObjJqContainer().find(".layout-game__lasers");
    let objJqLaser=$('<div class="obj_laser"></div>').offset({left: oX, top: oY}).appendTo(objJqContainer);
		objJqLaser.css("width", Math.round(longeur)+"px").css("transform", "rotate("+Math.round(angle*100)/100+"deg)");
    
    return objJqLaser;
  }
}
