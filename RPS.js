
let timer = document.getElementById('playTimer')
let startbtn = document.getElementById('begin')
let firstpg = document.getElementById('not')
toStart();
function toStart() {

    timer.innerHTML = 5;
    let num = 5;
    let intervalval;
        intervalval = setInterval(() => {
            num = num - 1;
            timer.innerHTML = num;
            
        }, 2000);
    setTimeout(() => {
        clearInterval(intervalval);
        startbtn.innerHTML = 'start';
        startbtn.style.background = 'green';
        firstpg.id = 'thegame'
        
    }, 10000);
};


function beginGame() {
    document.getElementById('thegame')
        .style.display = 'none';
    document.getElementById('gamebox')
        .style.display = 'block';
    setTimeout(() => {
        alert('playing Game!!!')
    }, 1000);
}

document.getElementById('begin').addEventListener('click', () => {
    beginGame()
}, {once: true} );

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        beginGame()
    }
}, {once: true} );

document.addEventListener('keydown', event => {
    if (event.key === 'p') {
        computerpick();
        playGame('paper')
        notify()
    } else if (event.key === 's') {
        computerpick();
        playGame('scissors')
        notify()
    } else if (event.key === 'r') {
        computerpick()
        playGame('rock')
        notify()
    } else if (event.key === 'R') {
        event.preventDefault()
        cResult.wins = 0;
        cResult.loses = 0;
        cResult.ties = 0;
        document.getElementById('result').innerHTML = `<span> result cleared 
        <br> wins: ${cResult.wins} <br> 
        loses: ${cResult.loses} <br>
        ties: ${cResult.ties} </span>`;
        numOfInter = 0;
    } else if (event.key === 'A') {
        autoplay()
    }
    
});

let cResult = JSON.parse(localStorage.getItem('cResult')) || {
    wins: 0,
    loses: 0,
    ties: 0
};



// const cResult = {
//     wins: 0,
//     loses: 0,
//     ties: 0
// };

let fResult = '';

function playGame(player) {
    if (player === 'rock') {
        if (computerChoice === 'rock') {
            fResult = ('a tie')
        } else if (computerChoice === 'paper') {
            fResult = ('you lose')
        } else {
            fResult = ('you win')
        };
    } else if (player === 'paper') {
        if (computerChoice === 'paper') {
            fResult = ('a tie')
        } else if (computerChoice === 'scissors') {
            fResult = ('you lose')
        } else if (computerChoice === 'rock') {
            fResult = ('you win')
        };
    } else if (player === 'scissors') {
        if (computerChoice === 'scissors') {
            fResult = ('a tie')
        } else if (computerChoice === 'rock') {
            fResult = ('you lose')
        } else if (computerChoice === 'paper') {
            fResult = ('you win')
        }
    } else if ('autoplay') {
        if (computerChoice === 'paper') {
            fResult = ('a tie')
        } else if (computerChoice === 'scissors') {
            fResult = ('you lose')
        } else if (computerChoice === 'rock') {
            fResult = ('you win')
        }
        
    }

    if (fResult === 'a tie') {
            cResult.ties += 1;
        } else if (fResult === 'you lose') {
            cResult.loses += 1;
        } else if (fResult === 'you win') {
            cResult.wins += 1;
        }

        localStorage.setItem('cResult', JSON.stringify(cResult))

    document.getElementById('result').innerHTML = `${autoplayer()} ${fResult}!!! i choose ${computerChoice}.
        your scores: <br>
        wins: ${cResult.wins}, <br>
        loses: ${cResult.loses}, <br>
        ties: ${cResult.ties} <br>
        <h2 id='bug' style="display: none;"> x2 </h2>`
        
    function autoplayer() {
        if (player === undefined) {
            return 'runing on autoplay'
            
        }else {
            return player
        }
    }
    notify();
    speech();
} 

let numInter;
let isAuto = false;
let intervalValue;
let numOfInter = 0;
    function autoplay() {
        
        if (!isAuto) {
            intervalValue = setInterval(() => {
                let autoplay = computerpick();
                playGame(autoplay)
                let plays = playGame(autoplay)
                numOfInter = (numOfInter += 1);
                document.getElementById('numOfInter').innerText = numOfInter;
                document.getElementById('bug').style.display = "block";
                speech()
                
            }, 1000);
            isAuto = true;
            document.getElementById('auto').innerHTML = `stop autoplay (<strong id="numOfInter"></strong>)`;
            
        } else {
            clearInterval(intervalValue)
            isAuto = false;
            document.getElementById('auto').innerHTML = 'autoplay';
        }
        speech();
    }

    function computerpick() {
        let randomComputer = Math.random();
    if (randomComputer >= 0 && randomComputer < 0.4){
        computerChoice = 'rock';
        // alert(`a tie, computer choice ${computerChoice}`)
    } else if (randomComputer >= 0.4  && randomComputer < 0.8) {
        computerChoice = 'paper';
        // alert(`you win, computer choice ${computerChoice}`)
    }else if (randomComputer >= 0.8 && randomComputer <= 1) {
        computerChoice = 'scissors';
        // alert(`you lose, computer choice is ${computerChoice}`)
    }
};

let win = document.getElementById('win')
let comput = document.getElementById('com')

let objScroce = {
    wins: cResult.wins,
    comput: cResult.loses
}

let winner = objScroce.wins;
let computer = objScroce.comput

function notify() {
    winner = cResult.wins
    computer = cResult.loses;
    notifyDis()
}
notifyDis()
function notifyDis() {
    win.innerHTML = `<em id='footerS'> your wins: ${winner} </em>`;
    comput.innerHTML= `<em id='footerS'> computer wins: ${computer} </em>`;
}

let myVoice = document.getElementById('comtext');

function speech() {
    if (winner == 0 && computer == 0) {
        myVoice.innerHTML = '';
    } else if (winner == 10) {
        myVoice.innerHTML = 'ok we off a good start';
    } else if (winner == computer) {
        myVoice.innerHTML = 'ok nice one'
    } else if (winner >= 30 && computer <= 27) {
        myVoice.innerHTML = 'i feel like your cheating somehow';
    } else if (computer > winner) {
        myVoice.innerHTML = 'haaaa';
    } else if (winner >= 90 && computer <= 78  && intervalValue != undefined) {
        myVoice.innerHTML = `thats it am stoping autoplay!! your cheating start all over`
        callToReset()
    } else if (computer >= 30 && winner <= 25) {
        myVoice.innerHTML = 'your a child'
    } else if (computer == 70 && winner <= 60) {
        myVoice.innerHTML = 'race you to 100';
        setTimeout(() => {
            myVoice.innerText = 'who ever gets to a 100 first is not a rotten egg'
        }, 1000);
    } else if (computer >= 140 && winner <= 100) {
        myVoice.innerHTML = 'you lost give up Gaming is not for you'
        setTimeout(() => {
            myVoice.innerHTML = 'i just went though your bowser history you ae hope less'
        }, 2000);
    } else if (computer >= 145 && winner <= 105 && intervalValue != undefined) {
        myVoice.innerHTML = 'stop!! let talk'
        clearInterval(intervalValue)
        setTimeout(() => {
            myVoice.innerHTML = 'you lost give up Gaming is not for you'
        }, 2000);
        setTimeout(() => {
            myVoice.innerHTML = 'i just went though your bowser history you ae hope less'
        }, 4000);
        setTimeout(() => {
            myVoice = 'resume';
            autoplay();
        }, 6000);
    }
    
}

function callToReset() {

        clearInterval(intervalValue)
        setTimeout(() => {
            myVoice.innerHTML = 'and Reseting the scorces, your cheating start all over!!!'

            cResult.wins = 0;
            cResult.loses = 0;
            cResult.ties = 0;
            document.getElementById('result').innerHTML = `<span> result cleared 
            <br> wins: ${cResult.wins} <br> 
            loses: ${cResult.loses} <br>
            ties: ${cResult.ties} </span>`;
            numOfInter = 0;
            
        }, 1500);
}