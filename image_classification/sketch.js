let mobilenet;
let label = '';
let video;

function modelReady() {
	console.log('Model is ready!!!')
	mobilenet.predict(gotResults)
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		label = results[0].label;
		setTimeout(() => {
			mobilenet.predict(gotResults)
		}, 1000);
	}
}

function setup() {
	createCanvas(350, 300);
	video = createCapture(VIDEO)
	video.hide()
	background(0);

	mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
	background(0)
	image(video, 0, 0, width, height - 50);
	fill(255);
	textSize(32);
	text(label, 10, height - 20);
}
