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


const DEF_BASE="images/";

const THEME_DEFAULT_BACKGROUDS=[
  DEF_BASE+"backgrounds/0.jpg",
  DEF_BASE+"backgrounds/1.jpg",
  DEF_BASE+"backgrounds/2.jpg",
  DEF_BASE+"backgrounds/3.jpg",
  DEF_BASE+"backgrounds/4.jpg",
  DEF_BASE+"backgrounds/5.jpg",
  DEF_BASE+"backgrounds/6.jpg",
  DEF_BASE+"backgrounds/7.jpg"
];

const THEME_DEFAULT_IMAGE_COMET=DEF_BASE+"sprites/comet-anim.png";
const THEME_DEFAULT_IMAGE_STEAM=DEF_BASE+"sprites/steam-anim.png";

const THEME_DEFAULT_IGLOOHEALTHSTATUS=[
  DEF_BASE+"sprites/igloo-melted-anim.png",
  DEF_BASE+"sprites/igloo-half.png",
  DEF_BASE+"sprites/igloo-intact.png"
];

const THEME_DEFAULT_IMAGE_CONSOLE=DEF_BASE+"sprites/console_led.png";
const THEME_DEFAULT_IMAGE_CONSOLE_DIMS=[168, 110];

const THEME_DEFAULT_IMAGE_CONSOLETUX_NORMAL=DEF_BASE+"sprites/tux-sit.png";
const THEME_DEFAULT_IMAGE_CONSOLETUX_ANIMSTART=DEF_BASE+"sprites/tux-startLevel-anim.png";
const THEME_DEFAULT_IMAGES_CONSOLETUX_TYPING=[DEF_BASE+"sprites/tux-console1.png", DEF_BASE+"sprites/tux-console2.png", DEF_BASE+"sprites/tux-console3.png", DEF_BASE+"sprites/tux-console4.png"];
const THEME_DEFAULT_IMAGE_CONSOLETUX_MISTAKE=DEF_BASE+"sprites/tux-yipe.png";
const THEME_DEFAULT_IMAGE_CONSOLETUX_ANIMIGLOODESTROYED=DEF_BASE+"sprites/tux-fist-anim.png";

class Theme
{
  constructor()
  {
    this.loadDefault();
  }
  
  loadDefault()
  {
    this.backgrounds=THEME_DEFAULT_BACKGROUDS;
    this.image_comet=THEME_DEFAULT_IMAGE_COMET;
    this.image_steam=THEME_DEFAULT_IMAGE_STEAM;
    this.image_iglooHealthStatus=THEME_DEFAULT_IGLOOHEALTHSTATUS;
    
    this.image_console=THEME_DEFAULT_IMAGE_CONSOLE;
    this.image_console_dims=THEME_DEFAULT_IMAGE_CONSOLE_DIMS;
    this.image_consoletux_normal=THEME_DEFAULT_IMAGE_CONSOLETUX_NORMAL;
    this.image_consoletux_animstart=THEME_DEFAULT_IMAGE_CONSOLETUX_ANIMSTART;
    this.images_consoletux_typing=THEME_DEFAULT_IMAGES_CONSOLETUX_TYPING;
    this.image_consoletux_mistake=THEME_DEFAULT_IMAGE_CONSOLETUX_MISTAKE;
    this.image_consoletux_animigloodestroyed=THEME_DEFAULT_IMAGE_CONSOLETUX_ANIMIGLOODESTROYED;
  }  
  
  chooseBackground()
  {
    return getRandomArrayElt(this.backgrounds);
  }
}
