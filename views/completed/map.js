function(doc) {
  if (doc.type == "task" && doc.completed == true) {
    emit(doc._id, doc);    
  }
};