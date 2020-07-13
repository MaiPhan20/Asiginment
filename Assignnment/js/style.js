var door1 = document.getElementById('door1');
var door2 = document.getElementById('door2');
var door3 = document.getElementById('door3');
var startButton = document.getElementById('start');
//////Cắt ảnh rồi đẩy lên trang web
var botDoorPath= "https://i.imgur.com/ejmyBNP.png";
var beachDoorPath = "https://i.imgur.com/9OlfJOF.png";
var spaceDoorPath = "https://i.imgur.com/RvIeahk.png";
var closedDoorPath = "https://i.imgur.com/ix9rt3z.png";
var numClosedDoors = 3;
var openDoor1;
var openDoor2;
var openDoor3;
var currentlyPlaying = true;
var score = 0;
var highScore = 0;
var currentStreak = document.getElementById('score-number');
var bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isClicked = (door) => {
    if (door.src == closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

const isBot = (door) => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver('lose');
    }
}


const randomChoreDoorGenerator = () => {
    choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
}


door1.onclick = () => {
    if(currentlyPlaying && !isClicked(door1)) {
        door1.src = openDoor1;
        playDoor(door1);
    }
}

door2.onclick = () => {
    if(currentlyPlaying && !isClicked(door2)) {
        door2.src = openDoor2;
        playDoor(door2);
    }
}

door3.onclick = () => {
    if(currentlyPlaying && !isClicked(door3)) {
        door3.src = openDoor3;
        playDoor(door3);
    }
}

startButton.onclick = () => {
    startRound();
}

const startRound = () => {
    // Reset all the doors
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    numClosedDoors = 3;
    currentlyPlaying = true;
    startButton.innerHTML = 'Good luck!';
    randomChoreDoorGenerator();
}

const gameOver = (str) => {
    if(str === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        getYourScore();
    } else {
        startButton.innerHTML = "Game over! Play again?"
        score = 0;
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
        highScore = score;
        bestStreak.innerHTML = highScore;
    }
}


startRound();