let video;
let detector;
let objectDetected = [];

function preload() {
	detector = ml5.objectDetector('cocossd', {}, modelLoaded);
}

function gotDetection() {

	detector.detect(video, (err, results) => {
		objectDetected = results
	});
	
	setTimeout(() => {
		return gotDetection()
	}, 200);
}

function modelLoaded() {
	console.log('Model Loaded!');
	gotDetection()
}


function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO)
	video.size(640, 480)
	video.hide()
}

function draw() {
	image(video, 0, 0)
	if (objectDetected?.length > 0) {
		for (let i = 0; i < objectDetected.length; i++) {
			let object = objectDetected[i];
			stroke(0, 255, 0);
			strokeWeight(4);
			noFill();
			rect(object.x, object.y, object.width, object.height)
			noStroke();
			fill(0, 255, 0);
			textSize(24);
			text(object.label, object.x + 10, object.y + 24);
		}
	}
}