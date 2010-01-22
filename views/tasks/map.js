function(doc) {
  if (doc.type == "task") {
    emit(doc._id, doc);    
  }
};