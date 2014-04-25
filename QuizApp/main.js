"use strict";
var score = 0;
var CurrQst = 0;

var qst1 = {
    content: "What's the color of the Moon",
    option1: ["Green", 1],
    option2:["Red",2],
    option3:["Blue",3],
    option4:["Pink",4],
    ans:3
}
var qst2 = {
    content: "What's the color of the sky",
    option1: ["Brown", 1],
    option2: ["Red", 2],
    option3: ["Yello", 3],
    option4: ["Black", 4],
    ans: 1
}
var qst3 = {
    content: "What's the color of the Stars",
    option1: ["White", 1],
    option2: ["Dark Blue", 2],
    option3: ["Red", 3],
    option4: ["None of the Above", 4],
    ans: 2
}

var qst4 = {
    content: "What's the color of the sky",
    option1: ["Brown", 1],
    option2: ["Red", 2],
    option3: ["Yello", 3],
    option4: ["Black", 4],
    ans: 4
}
var qst5 = {
    content: "What's the color of the Stars",
    option1: ["White", 1],
    option2: ["Dark Blue", 2],
    option3: ["Red", 3],
    option4: ["None of the Above", 4],
    ans: 1
}

var qstArray = [qst1, qst2, qst3, qst4, qst5];

var showQst = function (QstNo) {
    //Display a question
    var i = QstNo - 1; //get the question number
    document.getElementById("qstTitle").innerHTML = "Question " + QstNo;

    //insert the question
    document.getElementById("qst").innerHTML = qstArray[i].content;
    var optarea = document.getElementById("optArea");

    //insert the options
    optarea.innerHTML = "<input type='radio' id='optId' name='opt' value='" + qstArray[i].option1[1] + "'>" + qstArray[0].option1[0] + "<br>";
    optarea.innerHTML = optarea.innerHTML + "<input type='radio' id='optId' name='opt' value='" + qstArray[i].option2[1] + "'>" + qstArray[i].option2[0] + "<br>";
    optarea.innerHTML = optarea.innerHTML + "<input type='radio' id='optId' name='opt' value='" + qstArray[i].option3[1] + "'>" + qstArray[i].option3[0] + "<br>";
    optarea.innerHTML = optarea.innerHTML + "<input type='radio' id='optId' name='opt' value='" + qstArray[i].option4[1] + "'>" + qstArray[i].option4[0] + "<br>";

    //check the hidden radio button
    document.getElementById("opt0").checked = true; //this makes sure that something is selected at all time
};

var submitAns = function () {
    var SelOpt = parseInt(document.querySelector('input[name = "opt"]:checked').value);

    //check if an option was selected
    if (SelOpt === 0) {
        alert("You have to Select one of the options");
    } else {
        //disable the submit button
        document.getElementById("submit").disabled = true;
        //Disable the radio buttons
        document.getElementById("optArea").disabled = true;

        //check for the correct answer
        if (qstArray[CurrQst-1].ans === SelOpt) {
            document.getElementById("result").innerHTML = "Correct Answer";
            score += 20;
        } else {
            document.getElementById("result").innerHTML = "Wrong Answer";
        }
    }

}

var NextQst = function () {

    //exit the function if the user didn't answer a question
    //
    if (document.getElementById("submit").disabled===false) {
        alert("You have not answered the current question");
        return;
    }
    //Increament the current question and call showqst()
    CurrQst += 1;
    //check for end of question
    if (CurrQst > qstArray.length) {
        //check if finish button was clicked, then display the score
        if (document.getElementById("nextQst").innerHTML === "Finish") {
            document.getElementById("QuizArea").innerHTML = "Total Score: " + score + "%";
            return;
        }
        document.getElementById("nextQst").innerHTML = "Finish";
        document.getElementById("QstArea").innerHTML = "Click Finish to view your Score"
    } else {
        //Clear the response area
        document.getElementById("result").innerHTML = "";
        //Get the next Question
        showQst(CurrQst);
        //Enable the submit button
        document.getElementById("submit").disabled = false
        //Enable the radio buttons
        document.getElementById("optArea").disabled = false;
    }


   
};

//show the first question
CurrQst += 1;
showQst(CurrQst);