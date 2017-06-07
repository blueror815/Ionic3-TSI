import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiConfigEntry } from '../models/TsiConfigEntry';

export class TsiNewCustomerConfLineProcessor extends TsiAbstractLineProcessor<string> {

    private index = 0;
    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        this.index = 0;
        let newEntry = new TsiConfigEntry();
        let lineItems = line.split( "\\|" );
        if(lineItems[0] == "KTOART")
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountType.push( newEntry );
        }
        
        if(lineItems[0] == "KSPRAS")
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountLanguage.push( newEntry );
        }
        
        if(lineItems[0] == "ASPRAS")
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountContactLanguage.push( newEntry );
        }
        
        if(lineItems[0] == "AANRED")
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountContactGender.push(newEntry);
        }
        
        if(lineItems[0] == "ANEWSL" )
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountNewsletter.push( newEntry );
            
        }
        
        if(lineItems[0] == "KABMAI" )
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountUseMail.push( newEntry );
        }
        
        if(lineItems[0] == "ZAHLBD" )
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            newEntry.setValueThree( lineItems[3] );
            this.dataService.accountPayments.push( newEntry );
        }

        
        if(lineItems[0] == "PRSGRP" )
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountPricegroup.push( newEntry );
        }
        
        if(lineItems[0] == "KLAND1" )
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            newEntry.setValueThree( lineItems[3] );
            this.dataService.accountCountry.push(newEntry);
        }
        
        if(lineItems[0] == "ZLKWTP" )
        {
            newEntry.setEntryType( lineItems[0] );
            newEntry.setValueOne( lineItems[1] );
            newEntry.setValueTwo( lineItems[2] );
            this.dataService.accountShippingType.push(newEntry);
        }
        return null;
    }

    public process(lineResult: string) {
       
    }

}