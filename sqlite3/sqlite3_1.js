var sys = require('sys'),
    EventEmitter = require('events').EventEmmiter;

var sqlite3 = require('sqlite3').verbose();


//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('test.db');

db.serialize(function() {

  db.run("CREATE TABLE lorem (info TEXT)");
  db.run("DELETE FROM lorem");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("xxx " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

process.on('uncaughtException', function(error){
   sys.puts('xxxxxxxxxxxxxxxxxxxxx');
   sys.puts('Error: ' + error.message);

})
db.close();
