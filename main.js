song1="";
song2="";
song1_status="";
song2_status="";
leftWrist=0;
rightWrist=0;
leftwristX=0;
leftwristY=0;
RightwristX=0;
RightwristY=0;
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log(leftwristX,leftwristY);
        RightwristX=results[0].pose.rightWrist.x;
        RightwristY=results[0].pose.rightWrist.y;
        console.log(RightwristX,RightwristY);
        leftWrist=results[0].pose.keypoints[9].score;
        console.log(leftWrist);
        rightWrist=results[0].pose.keypoints[10].score;
        console.log(rightWrist);
    }
}
function modelLoaded(){
    console.log("modelLoaded")
}
function draw(){
image(video,0,0,600,500);
song1_status = song1.isPlaying();
song2_status = song2.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(rightWrist > 0.2) {
    circle(RightwristX,RightwristY,20);
    song2.stop();
    if(song1_status == false) {
    song1.play();
    document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song" }
 }
 if(leftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    song1.stop();
    if(song2_status == false) {
    song2.play();
    document.getElementById("song").innerHTML = "Playing - Beliver" } 
 }
}
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("believer_song.mp3");
}
function play(){
song.play();
song.setVolume(1);
song.rate(1)
}

function stop(){
    song.stop();
    
}