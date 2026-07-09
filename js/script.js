// ===============================
// سرزمین ریاضی ایران - نسخه 1
// ===============================

// عناصر صفحه
const startBtn = document.getElementById("startBtn");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
let dragCount = 0;
const container = document.querySelector(".container");
const quizBox = document.getElementById("quizBox");
const questionTitle = document.getElementById("questionTitle");
const answers = document.getElementById("answers");
const scoreBox = document.getElementById("scoreBox");
const playerBox = document.getElementById("playerBox");
const messageBox = document.getElementById("messageBox");
const progressFill = document.getElementById("progressFill");
const resultBox = document.getElementById("resultBox");
const resultName = document.getElementById("resultName");
const resultScore = document.getElementById("resultScore");
const resultMessage = document.getElementById("resultMessage");
// سوال اول (فعلاً فقط یک سوال برای تست)
const questions = [

{
question:"🌸 دانشمند کوچک، درست یا نادرست بودن عبارت زیر را مشخص کن:<br><br>بزرگ‌ترین عدد یک‌رقمی، ۹ است.",
options:["درست","نادرست"],
answer:0
},

{
question:"🌸 دانشمند کوچک، درست یا نادرست بودن عبارت زیر را مشخص کن:<br><br>هشت بسته ده‌تایی منهای پنج بسته ده‌تایی، دو بسته ده‌تایی می‌شود.",
options:["درست","نادرست"],
answer:1
},

{
question:"🌸 دانشمند کوچک، درست یا نادرست بودن عبارت زیر را مشخص کن:<br><br>عدد ۳۵۱ بین دو عدد ۳۵۰ و ۳۶۰ قرار دارد.",
options:["درست","نادرست"],
answer:0
},

{
question:"مدرسه‌ی میناب ۱۶۸ دانش‌آموز دارد. این عدد به کدام عدد زیر نزدیک‌تر است؟",
options:["۱۶۰","۱۸۰","۱۷۰","۲۰۰"],
answer:2
},

{
question:"در شمارش ۴ تا ۴ تا، عدد قبل از ۱۶ چند است؟",
options:["۲۰","۱۲","۱۰","۸"],
answer:1
},

{
question:"من چه عددی هستم که یکانم ۴ و دهگانم ۵ تا بیشتر از یکانم است؟",
options:["۵۴","۴۵","۹۴","۴۹"],
answer:2
},

{
question:"۸ سکه ۱۰۰ ریالی، ۳ سکه ۱۰ ریالی و ۴ سکه ۱ ریالی چند ریال می‌شود؟",
options:["۸۴۳","۳۴۸","۴۸۳","۸۳۴"],
answer:3
},

{
question:"عدد بعدی در الگو چند است؟<br><br><span style='direction:ltr; display:inline-block;'>۱۲۰ ، ۱۲۳ ، ۱۲۶ ، ...</span>",
options:["۱۲۹","۱۳۰","۱۳۶","۱۳۳"],
answer:0
},

{
question:"  یک دامدار ۹ گوسفند داشت. او ۲ گوسفند را فروخت و ۴ گوسفند دیگر خرید. حالا او چند گوسفند دارد؟",
options:["۱۵","۱۱","۳","۶"],
answer:1
},

{
question:"در یک کیسه ۶ پرتقال و ۳ کیوی  است. اگر بدون نگاه کردن به کیسه، یک میوه برداریم، شانس بیرون آمدن کدام میوه بیشتر است؟",
options:["پرتقال","کیوی"," شانس برابر دارند ","هیچ‌کدام"],
answer:0
},

{
question:"🌸 نازنینم، ابتدا عبارت را انتخاب کن، سپس پاسخ مناسب آن را انتخاب کن.",
left:[
    "۱۰ + ۲۰ + ۵ − ۱۰ + ۳",
    "۷۰ − ۲۰ + ۸ − ۱۰",
    "۵ + ۲۰ + ۴ + ۱۰   + ۴"
],
right:[
    "۴۳",
    "۲۸",
    "۴۸"
],
pairs:[
    [0,1],
    [1,2],
    [2,0]
]
},

{
question:"🌸 نازنینم، ابتدا عبارت را انتخاب کن، سپس پاسخ مناسب آن را انتخاب کن.",
left:[
    "یک ربع بعد از ساعت ۸:۲۰",
    "نیم ساعت بعد از ساعت ۸:۱۰"
],
right:[
    "۸:۳۵",
    "۸:۴۰"
],
pairs:[
    [0,0],
    [1,1]
]
},
{
question:"🌸 نازنینم، ابتدا عبارت را انتخاب کن، سپس پاسخ مناسب آن را انتخاب کن.",

left:[
    "۵ سانتی‌متر و ۲ میلی‌متر",
    "۱ سانتی‌متر و ۲ میلی‌متر",
    "۲ سانتی‌متر و ۵ میلی‌متر"
],

right:[
    "۱۲ میلی‌متر",
    "۲۵ میلی‌متر",
    "۵۲ میلی‌متر"
],

pairs:[
    [0,2], // 52
    [1,0], // 12
    [2,1]  // 25
]
},
];

// شماره سوال
let currentQuestion = 0;
let score = 0;


const totalScore = 18;
// شروع آزمون
startBtn.onclick = function () {

    container.style.display = "none";
let student = document.getElementById("studentName").value;

playerBox.innerHTML = "👦 " + student;
    quizBox.style.display = "block";

    showQuestion();

};

// نمایش سوال
function toPersianNumber(num){

    return num.toString().replace(/\d/g, function(d){

        return "۰۱۲۳۴۵۶۷۸۹"[d];

    });

}
function showQuestion() {

    let q = questions[currentQuestion];
    if(!q.options){
    quizBox.classList.add("dragQuestion");
}else{
    quizBox.classList.remove("dragQuestion");
}
    solvedPairs = [];
selectedLeft = -1;
progressFill.style.width = ((currentQuestion) / questions.length * 100) + "%";
   questionTitle.innerHTML =
"سؤال " +
toPersianNumber(currentQuestion+1) +
" از " +
toPersianNumber(15) +
"<br><br>" +
q.question;
    answers.innerHTML = "";
if(!q.options){

    showDragQuestion(q);

    return;

}
    q.options.forEach(function(option, index){
answers.innerHTML +=
`<button class="answerBtn answer${index+1}" onclick="checkAnswer(${index})">
${option}
</button>`;
    });

}

// بررسی پاسخ
function checkAnswer(index){

    let q = questions[currentQuestion];

    if(index === q.answer){

        correctSound.play();

        score++;

        scoreBox.innerHTML =
        "⭐ امتیاز: " + toPersianNumber(score);

        document.querySelectorAll(".answerBtn")[index]
        .classList.add("correctAnswer");

    }else{

         wrongSound.play();

        document.querySelectorAll(".answerBtn")[index]
        .classList.add("wrongAnswer");

    }

    setTimeout(function(){

        messageBox.innerHTML = "";

        currentQuestion++;

        if(currentQuestion < questions.length){

            showQuestion();

        }else{

            progressFill.style.width = "100%";

            quizBox.style.display = "none";

            resultBox.style.display = "block";

            let student =
            document.getElementById("studentName").value;

            resultName.innerHTML =
            "👦 نام دانش‌آموز: " + student;

            resultScore.innerHTML =
            "⭐ امتیاز: " +
            toPersianNumber(score) +
            " از " +
            toPersianNumber(totalScore);

            if(score >= 16){

    resultMessage.innerHTML =
    "🏆 آفرین! عملکردت خیلی خوب بود، قهرمان کوچک ایران‌زمین. 🇮🇷";

}else if(score >= 12){

    resultMessage.innerHTML =
    "🌟 آفرین! عملکردت خوب بود. با کمی تمرین، نتیجه‌ی  بهتری  می گیری.";

}else if(score >= 8){

    resultMessage.innerHTML =
    "🌸 تلاش خوبی کردی. با تمرین بیشتر، ریاضی برایت آسان‌تر و شیرین‌تر می‌شود.";

}else{

    resultMessage.innerHTML =
    "❤️  تو می توانی! با تمرین و تلاش، دفعه ی بعد ستاره‌های بیشتری می‌گیری.";

}
        }

    },1200);

}
function showDragQuestion(q){

    questionTitle.innerHTML =
"سؤال " +
toPersianNumber(currentQuestion+1) +
" از " +
toPersianNumber(13) +
"<br><br>" +
q.question;

    answers.innerHTML = `
<div id="dragContainer">

    <div id="leftColumn"></div>

    <div id="rightColumn"></div>

</div>
`;

    let leftHTML = "";

    q.left.forEach(function(item,index){

        leftHTML +=
        `<div class="leftItem"
        dir="ltr"
        onclick="selectLeft(${index})">
        ${item}
        </div>`;

    });

    document.getElementById("leftColumn").innerHTML = leftHTML;


    let rightHTML = "";

    q.right.forEach(function(item,index){

       rightHTML +=
`<button class="dragBtn"
onclick="selectRight(this, ${index})">
        ${item}
        </button>`;

    });

    document.getElementById("rightColumn").innerHTML = rightHTML;

}
let selectedLeft = -1;
let solvedPairs = [];
function selectLeft(index){
if(solvedPairs.includes(index)){

    return;

}
    selectedLeft = index;

    let items = document.querySelectorAll(".leftItem");

    items.forEach(function(item){

        item.classList.remove("selectedLeft");

    });

    items[index].classList.add("selectedLeft");

    items[index].style.pointerEvents = "none";
items[index].style.opacity = "0.5";
}

function selectRight(btn, index){

    if(selectedLeft == -1){
        alert("🌸 ابتدا یک عبارت را انتخاب کن.");
        return;
    }

    // ❌ جلوگیری از کلیک دوباره
    if(btn.disabled) return;

    let q = questions[currentQuestion];

    let correct = false;

    q.pairs.forEach(function(pair){
        if(pair[0] == selectedLeft && pair[1] == index){
            correct = true;
        }
    });

    // ✔ قفل کردن دکمه بعد از کلیک
    btn.disabled = true;

    if(correct){

        correctSound.play();
    solvedPairs.push({
        left: selectedLeft,
        right: index
    });

    score++;
scoreBox.innerHTML =
"⭐ امتیاز: " + toPersianNumber(score);

    btn.classList.add("correctAnswer");

} else {

wrongSound.play();
    btn.classList.add("wrongAnswer");
}

    // ✔ ریست انتخاب سمت چپ
    selectedLeft = -1;

    // ✔ شمارش پیشرفت
    dragCount++;

    if(dragCount === questions[currentQuestion].pairs.length){

    setTimeout(function(){

        currentQuestion++;
        dragCount = 0;
        selectedLeft = -1;
        solvedPairs = [];

        if(currentQuestion < questions.length){
            showQuestion();
        }else{

            progressFill.style.width = "100%";
            quizBox.style.display = "none";
            resultBox.style.display = "block";

            let student =
            document.getElementById("studentName").value;

            resultName.innerHTML =
            "👦 نام دانش‌آموز: " + student;

            resultScore.innerHTML =
            "⭐ امتیاز: " +
            toPersianNumber(score) +
            " از " +
            toPersianNumber(totalScore);

           if(score >= 16){

    resultMessage.innerHTML =
    "🏆 آفرین! عملکردت خیلی خوب بود، قهرمان کوچک ایران‌زمین. 🇮🇷";

}else if(score >= 12){

    resultMessage.innerHTML =
    "🌟 آفرین! عملکردت خوب بود. با کمی تمرین، نتیجه‌ی بهتری  می گیری.";

}else if(score >= 8){

    resultMessage.innerHTML =
    "🌸 تلاش خوبی کردی. با تمرین بیشتر، ریاضی برایت آسان‌تر و شیرین‌تر می‌شود.";

}else{

    resultMessage.innerHTML =
    "❤️ تو می‌توانی! با تمرین و تلاش، دفعه ی بعد ستاره‌های بیشتری می‌گیری.";

}
        }

    }, 800);
}
}