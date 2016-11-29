var funker = require('funker');
var pg = require('pg');

funker.handle(function(args, callback) {
  // Return immediately so this function runs in the background
  callback();

  console.log("Processing vote for", args.vote, "by", args.voter_id);

  var client = new pg.Client('postgres://postgres@db/postgres');
  client.connect();
  client.query("CREATE TABLE IF NOT EXISTS votes (id VARCHAR(255) NOT NULL UNIQUE, vote VARCHAR(255) NOT NULL)")
    .then(() => {
      return client.query("INSERT INTO votes (id, vote) VALUES ($1, $2)", [args.voter_id, args.vote]);
    })
    .catch(err => {
      // Only catch duplicate key errors
      if (err.message.indexOf("duplicate key") === -1) {
        throw err
      }
      return client.query("UPDATE votes SET vote = $1 WHERE id = $2", [args.vote, args.voter_id]);
    })
    .then(() => client.end());
});
