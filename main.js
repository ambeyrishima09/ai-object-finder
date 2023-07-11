status_1 = "";
object_name_user_given = "";
objects = [];
SpeechRecognition = window.webkitSpeechRecognition;
recognition = new SpeechRecognition();

function preload() {}

function setup() {
    canvas = createCanvas(320, 250);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

// function speak() {
//     var synth = window.speechSynthesis;
//     console.log(value_of_text);
//     utter = new SpeechSynthesisUtterance(value_of_text);
//     synth.speak(utter);
//     console.log("done");
// }

// function recognition(event) {
//     console.log(event);
//     var content = event.results[0][0].transcript;
//     console.log(content);
//     document.getElementById("textarea").innerHTML = content;
//     speak();
// }

function give_to_detection() {
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    object_name_user_given = document.getElementById("object_name_input").value;
    console.log(object_name_user_given);
    document.getElementById("status").innerHTML = "Status : DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("MODEL LOADED");
    status_1 = true;
    console.log(status_1);
}

function draw() {
    image(video, 0, 0, 320, 250);
    if (status_1 != "") {
        objectdetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            console.log(objects[i].label + " " + percent + "%");
            console.log(objects[i].y);
            console.log(objects[i].x);
            console.log(objects[i].height);
            console.log(objects[i].width);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotresult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}