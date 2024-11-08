window.addEventListener("load", setup);

// localStorage:
//    key: student_name
//    value: "current_score, last_completed_question_index" 

function setup() {
    generate_some_fake_data();
    get_DOM_references();
    init_quiz();
}

function generate_some_fake_data() {
    // PBF - Add two local storage entries
    // Your name, last question completed, current score
    // someone else quiz score
    localStorage.setItem("Maria Ferreira", "5, 30");
    localStorage.setItem("Brenno Donato", "7, 60");
}

function get_DOM_references() {
    question_reference = document.getElementById("question");
    options_reference = document.getElementById("options");
    button_1_reference = document.getElementById("button-1");
    button_2_reference = document.getElementById("button-2");
    options_reference = document.getElementById("options");
    student_name_reference = document.getElementById("student_name");
    label_for_student_name_reference = document.getElementById("label_for_student_name");
    result_container_reference = document.getElementById("result_container");
    quiz_container_reference = document.getElementById("quiz-container");
    result_container_reference = document.getElementById("result-container");
    clear_web_storage_reference = document.getElementById("button-3");
    show_students_scores_reference = document.getElementById("button-4");
    results_text_area_reference = document.getElementById("saved_results");
}

function init_quiz() {
    generate_questions();
    reset_gui();
}

function generate_questions() {
    questions = [
        { question: "1) What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
        { question: "2) What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
        { question: "3) What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
        { question: "4) What is the freezing point of water?", options: ["0°C", "100°C", "32°F", "212°F"], answer: 0 },
        { question: "5) Who wrote 'Hamlet'?", options: ["Mark Twain", "Charles Dickens", "William Shakespeare", "Ernest Hemingway"], answer: 2 },
        { question: "6) What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
        { question: "7) What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "200,000 km/s"], answer: 0 },
        { question: "8) What element does 'O' represent?", options: ["Osmium", "Oxygen", "Gold", "Silver"], answer: 1 },
        { question: "9) What is the main language spoken in Brazil?", options: ["Spanish", "Portuguese", "English", "French"], answer: 1 },
        { question: "10) What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"], answer: 3 }
    ];
}

function reset_gui() {
    // make the quiz div visible
    quiz_container_reference.style.display = "block";

    // remove any previous question
    question_reference.innerHTML = "";
    options_reference.innerHTML = "";

    // set button 1 to visible
    button_1_reference.style.display = "inline";

    // set button 1 to disable
    button_1_reference.disabled = true;

    // set button 1 caption to proceed
    button_1_reference.textContent = "Proceed";

    // set button 2 to invisible
    button_2_reference.style.display = "none";

    // set label for the student name visible
    label_for_student_name_reference.style.display = "inline";

    // set student name text field visible
    student_name_reference.style.display = "inline";

    // clear any student name from previous test
    student_name_reference.value = "";

    // add event listener for the text input
    student_name_reference.addEventListener("keyup", handle_student_name_changes);

    // show "clear web storage" button
    clear_web_storage_reference.style.display = "block";
    clear_web_storage_reference.addEventListener("click", handle_clear_storage_button);

    // show "students results" button
    show_students_scores_reference.style.display = "block";
    show_students_scores_reference.addEventListener("click", show_students_scores);
    results_text_area_reference.style.display = "none";
}

function handle_student_name_changes() {
    if (student_name_reference.value != "") {
        // enable button 1
        button_1_reference.disabled = false;

        // add event listener for button 1
        button_1_reference.addEventListener("click", start_quiz);

        // hide the "clear results from web storage" button
        clear_web_storage_reference.style.display = "none";
        results_text_area_reference.textContent = "";

        // hide the "show students scores" button and text area
        show_students_scores_reference.style.display = "none";
        results_text_area_reference.style.display = "none";
    } else {
        reset_gui();
    }
}

function start_quiz() {
    get_student_progress();
    restart_or_resume_quiz();
}

function get_student_progress() {
    // getting the student name from HTML input text field to be used to
    // search the student quiz info in the local storage (student name => key)
    student_name = student_name_reference.value;

    // PBF - get student info from the local storage
    let student_info_in_localstorage = localStorage.getItem(student_name);
    

    // PBF - check if there is no student info in the local storage
    if(student_info_in_localstorage != null) {
        
        // PBF - if there is
        let quiz_progress = student_info_in_localstorage.split(",");
            // PBF - retrieve the quiz last completed question index
            last_completed_question_index = parseInt(quiz_progress[0].trim());

            // PBF - retrieve the current score
            current_score = parseInt(quiz_progress[1].trim());
    } else {

    

        // PBF - if there isn't => new student taking the quiz
            // PBF - set current question index to 0
            last_completed_question_index = 0;

            // PBF - set the current score to 0
            current_score = 0;
    }
}

function restart_or_resume_quiz() {
    if (last_completed_question_index == 0) {
        button_1_reference.textContent = "Start Quiz";
        button_2_reference.style.display = "none";
        button_1_reference.addEventListener("click", restart_quiz);
    } else {
        button_1_reference.textContent = "Resume Quiz";
        button_2_reference.textContent = "Restart Quiz";
        button_2_reference.style.display = "inline";
        button_1_reference.addEventListener("click", resume_quiz);
        button_2_reference.addEventListener("click", restart_quiz);
    }
}

function restart_quiz() {
    button_1_reference.style.display = "none";
    button_2_reference.style.display = "none";
    label_for_student_name_reference.style.display = "none";
    student_name_reference.style.display = "none";
    quiz_container_reference.style.display = "block";
    result_container_reference.style.display = "none";
    results_text_area_reference.style.display = "none";

    // reset or override student info 
    // PBF - set question index to 0
    last_completed_question_index = 0;

    // PBF - set current score to 0
    current_score = 0;

    // PBF - save pair of (key, value) in the local storage
        // where key = student name
        // value = a combination of question index and current score

    button_1_reference.textContent = "Next Question";
    load_next_question();
}

function resume_quiz() {
    // hide buttons, label, and input fields
    button_1_reference.style.display = "none";
    button_2_reference.style.display = "none";
    label_for_student_name_reference.style.display = "none";
    student_name_reference.style.display = "none";
    last_completed_question_index++;
    load_next_question();
}

function load_next_question() {
    console.log("last_completed_question_index: " + last_completed_question_index);
    if (last_completed_question_index >= questions.length) {
        display_result();
        return;
    }

    question_reference.textContent = questions[last_completed_question_index].question;
    options_reference.innerHTML = '';

    let options = questions[last_completed_question_index].options;
    for (let index=0; index<options.length; index++) {
        let button_reference = document.createElement("button");
        if(index == questions[last_completed_question_index].answer) {
            button_reference.setAttribute("correct_answer","yes");
        }
        button_reference.textContent = options[index];
        button_reference.style.margin = "10px";
        button_reference.style.display = "block";
        button_reference.addEventListener("click", (e)=>check_answer(e));
        options_reference.append(button_reference);
    }
}

function check_answer(e) {
    // checking if the source of the event has the correct_answer attribute.
    if(e.srcElement.attributes.correct_answer) {
        // the answer is right
        current_score+=10;

        // alert that the answer is right
        alert("Correct");

    } else {
        // alert that the answer is not right
        alert("Incorrect");
    }

    // PBF - update the localstorage
    localStorage.setItem(student_name, `${last_completed_question_index}, ${current_score}`);
 
    last_completed_question_index++;

    // display next question
    load_next_question();
}

function handle_clear_storage_button() {
    // PBF - clear all saved registers from local storage
    localStorage.clear();

    results_text_area_reference.textContent = "";
    results_text_area_reference.style.display = "none";
}

function show_students_scores() {
    // to loop over students' scores, we first need to get the 
    // number of students saved in the local storage
    // PBF - get the number of students that have started 
    let number_of_entries = localStorage.length;

    // PBF - and/or finished the quiz in the local storage
    // PBF - loop over the records found in the local storage
    let results = "";
    for(let key_number = 0; key_number < number_of_entries; key_number++) {
        let student_name = localStorage.key(key_number);
        let info = localStorage.getItem(student_name).split(",");


        results += `Student name: ${student_name} = Score: ${info[0]}, ${info[1]}\n`;
    }


    


    // PBF - and concatenate them as a single string to be 


    // PBF - used in the results text area of the application



    // PBF - display the results text area (it was hidden during quiz)
}

function display_result() {
    quiz_container_reference.style.display = "none";
    result_container_reference.style.display = "block";
    result_container_reference.innerHTML = `You scored ${current_score}`;
    button_1_reference.style.display = "inline";
    button_1_reference.textContent = "Do Quiz Again";
    button_1_reference.addEventListener("click", restart_quiz);
    button_2_reference.textContent = "Exit";
    button_2_reference.style.display = "inline";
    button_2_reference.addEventListener("click", reset_gui);
}