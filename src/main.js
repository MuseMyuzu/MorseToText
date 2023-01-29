let startTime;
let endTime;
let duration = [];
let notPressingDuration;

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
        startTime = Date.now();
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 32) {
        endTime = Date.now();
        duration.push(endTime - startTime);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32 && startTime !== null) {
        notPressingDuration = startTime - endTime;
        duration.push(notPressingDuration);
    }
});
