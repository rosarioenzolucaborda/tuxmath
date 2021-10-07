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



const THEME_DEFAULT_BACKGROUDS=[
  "images/backgrounds/0.jpg",
  "images/backgrounds/1.jpg",
  "images/backgrounds/2.jpg",
  "images/backgrounds/3.jpg",
  "images/backgrounds/4.jpg",
  "images/backgrounds/5.jpg",
  "images/backgrounds/6.jpg",
  "images/backgrounds/7.jpg"
];

const THEME_DEFAULT_IMAGE_COMET="images/sprites/comet-anim.png";
const THEME_DEFAULT_IMAGE_STEAM="images/sprites/steam-anim.png";

const THEME_DEFAULT_IGLOOHEALTHSTATUS=[
  "images/sprites/igloo-melted-anim.png",
  "images/sprites/igloo-half.png",
  "images/sprites/igloo-intact.png"
];

class Theme
{
  constructor()
  {
    this.backgrounds=THEME_DEFAULT_BACKGROUDS;
    this.image_comet=THEME_DEFAULT_IMAGE_COMET;
    this.image_steam=THEME_DEFAULT_IMAGE_STEAM;
    this.image_iglooHealthStatus=THEME_DEFAULT_IGLOOHEALTHSTATUS;
  }
  
  chooseBackground()
  {
    return getRandomArrayElt(this.backgrounds);
  }
}
