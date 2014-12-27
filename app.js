var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    path = require('path'),
    swig = require('swig');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/stylesheets'));
// app.use(express.static(__dirname + '/scripts'));

// app.set('views', __dirname + '/views');
  // set views path, template engine and default layout
  app.engine('html', swig.renderFile);
  app.set('views', '');
  app.set('view engine', 'html');


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/rsvp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connection!');
});

var models = require('./models.js')
var Invite = mongoose.model('Invite');



// ROUTES
app.get('/', function(request, response) {
  response.render('index');
});

// ROUTES
app.get('/rsvp', function(request, response) {
  response.render('rsvp');
});

app.get('/thanks', function(request, response) {
  response.render('thanks');
});

app.get('/invite/:invite', function(request, response, next){
  Invite.find({ emails: request.params.invite }, function(err, invite){
    if (err) return console.error(err);
    // response.json(invite[0]);
    response.render('invite', {invite: invite[0], email:request.params.invite});
  });
});

app.get('/guests/:invite', function(request, response, next){
  Invite.find({ emails: request.params.invite }, function(err, invite){
    if (err) return console.error(err);
    // response.json(invite[0]);
    response.render('guests', {invite: invite[0]});
  });
});
