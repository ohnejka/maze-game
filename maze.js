var level = [
    [1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 0, 1]
];
var MoveDirection;
(function (MoveDirection) {
    MoveDirection["Up"] = "Up";
    MoveDirection["Right"] = "Right";
    MoveDirection["Down"] = "Down";
    MoveDirection["Left"] = "Left";
})(MoveDirection || (MoveDirection = {}));
var isNotDefined = function (someObject) {
    return someObject === undefined || someObject === null;
};
var outOfMazeRange = function (value) {
    return value < 0 || value > 8;
};
var mazeEl = document.getElementsByClassName('maze')[0];
var startX = mazeEl.getBoundingClientRect().x;
var startY = mazeEl.getBoundingClientRect().y;
var player = document.getElementById('player');
player.style.top = startY + "px";
player.style.left = startX + "px";
var winPosX = 7;
var winPosY = 8;
var playerPosX = 0;
var playerPosY = 1;
function checkIfCanMove(dir) {
    var allowed = false;
    var nextPosY = 0;
    var nextPosX = 0;
    var newPos = 3;
    switch (dir) {
        case MoveDirection.Up:
            nextPosY = playerPosY - 1;
            if (outOfMazeRange(nextPosY))
                break;
            newPos = level[nextPosY][playerPosX];
            allowed = newPos === 0 ? true : false;
            break;
        case MoveDirection.Right:
            nextPosX = playerPosX + 1;
            if (outOfMazeRange(nextPosX))
                break;
            newPos = level[playerPosY][nextPosX];
            allowed = newPos === 0 ? true : false;
            break;
        case MoveDirection.Down:
            nextPosY = playerPosY + 1;
            if (outOfMazeRange(nextPosY))
                break;
            newPos = level[nextPosY][playerPosX];
            allowed = newPos === 0 ? true : false;
            break;
        case MoveDirection.Left:
            nextPosX = playerPosX - 1;
            if (outOfMazeRange(nextPosX))
                break;
            newPos = level[playerPosY][nextPosX];
            allowed = newPos === 0 ? true : false;
            break;
        default:
            console.error('no such direction!!');
    }
    return allowed;
}
function updatePlayerPosition() {
    player.style.transform = "translate(" + playerPosX + "em, " + playerPosY + "em)";
    if (playerPosX === winPosX && playerPosY === winPosY) {
        console.log("you win!");
    }
}
updatePlayerPosition();
var rowCount = level.length;
var columnCount = level[0].length;
for (var row = 0; row < rowCount; row++) {
    var buffer = "";
    for (var col = 0; col < columnCount; col++) {
        var value = level[row][col];
        var pic = value > 0 ? "<span class=\"el wall\"></span>" : "<span class=\"el empty\"></span>";
        buffer += pic;
    }
    mazeEl.innerHTML += "<div class=\"pic-row\">" + buffer + "</div>";
}
;
document.addEventListener('keyup', function (event) {
    var canMove = false;
    switch (event.key) {
        case 'ArrowDown':
            canMove = checkIfCanMove(MoveDirection.Down);
            if (!canMove)
                break;
            playerPosY++;
            updatePlayerPosition();
            break;
        case 'ArrowUp':
            canMove = checkIfCanMove(MoveDirection.Up);
            if (!canMove)
                break;
            playerPosY--;
            updatePlayerPosition();
            break;
        case 'ArrowRight':
            canMove = checkIfCanMove(MoveDirection.Right);
            if (!canMove)
                break;
            playerPosX++;
            updatePlayerPosition();
            break;
        case 'ArrowLeft':
            canMove = checkIfCanMove(MoveDirection.Left);
            if (!canMove)
                break;
            playerPosX--;
            updatePlayerPosition();
            break;
    }
});
//# sourceMappingURL=maze.js.map