// import all dependencies
const path = require( 'path' );
const http = require( 'http' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

//import api's
const api = require( './server/routes/api' );

//initialize app
const app = express();

// json for post data
app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: false } ) );


//route static folder to dist


//direct all other routes and return index.js
app.get( '/', ( req, res ) => {
  res.send( 'HI' )
} );

app.use( '/api', api );

//set port
const port = process.env.PORT || 8000;

//initialize server
const server = http.createServer( app );


//run server

server.listen( port, () => {
  console.log( `Server is running on ${ port }` );
} )