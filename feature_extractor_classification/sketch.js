let mobilenet;
let label = '';
let video;
let classifier;
let mustageButton;
let xicaraButton;
let trainButton;
let saveButton;

function modelReady() {
	console.log('Model is ready!!!')
	classifier.load('./model.json', customModelReady)
}

function customModelReady() {
	console.log('Custom model is ready!!!')
	classifier.classify(gotResults);
}

function videoReady() {
	console.log('Video is ready!!!')
}

// function whileTraining(loss) {
// 	if (loss === null) {
// 		console.log("Treinamento completo")
// 		classifier.classify(gotResults);
// 	} else {
// 		console.log(loss)
// 	}
// }

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

	// mustageButton = createButton('Adonai')
	// mustageButton.mousePressed(function() {
	// 	classifier.addImage('Mestre Dodo')
	// })

	// xicaraButton = createButton('Xícara')
	// xicaraButton.mousePressed(function() {
	// 	classifier.addImage('Xícara')
	// })

	// trainButton = createButton('treinar IA')
	// trainButton.mousePressed(function() {
	// 	classifier.train(whileTraining);
	// })

	// saveButton = createButton('Salvar Modelo')
	// saveButton.mousePressed(function() {
	// 	classifier.save();
	// })
}

function draw() {
	background(0)
	image(video, 0, 0, width, height - 50);
	fill(255);
	textSize(32);
	text(label, 10, height - 20);
}
