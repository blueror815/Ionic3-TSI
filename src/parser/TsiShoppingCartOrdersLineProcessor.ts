import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiShoppingCartLineResult } from './TsiShoppingCartLineResult';
import { TsiShoppingCartServiceProvider } from '../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';

export class TsiShoppingCartOrdersLineProcessor extends TsiAbstractLineProcessor<TsiShoppingCartLineResult> {

    public static  KEY_SHOPPING_CART_DATE = "SHOPPINGCARTDATE";
    public static  KEY_SHOPPING_CART_INFO = "SHOPPINGCARTINFO";

    constructor(public dataService: TsiDataServiceProvider, public shoppingService: TsiShoppingCartServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let result = new TsiShoppingCartLineResult();
        result.sourceFilename = sourceFileName;
        let lineItems = line.split( "\\;" );

        if (lineItems.length > 1 && !lineItems[0].startsWith( "KUN" ) && !lineItems[0].startsWith( "TXT" ))
        {
            result.articleID = lineItems[1] ;
            result.pal_count = parseInt( lineItems[2] );
            result.vpe_count = parseInt( lineItems[3] );
            if (lineItems.length > 4)
                this.dataService.getArticle( lineItems[1] ).setNewReservationDate( lineItems[4] );
        }
        if (line.startsWith( "KUN" ))
        {
            result.customerData = line;
        }
        return result;
    }

    public process(lineResult: TsiShoppingCartLineResult) {
        let customerID = lineResult.sourceFilename.substring( 0, lineResult.sourceFilename.lastIndexOf( '.' ) ).split( "_" )[1];
        let readedCustomer = this.dataService.getCustomer( customerID.replaceFirst( "^0+(?!$)", "" ) );
        let creationDateOfCart = parseInt( lineResult.sourceFilename.substring( 0, lineResult.sourceFilename.lastIndexOf( '.' ) ).split( "_" )[2] );
        let loadedCart = this.shoppingService.getShoppingCart( customerID.replaceFirst( "^0+(?!$)", "" ) );

        loadedCart.setCreationDate( creationDateOfCart );
        loadedCart.setFilename( lineResult.sourceFilename );
        loadedCart.setSaved( true );
        if (lineResult.articleID != null && this.dataService.getArticle( lineResult.articleID ) != null)
        {
            loadedCart.addVpeArticle( lineResult.articleID, lineResult.vpe_count, false );
            loadedCart.addPalArticle( lineResult.articleID, lineResult.pal_count, false );
        }
        this.shoppingService.setShoppingCart( customerID.replaceFirst( "^0+(?!$)", "" ), loadedCart );
        if (lineResult.customerData != null)
        {
            let lineItems = lineResult.customerData.split( "\\|" );
            if (lineItems[1].equals( "KTOART" ) && lineItems.length > 2)
                readedCustomer.setAccountType( lineItems[2] );
            if (lineItems[1].equals( "AG0002" ) && lineItems.length > 2)
                readedCustomer.setBuyerForStore( lineItems[2] );
            if (lineItems[1].equals( "KNAME1" ) && lineItems.length > 2)
                readedCustomer.setName( lineItems[2] );
            if (lineItems[1].equals( "KNAME2" ) && lineItems.length > 2)
                readedCustomer.setName_2( lineItems[2] );
            if (lineItems[1].equals( "KNAME3" ) && lineItems.length > 2)
                readedCustomer.setName_3( lineItems[2] );
            if (lineItems[1].equals( "KSTRAS" ) && lineItems.length > 2)
                readedCustomer.setStreet( lineItems[2] );
            if (lineItems[1].equals( "KPSTLZ" ) && lineItems.length > 2)
                readedCustomer.setZip( lineItems[2] );
            if (lineItems[1].equals( "KORT01" ) && lineItems.length > 2)
                readedCustomer.setCity( lineItems[2] );
            if (lineItems[1].equals( "KLAND1" ) && lineItems.length > 2)
                readedCustomer.setCountry( lineItems[2] );
            if (lineItems[1].equals( "KGLNNR" ) && lineItems.length > 2)
                readedCustomer.setGLN( lineItems[2] );
            if (lineItems[1].equals( "KABMAI" ) && lineItems.length > 2)
                readedCustomer.setUseMail( lineItems[2] );
            if (lineItems[1].equals( "KSTEUE" ) && lineItems.length > 2)
                readedCustomer.setTaxNumber( lineItems[2] );
            if (lineItems[1].equals( "KUINNR" ) && lineItems.length > 2)
                readedCustomer.setPurchaseTaxNumber( lineItems[2] );
            if (lineItems[1].equals( "KBANKI" ) && lineItems.length > 2)
                readedCustomer.setIBAN( lineItems[2] );
            if (lineItems[1].equals( "KBANKS" ) && lineItems.length > 2)
                readedCustomer.setBIC( lineItems[2] );
            if (lineItems[1].equals( "KTELNR" ) && lineItems.length > 2)
                readedCustomer.setPhoneNumber( lineItems[2] );
            if (lineItems[1].equals( "KMOBNR" ) && lineItems.length > 2)
                readedCustomer.setMobileNumber( lineItems[2] );
            if (lineItems[1].equals( "KFAXNR" ) && lineItems.length > 2)
                readedCustomer.setFaxNumber( lineItems[2] );
            if (lineItems[1].equals( "KEMAIL" ) && lineItems.length > 2)
                readedCustomer.setEmail( lineItems[2] );
            if (lineItems[1].equals( "KSPRAS" ) && lineItems.length > 2)
                readedCustomer.setLanguage( lineItems[2] );
            if (lineItems[1].equals( "AANRED" ) && lineItems.length > 2)
                readedCustomer.setContactGender( lineItems[2] );
            if (lineItems[1].equals( "AVNAME" ) && lineItems.length > 2)
                readedCustomer.setContactPrename( lineItems[2] );
            if (lineItems[1].equals( "ANNAME" ) && lineItems.length > 2)
                readedCustomer.setContactName( lineItems[2] );
            if (lineItems[1].equals( "ASPRAS" ) && lineItems.length > 2)
                readedCustomer.setContactLanguage( lineItems[2] );
            if (lineItems[1].equals( "ATELNR" ) && lineItems.length > 2)
                readedCustomer.setContactPhone( lineItems[2] );
            if (lineItems[1].equals( "AMOBNR" ) && lineItems.length > 2)
                readedCustomer.setContactMobile( lineItems[2] );
            if (lineItems[1].equals( "AFAXNR" ) && lineItems.length > 2)
                readedCustomer.setContactFax( lineItems[2] );
            if (lineItems[1].equals( "AEMAIL" ) && lineItems.length > 2)
                readedCustomer.setContactMail( lineItems[2] );
            if (lineItems[1].equals( "ANEWSL" ) && lineItems.length > 2)
                readedCustomer.setContactNewsletter( lineItems[2] );
            // if (lineItems[1].equals( "ADLER1" ))
            // readedCustomer.setCust
            if (lineItems[1].equals( "PRSGRP" ) && lineItems[2] != null)
                readedCustomer.setPriceGroup( lineItems[2] );
            if (lineItems[1].equals( "ZAHLBD" ) && lineItems[2] != null)
                readedCustomer.setPaymentConditions( lineItems[2] );
            if (lineItems[1].equals( "ZTIMAB" ) && lineItems[2] != null)
                readedCustomer.setShippingTimeFrom( lineItems[2] );
            if (lineItems[1].equals( "ZTIMBI" ) && lineItems[2] != null)
                readedCustomer.setShippingTimeTo( lineItems[2] );
            if (lineItems[1].equals( "ZLKWTP" ) && lineItems[2] != null)
                readedCustomer.setShippingType( lineItems[2] );

            // out.write("TXT|Neuer Auftragegeber mit Reservierung
            // out.write("TXT|Neuer Knoten Stufe 6
            this.dataService.putCustomer( readedCustomer );
        }
    }

}