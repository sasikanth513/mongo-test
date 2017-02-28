import { Meteor } from 'meteor/meteor';

function insertRecord() {
  let emails = ['sasi@sasi.io', 'sasi@schoolwise.io', 'sasi.kanth80@gmail.com', 'dronavalli.sasi@gmail.com',
      'salil@sasi.io', 'salil@schoolwise.io', 'salilsethi@gmail.com', 'salil@botanalyzer.com']

  let teamId = [ '6T5oA6wHD2osdqEDc', '3FHk6XuecidNZfmz8', 'MgaFioEozSPotmQYy' ]

  const type = ['incoming', 'outgoing'];

  const source = ['rest', 'fb', 'slack'];

  const now = new Date();

  let obj = {
    email: _.sample(emails),
    team: _.sample(teamId),
    createdAt: now,
    updatedAt: now,
    type: _.sample(type),
    source: _.sample(source),
    msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ipsum ac quam tempus ornare. Integer dignissim metus id arcu pellentesque, quis mattis velit cursus. Vivamus suscipit odio lacus, sit amet finibus odio interdum at. Nunc dictum, magna vitae egestas mollis, risus magna sagittis augue, id congue lacus purus luctus sem. Fusce sit amet augue sed magna congue egestas nec vitae ligula. Fusce rutrum elit ac fermentum finibus. Ut sit amet arcu a odio ullamcorper sagittis.',

    userMessage: {
      "object": "page",
      "entry": [
        {
          "id": "1604391129817458",
          "time": 1469201060128,
          "messaging": [
            {
              "recipient": {
                "id": "1604391129817458"
              },
              "sender": {
                "id": "802455339884571"
              },
              "message": {
                "mid": "mid.1469201060037:8d651aa4d006895998",
                "text": "hello, bot!",
                "seq": 5466
              }
            }
          ]
        }
      ]
    }
  }

  Messages.insert(obj);
}

Meteor.startup(() => {
  const rec = Messages.findOne();

  if (!rec) {
    console.time('inserts');

    for (i =0; i< 1000000; i++) {
      if ( i % 100 === 0) {
        console.log('Inserted '+i+' records');
      }
      
    }
    insertRecord();
    console.timeEnd('inserts');
  }
  
  if (rec) {
    // Meteor.setInterval(function () {
    //   insertRecord();
    // }, 100000);
  }
});


Meteor.publish('latestMessages', function () {
  return Messages.find({}, { sort: { createdAt: -1 }, limit: 200 })
});