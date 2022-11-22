import GameObject from "../GameObject.js"
import Text from "../components/Text.js";
import TextDraw from "../components/TextDraw.js";

class PrefabTextSmall extends GameObject{
  constructor(name, x, y, text, color){
    super(name);
    this.x = x;
    this.y = y;
    this.text = text;
    this.font = "20px arial";
    this.layer = 1;
    this.color = color;

    this.start();
  }
  start(){
    this.components.push(new Text(this, this.x,this.y,this.text, this.font));
    this.components.push(new TextDraw(this, this.color, "transparent"));
  }
}

export default PrefabTextSmall;