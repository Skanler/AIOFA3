objects = [];
status = "";
function preload(){

}

function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}



function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Objects detected";
    item = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("CocoSSD is ready to look for your object!");
    status = true;
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent +"%", objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("item").innerHTML = "Object detected";
        }
    }
}