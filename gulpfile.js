/*
 * gulpfile with gulp 4 for local deployment. Omit uploads and tests.
 */

const gulp = require('gulp');
const _ = require('underscore');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const handlebars = require('gulp-handlebars');
const jshint = require('gulp-jshint');
const webpackStream = require('webpack-stream');
const config = require("./webpack.config.dev");
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify')
const gulpif = require('gulp-if');
const glob = require('glob');
const template = require('gulp-template');
const fs = require('fs');

const polisConfig = require('./polis.config');
const distRoot = 'dist';

// Configurable letiables
let isUglify = true;
let versionString = 'VERSION_ERROR';

// Tasks

async function cleanDist() {
  rimraf.sync(distRoot);
}

function css() {
  return gulp.src('css/polis_main_dist.scss')
    .pipe(sass({
      loadPath: [__dirname + '/css'],
    }))
    .pipe(concat('polis.css'))
    .pipe(gulp.dest(dest('/css')));
}

function fontawesome() {
  return gulp.src('bower_components/font-awesome/fonts/**/*')
    .pipe(gulp.dest(dest('/fonts')));
}

function embedJs() {
  return gulp.src('api/embed.js')
    .pipe(template({
      serviceUrl: polisConfig.SERVICE_URL
    }))
    .pipe(gulp.dest(dest('/')));
}

function staticAPI() {
  return gulp.src([
      'api/twitterAuthReturn.html',
    ])
    .pipe(gulp.dest(dest('/')));
}

function index() {
  const domainWhitelist = '["' + polisConfig.domainWhitelist.join('","') + '"]';
  return gulp.src('index.html')
    .pipe(template({
      basepath: '', // Was a cache with timestamp id, but can't find an advantage to use it for local server version
      basepath_visbundle: '',
      d3Filename: 'd3.min.js',
      fbAppId: polisConfig.FB_APP_ID,
      versionString: versionString,
      domainWhitelist: domainWhitelist,
    }))
    .pipe(gulp.dest(dest('/')));
}

function templates() {
  //does not include participation, which is the main view, because the footer is not right /userCreate.handlebars$/,
  const topLevelViews = [/conversationGatekeeper.handlebars$/, /userCreate.handlebars$/, /create-user-form.handlebars$/, /login-form.handlebars$/, /settings.handlebars$/, /settingsEnterprise.handlebars$/, /summary.handlebars$/, /inbox.handlebars$/, /moderation.handlebars$/, /passwordResetForm.handlebars$/, /explore.handlebars$/, /conversationGatekeeper.handlebars$/, /passwordResetInitForm.handlebars$/, /create-conversation-form.handlebars$/, /plan-upgrade.handlebars$/];
  const bannerNeedingViews = [/summary.handlebars$/, /inbox.handlebars$/, /moderation.handlebars$/, /explore.handlebars$/, /create-conversation-form.handlebars$/];

  function needsBanner(file) {
    return _.some(bannerNeedingViews, function (regex) {
      return file.path.match(regex);
    });
  }

  function needsHeaderAndFooter(file) {
    return _.some(topLevelViews, function (regex) {
      return file.path.match(regex);
    });
  }

  return gulp.src(['js/templates/*.hbs', 'js/templates/*.handlebars'])
    .pipe(tap(function (file) {

      if (needsHeaderAndFooter(file) || needsBanner(file)) {
        console.log('Needs header/footer or banner:' + file.path);
        file._contents = Buffer.concat([
          new Buffer(
            (needsHeaderAndFooter(file) ? '{{#ifNotEmbedded}}{{> header}}{{/ifNotEmbedded}}' : '') +
            (needsBanner(file) ? '{{#ifTrial}}{{> banner}}{{/ifTrial}}' : '')
          ),
          file._contents
        ]);
      }
    }))
    .pipe(handlebars({
      outputType: 'node',
      wrapped: true,
    }))
    .pipe(gulp.dest('./js/tmpl'));
}

function lint() {
  return gulp.src([
    'js/**/*.js',
    '!js/tmpl/**',
    '!js/3rdparty/**',
  ]).pipe(jshint(
    {
      curly: true, // require if,else blocks to have {}
      eqeqeq: true,
      trailing: true, // no trailing whitespace allowed
      forin: true, // requires all for in loops to filter object's items
      freeze: true, // prohibits overwriting prototypes of native objects such as Array, Date and so on.
      unused: 'lets',
      noarg: true, // no arguments.caller and arguments.callee (allow for optimizations)
      newcap: true, // constructors must be capitalized
      indent: 2,
      immed: true,
      boss: true,
      // debug: true, // uncomment temporarily when you want to allow debugger; statements.
      globals: {
        d3: true,
        jQuery: true,
        console: true,
        require: true,
        define: true,
        requirejs: true,
        describe: true,
        expect: true,
        module: true,
      },
    }))
    .pipe(jshint.reporter('default'));
}

function scriptsVis2() {
  const configProd = require('./webpack.config.js');
  config.output.publicPath = dest('/js/');

  return gulp.src('./vis2/vis2.js')
    .pipe(webpackStream(configProd))
    .pipe(gulp.dest(dest('/js')));
}

function templatedScripts() {
  return gulp.src('templated-js/**', {base: 'templated-js'})
    .pipe(template({
      serviceUrl: polisConfig.SERVICE_URL,
      useEmailLogin: polisConfig.USE_EMAIL_LOGIN,
      useJoinLogin: polisConfig.USE_JOIN_LOGIN,
      joinLoginUrl: polisConfig.JOIN_LOGIN_URL
    }))
    .pipe(gulp.dest('./js'));
}

function scripts() {
  // Single entry point to browserify
  return gulp.src('./js/main.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: false,
      shim: {
        jquery: {
          path: 'js/3rdparty/jquery.min.js',
          exports: '$',
        },
        //TODO 'handlebars': 'templates/helpers/handlebarsWithHelpers', //this one has polis custom template helpers
        handlebars: {
          path: 'bower_components/handlebars/handlebars.runtime.js', //original handlebars
          exports: 'Handlebars',
        },
        originalbackbone: {
          path: 'bower_components/backbone/backbone', // backbone before modifications
          depends: {jquery: '$', underscore: '_'},
          exports: 'Backbone',
        },
        backbone: {
          path: 'js/net/backbonePolis', // polis-specific backbone modifications
          depends: {originalbackbone: 'Backbone'},
          exports: 'Backbone',
        },
        underscore: {
          path: 'bower_components/underscore/underscore',
          exports: '_',
        },
        handlebones: {
          path: 'bower_components/handlebones/handlebones',
          depends: {handlebars: 'Handlebars', backbone: 'Backbone'},
          exports: 'Handlebones',
        },
        bootstrap_alert: {  //all bootstrap files need to be added to the dependency array of js/main.js
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_tab: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_popover: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_collapse: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_dropdown: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_affix: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        d3tooltips: {
          path: 'bower_components/d3-tip/index',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_tooltip: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_button: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        bootstrap_transition: {
          path: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        deepcopy: {
          path: 'bower_components/deepcopy/deepcopy.min.js',
          depends: {jquery: 'jQuery'},
          exports: null,
        },
        markdown: {
          path: 'bower_components/markdown/lib/markdown.js',
          depends: {jquery: 'jQuery'},
          exports: 'markdown',
        },
        VisView: {
          path: 'js/lib/VisView',
          depends: {d3tooltips: 'foo'}, // added to d3 object as d3.tip
          exports: 'VisView',
        },
      },
    }))
    .pipe(concat('polis.js'))
    .pipe(gulpif(isUglify, uglify()))
    .pipe(gulp.dest(dest('/js')));
}

function scriptsOther() {
  return gulp.src(['bower_components/d3/d3.min.js', 'd3.v4.min.js'])
    .pipe(gulpif(isUglify, uglify()))
    .pipe(gulp.dest(dest('/js')));
}

function deploy() {
  let cacheSecondsForContentWithCacheBuster = 31536000;

  function deployBatch({srcKeep, srcIgnore, headers}) {
    return new Promise(function (resolve, reject) {
      let gulpSrc = [srcKeep];
      if (srcIgnore) {
        gulpSrc.push(srcIgnore);
      }

      // create .headersJson files
      let globOpts = {
        nodir: true,
      };
      if (srcIgnore) {
        globOpts.ignore = srcIgnore;
      }
      let files = glob.sync(srcKeep, globOpts);
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let headerFilename = file + '.headersJson';
        fs.writeFileSync(headerFilename, JSON.stringify(headers));
        gulpSrc.push(headerFilename);
      }
      console.log('Copying files...', gulpSrc);

      gulp.src(gulpSrc, {base: dest('/')})
        .pipe(gulp.dest(polisConfig.OUTPUT_PATH)).on('error', function (err) {
        console.log('error when copying files', err);
        reject(err);
      }).on('end', resolve);
    });
  }

  const promises = [];
  console.log(`Writing to ${dest('/')}`);

  promises.push(deployBatch({
    srcKeep: dest('/**'),
    srcIgnore: '!' + dest('/**'),
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-transform,public,max-age=MAX_AGE,s-maxage=MAX_AGE'.replace(/MAX_AGE/g, cacheSecondsForContentWithCacheBuster),
    },
  }));

  promises.push(deployBatch({
    srcKeep: dest('/css/**'), // simply saying "/css/**" causes the 'css' prefix to be stripped, and the files end up in the root of the bucket.
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': 'text/css; charset=UTF-8',
      'Cache-Control': 'no-transform,public,max-age=MAX_AGE,s-maxage=MAX_AGE'.replace(/MAX_AGE/g, cacheSecondsForContentWithCacheBuster),
    },
  }));

  promises.push(deployBatch({
    srcKeep: dest('/js/**'), // simply saying "/js/**" causes the 'js' prefix to be stripped, and the files end up in the root of the bucket.
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-transform,public,max-age=MAX_AGE,s-maxage=MAX_AGE'.replace(/MAX_AGE/g, cacheSecondsForContentWithCacheBuster),
    },
  }));

  // embed.js
  let embedJsCacheSeconds = 60;
  promises.push(deployBatch({
    srcKeep: dest('/embed.js'),
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache'.replace(/MAX_AGE/g, embedJsCacheSeconds),
    },
  }));

  let twitterAuthReturnCacheSeconds = 60;
  promises.push(deployBatch({
    srcKeep: dest('/twitterAuthReturn.html'),
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'.replace(/MAX_AGE/g, twitterAuthReturnCacheSeconds),
    },
  }));

  // HTML files (uncached)
  // (Wait until last to upload the html, since it will clobber the old html on S3, and we don't want that to happen before the new JS/CSS is uploaded.)
  promises.push(deployBatch({
    srcKeep: dest('/*.html'),
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
    },
  }));

  return Promise.all(promises);
}

// End of tasks

// Support functions

function dest(suffix) {
  return distRoot + suffix;
}

// End of support functions

module.exports = {
  default: gulp.series(cleanDist, lint, templates, scriptsVis2, scriptsOther, templatedScripts, scripts,
    css, fontawesome, staticAPI, embedJs, index, deploy),
  clean: cleanDist,
  deploy: deploy,
};
