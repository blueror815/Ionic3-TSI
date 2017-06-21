import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { SyncFileDescription } from '../models/SyncFileDescription';

export class TsiSyncFileLineProcessor extends TsiAbstractLineProcessor<SyncFileDescription> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let lineItems = line.split("|");
        let fileDescription = new SyncFileDescription(lineItems[0], parseInt(lineItems[1]));
        return fileDescription;
    }

    public process(lineResult: SyncFileDescription) {
        
    }

}