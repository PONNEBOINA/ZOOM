let videoElement = document.querySelector("video");

let recordBtnCont = document.querySelector(".record-btn-cont");

let recordBtn = document.querySelector(".record-btn");

let captureBtnCont = document.querySelector(".capture-btn-cont");

let captureBtn = document.querySelector(".capture-btn");

let recordFlag = false;

let chunks = [];

let constraints = {
    audio: true,
    video: true
};

let recorder;


navigator.mediaDevices.getUserMedia(constraints)

.then((stream) => {

   
    videoElement.srcObject = stream;

    recorder = new MediaRecorder(stream);

    recorder.addEventListener("start", () => {
        chunks = [];
    });

    
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    });

    recorder.addEventListener("stop", () => {

        let blob = new Blob(chunks, {
            type: "video/mp4"
        });

        let videoURL = URL.createObjectURL(blob);

        let a = document.createElement("a");

        a.href = videoURL;

        a.download = "recording.mp4";

        a.click();
    });

   

    recordBtnCont.addEventListener("click", () => {

        if (!recorder) return;

        recordFlag = !recordFlag;

        if (recordFlag) {

    recorder.start();

    startTimer();

    recordBtn.classList.add("record-animation");
} else {

    recorder.stop();

    stopTimer();

    recordBtn.classList.remove("record-animation");
}
    });

})

.catch((err) => {
    console.log(err);
});
let transparentColor = "transparent"
let timerID;
let counter = 0; // Represents total seconds

let timer = document.querySelector(".timer");

function startTimer() {
    timer.style.display = "block";

    function displayTimer() {
        let totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;

        let minutes = Number.parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;

        let seconds = totalSeconds;

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;

        counter++;
    }
     timerID = setInterval(displayTimer,1000);
}

function stopTimer() {

    clearInterval(timerID);

    counter = 0;

    timer.innerText = "00:00:00";

    timer.style.display = "none";
}


captureBtnCont.addEventListener("click", (e) => {

    let canvas = document.createElement("canvas");

    canvas.width = videoElement.videoWidth;

    canvas.height = videoElement.videoHeight;

    let tool = canvas.getContext("2d");

    tool.drawImage(
        videoElement,
        0,
        0,
        canvas.width,
        canvas.height
    );
    tool.fillStyle = transparentColor;

    tool.fillRect(0, 0, canvas.width, canvas.height);
    let imageURL = canvas.toDataURL("image/jpeg");

    let a = document.createElement("a");

    a.href = imageURL;

    a.download = "Image.jpeg";

    a.click();

    // remove animations
    setTimeout(() => {
        captureBtnCont.classList.remove("scale-capture");
    }, 500);

});

let filter = document.querySelector(".filter-layer");

let allFilter = document.querySelectorAll(".filter");

allFilter.forEach((filterElem) => {

    filterElem.addEventListener("click", (e) => {

        // get style
        transparentColor = getComputedStyle(filterElem)
        .getPropertyValue("background-color");

        filter.style.backgroundColor = transparentColor;

    });

});