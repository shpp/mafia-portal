module.exports = function() {
  var temp_public = './public/';

  var config = {
    // all js to vet
    alljs: [
      './public/js/*.js',
      './*.js'
    ],

    less: temp_public + 'Less/admin.less',
    less_src: temp_public + 'Less/**/*.less',

    css_dest: temp_public + 'css/'


  };

  return config;
};
