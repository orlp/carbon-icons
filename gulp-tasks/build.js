const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');
const rsp = require('remove-svg-properties').stream;
const dom = require('gulp-dom');


// SVG Config
const config = {
  mode: {
    symbol: { // Activate the defs mode
      render: {
        css: true, // CSS output
        scss: true
      },
      prefix: ".svg--%s",
      bust: false, // Cache busting
      example: true // Build a page
    }
  }
};

// Build svg sprite
const build = () => {

  gulp.src([
    './svg/**/*.svg',
    '!./svg/*.svg',
    '!./svg/runtime/*.svg',
  ])
  .pipe(rsp.remove({
    properties: ['fill', rsp.PROPS_STROKE]
  }))
  .pipe(dom(function() {
    this.querySelector('svg').setAttribute('fill-rule', 'evenodd');
    return this.querySelector('body').innerHTML
  }, false))
  .pipe(svgo({
    plugins: [{
      removeTitle: true
    }]
  }))
  .pipe(svgSprite(config))
  .pipe(gulp.dest('./build'));
}

module.exports = build;
