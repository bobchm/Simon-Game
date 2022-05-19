var sequence = [];
var nSeq = 0;
var seqCtr = 0;

$(document).keydown(function () {
    if (nSeq === 0) {
        showLevel(1);
        addToSequence();
    }
})

$(".btn").click(function () {
    /* if haven't started game yet */
    if (nSeq === 0) {
        doFailure();
    } else if (!matchSequence(this.id)) {
        doFailure();
        resetSequence();
    } else {
        $(this).addClass("pressed");
        playSound(this.id);
        setTimeout(() => {
            $(this).removeClass("pressed");
            advanceSequence();
        }, 100);
    }
})

function doFailure() {
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function matchSequence(id) {
    return (id == sequence[seqCtr]);
}

function resetSequence() {
    sequence = [];
    nSeq = 0;
    seqCtr = 0;
}

function advanceSequence() {
    if (++seqCtr === nSeq) {
        setTimeout(function () {
            addToSequence();
        }, 500);
    }
}

function showLevel(lvl) {
    $("h1").text("Level " + lvl);
}

function addToSequence() {
    var colors = ["red", "green", "blue", "yellow"];
    var color = colors[Math.floor(Math.random() * 4)];

    $("#" + color).fadeOut();
    setTimeout(function () {
        $("#" + color).fadeIn();
    }, 100);
    playSound(color);
    sequence[nSeq++] = color;
    seqCtr = 0;
}

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}