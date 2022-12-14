var slash = require('slash');
var path = require('path');
var fs = require('fs');
var through = require('through2');
var glob = require('glob');

module.exports = function(options) {
    var transform = function(file, env, cb) {
        // find all instances matching
        var contents = file.contents.toString('utf-8');

        // regex to match an @import that contains glob pattern
        var reg = /@import\s+["']([^"']+\*(\.scss)?)["'];?/;
        var result;

        while((result = reg.exec(contents)) !== null) {
            var index = result.index;
            var importRule = result[0];
            var globPattern = result[1];
            var imports = [];

            //Extending default options by config options
            var globOptions = Object.assign({}, {
                cwd: file.base
            }, options);

            var files = glob.sync(path.join(file.base, globPattern), globOptions);

            files.forEach(function(filename){
                // check if it is a sass file
                if (path.extname(filename).toLowerCase() === '.scss') {
                    // we remove the parent file base path from the path we will output
                    filename = path.normalize(filename);
                    var base = path.join(path.normalize(file.base), '/');

                    filename = filename.replace(base, '');
                    imports.push('@import "' + slash(filename) + '";');
                }
            });

            var replaceString = imports.join('\n');
            contents = contents.replace(importRule, replaceString);
            file.contents = new Buffer.from(contents);
        }

        cb(null, file);
    };
    return through.obj(transform);
};
