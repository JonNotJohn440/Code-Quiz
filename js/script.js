const $timer = document.getElementById("timer");
const $start = document.getElementById("start");
const $quiz = document.getElementById("quiz");
const $score = document.getElementById("score");
let interval
let countdown = 10
const quizArr = [
    {
        question:"The first question",
        answer:["answer 1","answer 2","answer 3", "answer 4"],
        answerKey:"answer 1",
    },
    
]
const startQuizHandler =(event) => {
    startQuiz()
// console.log(event)
// startTimer()
// }
// const startTimer =() => {
// interval = setInterval(() => {
//     countdown-- 
//     if (countdown <= 0){
//         endGame()
//     }
//     $timer.textContent=countdown
// },1000)
}

const endGame =() => {
    clearInterval(interval);
}




















$start.addEventListener("click",startQuizHandler)