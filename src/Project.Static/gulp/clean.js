//--------- Include references
const paths = require('./_config'),
	del = require('del'),
	assetsPath = '../Project.Web/Assets/'

//--------- Clean files
function clean(done) {
	del.sync([`${paths.views.index.dest}*`, `${assetsPath}*`], {
		force: true
	})
	
	done()
}

exports.clean = clean