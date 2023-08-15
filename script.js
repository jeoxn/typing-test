let words = ['bagi', 'dari', 'akan', 'kamu', 'memiliki', 'untuk', 'sehingga', 'telah', 'seperti', 'sesuai', "sendiri", "uang", "besar", "di", "ku", "hal", "kita", "termasuk", "mungkin", "kita", "ada", "membuat", "mudah", "kami", "tersebut", "setelah", "akan", "terjadi", "bisa", "pusat", "kerja", "ingin", "benar", "antara", "jadi", "kemudian", "seperti", "salah", "tengah", "terjadi", "tanpa", "dari", "bersama", "sementara", "pada", "sendiri", "sering", "sebuah", "waktu", "berencana", "luar", "saya", "membeli", "coba", "semuanya", "enak", "makan", "maka", "pasar", "bahan", "kerja", "dapur"];

let paragraph = "";
let time = 30;
let start = false;

function randomWords() {
    for (let i = 0; i < 100; i++) {
        let random = Math.floor(Math.random() * words.length);
        let temp = words[random];
        paragraph += temp + ' ';
    }
}

randomWords();

let text = document.querySelector('#text');
let restart = document.querySelector('#restart');
let input = document.querySelector('#input');

let wordsCorrect = 0;
let wordsFalse = 0; 

restart.addEventListener('click', () => {
    start = false;
    window.location.reload();
});

const countDown = () => {
    let timer = document.querySelector('#timer');
    let interval = setInterval(() => {
        time--;
        timer.innerHTML = time;
        if (time == 0) {
            clearInterval(interval);
            input.disabled = true;
            restart.style.display = 'block';
            let accuracy = (wordsCorrect / (wordsCorrect + wordsFalse)) * 100;
            let wpm = wordsCorrect * 4 / 5 * 0.5;
            let acc = document.querySelector('#acc');
            let speed = document.querySelector('#wpm');
            acc.innerHTML = "Accuracy: " + accuracy.toFixed(2) + "%";
            speed.innerHTML = "WPM: " + wpm.toFixed(2);
        }
    }, 1000);
}

input.addEventListener('keyup', (e) => {
    if (!start) {
        if (e.keyCode === 13) {
            console.log('restart');
        } else {
            start = true;
            countDown();
        }
    }
});


let length = 0;
let x = 0;
let typed = [];

paragraph.split(' ').forEach(char => {
    const span = `<span id='${length}'>${char}</span> `
    text.innerHTML += span;
    typed.push(char + ' ');
    length++;
});

input.addEventListener('keyup', e => {
    if (e.key == 'Backspace') {
        wordsFalse++;
    }
    if (e.key == ' ') {
        if (input.value == typed[x]) {
            document.getElementById(x).style.backgroundColor = 'green';
            document.getElementById(x).style.color = 'white';
            document.getElementById(x).style.borderRadius = '5px';
            wordsCorrect += typed[x].length - 1;
        } else {
            document.getElementById(x).style.backgroundColor = 'red';
            document.getElementById(x).style.color = 'white';
            document.getElementById(x).style.borderRadius = '5px';
            wordsFalse += typed[x].length - 1;
        }
        x++;
        input.value = '';
    }
});
