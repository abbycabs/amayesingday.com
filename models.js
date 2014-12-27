'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* invite Schema */

var inviteSchema = new Schema({
  firstLine: String,
  secondLine: String,
  guests: [String],
  emails: [String],
  count: Number
});

mongoose.model('Invite', inviteSchema);

