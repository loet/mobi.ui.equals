module.exports.config = {

    src: [
        'src/**/*.js', '!src/**/*.spec.js'
    ],

    dest: 'dist/lodashadapter.js',

    bower_components: [
        'bower_components/lodash/dist/lodash.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/mobi.ui.lodashadapter/dist/lodashadapter.js'
    ]
}
;
