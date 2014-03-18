'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var semver = require('semver');


var SeajsGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Seajs generator.'));

    var currentDir = path.basename(process.cwd());
    var namesOfCurrentDir = currentDir.split('-');
    var prompts = [{
      name: 'family',
      type: 'input',
      message: 'module\'s family?',
      'default': function(){
        if (namesOfCurrentDir.length > 1) {
          return namesOfCurrentDir[0];
        }
        return 'cms';
      },
      validate: function(input){
        if (!input || !input.trim()) {
          return 'modules\'s family must be provided!'
        }
        return true;
      }
    }, {
      name: 'name',
      type: 'input',
      message: 'module\'s name?',
      'default': function() {
        if (namesOfCurrentDir.length > 1) {
          return namesOfCurrentDir.slice(1).join('-');
        }
        return currentDir;
      },
      validate: function(input){
        if (!input || !input.trim()) {
          return 'modules\'s name must be provided!'
        }
        return true;
      }
    }, {
      name: 'version',
      type: 'input',
      message: 'module\'s version?',
      'default': '0.0.1',
      validate: function(input) {
        if (!semver.valid(input)) {
          return 'module\'s version might be in [major.minor.patch] format. please refer to http://semver.org/';
        }
        return true;
      }
    }, {
      name: 'seajsVersion',
      type: 'input',
      message: 'version of SeaJs?',
      'default': '2.1.1'
    }, {
      name: 'alias',
      type: 'checkbox',
      message: 'select modules, this module depends:',
      choices: [
        { name: 'jquery/jquery', checked: true },
        { name: 'gallery/es5-safe', checked: true },
        'gallery/placeholders',
        'gallery/ztree',
        'jquery-plugin/form',
        'gallery/store',
        'jquery/select2',
        'gallery/moment',
        'gallery/numeral',
        'gallery/mathjs',
        'gallery/zeroclipboard',
        'gallery/keymaster',
        'lodash/lodash',
        'async/async',
        'sockjs/sockjs-client'
      ]
    }, {
      name: 'description',
      type: 'input',
      message: 'describe this module:'
    }, {
      name: 'author',
      type: 'input',
      message: 'Author(who are you)?',
      'default': 'PopEye'
    }, {
      name: 'repositoryType',
      type: 'list',
      message: 'which vcs do you use?',
      choices: ['Git', 'Subversion', 'Mercurial'],
      'default': 'Git',
      filter: function(input) {return input && input.toLowerCase();}
    }, {
      name: 'repositoryUri',
      type: 'input',
      message: 'repository uri?',
      'default': function(answers) {
        if (answers['repositoryType'] == 'git' && answers['author']) {
          var githubId = answers['author'].replace(/<.*>/, '').trim().replace(' ', '_').toLowerCase();
          return 'https://github.com/' + githubId + '/' + answers['name'] + '.git';
        }
        return '';
      }
    }, {
      name: 'homePage',
      type: 'input',
      message: 'Home Page?',
      'default': function(answers) {
        console.log(answers['repositoryUri'], /^\w+github\.com\w+$/.test(answers['repositoryUri']));
        if (/^.+github\.com.+$/.test(answers['repositoryUri'])) {
          return answers['repositoryUri'].replace(/\.git$/, '').replace(/^git:/, 'https:');
        }
        return '';
      }
    }, {
      name: 'licenses',
      type: 'checkbox',
      message: 'which licenses?',
      choices: [{ name: 'MIT', checked: true}, 'GPL', 'LGPL', 'APL', 'APL2.0', 'Copyright reserved']
    }];

    this.prompt(prompts, function (props) {
      util._extend(this, props);
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('test');

    this.template('_package.json', 'package.json');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SeajsGenerator;