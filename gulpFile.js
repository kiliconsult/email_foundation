(function () {

    // Set up
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')({lazy: false});
    var Inky = require('inky').Inky;
    var panini = require('panini');
    var sass = require('gulp-sass');
    var cheerio = require('cheerio');
    var through = require('through2');
    var format = require('util').format;
    var styleInject = require("gulp-style-inject");
    var juice = require('gulp-juice');
    var prettify = require('gulp-prettify');

    var paths = {
        root: './email',
        html: './email/**/*.html',
        layouts: './email/layouts',
        partials: './email/partials',
        sass: './email/scss/mail.scss'
    };

    // Extend inky with our own component factory
    var inky = new Inky({
        components: {
            responsiveRow: 'responsive-row'
        }
    });
    var proxyComponentFactory = function (element) {
        var inner = element.html();
        var extElement = cheerio.load(inner,{decodeEntities: false});

        switch (element[0].name) {
            // Handle <responsive-row>
            case this.components.responsiveRow:
                var classes = ['responsive-row'];
                if (element.attr('class')) {
                    classes = classes.concat(element.attr('class').split(' '));
                }
                var spacing = 40;
                if (element.attr('spacing')) {
                    spacing = element.attr('spacing');
                }
                var string = format('<row class="unpadded-sides %s"> <columns large="1" class="show-for-large"> <!-- Margin column --> </columns> <columns small="12" large="10" class=""> <row> <columns> <spacer size="' + spacing + '"></spacer> <row> <columns>%s</columns> </row> <spacer size="' + spacing + '"></spacer> </columns> </row> </columns> <columns large="1" class="show-for-large"> <!-- Margin column --> </columns> </row>',
                    classes.join(' '),
                    inner);
                extElement = cheerio.load(string, {decodeEntities: false});
        }

        var innerInky = new Inky();
        return innerInky.releaseTheKraken(extElement).html();
    };
    inky.componentFactory = proxyComponentFactory;

    // Tasks
    gulp.task('default', plugins.sequence('panini', 'inky', 'sass', 'injectStyle', 'inlineStyle', 'prettify'));
    gulp.task('inky', inkyParse);
    gulp.task('panini', paniniParse);
    gulp.task('sass', sassParse);
    gulp.task('injectStyle', injectStyle);
    gulp.task('inlineStyle', inlineStyle);
    gulp.task('prettify', prettifyHtml);
    //gulp.task('watch', startWatch);

    function prettifyHtml() {
        return gulp.src('dist/*.html')
            .pipe(prettify({indent_size: 2}))
            .pipe(gulp.dest('dist'))
    }

    function inlineStyle() {
        return gulp.src('temp/styled/*.html')
            .pipe(juice({
                preserveMediaQueries: true,
                webResources: {
                    images: false
                }
            }))
            .pipe(gulp.dest('dist'))
    }

    function injectStyle() {
        return gulp.src("temp/html/*.html")
            .pipe(styleInject())
            .pipe(gulp.dest("temp/styled"));
    }

    function sassParse() {
        return gulp.src(paths.sass)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('temp/css'));
    }

    function inkyParse() {
        function transform() {
            return through.obj(function (file, enc, callback) {

                var html = cheerio.load(file.contents.toString(), {decodeEntities: false});
                var convertedHtml = inky.releaseTheKraken(html).html();

                file.contents = new Buffer(convertedHtml);
                callback(null, file);
            });
        }

        return gulp.src('temp/inky/*.html')
            .pipe(transform())
            .pipe(gulp.dest('temp/html'));
    }

    function paniniParse() {
        return gulp.src('email/pages/**/*.html')
            .pipe(panini({
                root: paths.root,
                layouts: paths.layouts,
                partials: paths.partials
            }))
            .pipe(gulp.dest('temp/inky'));
    }

    //function startWatch() {
    //    gulp.watch(['./email/{layouts,partials,pages}/**/*'], ['panini', 'inky']);
    //    gulp.watch('./email/scss/**/*.scss', ['sass']);
    //}
})();