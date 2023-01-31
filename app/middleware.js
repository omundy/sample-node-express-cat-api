/**
 *	Middleware module - helper functions for your application
 */

var exports = (module.exports = {});

/**
 * 	Middleware - show all requests
 */
exports.showRequests = (req, res, next) => {
	// ignore static files
	if (
		!req.originalUrl.includes("/assets/") &&
		!req.originalUrl.includes("/favicon")
	) {
		// log the path
		console.log(
			`\nRequest ${req.method} ${req.originalUrl} [STARTED] from ${req.ip}`,
			new Date().toLocaleString()
		);

		res.on("close", () => {
			console.log(
				`Request ${req.method} ${req.originalUrl} [CLOSED] from ${req.ip}`,
				new Date().toLocaleString()
			);
		});
	}
	// invoke next middleware function
	next();
};

/**
 * 	Middleware - rename all files
 */
exports.renameFiles = async (req, res, next) => {
	let count = await renameAllFiles();
	console.log(count);
	req.count = count;
	// invoke next middleware function
	next();
};




const fs = require("fs").promises;

/**
 * 	Rename all files in a dir
 */
async function renameAllFiles() {
	let path = "public/assets/img/" || __dirname;
	let count = 0;
	let files = await readdir(path);

	files.forEach(async (file, index) => {
		// console.log(file);
		let r = Math.random(); // temp name
		// rename file
		fs.rename(
			`${path}${file}`,
			`${path}temp-name-${r}-${String(index).padStart(2, "0")}.jpg`
		);
		count++;
		// console.log(`${count} ${file} renamed`);		
	});
	if (count == files.length) {
		console.log(`${count} files renamed`);
		return count;
	}
}

/**
 * 	Return all filenames in a dir
 */
const readdir = (path) => {
	return fs.readdir(path).then(
		(
			list // remove hidden files from list
		) => list.filter((item) => !/(^|\/)\.[^/.]/g.test(item))
	);
};

