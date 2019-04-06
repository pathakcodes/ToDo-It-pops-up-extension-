var ul = document.getElementById('list');
var li ;
var todos = new Array;
var check = new Array ;

var addButton = document.getElementById('add');
addButton.addEventListener('click',addItem);

var removeButton = document.getElementById('remove');
removeButton.addEventListener('click' , removeItem);




function addItem()
{
    var input = document.getElementById('input');
    var item = input.value;
    ul = document.getElementById('list');
    var textnode = document.createTextNode(item);

    if(item.length > 1 ) 
    {
        //create li
        li = document.createElement('li');

        //create checkbox 
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('id', 'check'); //to set id 

        //create label
        var label =  document.createElement('label');
        label.setAttribute('for' , 'item');
        
        //add these element to application
        ul.appendChild(label);
        li.appendChild(checkbox);
        label.appendChild(textnode);
        li.appendChild(label);

        ul.insertBefore(li,ul.childNodes[0]);
        


        li.className = 'visual';

        input.value= ' ';

        ui_mem();
  
    }

}





function removeItem() {
//REMOVING FROM DISPLAY
    li = ul.children;

    for (let index = 0; index < li.length; index++) {
        while (li[index] && li[index].children[0].checked) {
            ul.removeChild(li[index]);
            
        }
   
    }

   ui_mem();
     
}

function ui_mem (){

    var li = ul.children;

    //console.log(ul.children[]);

    var todos = new Array;
    var check = new Array ;

    for(var i = 0 ; i < li.length ; i++)
    {
        todos[i] = li[i].children[1].innerText ;
        check[i] = li[i].children[0].checked ;
    }
    
    
    
     localStorage.setItem('todo',JSON.stringify(todos)) ;
     localStorage.setItem('check',JSON.stringify(check)) ;
  

}
//storage

function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos ;
}

function get_checked() {
    var check = new Array;
    var check_str = localStorage.getItem('check');
    if (check_str !== null) {
        check = JSON.parse(check_str); 
    }
    return check ;
}


 

function show() {

    var todos = get_todos();
    var check = get_checked();
    ul = document.getElementById('list');

    for(var i=todos.length -1 ; i >=0 ; i--)
    {
    
        //create li
        li = document.createElement('li');
        var textnode = document.createTextNode(todos[i]);
        //console.log(todos[i]);
        
        //create checkbox 
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        if(check[i])
        {
        checkbox.checked = true ;
        }
        checkbox.setAttribute('id', 'check'); //to set id 

        //create label
        var label =  document.createElement('label');
        label.setAttribute('for' , 'item');
        
        //add these element to application
        ul.appendChild(label);
        li.appendChild(checkbox);
        label.appendChild(textnode);
        li.appendChild(label);

        ul.insertBefore(li,ul.childNodes[0]);

        li.className = 'visual';

        todos.value= ' ';

    }
 
}

show();


$(":checkbox").change(function() {
    if(this.checked) {
        ui_mem();

    }
});

$(":checkbox").change(function() {
    if(!(this.checked)) {
        ui_mem();
    }
});

$('#input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        addItem();
    }
});