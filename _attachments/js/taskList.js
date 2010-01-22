function TaskList(app,listSelector) {
	this.app = app;
	this.selector = listSelector;
	this.tasks = new Array();
	
	this.add = function(item) {
		$(this.selector).prepend(item.toHTML()); 
		this.tasks.push(item);
	}
	this.remove = function(json) { 
		var newTasks = new Array();
		for(var i=0;i<this.tasks.length;i++) { 
			if(this.tasks[i]._id != json.id){ 
				newTasks.push(this.tasks[i]);
			}
		}
		this.tasks = newTasks;
		$("#task_"+json.id).remove();
	} 
	this.get = function(id) { 
		for(var i=0;i<this.tasks.length;i++) { 
			if(this.tasks[i]._id == id){ 
				return this.tasks[i]};
		}
	}	
	this.reset = function () {
		$(listSelector).empty();
	}
	this.update = function(json) { 
		this.app.db.openDoc(json.id,{success:delegate(this,this._onUpdateItem)});
	}
	this._onUpdateItem = function(json) {
		var taskItem = new Task(this.app,json); 
		for(var i=0;i<this.tasks.length;i++) { 
			if(this.tasks[i]._id == taskItem._id){ 
				this.tasks[i] = taskItem;
			}
		}
		$("#task_"+taskItem._id).replaceWith(taskItem.toHTML()); 
	}
	this.load = function(list) {
		var list = list||"tasks";
		$.ajax ({ 
			type: "GET",
			url: this.app.db.uri + "_design/todoapp/_list/index/"+list,
			success: delegate(this,this._onLoaded)
		})	 
	}
	this._onLoaded = function(json) { 
		var response = JSON.parse(json);
		for (var i=0; i < response.rows.length; i++) {
            var item = new Task(this.app,response.rows[i].value); 
            this.add(item);
        }
		this.sort();
	}
	this.sort = function() {
		var items = $(this.selector).children('li').get();
		items.sort(this._sortItems);
		$.each(items, function(idx, itm) { $("#tasklist").append(itm); });
	}
	this._sortItems = function(a,b) {
		var compA = $(a).text().toUpperCase();
		var compB = $(b).text().toUpperCase();
		return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;  
	} 
	

}