
//GLOBAL VARIABLES//
// this targets the form element and stores it in the dom as this variable
var formEl = document.querySelector("#task-form");

// this targets the <ul> elements and store it in the dom as this variable
var tasksToDoEl = document.querySelector("#tasks-to-do");


//** FUNCTION 1 **//
// this function collects the user input and stores it in the variables 
var taskFormHandler = function(event){

    event.preventDefault();

    // this variable targets task-name attribute of the input element, then finds it's value property in the DOM and targets that
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    //this variable targets the task-type attribute of the select element, then finds it's value propert in the DOM and tartets that
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput); 

    //VALIDATE USER INPUT//
    //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }

    // form will resest to default values after a task is submited
    formEl.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}; 

//**FUNCTION 2 **//
// this functions takes the user input and dynamically creates the task items when triggered by the event listener
var createTaskEl = function(taskDataObj) {

    //this creates a new <li> element in the DOM and stores it as listItemEl variable
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name to style it from the css style sheet
    taskInfoEl.className = "task-info";
    // add HTML content to div that will display the taskNameInput we defined earlier and it will display the taskTypeInput we defined earlier
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // this takes the listItem dom element we dynamically created and adds to it the taskInfoEl dom element that we dynamically created 
    listItemEl.appendChild(taskInfoEl);

    //add takes the listItemEl and appends it to th tasksToDoEl <ul> element that we targeted in the DOM earlier 
    tasksToDoEl.appendChild(listItemEl);

};


formEl.addEventListener("submit", taskFormHandler);

