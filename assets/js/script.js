
//GLOBAL VARIABLES//

// this targets the <main> element in the html doc
var pageContentEl = document.querySelector("#page-content");

// this targets the form element and stores it in the dom as this variable
var formEl = document.querySelector("#task-form");

// this targets the <ul> elements and store it in the dom as this variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

// this will help us to assign a unique ID to tasks as they get created (using the html data-* attribute)
var taskIdCounter = 0;


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

    //add task id as a custom attribute (data-*)
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name to style it from the css style sheet
    taskInfoEl.className = "task-info";
    // add HTML content to div that will display the taskNameInput we defined earlier and it will display the taskTypeInput we defined earlier
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // this takes the listItem dom element we dynamically created and adds to it the taskInfoEl dom element that we dynamically created 
    listItemEl.appendChild(taskInfoEl);

    //createTaskActions() returns a DOM element that we can store in a variable...taskActionsEl
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add takes the listItemEl and appends it to th tasksToDoEl <ul> element that we targeted in the DOM earlier 
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

};


//**FUNCTION 3**// 
//this function is going to dynamically create form elements for each dynamically created task. This function has a parameter of taskId. This is how we can pass a different id into the function each time to keep track of which elements we're creating for which task
var createTaskActions = function(taskId) {

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //dynamically create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //dynamically create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //dynamically create the dropdown (aks <select> element)
    var statusSelectEl =document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    // dynamically create <option> elements with an array and for loop
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i< statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        //append to <select> element 
        statusSelectEl.appendChild(statusOptionEl);

    }

    return actionContainerEl;

};

//**FUNCTION 4**//
//this function allows us to get the the targeted delete button's task id
var taskButtonHandler = function(event){
    console.log(event.target);

    if(event.target.matches(".delete-btn")){
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        // we then call the deleteTask() function
        deleteTask(taskId);
    }
};

//**FUNCTION 5 **//
//this function allows us to delete a specific task by using taskId as a parameter
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};


formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

