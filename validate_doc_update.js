function (newDoc, oldDoc, userCtx) { 
	if(newDoc.type == "task") { 
		if(newDoc.user != userCtx.name) {
			throw({unauthorized : "Only "+newDoc.user+" may edit this document."});
		} 
	}
}