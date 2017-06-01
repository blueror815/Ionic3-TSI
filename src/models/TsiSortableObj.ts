export class TsiSortableObj {
    
    protected       attributes = [];
    private         attributeIndexSynonyms = {};

    constructor(public attributeCount : number) {
        this.attributes = new Array[this.attributeCount];

    }

    public setAttribute(index, value) {
        this.attributes[index] = value;
    }

    public getAttribute(index) {
        return this.attributes[index];
    }

    public getIndexOfAttribute(value) {
        

    }

}