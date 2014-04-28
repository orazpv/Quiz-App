"use strict";
var score = 0;
var CurrQst = 0;
var displayedOpt = [];

var qst1 = {
    content: "This musician was born in what year?",
    options: [["1956", 1],["1958",2],["1955",3],["1950",4]],
    ans: 2,
    pix:"mj.jfif"
}
var qst2 = {
    content: "This is the wife of the President of which country?",
    options: [["Kenya", 1], ["Obama", 2],["America", 3],["Blacks", 4]],
    ans: 3,
    pix: "obama.jfif"
}
var qst3 = {
    content: "This man died at the age of",
    options: [["87", 1],["109", 2],["83", 3],["97", 4]],
    ans: 4,
    pix: "mandela.jfif"
}

var qst4 = {
    content: "What company owns this logo?",
    options: [["Coder Camps", 1],["Coders for Rent", 2],["Camps Coders", 3],["Coding Camps", 4]],
    ans: 1,
    pix: "codercamps.jpg"
}
var qst5 = {
    content: "Who's picture is this",
    options: [["Graca Machel", 1],["Dark Blue", 2],["Rosa Parks", 3], ["Mary Jones", 4]],
    ans: 3,
    pix: "rosa.jfif"
}
//Put the questions in an array
var qstArray = [qst1, qst2, qst3, qst4, qst5];

//Initialise an array for displayed questions
var displayedQsts = [];
var getNextRandomQuestion = function () {
    "use strict";

    var k,found;
    //stay in a loop till it generates a number that is not in the array of displayed questions
   do {
       k = Math.floor(Math.random() * (4 - 0 + 1)) + 0;  //random number from 0 to 4
       found=displayedQsts.indexOf(k);
   } while (found !== -1)

    //Insert the generated number into the array
    displayedQsts.push(k);
    return k;
};


var getNextRandomOption = function () {
    "use strict";
    
    var k, found;
    //stay in a loop till it generates a number that is not in the array of displayed options
    do {
        k = Math.floor(Math.random() * (3 - 0 + 1)) + 0;  //random number from 0 to 4
        found = displayedOpt.indexOf(k);
    } while (found !== -1)

    //Insert the generated number into the array
    displayedOpt.push(k);
    return k;
};

var showQst = function (QstNo) {
    //Display a question
    
    var i = getNextRandomQuestion(); //get the question number
    document.getElementById("qstTitle").innerHTML = "Question " + QstNo + ".";

    //insert the question
    document.getElementById("qst").innerHTML = qstArray[i].content;

    //Insert the image
    document.getElementById("qstimg").src = "pix/" + qstArray[i].pix;

    //clear the option area
    var optarea = document.getElementById("optArea");
    optarea.innerHTML = "";

    //insert the options
    //claer all the elements of the displayed options array
    displayedOpt.length = 0;
    var k;
    for (var j = 0; j < 4; j++) {
        //Generate a random no
        k = getNextRandomOption();
        optarea.innerHTML = optarea.innerHTML + "<input type='radio' id='optId' name='opt' value='" + qstArray[i].options[k][1] + "'> " + qstArray[i].options[k][0] + "<br>";
    }
    
    //check the hidden radio button
    document.getElementById("opt0").checked = true; //this makes sure that something is selected at all time
    //Animate the Question title
    document.getElementById("qstTitle").className += " animate2";

    //Animate the Question
    document.getElementById("qst").className += " animate";
    //Animate the Question image
    document.getElementById("qstimg").className += " animate4";
    //Animate the Question answer options
    document.getElementById("optArea").className += " animate3";
};

var submitAns = function () {
    var SelOpt = parseInt(document.querySelector('input[name = "opt"]:checked').value);

    //check if an option was selected
    if (SelOpt === 0) {
        //Display error msg
        document.getElementById("ShowAlert").click(); //click the link that opens the modal window
        document.getElementById("myModalLabel").innerHTML = "Alert"; //set the title
        document.getElementById("AlertMsg").innerHTML = "You have to Select one of the options"; //set the msg
    } else {
        //disable the submit button
        document.getElementById("submit").disabled = true;
        //Disable the radio buttons
        document.getElementById("optArea").disabled = true;
        //Remove animation from the questions title
        document.getElementById("qstTitle").className = document.getElementById("qstTitle").className.replace("animate2", "");
        //Remove animation from the questions
        document.getElementById("qst").className = document.getElementById("qst").className.replace("animate", "");
        //Remove animation from the questions Image
        document.getElementById("qstimg").className = document.getElementById("qstimg").className.replace("animate4", "");
        //Remove animation from the questions answer options
        document.getElementById("optArea").className = document.getElementById("optArea").className.replace("animate3", "");

        //check for the correct answer
        if (qstArray[displayedQsts[displayedQsts.length-1]].ans === SelOpt) {
            //document.getElementById("result").innerHTML = "Correct Answer";
            //Display correct
            document.getElementById("ShowAlert").click(); //click the link that opens the modal window
            document.getElementById("myModalLabel").innerHTML = "Well Done!"; //set the title
            document.getElementById("AlertMsg").innerHTML = "Correct Answer"; //set the msg
            score += 20;
        } else {
            //document.getElementById("result").innerHTML = "Wrong Answer";
            //Display wrong answer
            document.getElementById("ShowAlert").click(); //click the link that opens the modal window
            document.getElementById("myModalLabel").innerHTML = "Oops!"; //set the title
            document.getElementById("AlertMsg").innerHTML = "Wrong Answer"; //set the msg
        }
    }

}

var NextQst = function () {

    //exit the function if the user didn't answer a question
    //
    if (document.getElementById("submit").disabled===false) {
        //Display error msg
        document.getElementById("ShowAlert").click(); //click the link that opens the modal window
        document.getElementById("myModalLabel").innerHTML = "Information"; //set the title
        document.getElementById("AlertMsg").innerHTML = "You have not answered the current question"; //set the msg
        return;
    }
    //Increament the current question and call showqst()
    CurrQst += 1;
    //check for end of question
    if (CurrQst > qstArray.length) {
        //check if finish button was clicked, then display the score
        if (document.getElementById("nextQst").innerHTML === "Finish") {
            //Display the score
            document.getElementById("QuizArea").innerHTML = "Total Score: " + score + "%";
            return;
        }
        document.getElementById("nextQst").innerHTML = "Finish";
        document.getElementById("QstArea").innerHTML = "Click Finish to view your Score"
        //hide the image
        document.getElementById("qstimg").className += " hide";
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
var Startup = function () {
    //hide the instruction area
    document.getElementById("instructions").className += " hide";
    //hide the startup button
    document.getElementById("startup").className += " hide";

    //show the Quiz area
    document.getElementById("QuizArea").className = document.getElementById("QuizArea").className.replace('hide', '');
    //show the submit and next button
    document.getElementById("submitNext").className = document.getElementById("submitNext").className.replace('hide', '');
    //Show the image frame
    document.getElementById("qstimg").className = document.getElementById("qstimg").className.replace('hide', '');
    
    //show the first question
    CurrQst += 1;
    showQst(CurrQst);
    
};