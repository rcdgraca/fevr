//--------- Include references
const { src, dest, series } = require('gulp'),
	paths = require('./_config'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'), //does not crash if error occurs
	lec = require('gulp-line-ending-corrector'),
	babel = require('gulp-babel'),
	esLint = require('gulp-eslint')

//--------- Script : javascript
function scriptsVendor() {
	//vendor scripts	
	return src(paths.scripts.vendor)
		.pipe(plumber())
		.pipe(concat('vendor.js'))
		.pipe(lec({
			eolc: 'CRLF'
		}))
		.pipe(dest(paths.scripts.dist.vendorProd))
		.pipe(dest(paths.scripts.dist.vendor))
}

function scriptsApp() {
	//app scripts
	return src(paths.scripts.app.src, { sourcemaps: true })
		.pipe(esLint())
		.pipe(esLint.format('table'))
		.pipe(esLint.failAfterError())
		.pipe(plumber())
		.pipe(babel({
			'presets': ['@babel/preset-env'],
			'sourceType': 'script'
		}))
		.pipe(concat('app.js'))
		.pipe(lec({
			eolc: 'CRLF'
		}))
		.pipe(dest(paths.scripts.dist.appProd, { sourcemaps: '.' }))
		.pipe(dest(paths.scripts.dist.app, { sourcemaps: '.' }))
}

const scripts = series(scriptsVendor, scriptsApp)

exports.scripts = scripts