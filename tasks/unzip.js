import {CoreTask} from "./core-task";

const { OUTPUT_DICTIONARY_PATH, DOWNLOADS_DICTIONARY_PATH } = require('dotenv').config().parsed;
const fs = require('fs');
const path = require('path');
const AdmZip = require("adm-zip");

export class Unzip extends CoreTask {
    run() {
        fs.readdir(DOWNLOADS_DICTIONARY_PATH, (err, files) => {
            files.forEach(file => {
                if (!file.endsWith('.zip')) {
                    return;
                }
                const zip = new AdmZip(path.join(DOWNLOADS_DICTIONARY_PATH, path.sep, file));
                zip.extractAllTo(OUTPUT_DICTIONARY_PATH, true);
            });
        });
        console.log(OUTPUT_DICTIONARY_PATH)
    }
}
