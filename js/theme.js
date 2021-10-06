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

const THEME_DEFAULT_IMAGE_COMET="";

class Theme
{
  constructor()
  {
    this.backgrounds=THEME_DEFAULT_BACKGROUDS;
    this.image_comet=THEME_DEFAULT_IMAGE_COMET;
  }
  
  chooseBackground()
  {
    return getRandomArrayElt(this.backgrounds);
  }
}
