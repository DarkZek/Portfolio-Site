enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
  lerp(other: Color, amount: number): Color {
    return new Color(
      lerp(this.red, other.red, amount),
      lerp(this.green, other.green, amount),
      lerp(this.blue, other.blue, amount),
      lerp(this.alpha, other.alpha, amount)
    );
  }
  toCSS(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dir: Direction) {
    const newPoint = new Point(this.x, this.y);
    switch (dir) {
      case Direction.Up:
        newPoint.y -= 1;
        break;
      case Direction.Down:
        newPoint.y += 1;
        break;
      case Direction.Left:
        newPoint.x -= 1;
        break;
      case Direction.Right:
        newPoint.x += 1;
        break;
    }
    return newPoint;
  }

  distance(other: Point) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }
}

function randomInRange(from: number, to: number) {
  const r = Math.random();
  return Math.floor(r * (to - from) + from);
}

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

const backgroundColor = new Color(0, 0, 0, 0.2);

export class SnakeGame {
  size: number;
  board_lcd: Color[][] = [];
  snake_dir = Direction.Left;
  snake_points: Point[] = [];
  fruit_loc = new Point(0, 0);
  restartAnimation = 0;
  restarting = false;

  ai = true;

  constructor(size: number) {
    this.size = size;
    this.generate();
  }

  generate() {
    this.board_lcd = new Array(this.size)
      .fill(0)
      .map(() => new Array(this.size).fill(backgroundColor));

    this.snake_points = [new Point(this.size - 1, 4)];
    this.snake_dir = Direction.Left;

    const newFruitLoc = this.getNewFruitLoc();
    if (newFruitLoc != undefined) {
      this.fruit_loc = newFruitLoc;
    }

    this.ai = true;
  }

  aiTick() {
    // Generate the move for the AI
    // bfs to find route to fruit
    const queue: Point[] = [];

    const prev = new Array(this.size)
      .fill(0)
      .map(() => new Array(this.size).fill(undefined));

    queue.push(this.snake_points[0]);
    while (queue.length > 0) {
      const point = queue.shift()!;

      if (point.x == this.fruit_loc.x && point.y == this.fruit_loc.y) {
        // Found fruit
        break;
      }

      for (const dir of [
        Direction.Up,
        Direction.Down,
        Direction.Left,
        Direction.Right,
      ]) {
        const newPoint = point.move(dir);
        if (
          newPoint.x < 0 ||
          newPoint.x >= this.size ||
          newPoint.y < 0 ||
          newPoint.y >= this.size
        ) {
          continue;
        }
        if (
          this.snake_points.some((p) => p.x == newPoint.x && p.y == newPoint.y)
        ) {
          continue;
        }
        
        if (prev[newPoint.x][newPoint.y] != undefined) {
          continue;
        }

        prev[newPoint.x][newPoint.y] = point;
        queue.push(newPoint);
      }
    }

    // Reconstruct route
    const route: Point[] = [];
    let curr = this.fruit_loc;
    
    while (
      curr.x != this.snake_points[0].x ||
      curr.y != this.snake_points[0].y
    ) {
      route.push(curr);
      curr = prev[curr.x][curr.y];
      if (curr == undefined) {
        console.log('no options')
        // No valid options
        return;
      }
    }

    const nextPoint = route[route.length - 1];

    // Get direction
    if (nextPoint.x == this.snake_points[0].x - 1) {
      this.snake_dir = Direction.Left;
    }
    if (nextPoint.x == this.snake_points[0].x + 1) {
      this.snake_dir = Direction.Right;
    }
    if (nextPoint.y == this.snake_points[0].y - 1) {
      this.snake_dir = Direction.Up;
    }
    if (nextPoint.y == this.snake_points[0].y + 1) {
      this.snake_dir = Direction.Down;
    }
  }

  addListeners() {
    // Listen for keyboard input
    document.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp") {
        this.snake_dir = Direction.Up;
      } else if (event.key == "ArrowDown") {
        this.snake_dir = Direction.Down;
      } else if (event.key == "ArrowLeft") {
        this.snake_dir = Direction.Left;
      } else if (event.key == "ArrowRight") {
        this.snake_dir = Direction.Right;
      } else {
        // No key pressed
        return;
      }
      
      // Disable AI
      this.ai = false;
      event.preventDefault();
    });
  }

  showRestarting() {
    this.restartAnimation += 2;

    if (this.restartAnimation > this.size * 2) {
      this.generate();
      this.restarting = false;
      this.restartAnimation = 0;
    }

    // Get all lcd points in range and set them to white
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        // From position around snake
        const radius = this.snake_points[0].distance(new Point(x, y));
        if (
          radius > this.restartAnimation ||
          radius < this.restartAnimation - 2
        ) {
          this.board_lcd[x][y] = new Color(0, 0, 0, 1.0);
        } else {
          this.board_lcd[x][y] = new Color(255, 255, 255, 1.0);
        }
      }
    }
  }

  tick() {

    if (this.restarting) {
      this.showRestarting();
      return;
    }

    if (this.ai) {
        this.aiTick();
    }

    // Move snake forwards
    const head = this.snake_points[0];
    const new_head = new Point(head.x, head.y);
    switch (this.snake_dir) {
      case Direction.Up:
        new_head.y -= 1;
        break;
      case Direction.Down:
        new_head.y += 1;
        break;
      case Direction.Left:
        new_head.x -= 1;
        break;
      case Direction.Right:
        new_head.x += 1;
        break;
    }

    // Check if snake is out of bounds
    if (
      new_head.x < 0 ||
      new_head.x >= this.size ||
      new_head.y < 0 ||
      new_head.y >= this.size
    ) {
      this.restarting = true;
      return;
    }

    // Check if new head collides with other pieces of the snake
    // Dont check last point as it will be removed
    for (let i = 0; i < this.snake_points.length - 1; i++) {
      const point = this.snake_points[i];
      if (point.x == new_head.x && point.y == new_head.y) {
        // Fail!
        this.restarting = true;
        return;
      }
    }

    this.snake_points.unshift(new_head);

    // Check if snake is eating fruit
    if (new_head.x == this.fruit_loc.x && new_head.y == this.fruit_loc.y) {
      const newFruit = this.getNewFruitLoc();
      if (newFruit != undefined) {
        this.fruit_loc = newFruit;
      }
    } else {
      this.snake_points.pop();
    }
  }

  getNewFruitLoc() {
    // Check if there is any space left
    if (this.snake_points.length >= this.size * this.size) {
      this.generate();
      return;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const locX = randomInRange(0, this.size);
      const locY = randomInRange(0, this.size);

      let invalid = false;

      // Check if snake_points contains loc
      for (const point of this.snake_points) {
        if (point.x == locX && point.y == locY) {
            invalid = true;
          continue;
        }
      }

      if (invalid) {
        continue;
      }

      // Matches, set fruit loc
      return new Point(locX, locY);
    }
  }

  calculateColors() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        this.board_lcd[x][y] = this.board_lcd[x][y].lerp(backgroundColor, 0.8);
        //this.board_lcd[x][y] = backgroundColor;
      }
    }

    // Set snake pixels
    for (let i = 0; i < this.snake_points.length; i++) {
      const point = this.snake_points[i];
      if (i == 0) {
        this.board_lcd[point.x][point.y] = new Color(0, 150, 150, 1.0);
      } else {
        this.board_lcd[point.x][point.y] = new Color(0, 150, 0, 1.0);
      }
    }

    // Set fruit pixel
    this.board_lcd[this.fruit_loc.x][this.fruit_loc.y] = new Color(150, 0, 0, 1.0);
  }

  draw(ctx: CanvasRenderingContext2D, boardSizePx: number) {
    this.calculateColors();

    ctx.clearRect(0, 0, boardSizePx, boardSizePx);

    const padding = 6;
    const doublePadding = padding * 2;

    const lcdSize = Math.sqrt(Math.pow(boardSizePx/(this.size + 0.5), 2) / 2)//boardSizePx / this.size;
    const lcdLength = Math.sqrt(lcdSize * lcdSize * 2);

    const bgLcd = new Color(100, 100, 100, 1.2);

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const isOddRow = y % 2 == 0;
        const xTranslate = (x + (isOddRow ? 0.5 : 1.0)) * lcdLength;
        const yTranslate = y * lcdLength / 2;

        ctx.translate(xTranslate, yTranslate);
        ctx.scale(lcdSize - doublePadding, lcdSize - doublePadding);
        ctx.rotate(Math.PI/4);

        const color = this.board_lcd[x][y];
        ctx.fillStyle = new Color(20 + (color.red * 255), 20, 20, 0.2 + color.red).toCSS()
        ctx.beginPath();
        ctx.roundRect(0.6, 0.6, 0.3, 0.3, 0.1);
        ctx.fill();

        ctx.fillStyle = new Color(20, 20 + (color.green * 255), 20, 0.2 + color.green).toCSS()
        ctx.beginPath();
        ctx.roundRect(0.6, 0.075, 0.3, 0.15, 0.1);
        ctx.roundRect(0.075, 0.6, 0.15, 0.3, 0.1);
        ctx.fill();

        ctx.fillStyle = new Color(20, 20, 20 + (color.blue * 255), 0.2 + color.blue).toCSS()
        ctx.beginPath();
        ctx.roundRect(0, 0, 0.3, 0.3, 0.05);
        ctx.fill();

        // Debugging colours
        // ctx.fillStyle = new Color(color.red, color.green, color.blue, 1.0).toCSS();
        // ctx.fillRect(0, 0, 1, 1);

        ctx.rotate(-Math.PI/4)
        ctx.scale(1/(lcdSize - doublePadding), 1/(lcdSize - doublePadding));
        ctx.translate(-xTranslate, -yTranslate)
      }
    }
  }
}
