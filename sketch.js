// Adding Point
// point(200, 200)

// Adding Line
// line(200, 200, 300, 300)

// Adding Triangle
// triangle(100, 200, 300, 400, 150, 450)

// Adding Rectangle
// rect(300, 200, 100, 100)

// Adding Circle
// ellipse(600, 300, 10, 10)

// Adding Stroke(R, G, B, Opacity)
// stroke(255, 0, 0)

// Adding Stroke Weight
// strokeWeight(5)

// Adding Fill(R, G, B, Opacity)
// fill(132, 100, 34)

// Adds Fill To The Geometry
// fill(300)
// Draws Ellipse On Mouse Movement 
// ellipse(mouseX, mouseY, 50, 50)

// Declares Image Variable
// let img

// Loads Image/ Under SETUP Function
// img = loadImage('\images\glasses.png')

// Add Properties To The Image/ Under DRAW Function
// Image(img, 100, 100, 100, 100)

// Loads Camera Video/ Under SETUP Function
// capture = createCapture(VIDEO)
// capture.hide()

// Add Properties To The Camera Video/ Under DRAW Function
// image(capture, 0, 0, 800, 600)

let capture;
let posenet = null;
let singlePose;
let skeleton;

// Creating Canvas
function setup() {
    createCanvas(800, 600)
    capture = createCapture(VIDEO)
    capture.hide()

    // Declaring ML5 Object Model
    posenet = ml5.poseNet(capture, modelLoaded)

    // Receiving Poses From ML5 Console Data
    posenet.on("pose", receivedPoses)
}

// Declaring Function For Receiving Poses 
function receivedPoses(poses) {
    console.log(poses)

    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

// Function For Testing Model
function modelLoaded() {
    console.log("Model Has Loaded")
}

// Function For Adding Properties To The Canvas
function draw() {
    image(capture, 0, 0, 800, 600)

    // Adding Fill To Keypoints
    fill(255, 0, 0)

    // Adding Geometry To Keypoints
    if (singlePose) {
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 50, 50)
        }
        // Adding Stroke To Skeleton
        stroke(255, 255, 255)
        // Adding Stroke Weight To Skeleton
        strokeWeight(5)
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }
    }

}