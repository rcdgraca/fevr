//--------- Include references
const { watch, series } = require('gulp'),
	paths = require('./_config'),
	browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon'),
	dataFile = require('./data'),
	htmlFile = require('./html'),
	imagesFile = require('./images'),
	scriptsFile = require('./scripts'),
	stylesFile = require('./styles')

//--------- nodemon
function nodemonServer(done) {
	let started = false

	return nodemon({
		script: 'api.js',
		ext: 'js json pug',
		ignore: ['gulp/', 'dist/']
	}).on('start', () => {
		if (!started) {
			done()
			started = true
		}
	})
}

//--------- Browser sync - local Server
function localServer(done) {
	browserSync.create()
	browserSync.init({
		snippetOptions: {
			rule: {
				match: /<\/body>/i,
				fn: (snippet, match) => {
					return `${snippet}${match}`
				}
			}
		},
		//reloadDelay: 1000,
		port: 9000,
		ui: false,
		notify: false,
		open: false, //disable opening browser after running gulp
		server: 'dist'
	})

	done()
}

//--------- Reload browser Sync
function reload(done) {
	browserSync.reload()

	done()
}

//--------- Watch
function watchAssets(done) {
	watch(paths.styles.app.watch, series(stylesFile.styles, stylesFile.sassLinter, reload))
	watch(paths.scripts.app.watch, series(scriptsFile.scripts, reload))
	watch(paths.views.index.src, series(htmlFile.styleguide, reload))
	watch(paths.views.pug.watch, series(htmlFile.templates, reload))
	watch(paths.images.watch, series(imagesFile.images, reload))
	watch(paths.data.src, series(dataFile.data, htmlFile.html, reload))

	done()
}

const api = series(localServer, nodemonServer, watchAssets),
	server = series(localServer, watchAssets)

exports.server = server
exports.api = api