;(function(){
   var lib = {};

   lib.escape = function(code) {
      var e = function(text) {
         return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
      }
      if(typeof code === 'string') {
         return e(code);
      }
      if(typeof code === 'object') {
         var newObj = {};
         for(var key in code) {
            newObj[key] = typeof code[key] === 'string' ? e(code[key]) : code[key];
         }
         return newObj;
      }
   }

   lib.prepareStories = function (stories) {
      return stories.map(function(el) {
         var obj = {}, allowTypes = ['title', 'text', 'image', '_id'];

         allowTypes.map(function(type) {
            obj[type] = el[type];
         });

         if(obj.text.length > 2000) {
            obj.text = obj.text.slice(0, 2000) + '...';
            obj.showMore = true;
         }

         return obj;
      });
   }

   lib.prepareStory = function (story) {
      var obj = {}, allowTypes = ['title', 'text', 'image', 'timeStamp', 'name', '_id'];

      allowTypes.map(function(type) {
         obj[type] = story[type];
      });

      obj.name = obj.name.split(' ').shift();

      return obj;
   }

   module.exports = lib;
}())