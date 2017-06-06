import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiConstants } from '../utils/TsiConstants';
import { TsiEmailServiceProvider } from '../providers/tsi-email-service/tsi-email-service';
import { TsiConnectionServiceProvider } from '../providers/tsi-connection-service/tsi-connection-service';

export class TsiConfLineProcessor extends TsiAbstractLineProcessor<string> {

    constructor(public dataService: TsiDataServiceProvider, public emailService: TsiEmailServiceProvider, public connectionService: TsiConnectionServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let lineItems = line.split( "\\|" );

        if (lineItems[0] == TsiConstants.CUSTOMER_FOLDER_KEY)
            this.dataService.customerFolder = lineItems[1];
        if (lineItems[0] == TsiConstants.START_PIC_KEY)
            this.dataService.startImgFileName = lineItems[1];
        if (lineItems[0] == TsiConstants.EMAIL_RECIPIENT_KEY)
            this.emailService.recipient = lineItems[1];
        if (lineItems[0] == TsiConstants.EMAIL_SERVER_KEY )
            this.emailService.host = lineItems[1];
        if (lineItems[0] == TsiConstants.EMAIL_PORT_KEY )
            this.emailService.port = lineItems[1];
        if (lineItems[0] == TsiConstants.EMAIL_USERNAME_KEY )
            this.emailService.username = lineItems[1];
        if (lineItems[0] == TsiConstants.EMAIL_FROM_KEY)
            this.emailService.from = lineItems[1];
        if (lineItems[0] == TsiConstants.EMAIL_PASSWORD_KEY)
            this.emailService.password = lineItems[1];
        if (lineItems[0] == TsiConstants.FTP_USERNAME)
            this.connectionService.username = lineItems[1];
        if (lineItems[0] == TsiConstants.FTP_PASSWORD)
            this.connectionService.password = lineItems[1];
        return null;
    }

    public process(lineResult: string) {
        
    }

}