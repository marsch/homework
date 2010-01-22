function Task(app,initObject)
{  
	this.app = app;
	initObject = initObject || {};
	
	this._id =  initObject._id;
	this._rev = initObject._rev;
	
	this.user = initObject.user;
	this.subject = initObject.subject;
	this.priority = initObject.priority;
	this.duedate = initObject.duedate;
	this.description = initObject.description;
	this.completed = initObject.completed;
 
	this.save = function(options) { 
		this.app.db.saveDoc(this.toTransferObject(),options); 
	}
	this.delete = function (options) { 
		this.app.db.removeDoc(this.toTransferObject(),options);
	}
	this.showEdit = function() { 
		document.location = this.app.db.uri+"_design/todoapp/_show/edit/"+this._id;
	}
	this.toHTML = function() {
		var id = this._id;
		var subject = this.subject;
		var duedate = (this.duedate == undefined)?"":this.duedate;
		var priority = (this.priority == undefined)?"middle":this.priority;
		var completed = (this.completed == undefined)?false:this.completed; //bool
		
		var ret = '';
		ret += '<li id="task_'+id+'"  class="taskrow task_priority_'+priority+((completed)?' completed':'')+'">';
		ret += '<div class="task_left">';
		ret += '<input type="checkbox"'+((completed)?' checked="checked"':'')+' onclick="MyTaskList.get(\''+id+'\').toggleComplete(this,{success:delegate(MyTaskList,MyTaskList.update)});"/>';
		ret += '</div>';
		ret += '<div class="task_middle">';
		ret += '<div class="task_info">';
		ret += '<span class="task_subject">'+subject+'</span>';
		ret += '<span class="task_duedate">'+duedate+'</span>';
		ret += '</div>';
		ret += '</div>';
		ret += '<div class="task_right">';
		ret += '<span class="task_link"><a href="#" onclick="MyTaskList.get(\''+id+'\').showEdit();">edit</a></span>';
		ret += '<span class="task_link"><a href="#" onclick="MyTaskList.get(\''+id+'\').delete({success:delegate(MyTaskList,MyTaskList.remove)});">delete</a></span>';
		ret += '</div>';
		ret += '</li>';
		return ret;
	} 
	//document structure that will be saved
	this.toTransferObject = function() {
		var TO = new Object();
		if(this._id)TO._id =this._id;
		if(this._rev)TO._rev = this._rev;
		
		TO.user = this.user;
		TO.subject = this.subject;
		TO.priority = this.priority;
		TO.duedate = this.duedate;
		TO.description = this.description;
		TO.type = "task";
		TO.completed = (this.completed)?true:false; 
		return TO;
	} 
	this.toggleComplete = function(cb,options) {
		if(cb.checked) {
			this.completed = true;
		}
		else {
			this.completed = false;  
		}
		this.save(options);
	}
	

}