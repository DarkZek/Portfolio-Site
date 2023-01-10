let i = 0;

let vid;
let playing = true;

let shader;

let padding = 80;
let doublePadding = padding * 2;

let videoAspect = 1920 / 1080;

let size = 400;

export function preload(p) {
  //shader = p.loadShader("/basic.vert", "/shader.frag");
}

export function setup(p) {
  p.createCanvas(size * videoAspect + doublePadding, size + doublePadding);

  vid = p.createVideo("/content/rustcraft/video_nointro_1920x1080.mp4", () => {
    vid.elt.style.top = `${padding}px`;
    vid.elt.style.left = `${padding}px`;
  });
  vid.volume(0);
  vid.loop();
  vid.size(size * videoAspect, size);
  // vid.hide(); // hides the html video loader
  //vid.position(0.0);

  //p.shader(shader);

  console.log(vid.elt);
}

export function draw(p) {
  p.clear();

  let img = vid.get();
  p.image(img, padding, padding); // redraws the video frame by frame in

  // p.shader(shader);

  // const mx = p.map(p.mouseX, 0, p.width, 1, 5);
  // const my = p.map(p.mouseY, 0, p.height, 0, 1);

  // if (vid.elt.currentTime > 8) {
  //   vid.position(0);
  // }

  // shader.setUniform("uTexture", img);
  // shader.setUniform("uScale", [mx, my]);

  p.drawingContext.globalCompositeOperation = "saturation";

  p.drawingContext.fillStyle = "hsl(0,100%,50%)";
  p.drawingContext.fillRect(
    padding,
    padding,
    p.width - doublePadding,
    p.height - doublePadding
  );

  p.drawingContext.globalCompositeOperation = "source-over";

  p.drawingContext.filter = "blur(30px)";
}
