let mobilenet;
let label = '';
let video;
let predictor;
let addButton;
let trainButton;
let slider;

function modelReady() {
	console.log('Model is ready!!!')
}

function videoReady() {
	console.log('Video is ready!!!')
}

function whileTraining(loss) {
	if (loss === null) {
		console.log("Treinamento completo")
		predictor.predict(gotResults);
	} else {
		console.log(loss)
	}
}

function gotResults(error, value) {
	if (error) {
		console.error(error);
	} else {
		if (value.value > 0.5) {
			label = 'mão para cima'
		} else {
			label = 'sem as mãos'
		}
		setTimeout(() => {
			predictor.predict(gotResults)
		}, 1000);
	}
}

function setup() {
	createCanvas(350, 300);
	video = createCapture(VIDEO)
	video.hide()
	background(0);

	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	predictor = mobilenet.regression(video, videoReady);

	slider = createSlider(0, 1, 0.5, 0.01);
	
	addButton = createButton('add example image')
	addButton.mousePressed(()=>{
		predictor.addImage(slider.value());
	}) 

	trainButton = createButton('train')
	trainButton.mousePressed(function() {
		predictor.train(whileTraining);
	})
}

function draw() {
	background(0)
	image(video, 0, 0, width, height - 50);
	fill(255);
	textSize(32);
	text(label, 10, height - 20);
}
