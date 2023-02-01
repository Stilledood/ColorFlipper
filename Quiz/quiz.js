
const quizData = [
    {
        question:"In which Italian city can you find the Colosseum?",
        a:"Venice",
        b:"Rome",
        c:"Naples",
        d:"Milan",
        correct:'b'
    },

    {
        question:"In the TV show New Girl, which actress plays Jessica Day?",
        a:"Zooey Deschanel",
        b:"Kaley Cuoco",
        c:"Jennifer Aniston",
        d:"Alyson Hannigan",
        correct:'a'
    },

    {
        question:"What is the largest canyon in the world?",
        a:"Verdon Gorge, France",
        b:"King’s Canyon, Australia",
        c:"Grand Canyon, USA",
        d:"Fjaðrárgljúfur Canyon, Iceland",
        correct:'c'
    },

    {
        question:"How long is the border between the United States and Canada?",
        a:"3,525 miles",
        b:"4,525 miles",
        c:"5,525 miles",
        d:"6,525 miles",
        correct:'c'
    },

    {
        question:"What is the largest active volcano in the world?",
        a:"Mount Etna",
        b:"Mount Vesuvius",
        c:"Mouna Loa",
        d:"Mount Batur",
        correct:'c'
    },

];

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const questionText = document.getElementById("question");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let finalScore = 0;
loadQuiz();

function loadQuiz() {
    const currentQuestion = quizData[currentQuiz];
    questionText.innerText = currentQuestion.question;
    a_text.innerText = currentQuestion.a;
    b_text.innerText = currentQuestion.b;
    c_text.innerText = currentQuestion.c;
    d_text.innerText = currentQuestion.d;


    
}

submitBtn.addEventListener('click',() =>{
    let corectAnswer = quizData[currentQuiz].correct;
    console.log(corectAnswer);
    console.log(document.getElementById(corectAnswer).checked);
    if (document.getElementById(corectAnswer).checked){
        finalScore++;
    }


    currentQuiz++;
    if (currentQuiz < quizData.length){
        loadQuiz();
    }else{
        alert(finalScore);

    }
    
});
