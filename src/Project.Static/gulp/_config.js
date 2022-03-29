//--------- Include references
const path = require('path'),
	assetsPath = '../Project.Web/Assets/'

//--------- Paths
module.exports = {
	data: {
		src: 'src/data/*.json',
		temp: 'src/data/temp/',
		file: 'data.json'
	},
	scripts: {
		app: {
			src: 'src/js/app/**/*.js',
			watch: 'src/js/**/*'
		},
		dist: {
			app: 'dist/assets/js/app/',
			appProd: `${assetsPath}js/app/`,
			vendor: 'dist/assets/js/vendor/',
			vendorProd: `${assetsPath}js/vendor/`
		},
		vendor: [path.join(__dirname, '..', 'node_modules', 'bluebird', 'js', 'browser', 'bluebird.min.js'), // USE BECAUSE PROMISES NOT SUPPORTED IN IE
			path.join(__dirname, '..', 'node_modules', 'axios', 'dist', 'axios.min.js') // USE IF USING ASYNC FUNCTIONS/METHODS (EX: SUBMIT FORM HTTP REQUEST)
		]
	},
	json: {
		src: 'src/json/*.json',
		dest: 'dist/assets/json/',
		destProd: `${assetsPath}json/`
	},
	views: {
		pug: {
			src: ['src/views/**/*.pug', '!src/views/templates/*.pug'],
			templates: 'src/views/templates/*.pug',
			watch: 'src/views/**/*',
			dest: 'dist/views'
		},
		index: {
			src: 'src/index.pug',
			watch: 'src/*.pug',
			dest: 'dist/'
		}
	},
	styles: {
		app: {
			src: 'src/scss/global.scss',
			srcSG: 'src/scss/styleguide.scss',
			watch: 'src/scss/**/*.scss'
		},

		dist: {
			dest: 'dist/assets/css/',
			destProd: `${assetsPath}css/`,
			vendor: 'dist/assets/css/vendor/',
			vendorProd: `${assetsPath}css/vendor/`
		},
		vendor: [path.join(__dirname, '..', 'node_modules', 'swiper', 'css', 'swiper.min.css') // USE IF USING SLIDERS
		]
	},
	pdfs: {
		src: 'src/pdf/**/*.pdf',
		watch: 'src/pdf/**/*.pdf',
		dest: 'dist/assets/pdf/',
		destProd: `${assetsPath}pdf/`
	},
	videos: {
		src: 'src/video/**/*.{webm,ogg,mp4}',
		watch: 'src/video/**/*.{web,ogg,mp4}',
		dest: 'dist/assets/video/',
		destProd: `${assetsPath}video/`
	},
	images: {
		src: 'src/img/**/*.{gif,jpg,png,svg,ico}',
		watch: 'src/img/**/*.{gif,jpg,png,svg,ico}',
		dest: 'dist/assets/img/',
		destProd: `${assetsPath}img/`
	},
	fonts: {
		src: 'src/fonts/**/*.{ttf,otf,woff,woff2,eot,json}',
		watch: 'src/fonts/**/*.{ttf,otf,woff,woff2,eot}',
		dest: 'dist/assets/fonts/',
		destProd: `${assetsPath}fonts/`
	}
}