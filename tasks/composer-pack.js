import {CoreTask} from "./core-task";

const { OUTPUT_DICTIONARY_PATH } = require('dotenv').config().parsed;
const { exec } = require("child_process");

export class ComposerPack extends CoreTask {
    run() {
        return new Promise(resolve => {
            exec(`cd ${OUTPUT_DICTIONARY_PATH} && composer dump-autoload -o`, (error, stdout, stderr) => {
                resolve();
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        })
    }
}
