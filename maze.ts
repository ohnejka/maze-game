const level = [
    [1, 1, 1, 1, 0, 0, 1, 1, 1], // 0
    [0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1], // 4
    [1, 0, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 0, 1]  //8
];

enum MoveDirection {
    Up = 'Up',
    Right = 'Right',
    Down = 'Down',
    Left = 'Left'
}

const isNotDefined = (someObject: any): boolean => {
    return someObject === undefined || someObject === null;
};

const outOfMazeRange = (value: number): boolean => {
    return value < 0 || value > 8;
}

const mazeEl = document.getElementsByClassName('maze')[0] as HTMLElement;

const startX = mazeEl.getBoundingClientRect().x;
const startY = mazeEl.getBoundingClientRect().y;

const player = document.getElementById('player') as HTMLElement;

player.style.top = `${startY}px`;
player.style.left = `${startX}px`;

const winPosX = 7;
const winPosY = 8;

let playerPosX = 0;
let playerPosY = 1;


function checkIfCanMove(dir: MoveDirection): boolean {

    let allowed = false;
    let nextPosY = 0;
    let nextPosX = 0;
    let newPos = 3; // просто чтобы не 0 и не 1, чтобы заметить

    switch (dir) {
        case MoveDirection.Up:
            nextPosY = playerPosY - 1;

            if (outOfMazeRange(nextPosY))
                break;

            newPos = level[nextPosY][playerPosX];

            // console.log(`nextValue: ${newPos}; newPos: ${playerPosX}, ${nextPosY}`);
            allowed = newPos === 0 ? true : false;
            break;

        case MoveDirection.Right:
            nextPosX = playerPosX + 1;

            if (outOfMazeRange(nextPosX))
                break;

            newPos = level[playerPosY][nextPosX];

            // console.log(`nextValue: ${newPos}; newPos: ${nextPosX}, ${playerPosY}`);
            allowed = newPos === 0 ? true : false;
            break;

        case MoveDirection.Down:
            nextPosY = playerPosY + 1;

            if (outOfMazeRange(nextPosY))
                break;

            newPos = level[nextPosY][playerPosX];

            // console.log(`nextValue: ${newPos}; newPos: ${playerPosX}, ${nextPosY}`);
            allowed = newPos === 0 ? true : false;
            break;

        case MoveDirection.Left:
            nextPosX = playerPosX - 1;

            if (outOfMazeRange(nextPosX))
                break;

            newPos = level[playerPosY][nextPosX];

            // console.log(`nextValue: ${newPos}; newPos: ${nextPosX}, ${playerPosY}`);
            allowed = newPos === 0 ? true : false;
            break;

        default:
            console.error('no such direction!!')
    }

    return allowed;
}

function updatePlayerPosition(): void {
    player.style.transform = `translate(${playerPosX}em, ${playerPosY}em)`;

    if (playerPosX === winPosX && playerPosY === winPosY) {
        console.log(`you win!`)
    }
}

updatePlayerPosition();


const rowCount = level.length;
const columnCount = level[0].length;

for (let row = 0; row < rowCount; row++) {

    let buffer = ``;

    for (let col = 0; col < columnCount; col++) {
        const value = level[row][col];

        const pic = value > 0 ? `<span class="el wall"></span>` : `<span class="el empty"></span>`;
        buffer += pic;
    }

    mazeEl.innerHTML += `<div class="pic-row">${buffer}</div>`;
};


document.addEventListener('keyup', (event: KeyboardEvent) => {

    let canMove = false;

    switch (event.key) {
        case 'ArrowDown':
            canMove = checkIfCanMove(MoveDirection.Down);
            if (!canMove) break;

            playerPosY++;
            updatePlayerPosition();
            break;

        case 'ArrowUp':
            canMove = checkIfCanMove(MoveDirection.Up);
            if (!canMove) break;

            playerPosY--;
            updatePlayerPosition();
            break;

        case 'ArrowRight':
            canMove = checkIfCanMove(MoveDirection.Right);
            if (!canMove) break;

            playerPosX++;
            updatePlayerPosition();
            break;

        case 'ArrowLeft':
            canMove = checkIfCanMove(MoveDirection.Left);
            if (!canMove) break;

            playerPosX--;
            updatePlayerPosition();
            break;
    }

})

