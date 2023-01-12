let mobilenet;
let label = '';
let video;
let classifier;
let mustageButton;
let chiboleteButton;
let bunnyButton;
let trainButton;

function modelReady() {
	console.log('Model is ready!!!')
}

function videoReady() {
	console.log('Video is ready!!!')
}

function whileTraining(loss) {
	if (loss === null) {
		console.log("Treinamento completo")
		classifier.classify(gotResults);
	} else {
		console.log(loss)
	}
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		label = results[0].label;
		setTimeout(() => {
			classifier.classify(gotResults)
		}, 1000);
	}
}

function setup() {
	createCanvas(350, 300);
	video = createCapture(VIDEO)
	video.hide()
	background(0);

	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	mustageButton = createButton('Adonai')
	mustageButton.mousePressed(function() {
		classifier.addImage('Mestre Dodo')
	})

	chiboleteButton = createButton('Miguel')
	chiboleteButton.mousePressed(function() {
		classifier.addImage('Chibolete')
	})

	bunnyButton = createButton('Elaine')
	bunnyButton.mousePressed(function() {
		classifier.addImage('Mulher Mais Linda do Mundo')
	})

	trainButton = createButton('train')
	trainButton.mousePressed(function() {
		classifier.train(whileTraining);
	})
}

function draw() {
	background(0)
	image(video, 0, 0, width, height - 50);
	fill(255);
	textSize(32);
	text(label, 10, height - 20);
}
