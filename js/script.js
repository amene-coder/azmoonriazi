// ===============================
// سرزمین ریاضی ایران - نسخه 1
// ===============================

// عناصر صفحه
const startBtn = document.getElementById("startBtn");
const correctSound = document.getElementById("correctSound");
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
question:"فرشته‌ی کوچکم، بزرگترین عدد یک رقمی چند است؟",
options:["۰","۱۰","۹","۱"],
answer:2
},

{
question:"هشت بسته ده‌تایی منهای ...... بسته ده‌تایی می‌شود دو بسته ده‌تایی.",
options:["۵","۶","۲","۱۰"],
answer:1
},

{
question:"مدرسه‌ی میناب ۱۶۸ دانش‌آموز دارد. این عدد به کدام عدد نزدیک‌تر است؟",
options:["۱۶۰","۱۸۰","۱۷۰","۲۰۰"],
answer:2
},

{
question:"۲ سانتی‌متر و ۷ میلی‌متر برابر چند میلی‌متر است؟",
options:["۷۲","۲۷","۲۷۰","۹"],
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
question:"یک ربع مانده به ساعت ۱۲ یعنی:",
options:["۱۱:۴۵","۱۱:۱۵","۱۲:۱۵","۱۲:۴۵"],
answer:0
},

{
question:"پدر علی ۹ گوسفند داشت، او ۲ گوسفند را فروخت و ۴ گوسفند دیگر خرید. حالا پدر علی چند گوسفند دارد؟",
options:["۱۵","۱۱","۳","۶"],
answer:1
},

{
question:"در یک پاکت ۶ پرتقال و ۳ کیوی وجود دارد. شانس بیرون آمدن کدام بیشتر است؟",
options:["پرتقال","کیوی","برابر","هیچ‌کدام"],
answer:0
},

{
question:"۴ بسته‌ی دوتایی پاک‌کن داریم. در مجموع چند پاک‌کن داریم؟",
options:["۶","۴","۸","۱۰"],
answer:2
}
,{
    question:"🌸 ابتدا عبارت را انتخاب کن، سپس پاسخ مناسب آن را انتخاب کن.",

    left:[
        "۱۰ + ۲۰ + ۵ − ۱۰ + ۳",
        "۷۰ − ۲۰ + ۸ − ۱۰",
        "۵ + ۲۰ + ۳۰ + ۴ + ۱۰ − ۳۰ + ۴"
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
}
];

// شماره سوال
let currentQuestion = 0;
let score = 0;
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

        messageBox.innerHTML =
        "🌸 آفرین! پاسخ درست است.";

        messageBox.style.color = "green";

    }else{

        messageBox.innerHTML =
        "❌ پاسخ نادرست بود.";

        messageBox.style.color = "red";

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
            toPersianNumber(questions.length);

            if(score == questions.length){

                resultMessage.innerHTML =
                "🏆 عالی بود! تو قهرمان ریاضی ایران هستی. 🇮🇷";

            }else if(score >= 8){

                resultMessage.innerHTML =
                "🥇 آفرین! عملکردت خیلی خوب بود.";

            }else{

                resultMessage.innerHTML =
                "🌸 تلاش خوبی کردی، دوباره امتحان کن تا ستاره بیشتری بگیری.";

            }

        }

    },1200);

}
function showDragQuestion(q){

    questionTitle.innerHTML =
    "🌸 ابتدا عبارت را انتخاب کن، سپس پاسخ مناسب آن را انتخاب کن.";

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
        `<button class="answerBtn"
        onclick="selectRight(${index})">
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

}

function selectRight(index){

    if(selectedLeft==-1){

        alert("🌸 ابتدا یک عبارت را انتخاب کن.");

        return;

    }

    let q = questions[currentQuestion];

let correct = false;

q.pairs.forEach(function(pair){

    if(pair[0]==selectedLeft && pair[1]==index){

        correct = true;

    }

});

if(correct){

    solvedPairs.push({

    left:selectedLeft,

    right:index

});

    alert("🌸 آفرین! پاسخ درست است.");

}else{

    alert("🌸 این پاسخ درست نیست.");

}

}