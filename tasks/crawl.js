import {CoreTask} from "./core-task";

const { URL, DOWNLOADS_DICTIONARY_PATH } = require('dotenv').config().parsed;
const Crawler = require('crawler');
const fs = require('fs');
const path = require('path');

export class Crawl extends CoreTask {
    constructor() {
        super();
        this.links = [];
        this.pageRequestCrawler = new Crawler({
            maxConnections: 10,
        });
    }
    setLinks(res) {
        const $ = res.$;
        $('a').each((index, element) => {
            const href = element.attribs.href;
            if (!href || !href.endsWith('.zip')) {
                return
            }
            const parts = href.split('/');
            const filename = parts[parts.length - 1];
            this.links.push({ uri: href, filename })
        })
    }
    run() {
        return new Promise(resolve => {
            const downloadCrawler = new Crawler({
                encoding: null,
                jQuery: false,// set false to suppress warning message.
                callback: (err, res, done) => {
                    if (err) {
                        console.error(err.stack);
                    } else {
                        fs.createWriteStream(path.join(DOWNLOADS_DICTIONARY_PATH, path.sep, res.options.filename))
                            .write(res.body);
                    }
                    done();
                    this.links = this.links.filter(link => link.filename !== res.options.filename);
                    if (this.links.length) {
                        return;
                    }
                    resolve();
                }
            });
            // Queue URLs with custom callbacks & parameters
            this.pageRequestCrawler.queue([{
                uri: URL,
                callback: (error, res, done) => {
                    if (error) {
                        console.log(error);
                        return done();
                    }
                    this.setLinks(res);
                    this.links.forEach(({ uri, filename }) => {
                        downloadCrawler.queue({
                            uri,
                            filename,
                        })
                    })
                    return done();
                }
            }]);
        })
    }
}
