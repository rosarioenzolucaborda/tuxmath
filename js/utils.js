

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max+1-min))+min;
}

function getRandomArrayElt(ar)
{
  let idx=getRandomInt(0, ar.length-1);
  return ar[idx];
}
