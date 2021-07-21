let canvas, 
	canvasSize,
	start,
	tree,
    angleVariance,
    lengthVariance,
    nSubtrees;

let colors = ['#264653','#2a9d8f','#e9c46a','#f4a261','#e76f51'];

function setup() {
	canvasSize = {
		width: 500,
		height: 500,
	};
	canvas = createCanvas(canvasSize.width, canvasSize.height);
  
    button = createButton('New Tree');    
    button.mousePressed(() => {
      redraw();
    });	
  
    // Tree parameters
    angleVariance = PI/8;
    lengthVariance = 10;
	start = [canvasSize.width/2, canvasSize.height];
}

function draw() {
	noLoop();

	background(0);
    drawTree(7, start, HALF_PI*3);
}

function drawTree(n, startPoint, angle) {
    
    let color = colors[n%colors.length]
    stroke(color)
    strokeCap(SQUARE)
	//strokeWeight(n*(n-5)+1)
  
    const nSubtrees = getRandomInt(1,n);
  
    let length = n*15 + (2*Math.random() - 1)*lengthVariance;
  
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