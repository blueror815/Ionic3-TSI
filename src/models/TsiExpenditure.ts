import { TsiSortableObj } from './TsiSortableObj';

export class TsiExpenditure extends TsiSortableObj {

    protected addAllAttributeIndexSynonyms() {
        this.addAttributeIndexSynonym( "BELEGNR.", 0 );
        this.addAttributeIndexSynonym( "DATUM", 1 );
        this.addAttributeIndexSynonym( "BETRAG", 2 );
        this.addAttributeIndexSynonym( "BEMERKUNGEN", 3 );
    }

    constructor(id: string, date: string, value: string, information: string) {
        super(4);
        this.setRecordID( id );
        this.setDate( date );
        this.setValue( value );
        this.setInformation( information );
    }

    public  getRecordID()
    {
        return this.getAttribute(0);
    }

    public  setRecordID( recordID)
    {
        this.setAttribute(0, recordID);
    }
    
    public  getDate()
    {
        return this.getAttribute(1);
    }

    public  setDate( date)
    {
        this.setAttribute(1, date);
    }
    
    public  getValue()
    {
        return this.getAttribute(2);
    }

    public  setValue( value)
    {
        if (value != null && value.length() > 0)
            this.setAttribute(2, value);
        else
            this.setAttribute(2, "0.0");
    }
    
    public  getInformation()
    {
        return this.getAttribute(3);
    }

    public  setInformation( information)
    {
        this.setAttribute(3, information);
    }

}