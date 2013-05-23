(function(){

   var schemas = {
      Story : {
         voucher : Number,
         title : String,
         text : String,
         name : String,
         email : String,
         accept : Boolean,
         image : String,
         timeStamp : Number
      },
      Good : {
         lastName : String,
         age : Number,
         gender : Number,
         date : String,
         location : String,
         note : String,
         timeStamp : Number
      }
   }

   var models = {};
   var init = false;

   function model (modelName) {
      if(!init) {
         throw new Error('You must init models before use it.')
      }
      else if( ! (modelName in models)) {
         throw new Error('Model not found');
      }
      else {
         return models[modelName];
      }
   }

   model.init = function (db) {
      for(var name in schemas) {
         models[name] = db.model(name, db.Schema(schemas[name], {autoIndex: true}));
      }
      init = true;
      return model;
   }

   module.exports = model;

}());