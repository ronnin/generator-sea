/*global describe, beforeEach, it*/
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('seajs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('seajs:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.jshintrc',
      'package.json',
      'src',
      'test'
    ];

    helpers.mockPrompt(this.app, {
      'family': 'demo',
      'name': 'seajs-demo',
      'version': '0.0.1',
      'description': 'fake demo',
      'seajsVersion': '2.1.1',
      'alias': ['jquery/jquery', 'gallery/es5-safe', 'jquery-plugin/form'],
      'author': 'Ronnin Lee <ronnin@outlook.com>',
      'repositoryType': 'git',
      'repositoryUri': 'https://github.com/ronnin/seajs-demo.git',
      'homePage': 'https://github.com/ronnin/seajs-demo',
      'licenses': ['MIT']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
