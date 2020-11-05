
//GLOBAL VARIABLES//DOM ELEMENTS

// this targets the <main> element in the html doc
var pageContentEl = document.querySelector("#page-content");

// this targets the form element and stores it in the dom as this variable
var formEl = document.querySelector("#task-form");

// this targets the <ul> elements and store it in the dom as this variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

// this will help us to assign a unique ID to tasks as they get created (using the html data-* attribute)
var taskIdCounter = 0;


//** FUNCTION 1 **//
// this function collects the user input and stores it in the variables when triggered by event listener
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

    var isEdit = formEl.hasAttribute("data-task-id");
   
    //has data attribute, so get task id and call function to complete edit process
    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else{

        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }
}; 

//**FUNCTION 2 **//
// this functions takes the user input and dynamically creates the task items when triggered by the event listener
var createTaskEl = function(taskDataObj) {

    //this creates a new <li> element in the DOM and stores it as listItemEl variable
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute (data-*)
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    listItemEl.setAttribute("draggable","true");

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
   // get target element from event
   var targetEl = event.target;

   //edit button was clicked
   if (targetEl.matches(".edit-btn")) {
       var taskId = targetEl.getAttribute("data-task-id");
       editTask(taskId);
   }
   //delete button was clicked
   else if(targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
   }
};

//**FUNCTION 5 **//
//this function allows us to delete a specific task by using taskId as a parameter
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

//**FUNCTION 6**//
//this function allows us to edit a specific task by using taskId as a parameter 
var editTask = function(taskId) {
    
    //get task list item element 
    var taskSelected = document.querySelector(".task-item[data-task-id='" +taskId + "']");

    //get content from task name and type 
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name= 'task-name']").value =taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id",taskId);
    
};

//**FUNCTION 7 **//
//this function will allow us to complete editing a task
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    
    //reset form by removing task id and changing button back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskStatusChangeHandler = function(event){
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" +taskId + "']");

    if(statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
};

var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain",taskId);
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
};

var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
    } 
};

var dropTaskHandler = function(event){
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id +"']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType= dropZoneEl.id;
    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if(statusType ==="tasks-to-do"){
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress"){
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
};

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);