export abstract class TsiSortableObj {
    
    protected  attributes = [];
    private    attributeIndexSynonyms = new Map();

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
        let result = this.attributeIndexSynonyms.get(value);

        if(result) {
            return result;
        }

        return 0;
    }

    public addAttributeIndexSynonym(name, index) {
        this.attributeIndexSynonyms.set(name, index);
    }

    protected abstract addAllAttributeIndexSynonyms();

}