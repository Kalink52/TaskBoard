// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskSubmitBut = $('#taskSubmit');
// console.log($('todo-cards'))

//note for self later because you won't be able to touch this for a week
//it seems like you'll need to possibly add two more details to your object 
//maybe a unique task Id, and something that 

// should leave testing stuff inhere to 
// show my workflow?????
let testObject = {
    title: "This sucks",
    // jquery date picker
    date: "need to use actual date data",
    description: "something"
}
let testArray = [testObject, testObject, testObject]

console.log(testArray)



// Todo: create a function to generate a unique task id
function generateTaskId() {
    //https://api.jqueryui.com/uniqueId/
    // .uniqueId()??


}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log("displaying task?")

    for (let i = 0; i < testArray.length; i++) {
        cardObject = document.createElement("div")
        console.log(cardObject)
        cardObject.setAttribute("class","ui-widget-content draggable");
        // $(".draggable").draggable();
        let taskObject = testArray[i]
        cardObject.append(taskObject.title)
        cardObject.append(taskObject.date)
        cardObject.append(taskObject.description)
        $('#todo-cards').append(cardObject)
    // $('#todo-cards').append("Some appended text.")
    }
    // moved here to improve for loop?
    // need to move dragged object to front zaxis?

    $(".draggable").draggable({
        revert: "invalid",
        zIndex: 100,
        // containment: "document",
        helper: "clone",
        cursor: "move"
    } );
    $(".droppable").droppable({
        accept: ".draggable",
        // accept: "#in-progress-cards > #todo-cards",
        drop: function(event, ui){
            console.log($( this ).find( "div"))
            
            console.log(   $( this).find( $('#todo-cards')));
            $( this )
            .find( "div")
              .append(cardObject);
        },
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
            } 
    })

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log("adding task?")
    return


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log("how does this get called?") // right now it shouldn't
// https://jqueryui.com/droppable/#revert
    // console.log(event)
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('Document is ready?')
    $( "#datepicker" ).datepicker(); // maybe put in better place?

    $(taskSubmitBut).click(function(){
        console.log('save changes button hit')
        handleAddTask() //this will be skipped for now
        renderTaskList()
      });

});


