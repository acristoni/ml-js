let img;
let detector;

function preload() {
	img = loadImage('dog_cat.jpg')
	detector = ml5.objectDetector('cocossd', {}, modelLoaded);
}

function gotDetection() {
	detector.detect(img, (err, results) => {
		for (let i = 0; i < results.length; i++) {
			let object = results[i];
			stroke(0, 255, 0);
			strokeWeight(4);
			noFill();
			rect(object.x, object.y, object.width, object.height)
			noStroke();
			fill(0, 255, 0);
			textSize(24);
			text(object.label, object.x + 10, object.y + 24);
		}
	});

	setTimeout(() => {
		return gotDetection()
	}, 100);
}

function modelLoaded() {
	console.log('Model Loaded!');
	gotDetection()
}


function setup() {
	createCanvas(640, 480);
	image(img, 0, 0)
}
