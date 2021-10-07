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

const THEME_DEFAULT_IMAGE_COMET="images/sprites/comet.png";
const THEME_DEFAULT_IMAGE_STEAM="images/sprites/steam.png";

class Theme
{
  constructor()
  {
    this.backgrounds=THEME_DEFAULT_BACKGROUDS;
    this.image_comet=THEME_DEFAULT_IMAGE_COMET;
    this.image_steam=THEME_DEFAULT_IMAGE_STEAM;
  }
  
  chooseBackground()
  {
    return getRandomArrayElt(this.backgrounds);
  }
}
