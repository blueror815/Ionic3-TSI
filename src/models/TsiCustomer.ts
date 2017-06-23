import { TsiSortableObj } from './TsiSortableObj';

export class TsiCustomer extends TsiSortableObj {
    
    protected addAllAttributeIndexSynonyms() {
        this.addAttributeIndexSynonym( "KUNDENNAME", 0 );
        this.addAttributeIndexSynonym( "ORT", 5 );
        this.addAttributeIndexSynonym( "PRIO.", 7 );
        this.addAttributeIndexSynonym( "KUNDENGR.", 8 );
        this.addAttributeIndexSynonym( "LETZTER BESUCH", 9 );
    }

    constructor() {
        super(54);
    }

    
    public getName()
    {
        if (this.getAttribute( 0 ) != null)
            return this.getAttribute( 0 );
        else
            return "";
    }

    public setName( name)
    {
        this.setAttribute( 0, name );
    }

    public  getCity_short()
    {
        if (this.getAttribute( 1 ) != null)
            return this.getAttribute( 1 );
        else
            return "";
    }

    public  setCity_short( city_short)
    {
        this.setAttribute( 1, city_short );
    }

    public  getStreet()
    {
        if (this.getAttribute( 2 ) != null)
            return this.getAttribute( 2 );
        else
            return "";
    }

    public  setStreet( street)
    {
        this.setAttribute( 2, street );
    }

    public  getCustomerID()
    {
        if (this.getAttribute( 3 ) != null)
            return this.getAttribute( 3 );
        else
            return "";
    }

    public  setCustomerID( customerID)
    {
        this.setAttribute( 3, customerID );
    }

    public  getZip()
    {
        if (this.getAttribute(4) != null)
            return this.getAttribute( 4 );
        else
            return "";
    }

    public  setZip(zip)
    {
        this.setAttribute( 4, zip );
    }

    public  getCity()
    {
        if (this.getAttribute( 5 ) != null)
            return this.getAttribute( 5 );
        else
            return "";
    }

    public  setCity( city)
    {
        this.setAttribute( 5, city );
    }

    public  getOrderBlock()
    {
        if (this.getAttribute( 6 ) != null)
            return this.getAttribute( 6 );
        else
            return "";
    }

    public  setOrderBlock( orderBlock)
    {
        this.setAttribute( 6, orderBlock );
    }

    public  getAbc()
    {
        if (this.getAttribute( 7 ) != null)
            return this.getAttribute( 7 );
        else
            return "";
    }

    public  setAbc( abc)
    {
        this.setAttribute( 7, abc );
    }

    public  getAfi()
    {
        if (this.getAttribute( 8 ) != null)
            return this.getAttribute( 8 );
        else
            return "";
    }

    public  setAfi( afi)
    {
        this.setAttribute( 8, afi );
    }

    public  getDateLastVisit()
    {
        if (this.getAttribute( 9 ) != null)
            return this.getAttribute( 9 );
        else
            return "";
    }

    public  setDateLastVisit( dateLastVisit)
    {
        this.setAttribute( 9, dateLastVisit );
    }

    public  getFormatCode()
    {
        if (this.getAttribute( 10 ) != null)
            return this.getAttribute( 10 );
        else
            return "";
    }

    public  setFormatCode( formatCode)
    {
        this.setAttribute( 10, formatCode );
    }

    public  getCodeAG()
    {
        if (this.getAttribute( 11 ) != null)
            return this.getAttribute(11 );
        else
            return "";
    }

    public  setCodeAG( codeAG)
    {
        this.setAttribute( 11, codeAG );
    }

    public  getCodeWE()
    {
        if (this.getAttribute( 12 ) != null)
            return this.getAttribute( 12 );
        else
            return "";
    }

    public setCodeWE( codeWE)
    {
        this.setAttribute( 12, codeWE );
    }

    public getInfo()
    {
        if (this.getAttribute( 13 ) != null)
            return this.getAttribute( 13 );
        else
            return "";
    }

    public setInfo( info)
    {
        this.setAttribute( 13, info );
    }

    public getMinOrderQuantity()
    {
        if (this.getAttribute(14) != null)
            return this.getAttribute( 14 );
        else
            return "";
    }

    public setMinOrderQuantity( minOrderQuantity)
    {
        this.setAttribute( 14, minOrderQuantity );
    }

    public  getPhoneNumber()
    {
        if (this.getAttribute( 15 ) != null)
            return this.getAttribute( 15 );
        else
            return "";
    }

    public  setPhoneNumber( phoneNumber)
    {
        this.setAttribute( 15, phoneNumber );
    }

    public  getEmail()
    {
        if (this.getAttribute( 16 ) != null)
            return this.getAttribute( 16 );
        else
            return "";
    }

    public  setEmail( email)
    {
        this.setAttribute( 16, email );
    }

    public  getLastBill()
    {
        if (this.getAttribute( 17 ) != null)
            return this.getAttribute( 17 );
        else
            return "";
    }

    public  setLastBill( lastBill)
    {
        this.setAttribute( 17, lastBill );
    }

    public  getDateLastRG()
    {
        if (this.getAttribute( 18 ) != null)
            return this.getAttribute( 18 );
        else
            return "";
    }

    public  setDateLastRG( dateLastRG)
    {
        this.setAttribute( 18, dateLastRG );
    }

    public  getValueLastRG()
    {
        if (this.getAttribute( 19 ) != null)
            return this.getAttribute( 19 );
        else
            return "";
    }

    public  setValueLastRG( valueLastRG)
    {
        this.setAttribute( 19, valueLastRG );
    }

    public  getLimitCustomer()
    {
        if (this.getAttribute( 20 ) != null)
            return this.getAttribute( 20 );
        else
            return "";
    }

    public  setLimitCustomer( limitCustomer)
    {
        this.setAttribute( 20, limitCustomer );
    }

    public  getLimitClass()
    {
        if (this.getAttribute( 21 ) != null)
            return this.getAttribute( 21 );
        else
            return "";
    }

    public  setLimitClass( limitClass)
    {
        this.setAttribute( 21, limitClass );
    }

    public  getCreditLimit()
    {
        if (this.getAttribute( 22 ) != null)
            return this.getAttribute( 22 );
        else
            return "";
        }

    public  setCreditLimit( creditLimit)
    {
        this.setAttribute( 22, creditLimit );
    }

    public  getCreditLimitAvailable()
    {
        if (this.getAttribute( 23 ) != null)
            return this.getAttribute( 23 );
        else
            return "";
    }

    public  setCreditLWimitAvailable( creditLWimitAvailable)
    {
        this.setAttribute( 23, creditLWimitAvailable );
    }

    public isNewCustomer()
    {
        return this.getName().startsWith("Neukunde");
    }

    public setCountry( country)
    {
        this.setAttribute( 24, country );
    }

    public  getCountry()
    {
        if (this.getAttribute( 24 ) != null)
            return this.getAttribute( 24 );
        else
            return "";
    }

    public  setLanguage( language)
    {
        this.setAttribute( 25, language );
    }

    public  getLanguage()
    {
        if (this.getAttribute( 25 ) != null)
            return this.getAttribute( 25 );
        else
            return "";
    }

    public  setMobileNumber( mobileNumber)
    {
        this.setAttribute( 26, mobileNumber );
    }

    public  getMobileNumber()
    {
        if (this.getAttribute( 26 ) != null)
            return this.getAttribute( 26 );
        else
            return "";
    }

    public  setFaxNumber( faxNumber)
    {
        this.setAttribute( 27, faxNumber );
    }

    public  getFaxNumber()
    {
        if (this.getAttribute( 27 ) != null)
            return this.getAttribute( 27 );
        else
            return "";
    }

    public  setUseMail( useMail)
    {
        this.setAttribute( 28, useMail );
    }

    public  getUsemail()
    {
        if (this.getAttribute( 28 ) != null)
            return this.getAttribute( 28 );
        else
            return "";
    }

    public  setAccountType( accountType)
    {
        this.setAttribute( 29, accountType );
    }

    public  getAccountType()
    {
        if (this.getAttribute( 29 ) != null)
            return this.getAttribute( 29 );
        else
            return "";
    }

    public  setBuyerForStore( buyer)
    {
        this.setAttribute( 30, buyer );
    }

    public  getBuyerForStore()
    {
        if (this.getAttribute( 30 ) != null)
            return this.getAttribute( 30 );
        else
            return "";
    }

    public  setPriceGroup( priceGroup)
    {
        this.setAttribute( 31, priceGroup );
    }

    public  getPriceGroup()
    {
        if (this.getAttribute( 31 ) != null)
            return this.getAttribute( 31 );
        else
            return "";
    }

    public  setPaymentConditions( payment)
    {
        this.setAttribute( 32, payment );
    }

    public  getPaymentConditions()
    {
        if (this.getAttribute( 32 ) != null)
            return this.getAttribute( 32 );
        else
            return "";
    }

    public  setShippingTimeFrom( timeFrom)
    {
        this.setAttribute( 33, timeFrom );
    }

    public  getShippingTimeFrom()
    {
        if (this.getAttribute( 33 ) != null)
            return this.getAttribute( 33 );
        else
            return "";
    }

    public  setShippingTimeTo( timeTo)
    {
        this.setAttribute( 34, timeTo );
    }

    public  getShippingTimeTo()
    {
        if (this.getAttribute( 34 ) != null)
            return this.getAttribute( 34 );
        else
            return "";
    }

    public  setShippingType( type)
    {
        this.setAttribute( 35, type );
    }

    public  getShippingType()
    {
        if (this.getAttribute( 35 ) != null)
            return this.getAttribute( 35 );
        else
            return "";
    }

    public  getName_2()
    {
        if (this.getAttribute( 36 ) != null)
            return this.getAttribute( 36 );
        else
            return "";
    }

    public  setName_2( name)
    {
        this.setAttribute( 36, name );
    }

    public  getName_3()
    {
        if (this.getAttribute( 37 ) != null)
            return this.getAttribute( 37 );
        else
            return "";
    }

    public  setName_3( name)
    {
        this.setAttribute( 37, name );
    }

    public  getTaxNumber()
    {
        if (this.getAttribute( 38 ) != null)
            return this.getAttribute( 38 );
        else
            return "";
    }

    public  setTaxNumber( taxNumber)
    {
        this.setAttribute( 38, taxNumber );
    }

    public  getPurchaseTaxNumber()
    {
        if (this.getAttribute( 39 ) != null)
            return this.getAttribute( 39 );
        else
            return "";
    }

    public  setPurchaseTaxNumber( taxNumber)
    {
        this.setAttribute( 39, taxNumber );
    }

    public  getIBAN()
    {
        if (this.getAttribute( 40 ) != null)
            return this.getAttribute( 40 );
        else
            return "";
    }

    public  setIBAN( iban)
    {
        this.setAttribute( 40, iban );
    }

    public  getBIC()
    {
        if (this.getAttribute( 41 ) != null)
            return this.getAttribute( 41 );
        else
            return "";
    }

    public  setBIC( bic)
    {
        this.setAttribute( 41, bic );
    }

    public  getGLN()
    {
        if (this.getAttribute( 42 ) != null)
            return this.getAttribute( 42 );
        else
            return "";
    }

    public  setGLN( gln)
    {
        this.setAttribute( 42, gln );
    }

    public  getContactGender()
    {
        if (this.getAttribute( 43 ) != null)
            return this.getAttribute( 43 );
        else
            return "";
    }

    public  setContactGender( gender)
    {
        this.setAttribute( 43, gender );
    }

    public  getContactLanguage()
    {
        if (this.getAttribute( 44 ) != null)
            return this.getAttribute( 44 );
        else
            return "";
    }

    public  setContactLanguage( language)
    {
        this.setAttribute( 44, language );
    }

    public  getContactName()
    {
        if (this.getAttribute( 45 ) != null)
            return this.getAttribute( 45 );
        else
            return "";
    }

    public  setContactName( name)
    {
        this.setAttribute( 45, name );
    }

    public  getContactPrename()
    {
        if (this.getAttribute( 46 ) != null)
            return this.getAttribute( 46 );
        else
            return "";
    }

    public  setContactPrename( prename)
    {
        this.setAttribute( 46, prename );
    }

    public  getContactPhone()
    {
        if (this.getAttribute( 47 ) != null)
            return this.getAttribute( 47 );
        else
            return "";
    }

    public  setContactPhone( phone)
    {
        this.setAttribute( 47, phone );
    }

    public  getContactMobile()
    {
        if (this.getAttribute( 48 ) != null)
            return this.getAttribute( 48 );
        else
            return "";
    }

    public  setContactMobile( mobile)
    {
        this.setAttribute( 48, mobile );
    }

    public  getContactFax()
    {
        if (this.getAttribute( 49 ) != null)
            return this.getAttribute( 49 );
        else
            return "";
    }

    public  setContactFax( fax)
    {
        this.setAttribute( 49, fax );
    }

    public  getContactMail()
    {
        if (this.getAttribute( 50 ) != null)
            return this.getAttribute( 50 );
        else
            return "";
    }

    public  setContactMail( mail)
    {
        this.setAttribute( 50, mail );
    }

    public  getContactNewsletter()
    {
        if (this.getAttribute( 51 ) != null)
            return this.getAttribute( 51 );
        else
            return "";
    }

    public  setRebate1( rebate1) {
        this.setAttribute( 52, rebate1 );
    }

    public  getRebate1() {
        if (this.getAttribute( 52 ) != null)
            return this.getAttribute( 52 );
        else
            return "";
    }

    public  setRebate2( rebate2) {
        this.setAttribute( 53, rebate2 );
    }

    public  getRebate2() {
        if (this.getAttribute( 53 ) != null)
            return this.getAttribute( 53 );
        else
            return  "";
    }

    public  setContactNewsletter( newsletter)
    {
        this.setAttribute( 51, newsletter );
    }
}
