let backgroundMask;
let backgroundImg;

let i = 0;

export function setup(p) {
  const one = document.getElementById("name");
  p.createCanvas(one.clientWidth, one.clientHeight);

  backgroundMask = p.createGraphics(one.clientWidth, one.clientHeight);
  backgroundImg = p.loadImage("img/gradient.jpg");
}

export function draw(p) {
  backgroundMask.fill("rgba(0, 0, 0, 1)");

  backgroundMask.textSize(180);
  backgroundMask.text("Marshall", 10, 200 + i);

  backgroundImg.mask(backgroundMask);

  p.image(backgroundImg, 0, 0, p.width, p.height);

  i++;
}
