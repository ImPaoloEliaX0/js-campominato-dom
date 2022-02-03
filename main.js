let playButton = document.getElementById("play");
let difficultyChoice = document.getElementById("difficulty");
let gridContainer = document.getElementById("gridContainer")

//  cella con classe cell
const getCell = () => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    return cell;
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateBombs = (bombsNumber, minValue, maxValue) => {
    let bombs = [];
    while(bombs.length < bombsNumber) {
        let randomBomb = getRandomNumber(minValue, maxValue);
        if(!bombs.includes(randomBomb)) {
            bombs.push(randomBomb);
        }
    }
    bombs.sort();
    return bombs;
}
// Click sul pulsante gioca
playButton.addEventListener('click', function(){

    gridContainer.innerHTML = "";
    let tries = 0;
    let difficulty = parseInt(difficultyChoice.value);
    console.log(difficulty)
            let bombs = generateBombs(16, 1, difficulty);
    console.log(bombs);
    for(i = 1; i<=difficulty; i++) {
        
        const cell = getCell();

        let side = Math.sqrt(difficulty);
            cell.style.width = `calc(100% / ${side})`
            cell.style.height = `calc(100% / ${side})`
                cell.innerHTML = i;
        if(bombs.includes(i)) {
            cell.addEventListener('click', bombClick);
        } else {
            cell.addEventListener('click', safeClick);
        }
        gridContainer.appendChild(cell);

    }

    function bombClick() {
        this.classList.add('bomb');
        this.removeEventListener('click', bombClick);

        let cells = document.getElementsByClassName('cell');
        for(let i = 0; i<cells.length; i++){

            if(bombs.includes(parseInt(cells[i].innerText))) {
                cells[i].classList.add('bomb');
            }
        }

        alert('Hai perso! punti: ' + tries);

        removeClick()
    };

    function safeClick(){
        this.classList.add('clicked');
        this.removeEventListener('click', safeClick);

        tries += 1;
        console.log(tries);

        if(tries == (difficulty - 16)) {
            alert('hai vinto');
            removeClick()
        }

    }

    function removeClick() {
        let cells = document.getElementsByClassName('cell');
        for(let i = 0; i<cells.length; i++){
            cells[i].removeEventListener('click', safeClick);
            cells[i].removeEventListener('click', bombClick);
        }
    }

});