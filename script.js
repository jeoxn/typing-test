let paragraph = ["hari ini cuaca sedang cerah di luar saya berencana untuk pergi ke pasar untuk membeli beberapa bahan makanan untuk memasak malam ini sebelumnya saya telah mencatat beberapa resep yang ingin saya coba dan saya berharap semuanya akan enak mungkin saya juga akan membeli beberapa bahan makanan ringan untuk disimpan di dapur karena mereka sangat berguna ketika saya sedang sibuk dengan pekerjaan saya tetapi sebelum itu saya harus membersihkan kamar tidur saya yang agak berantakan akhir akhir ini", "Saya suka makan es krim. Rasa favorit saya adalah cokelat dan vanilla. Biasanya saya membeli es krim di toko terdekat, tapi kadang-kadang saya juga membuatnya sendiri di rumah. Saya menemukan resep es krim sederhana di internet dan mencobanya. Rasanya cukup enak dan sekarang saya sering membuatnya sendiri. Saya juga suka menambahkan topping seperti kacang, saus cokelat, atau buah segar untuk membuatnya lebih spesial. Es krim selalu menjadi camilan favorit saya, terutama di hari-hari panas.", "Saya senang bersepeda di pagi hari. Udara pagi yang segar dan tenang membuat saya merasa nyaman dan rileks. Saya biasanya bersepeda selama setengah jam sebelum pergi ke kantor. Rutenya melewati taman dan jalanan sepi, jadi saya dapat menikmati pemandangan yang indah dan merasakan ketenangan di dalam diri. Selain itu, bersepeda juga membuat saya merasa lebih sehat dan segar untuk memulai hari. Saya sangat merekomendasikan aktivitas ini untuk siapa saja yang ingin memulai hari dengan baik dan sehat.", "Saya suka membaca buku sebelum tidur. Bacaan favorit saya adalah novel dan buku motivasi. Saya merasa membaca dapat membantu saya merelaksasi pikiran setelah seharian bekerja dan juga dapat memberikan wawasan dan inspirasi baru dalam hidup saya. Saya biasanya membaca selama sekitar 30 menit sebelum tidur. Kebiasaan ini sudah menjadi bagian dari rutinitas harian saya dan saya merasa tidak bisa tidur tanpa membaca terlebih dahulu. Bagi saya, membaca adalah cara yang baik untuk merawat kesehatan pikiran dan memperkaya hidup saya.", "Saya suka bermain game di komputer. Saya biasanya bermain game setelah pulang kerja. Saya merasa bermain game dapat membantu saya menghilangkan stres dan kelelahan setelah seharian bekerja. Saya juga dapat bermain game bersama teman-teman saya. Kami dapat bermain bersama secara online dan berkomunikasi melalui obrolan suara. Saya merasa bermain game dapat membantu saya menjaga hubungan dengan teman-teman saya. Selain itu, bermain game juga dapat membantu saya meningkatkan keterampilan komputer saya. Saya merasa bermain game adalah cara yang baik untuk menghabiskan waktu luang saya."];

let text = document.querySelector('#text');
let restart = document.querySelector('#restart');
let input = document.querySelector('#input');
let wordsCorrect = 0;
let wordsFalse = 0;

let rand = Math.floor(Math.random() * paragraph.length);


restart.addEventListener('click', () => {
    location.reload();
});

let length = 0;
let x = 0;
let type = [];

// countdown
const countDown = () => {
    let time = 15;
    let timer = document.querySelector('#timer');
    let interval = setInterval(() => {
        time--;
        timer.innerHTML = time;
        if (time == 0) {
            clearInterval(interval);
            input.disabled = true;
            restart.style.display = 'block';
            let accuracy = (wordsCorrect / (wordsCorrect + wordsFalse)) * 100;
            let wpm = wordsCorrect * 4 / 5;
            let acc = document.querySelector('#acc');
            let speed = document.querySelector('#wpm');
            acc.innerHTML = "Accuracy: " + accuracy.toFixed(2);
            speed.innerHTML = "WPM: " + wpm.toFixed(2);
        }
    }, 1000);
}

let start = false;
// when user start typing
input.addEventListener('keyup', () => {
    if (!start) {
        countDown();
        start = true;
    }
});

paragraph[rand].split(' ').forEach(char => {
    const span = `<span id='${length}'>${char}</span> `
    text.innerHTML += span;
    type.push(char + ' ');
    length++;
});



// add event listener when user press spacebar
input.addEventListener('keyup', e => {
    if (e.key == ' ') {
        if (input.value == type[x]) {
            document.getElementById(x).style.backgroundColor = 'green';
            document.getElementById(x).style.color = 'white';
            document.getElementById(x).style.borderRadius = '5px';
            wordsCorrect += type[x].length - 1;
        } else {
            document.getElementById(x).style.backgroundColor = 'red';
            document.getElementById(x).style.color = 'white';
            document.getElementById(x).style.borderRadius = '5px';
            wordsFalse += type[x].length - 1;
        }
        x++;
        input.value = '';
    }
});

