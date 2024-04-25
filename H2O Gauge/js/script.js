let questions = [
    {
        question: "How do you take a bath?",
        type: "options",
        topic: "Bath",
        options: ["Shower", "Bucket"],
        add: [9, 25],
        nextQ: true,
    },
    {
        question: "For how long do you shower in a week?(in minutes)",
        type: "input",
        topic: "Bath",
        nextQ: false,
    },
    {
        question: "How do you flush when using the toilet?",
        type: "options",
        topic: "Toilet",
        options: ["Half flush", "Full flush"],
        add: [6, 10],
        nextQ: true,
    },
    {
        question: "How many times do you flush in a week?",
        type: "input",
        topic: "Toilet",
        nextQ: false,
    },
    {
        question: "How do you wash your clothes?",
        type: "options",
        topic: "Laundry",
        options: ["Top load", "Front load", "With hands"],
        add: [120, 70, 80],
        nextQ: true,
    },
    {
        question: "How many times do you wash your clothes in a week?",
        type: "input",
        topic: "Laundry",
        nextQ: false,
    },
    {
        question: "How do you wash your utensils?",
        type: "options",
        topic: "Kitchen",
        options: ["Dishwasher", "Manually"],
        add: [11, 55],
        nextQ: true,
    },
    {
        question: "How many times do you wash your utensils in a week?",
        type: "input",
        topic: "Kitchen",
        nextQ: false,
    },
    {
        question: "How do you wash your car?",
        type: "options",
        topic: "Car Wash",
        options: ["Garden Hose", "Bucket", "I don't have"],
        add: [150, 25, 0],
        nextQ: false,
    },
    {
        question: "How many liters of water do you save per week?",
        type: "input",
        topic: "Preservation",
    },
];
let question = document.getElementById("question");
let topic = document.getElementById("topic");
let opt = document.getElementById("opt");
let fprint = document.getElementById("footprint");
let btn = document.getElementById("btn");
let currQuestion = 0;
let footprint = 0;
let value = 0;

function showQuestion(obj) {
    topic.innerHTML = obj.topic;
    question.innerHTML = obj.question;
    opt.innerHTML = "";
    if (obj.type == "options") {
        for (let i = 0; i < obj.options.length; i++) {
            const choicesdiv = document.createElement("div");
            const choice = document.createElement("input");
            const choiceLabel = document.createElement("label");

            choice.type = "radio";
            choice.name = "answer";
            choice.value = i;
            choice.className = "choice"

            choiceLabel.textContent = obj.options[i];

            choicesdiv.appendChild(choice);
            choicesdiv.appendChild(choiceLabel);
            opt.appendChild(choicesdiv);
        }
    }
    if (obj.type == "input") {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");

        choice.type = "number";
        choice.id = "no";

        choicesdiv.appendChild(choice);
        opt.appendChild(choicesdiv);
    }
}
showQuestion(questions[0]);

function nextQuestion() {
    if (currQuestion < questions.length - 1) {
        currQuestion++;
        showQuestion(questions[currQuestion]);
    } else {
        showFootprint();
    }
}

function checkAns() {
    let selectedAns;
    let score = 0;

    if (questions[currQuestion].type == "options") {
        selectedAns = questions[currQuestion].options[document.querySelector('input[name="answer"]:checked').value];
        if (questions[currQuestion].nextQ) {
            value = questions[currQuestion].add[document.querySelector('input[name="answer"]:checked').value];
        } else {
            score += questions[currQuestion].add[document.querySelector('input[name="answer"]:checked').value];
        }
        footprint += score;
        nextQuestion();
    } else {
        selectedAns = Number(document.getElementById("no").value);
        if (selectedAns != 0 && questions[currQuestion].topic != "Preservation") {
            score = selectedAns * value;
            value = 0;
            footprint += score;
        } else if (questions[currQuestion].topic == "Preservation") {
            footprint -= selectedAns;
        } else {
            footprint += value;
            value = 0;
        }
        nextQuestion();
    }
}
function showFootprint() {
    topic.innerHTML = "Your Water Footprint";
    question.innerHTML = `<center>${footprint} litres/week</center>`;
    opt.innerHTML = "";
    fprint.style.display = "block";
    btn.style.display = "none";
}

