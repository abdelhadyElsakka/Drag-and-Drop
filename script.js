document.getElementById('form').addEventListener('submit',function(){
  var inProgress = JSON.parse(localStorage.getItem('inProgress'));
  if (!inProgress) {
    inProgress = {};
  }
  inProgress[document.getElementById('input').value] = document.getElementById('input').value;

  localStorage.setItem('inProgress', JSON.stringify(inProgress));
})

window.addEventListener('load',function(){
  for (var i = 0; i < document.getElementsByClassName('tasksSection').length; i++) {
    var items = JSON.parse(localStorage.getItem(document.getElementsByClassName('tasksSection')[i].parentElement.className));
    for (const key in items) {
      var newItem = document.createElement('li');
      newItem.draggable = true;
      newItem.innerHTML = items[key] + "<button class='delete'></button>";
      newItem.id = key;
      newItem.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text', this.id);
      });
      document.getElementsByClassName('tasksSection')[i].appendChild(newItem);
    }
  }
  for(var i=0; i<document.getElementsByClassName('delete').length; i++){
    document.getElementsByClassName('delete')[i].addEventListener('click',function(e){
      var deletedItem= this.parentElement.id;
      var deletedParent = this.parentElement.parentElement.parentElement.className;
      this.parentElement.remove();
      var itemsInParent = JSON.parse(localStorage[deletedParent]);
      for (const key in itemsInParent) {
        if (itemsInParent[key] == deletedItem) {
          delete itemsInParent[key];
      }
    }

    localStorage.setItem(deletedParent, JSON.stringify(itemsInParent));
      
    })
  }
  
})

for (var i = 0; i < document.getElementsByClassName('tasksSection').length; i++) {
  document.getElementsByClassName('tasksSection')[i].addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  document.getElementsByClassName('tasksSection')[i].addEventListener('drop', function(e) {
    var droppedItem = e.dataTransfer.getData('text');
    var item = document.getElementById(droppedItem);
    var deletedParent = item.parentElement.parentElement.className;
    var itemsInParent = JSON.parse(localStorage[deletedParent]);
    for (const key in itemsInParent) {
      if (itemsInParent[key] == droppedItem) {
        delete itemsInParent[key];
      }
    }
    
  
    localStorage.setItem(deletedParent, JSON.stringify(itemsInParent));
  
    this.appendChild(item);
  
    var parentName = this.parentElement.className;
  
    var parent = JSON.parse(localStorage.getItem(parentName));
    if (!parent) {
      parent = {};
    }
    parent[item.textContent] = item.textContent;
  
    localStorage.setItem(parentName, JSON.stringify(parent));
  });
}












