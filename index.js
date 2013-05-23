"use strict";

var express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    model    = require('./models').init(mongoose),
    fs       = require('fs'),
    lib      = require('./lib');


function dbConnect(success, error) {
   mongoose
      .connect('mongodb://nodejitsu_evgeny-:757s6ojap7nak779daobcj6pv0@ds059907.mongolab.com:59907/nodejitsu_evgeny-_nodejitsudb4729298697')
      .connection
      .on('error', error)
      .once('open', success);
}


app.configure(function() {
   app.set('views', __dirname + '/views');
   app.use(express.static(__dirname + '/public'));
   app.use(express.bodyParser());
});


app.get('/stories/:from', function(req, res) {
   model('Story')
      .find({accept: true})
      .skip(+ req.params.from)
      .limit(10)
      .sort({'_id': 'desc'})
      .exec(function(a, stories) {
         stories = lib.prepareStories(stories);
         res.send(stories);
      });
});

app.get('/story/:id', function(req, res) {
   model('Story')
      .findById(req.params.id)
      .exec(function(a, story) {
         if(!story)
            res.send({error: 'Not found!'});
         else {
            story = lib.prepareStory(story);
            res.send(story);
         }
      });
});

app.get('/delete/:id', function(req, res) {
   model('Story')
      .findByIdAndRemove(req.params.id)
      .exec(function() {
         res.redirect('/');
      });
});

app.get('/voucher/:id', function(req, res) {
   var allow = +req.params.id === 55555;
   res.send({result: allow});
});

app.get('/last-name/:id', function(req, res) {
   res.send({result: true});
});

app.post('/add-story', function(req, res) {

   var addStory = function (img) {
      var story = new model('Story')({
         voucher  :+req.body.voucher,
         title    : req.body.title,
         text     : req.body.text,
         name     : req.body.name,
         email    : req.body.email,
         accept   : (req.body.accept == 'on'),
         image    : img,
         timeStamp: +(new Date())
      });

      story.save(function(err) {
         res.redirect('/');
      });
   };

   if(req.files && req.files.image && req.files.image.name) {
      var tmp     = req.files.image.path,
         format  = req.files.image.name.split('.').pop(),
         target  = '/uploads/' + (+ new Date()) + '.' + format,
         newName = __dirname + '/public' + target;

      fs.rename(tmp, newName, function() {
         fs.unlink(tmp, function() {
            addStory(target);
         });
      });
   }
   else {
      addStory(null);
   }
});

app.post('/add-good', function(req, res) {
   var good = new model('Good')({
      lastName : req.body.lastName,
      age      : req.body.age,
      gender   : req.body.gender,
      date     : req.body.date,
      location : req.body.location,
      note     : req.body.note,
      timeStamp: +(new Date())
   });

   good.save(function() {
      res.redirect('/');
   });
});


dbConnect(
   function ()  {console.log('DB started.')},
   function (e) {throw e;}
);

app.listen(1337);
