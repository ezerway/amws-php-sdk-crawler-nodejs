import { Crawl } from './tasks/crawl';
import { Unzip } from './tasks/unzip';
import { ComposerPack } from './tasks/composer-pack';

async function main() {
    await (new Crawl()).run();
    await (new Unzip()).run();
    await (new ComposerPack()).run();
}
main();
