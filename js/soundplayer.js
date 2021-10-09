const SFX_LEVELSTART=0;
const SFX_ANSWER_BAD=1;
const SFX_COMETDESTROY=2;
const SFX_COMETDESTROY_MULTIPLE=3;
const SFX_LASER=4;
const SFX_IGLOO_DESTROY_HALF=5;
const SFX_IGLOO_DESTROY_FULL=6;
const SFX_KEYPRESS=7;
const SFX_BONUS_INCOMING=8;
const SFX_BONUS_DESTROYED=9;

class SfxPlayer
{
  constructor(objTheme)
  {
    this.objTheme=objTheme;
    this.sfxUrls=[];
    this.getSfxUrls();
    this.genPlayers();
  }
  
  getSfxUrls()
  {
    this.sfxUrls[SFX_LEVELSTART]=this.objTheme.sfx_levelstart;
    this.sfxUrls[SFX_ANSWER_BAD]=this.objTheme.sfx_answer_bad;
    this.sfxUrls[SFX_COMETDESTROY]=this.objTheme.sfx_cometdestroy;
    this.sfxUrls[SFX_COMETDESTROY_MULTIPLE]=this.objTheme.sfx_cometdestroy_multiple;
    this.sfxUrls[SFX_LASER]=this.objTheme.sfx_laser;;
    this.sfxUrls[SFX_IGLOO_DESTROY_HALF]=this.objTheme.sfx_igloo_destroy_half;
    this.sfxUrls[SFX_IGLOO_DESTROY_FULL]=this.objTheme.sfx_igloo_destroy_full;
    this.sfxUrls[SFX_KEYPRESS]=this.objTheme.sfx_keypress;
    this.sfxUrls[SFX_BONUS_INCOMING]=this.objTheme.sfx_bonus_incoming;
    this.sfxUrls[SFX_BONUS_DESTROYED]=this.objTheme.sfx_bonus_destroyed;
  }
  
  genPlayers()
  {
    this.arObjDomPlayers=[];
    
    for (let i in this.sfxUrls)
    {
      this.arObjDomPlayers[i]=document.createElement('audio');
//       objPlay.volume = 1;           Pas utiles????
//       objPlay.loop   = false;
      this.arObjDomPlayers[i].src=this.sfxUrls[i];
      
    }
  }
  
  playSfx(id)
  {
    this.arObjDomPlayers[id].play();
  }
}
