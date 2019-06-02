const express = require( 'express' )
const path = require( 'path' )
const PORT = process.env.PORT || 5000

var bodyParser = require( 'body-parser' );


express()
	.use( express.static( path.join( __dirname, 'public' ) ) )
	.use( bodyParser.urlencoded() )
	.set( 'views', path.join( __dirname, 'views' ) )
	.set( 'view engine', 'ejs' )
	.get( '/', ( req, res ) => res.render( 'pages/index' ) )
	.get( '/help', ( req, res ) => res.render( 'pages/help' ) )
	.get( '/new', ( req, res ) => res.render( 'pages/new' ) )

	.post( '/check', ( req, res ) => {
		screen = req.body.name;

		var request = require( "request" );

		var jar = request.jar();
		jar.setCookie( request.cookie( "personalization_id=%22v1_86i9MmD9fCg769vk1sLPOg%3D%3D%22" ), "https://api.twitter.com/1.1/users/show.json" );
		jar.setCookie( request.cookie( "guest_id=v1%253A155950162353382161" ), "https://api.twitter.com/1.1/users/show.json" );

		var options = {
			method: 'GET',
			url: 'https://api.twitter.com/1.1/users/show.json',
			qs: {
				screen_name: screen
			},
			headers: {
				authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAPdT5wAAAAAA%2BRSMyaCn9BjFCRAPzRzAGM%2BrdDs%3DtDV27M0yqo8jXCojJpBlOOcXgJR5MPxv2RP2hMGqeIQz8wYdSI'
			},
			jar: 'JAR'
		};

		console.log( options )

		request( options, function( error, response, body ) {
			if ( error ) res.render( "pages/new" );
			console.log( body );
			var user = JSON.parse( body )
			res.render( "pages/accept", {
				user: user
			} )
		} );


	} )
	.listen( PORT, () => console.log( `Listening on ${ PORT }` ) )
