//--------- Include references
const { src, dest } = require('gulp'),
	paths = require('./_config'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'), //does not crash if error occurs
	lec = require('gulp-line-ending-corrector'),
	sass = require('gulp-sass'),
	postCSS = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	gap = require('postcss-gap-properties'),
	cssVars = require('postcss-css-variables'),
	sassLint = require('gulp-sass-lint')

//--------- Compile Sass
function coreStyles(basename, source, dist, prod) {

	return src(source, { sourcemaps: true })
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded', //nested, expanded, compact, compressed
		}).on('error', sass.logError))
		.pipe(concat(`${basename}.css`))
		.pipe(postCSS([gap(),
			cssVars({
				preserve: true
			}), autoprefixer({
				grid: 'autoplace'
			})
		]))
		.pipe(lec({
			eolc: 'CRLF'
		}))
		.pipe(dest(prod, { sourcemaps: '.' }))
		.pipe(dest(dist, { sourcemaps: '.' }))
}

function styles(done) {
	//vendor
	coreStyles(
		'vendor',
		paths.styles.vendor,
		paths.styles.dist.vendor,
		paths.styles.dist.vendorProd
	)

	//styles DIST
	coreStyles(
		'styles',
		paths.styles.app.src,
		paths.styles.dist.dest,
		paths.styles.dist.destProd
	)

	//styleGuide
	coreStyles(
		'styleguide',
		paths.styles.app.srcSG,
		paths.styles.dist.dest,
		paths.styles.dist.destProd
	)

	done()
}

function sassLinter() {
	return src(paths.styles.app.watch)
		.pipe(plumber())
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
}

exports.styles = styles
exports.sassLinter = sassLinter