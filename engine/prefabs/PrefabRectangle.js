import GameObject from "../GameObject.js"
import Rectangle from "../components/Rectangle.js";
import RectangleDraw from "../components/RectangleDraw.js";

class PrefabRectangle extends GameObject{
  constructor(name, x, y, w, h, color, outline, health, damage){
    super(name);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.outline = outline;
    this.health = health;
    this.damage = damage;

    this.start();
  }
  start(){
    this.components.push(new Rectangle(this, this.x,this.y,this.w,this.h));
    this.components.push(new RectangleDraw(this, this.color, this.outline));
  }
}

export default PrefabRectangle;