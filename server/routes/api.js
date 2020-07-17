const express = require( 'express' );
const router = express.Router();
const mongojs = require( 'mongojs' );
const db = mongojs( 'mongodb://suman123:suman123@ds135128.mlab.com:35128/rules' );
var objectId = require( 'mongojs' ).ObjectID;

// get rules
router.get( '/rules', ( req, res ) => {
  db.rules.find( ( err, rules ) => {
    if ( err ) {
      res.send( err );
    }
    res.json( rules );
  } )
} );

// Add rule
router.post( '/rules', ( req, res ) => {
  let rule = req.body;
  db.rules.save( rule, ( err, rule ) => {
    if ( err ) {
      res.send( err );
    }
    res.json( rule );
  } )
} );

//Delete Rule
router.delete( '/rules/:id', function ( req, res, next ) {
  db.rules.remove( { _id: objectId( req.params.id ) }, ( err, rule ) => {
    if ( err ) {
      res.send( err );
    }
    res.json( rule );
  } );
} );

// Update rule
router.put( '/rules/:id', ( req, res ) => {
  var updRule = Object.assign( {}, req.body )
  db.rules.replaceOne( { _id: objectId( req.params.id ) }, updRule, {}, function ( err, rule ) {
    if ( err ) {
      res.send( req.body.id );
    }
    res.json( rule );
  } )
} );

module.exports = router;