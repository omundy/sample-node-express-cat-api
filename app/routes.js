/**
 *	Routes module - all the website and api endpoints
 */

// load middleware
const Middleware = require("./middleware.js");


module.exports = function (app) {
	/////////// WEBSITE ROUTES ///////////

	// website home page
	app.get("/", (req, res) => {
		// random # 
		let r = Math.floor(Math.random() * 100);
		// render page
		res.render("home", {
			title: "home page",
			img: "cat-" + String(r).padStart(2, "0") + ".jpg",
		});
	});

	/////////// API ROUTES ///////////

	// api endpoint
	app.get("/api", (req, res) => {
		res.status(200).json({
			message: "hello",
		});
	});

	/////////// UTILITY ROUTES ///////////

	// // change the names of all the cat files to make them easy to reference
	// app.get("/rename",  Middleware.renameFiles, (req, res) => {
	// 	try {
	// 		res.send(req.count + " files were renamed");
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// });

	
};
