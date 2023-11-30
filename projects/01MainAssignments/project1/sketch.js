let arcCount = 0;
let maxArcCount = 10; // Maximale Anzahl der Arcs
let arcSpeed = 1; // Geschwindigkeit, mit der die Arcs erscheinen/verschwinden
let sliderStartX, sliderStartY, sliderEndX, sliderEndY;
let circleX, circleY;
let circleRadius = 15;
let isDragging = false;
let rows = 2;
let cols = 4;
let sliderWidth = 240;
let sliderHeight = 280;
let margin = 180;
let sound;
let maxVolume =3.0;
let wavex = 0;

function preload() {
  soundFormats('mp3');
  sound = loadSound('assets/IPhone Radar alarm sound effect.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderStartX = (sliderWidth + margin) + margin;
  sliderStartY = windowHeight / 2;
  sliderEndX = 2 * windowWidth / 3 - 60;
  sliderEndY = windowHeight / 2;
  circleX = sliderStartX;
  circleY = sliderStartY;
}

function draw() {
  background(0);

  // Zeichne ein Raster von Volume Sliders
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * (sliderWidth + margin) + margin;
      let y = i * (sliderHeight + margin) + margin;
      drawVolumeSlider(x, y);
    }
  }

  // Welligkeit basierend auf der Slider-Linie
  let waveAmount = map(circleX, sliderStartX, sliderEndX, 0, 180);
  
  // Verschiebe den Kreis entlang der welligen Linie mit scharfen Kanten
 // let circleOnWavyLineY = sliderStartY + sin((circleX - sliderStartX) / 20 + frameCount / 10) * (circleX > sliderStartX ? waveAmount: 0);
  circleY = sliderStartY;
	
	//console.log(waveAmount)

  // Mappe Arc-Anzahl auf die X-Position des Kreises
  let mappedArcCount = map(circleX, sliderStartX, sliderEndX, 0, maxArcCount);
  arcCount = floor(mappedArcCount);

  // Mappe Lautstärke auf die X-Position des Kreises
  let mappedVolume = map(circleX, sliderStartX, sliderEndX, 0, maxVolume);
  sound.setVolume(mappedVolume);


  // Draw the wavy line with sharp edges and mapped waveAmount
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = sliderStartX; x <= sliderEndX; x += 5) {
    let y = sliderStartY + sin((x - sliderStartX) / 20 + frameCount / 10) * (x > sliderStartX ? waveAmount * (x - sliderStartX) / (sliderEndX - sliderStartX) : 0);
		if (circleX >= x-5 && circleX <= x + 5){
				circleY = y;
		}
		vertex(x, y);
  }
  endShape();

  // Kreise zur welligen Linie gehören und sich entsprechend bewegen
  fill(0);
  circle(sliderStartX - 5, sliderStartY, 10);
  circle(sliderEndX, sliderStartY + sin((sliderEndX - sliderStartX) / 20 + frameCount / 10) * waveAmount, 10);
  noFill();

  // Button zum Ziehen
  stroke(255);
  strokeWeight(2);
  fill(0);

  ellipse(circleX, circleY, circleRadius * 2);

  // Spiele den Sound nur ab, wenn der Kreis nach rechts gezogen wird
  if (circleX > sliderStartX && !sound.isPlaying()) {
    sound.play();
  }

  // Stoppe den Sound, wenn der Kreis ganz links ist
  if (circleX <= sliderStartX && sound.isPlaying()) {
    sound.stop();
  }

  // Erhöhe die Lautstärke um 0.1, wenn der Kreis 5 Pixel nach rechts gezogen wird
  if (isDragging && mouseX > circleX + 5) {
    mappedVolume += 0.1;
    mappedVolume = constrain(mappedVolume, 0, maxVolume);
    sound.setVolume(mappedVolume);
  }
}

function drawVolumeSlider(x, y) {
  strokeWeight(2);
  stroke(255);
  fill(0);
  circle(x + 30, y + 10, 20);

  beginShape();
  vertex(x - 10, y);
  vertex(x + 10, y);
  vertex(x + 30, y - 20);
  vertex(x + 30, y + 40);
  vertex(x + 10, y + 20);
  vertex(x - 10, y + 20);
  vertex(x - 10, y);
  endShape();

  // Aktualisierte Arcs
  strokeWeight(2);
  noFill();
  let startAngle = radians(-70);
  let endAngle = radians(70);

  for (let i = 0; i < arcCount; i++) {
    stroke(255);
    arc(x + 50, y + 10, 45 - i * 30, 45 - i * 30, startAngle, endAngle);
  }
}

function mousePressed() {
  isDragging = dist(mouseX, mouseY, circleX, circleY) < circleRadius;
}

function mouseDragged() {
  if (isDragging) {
    circleX = mouseX;
    // Begrenze den Kreis auf den Bereich zwischen sliderStartX und sliderEndX
    circleX = constrain(circleX, sliderStartX, sliderEndX);
  }
}

function mouseReleased() {
  isDragging = false;
}
