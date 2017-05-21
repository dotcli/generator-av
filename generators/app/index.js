'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `You are generating a ${chalk.red('.CLI')} audio / visual experiment.`
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname,
    }, {
      type: 'input',
      name: 'description',
      message: 'What is your project?',
      default: '',
    }, {
      type: 'list',
      name: 'visualLib',
      message: 'Visual library / framework',
      choices: [
        { name: 'none', value: false },
        { name: 'three.js', value: 'three' },
        // TODO add more visual lib choices, see https://github.com/sjfricke/awesome-webgl#others
        // possibly: regl, PixiJS, A-Frame
      ],
      default: 'three',
    }, {
      type: 'list',
      name: 'audioLib',
      message: 'Audio library / framework',
      choices: [
        { name: 'none', value: false },
        { name: 'tone.js', value: 'tone' },
        // TODO consider more audio lib options, see https://github.com/alemangui/web-audio-resources#libraries
        // possibly blip? https://github.com/jshanley/blip
      ],
      default: false,
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  packageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      Object.assign(this.props, {
        author: this.user.git.name()
      })
    );
  }
  indexHTML() {
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'),
      this.props
    );
  }
  indexJS() {
    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      this.props
    );
  }
  otherFiles() {
    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_style.css'),
      this.destinationPath('style.css')
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      Object.assign(this.props, {
        author: this.user.git.name()
      })
    );
  }

  installVisual() {
    if (!this.props.visualLib) return;
    switch (this.props.visualLib) {
      case 'three':
        this.npmInstall([
          'three',
          'three-orbit-viewer',
          // TODO move the additional pieces to "What more would you like?" step
          'dat.gui',
          'tween.js',
        ], { 'save': true });
        break;
      default:
        return;
    }
  }

  installAudio() {
    if (!this.props.audioLib) return;
    switch (this.props.audioLib) {
      case 'tone':
        this.npmInstall([
          'tone',
        ], { 'save': true });
        break;
      default:
        return;
    }
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
    });
    // this._installVisual();
    // this._installAudio();
  }
};
