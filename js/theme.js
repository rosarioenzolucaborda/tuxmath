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
