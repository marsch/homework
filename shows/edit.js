function(doc, req) {  
  // !json templates.edit
  // !code vendor/couchapp/path.js
  // !code vendor/couchapp/template.js

  // we only show html
  return template(templates.edit, {
    doc : doc,
    docid : toJSON((doc && doc._id) || null),
	assets : assetPath()
  });
}