var fs = require('fs')
var path = require('path')
var clicolour = require('cli-color')
var error = require('../../../../libs/error/bsod.js')

var files = ["app.js", "node_modules", "libs"];

var i;

exports.checkFiles = function checkFiles(x) {
    // TODO: Fix issue where files[i] is undefined
    console.log(clicolour.yellowBright("ALPHA:") + "Checking out files need fixing, does in fact check out files correctly. Will fix in alpha version");
    for (var i = 0; i < files.length; i++) {
        fs.statSync(files[i], function(err, stat) {
            if (err === null) {
                return console.log('Checked out file ' + files[i] + "..." + clicolour.greenBright("OK"));
            } else if (err.code == 'ENOENT') {
                console.log('Checked out file ' + files[i] + "..." + clicolour.redBright("ERROR!"));
                throw error.throwError("BOOT_" + err.code + "_CHECKS_NOT_FOUND:" + files[i], err, err.code);
            } else {
                console.log('Checked out file ' + files[i] + "..." + clicolour.redBright("ERROR!"));
                throw error.throwError("BOOT_CHECKS_FILES_" + err.code + ":" + files[i], err, err.code);
            }
        });
    }
    /*
        fs.stat(files[0], function(err, stat){
          if(err === null){
              return console.log('Checked out file '+files[0]+"..."+clicolour.greenBright("OK"));
            }
            else if( err.code == 'ENOENT'){
              console.log('Checked out file '+files[0]+"..."+clicolour.redBright("ERROR!"));
              throw error.throwError("BOOT_"+err.code+"_CHECKS_NOT_FOUND:"+files[0], err, err.code);
            }
            else{
              console.log('Checked out file '+files[0]+"..."+clicolour.redBright("ERROR!"));
              throw error.throwError("BOOT_CHECKS_FILES_"+err.code+":"+files[0], err, err.code);
                }
              });
              fs.stat(files[2], function(err, stat){
                if(err === null){
                    console.log('Checked out file '+files[2]+"..."+clicolour.greenBright("OK"));
                  }
                  else if( err.code == 'ENOENT'){
                    console.log('Checked out file '+files[2]+"..."+clicolour.redBright("ERROR!"));
                    throw error.throwError("BOOT_"+err.code+"_CHECKS_NOT_FOUND:"+files[2], err, err.code);
                  }
                  else{
                    console.log('Checked out file '+files[2]+"..."+clicolour.redBright("ERROR!"));
                    throw error.throwError("BOOT_CHECKS_FILES_"+err.code+":"+files[2], err, err.code);
                      }
                    });
              fs.stat(files[1], function(err, stat){
                if(err === null){
                    console.log('Checked out file '+files[1]+"..."+clicolour.greenBright("OK"));
                  }
                  else if( err.code == 'ENOENT'){
                    console.log('Checked out file '+files[1]+"..."+clicolour.redBright("ERROR!"));
                    error.throwError("BOOT_"+err.code+"_CHECKS_NOT_FOUND:"+files[1], err, err.code);
                  }
                  else{
                    console.log('Checked out file '+files[1]+"..."+clicolour.redBright("ERROR!"));
                    error.throwError("BOOT_CHECKS_FILES_"+err.code+":"+files[1], err, err.code);
                      }
                    });*/

};