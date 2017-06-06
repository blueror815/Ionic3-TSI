import { TsiSortableObj } from './TsiSortableObj';

export class TsiConfigEntry extends TsiSortableObj {
    protected addAllAttributeIndexSynonyms() {
        throw new Error("Method not implemented.");
    }

    constructor() {
        super(4);
    }

    public getEntryType()
    {
        return this.getAttribute( 0 );
    }
    
    public setEntryType( type)
    {
        this.setAttribute( 0, type );
    }

    public getValueOne()
    {
        return this.getAttribute( 1 );
    }
    
    public setValueOne( one)
    {
        this.setAttribute( 1, one );
    }
    
    public getValueTwo()
    {
        return this.getAttribute( 2 );
    }
    
    public setValueTwo( two)
    {
        this.setAttribute( 2, two );
    }
    
    public getValueThree()
    {
        return this.getAttribute( 3 );
    }
    
    public setValueThree( three)
    {
        this.setAttribute( 3, three );
    }

}