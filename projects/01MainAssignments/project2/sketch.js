
let t;
let hu = 0;
let font;
let graphics;
let txt;
let clicked = false;

function preload() {
  font = loadFont('assets/Rubik_Mono_One/RubikMonoOne-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

	t= 180;

	txt = createGraphics(PI*400, 2*PI*100)
	txt.textFont(font);
	txt.strokeWeight(6);
	txt.stroke(255);
	//txt.fill(0);
	txt.textAlign(CENTER);
	txt.textSize(50);
	txt.text('IAD ZHDK	IAD ZHDK	IAD ZHDK', txt.width/2, txt.height/2+5 );

	
	colorMode(HSB, 255);
  angleMode(DEGREES);
  textFont(font);
  textSize(39);
	
	


}

function draw() {
  background(0);
	orbitControl();
	txt.fill(0);

  rotateY(t);
  
	for (let i = 1; i < 20; i+=5) {
    rotateX(i+tan(t));
		strokeWeight(1);
		stroke((hu + i*12)%255, 200, 255);
		noFill();
		texture(txt);
		
    sphere(i * 20 * 1 + 100);
		
		
  }

	
  t += 0.4;
	hu= hu + 1;

	
}
