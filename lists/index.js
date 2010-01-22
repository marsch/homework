function(head, req) { 
	
	provides ("json", function() {
		var response = new Object();
	 	response.rows = new Array(); 
	  
		var row;
		while(row = getRow()) { 
			if(row.value.user == req.userCtx.name) {
				response.rows.push(row);
			}
		} 
	
		response.total_rows = response.rows.length;
		response.offset = head.offset;
		send(toJSON(response));
	});
	
	provides ("csv", function() {
		var csvHeader = "subject,description,duedate,completed";
		send(csvHeader);
		var row;
		while(row = getRow()) { 
			if(row.value.user == req.userCtx.name) {
			 	send("\n"+(row.value.subject||'')+","+(row.value.description||'')+","+(row.value.duedate||'')+","+(row.value.completed||'false'));
			}
		}
	});
}