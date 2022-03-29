//--------- Include references
const { src, dest, series, lastRun } = require('gulp'),
	paths = require('./_config'),
	lec = require('gulp-line-ending-corrector')

//--------- Fonts
function fonts() {
	return src(paths.fonts.src, { since: lastRun(fonts) })
		.pipe(dest(paths.fonts.dest))
		.pipe(dest(paths.fonts.destProd))
}

//--------- json
function json() {
	return src(paths.json.src, { since: lastRun(json) })
		.pipe(lec({
			eolc: 'CRLF'
		}))
		.pipe(dest(paths.json.dest))
		.pipe(dest(paths.json.destProd))
}

//---------PDFs
function pdfs() {
	return src(paths.pdfs.src, { since: lastRun(pdfs) })
		.pipe(dest(paths.pdfs.dest))
		.pipe(dest(paths.pdfs.destProd))
}

const extras = series(fonts, json, pdfs)

exports.extras = extras