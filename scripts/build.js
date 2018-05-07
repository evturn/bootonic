process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

measureFileSizesBeforeBuild(paths.appBuild)
  .then(prevFilesizes => {
    putStrLn('\nRemoving contents in build directory...');
    fs.emptyDirSync(paths.appBuild);
    putStrLn('Copying contents in public directory...');
    copyPublicFolder();
    putStrLn('Compiling webpack.');
    return build(prevFilesizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        putStrLn('Compiled with warnings.');
        putStrLn(warnings.join('\n\n'));
      } else {
        putStrLn('Compiled successfully.');
      }
      putStrLn('File sizes after gzip:');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        512 * 1024,
        1024 * 1024
      );
      putStrLn('\nDone.');
    },
    err => {
      console.log(chalk.red('Fuck, I failed to compile.\n'));
      printBuildError(err);
      process.exit(1);
    }
  );

function build(previousFileSizes) {
  putStrLn('Creating production build');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      const { errors, warnings } = messages;
      if (errors.length) {
        if (errors.length > 1) {
          errors.length = 1;
        }
        return reject(new Error(errors.join('\n\n')));
      }
      const { CI } = process.env;
      if (CI && (typeof CI !== 'string' || 
          CI.toLowerCase() !== 'false') && warnings.length) {
        return reject(new Error(warnings.join('\n\n')));
      }
      return resolve({ stats, previousFileSizes, warnings });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

function putStrLn(str) {
  console.log(chalk.yellow(`${str}\n`));
}
