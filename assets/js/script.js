// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));

// let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskName = document.querySelector('#taskName');
const datePicker = document.querySelector('#datepicker');
const taskDescription = document.querySelector('#taskDescription');

const taskSubmitBut = $('#taskSubmit');

const testClass = document.getElementsByClassName('remove')
console.log(testClass)

// default to todo in future
// let todo = 'class goes here'

if (taskList === null){
     taskList = []
} else {
    taskList = JSON.parse(localStorage.getItem("tasks"));
}


// Todo: create a function to generate a unique task id
function generateTaskId() {
    var uniqID = 'id' + (new Date()).getTime(); 
    // https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
    // copied from stackover flow, uses time as a unqiue Id  down tot he middlesecond.
    // better ways to keep it unqiue if multi users involved but easy for this situation
    // and better for sorting them.
    return uniqID

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log('creating taskCard')
    // console.log(task)

    // hate that i didn't think of this
    // copied concept from H.S. , 
    // but worked into own code to understand better
    const cardObject =
    $(`<div class="ui-widget-content draggable" id="${task.uniqID}">
        <p> ${task.taskName} </p>
        <p> ${task.taskDate} </p>
        <p> ${task.taskDescription} </p>
        <button onclick="handleDeleteTask(event)">Remove</button>
    </div>
    `
    )
    //does samething as above but their idea was smaller and prettier
    // cardObject = document.createElement("div")
    // removeButton = document.createElement("button")
    // cardObject.setAttribute("class",`ui-widget-content draggable `);
    // removeButton.setAttribute("onclick","handleDeleteTask()")
    // $(".draggable").draggable();


    // let taskObject = JSON.parse(taskList[i])
    // console.log(taskObject)
    // removeButton.innerHTML = 'remove'
    // cardObject.append(taskObject.taskName)
    // cardObject.append(taskObject.taskDate)
    // cardObject.append(taskObject.taskDescription)
    // cardObject.append(removeButton)
// console.log(task.taskStatus)
    switch (task.taskStatus){
        case 'placeHolder':
            console.log(`you understand Switch cases`)    
            break;
        case 'in-progress-cards':
            //  \/ this is the problem?
            $('#in-progress-cards').append(cardObject)
            break;
        case 'done-cards':
            $('#done-cards').append(cardObject)
            break;
        case 'todo-cards':
            $('#todo-cards').append(cardObject) 



    }
    // $('#todo-cards').append(cardObject)




// $('#todo-cards').append("Some appended text.")
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
    console.log("displaying task?")
    for (let i = 0; i < taskList.length; i++) {
        // console.log(JSON.parse(taskList[i]))
        createTaskCard(JSON.parse(taskList[i]))
}
$(".draggable").draggable({
    revert: "invalid",
    zIndex: 100,
    helper: "clone",
    cursor: "grab",
    // appendTo: '.drop'
} );

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){ 
    console.log( $(this) )
    
    console.log( event.target.parentElement.id)
    for (let i = 0; i < taskList.length; i++ ) {
        if(JSON.parse(taskList[i]).uniqID == event.target.parentElement.id) {
            console.log ('works?')
            
            
~
            return
        }
        else {

            console.log ('no works?')
        }
    }
    // console.log( event.target.offsetParent.children )


}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
}

$(".droppable").droppable({
    accept: ".draggable",
    // accept: "#in-progress-cards > #todo-cards",
    drop: function(event, ui){
        console.log(ui)
        console.log(ui.draggable[0].id)
        // console.log(JSON.parse(taskList[i]).uniqID)
        let task
    for (let i = 0; i < taskList.length; i++ ) {
        // console.log(JSON.parse(taskList[i]).uniqID)
        if (JSON.parse(taskList[i]).uniqID == ui.draggable[0].id ) {
            console.log(JSON.parse(taskList[i]).taskStatus)
            console.log(event.target.children[0].id)
            tempTaskList = taskList
            taskObject = JSON.parse(taskList[i])
            taskObject.taskStatus = event.target.children[0].id
            // console.log(taskObject)
            // console.log(tempTaskList)
            tempTaskList[i] = JSON.stringify(taskObject)
            // console.log(tempTaskList)
            localStorage.setItem("tasks" , JSON.stringify(tempTaskList))
            console.log('MATCH!!!')
            break;
        } else{
         console.log('not a match')
        }

    }   
        // $(this) is annoying to think about.  
        // $( this )
        // .find( ".cards")
        // .append(ui.draggable[0].outerHTML);


        $('.cards').html("");
         renderTaskList();

    },
    classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
        } 
})

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    
    $( "#datepicker" ).datepicker(); 
    renderTaskList()


    $(taskSubmitBut).click(function(){
        // console.log('save changes button hit')   
        let uniqID = generateTaskId()
        // console.log(`this is the unqiue id` + uniqID )

        let newTask = {
            uniqID: uniqID,
            taskName : taskName.value,
            taskDate: datePicker.value,
            taskDescription : taskDescription.value,
            taskStatus: 'todo-cards'


          };
        //   console.log(newTask)
          taskList.push(JSON.stringify(newTask))
          localStorage.setItem("tasks" , JSON.stringify(taskList))
          createTaskCard(newTask)
      });

});
