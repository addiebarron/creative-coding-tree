let canvas, 
	canvasSize,
	start,
	tree,
    angleVariance,
    lengthVariance,
    nSubtrees;

let colors = ['#264653','#2a9d8f','#e9c46a','#f4a261','#e76f51'];

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  
    button = createButton('New Tree');
	button.id('newtreebtn')   
    button.mousePressed(() => {
      redraw();
    });

	slider = createSlider(1, 8, 5, 1);
	slider.id('depthslider');
	slider.input(redraw);

  
    // Tree parameters
    angleVariance = PI/8;
    lengthVariance = 10;
	lengthMultiplier = 20;
}

function draw() {
	noLoop();

	let depth = slider.value();

	background(0);
	start = [width/2, height];
    drawTree(depth, start, HALF_PI*3);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	redraw();
}

function drawTree(n, startPoint, angle) {
    
    let color = colors[n%colors.length]
    stroke(color)
    strokeCap(SQUARE)
	//strokeWeight(n*(n-5)+1)
  
    const nSubtrees = getRandomInt(1,n);
  
    let length = n*lengthMultiplier + (2*Math.random() - 1)*lengthVariance;
  
    // draw trunk
    
    // generated from angle and length
    let relativeNewX = length * cos(angle);
    let relativeNewY = length * sin(angle);
  
	let endPoint = [
		startPoint[0] + relativeNewX, 
		startPoint[1] + relativeNewY,
	];
  
	line(...startPoint, ...endPoint);

	// draw branches (sub-trunks)
  
	if (n != 0) {
		for (let i=0; i < nSubtrees; i++) {
            const newAngle = angle + (2*Math.random() - 1)*angleVariance;
			drawTree(n - 1, endPoint, newAngle);
		}
	}
}

function getRandomInt(min,max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}