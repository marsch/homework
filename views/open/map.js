function(doc) {
  if (doc.type == "task" && doc.completed == false) {
    emit(doc._id, doc);    
  }
};