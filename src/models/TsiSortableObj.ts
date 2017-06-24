export abstract class TsiSortableObj {
    
    protected  attributes = [];
    private    attributeIndexSynonyms : Map<string, number>;

    constructor(public attributeCount : number) {
        //this.attributes = new Array[this.attributeCount];
        this.attributeIndexSynonyms = new Map<string, number>();
        //console.log('Set Attribute Count', attributeCount);
    }

    public setAttribute(index, value) {
        // console.log('Set Attribute Index', index);
        // console.log('Set Attribute Value', value);
        this.attributes[index] = value;
        //console.log('Attributes', JSON.stringify(this.attributes));
    }

    public getAttribute(index) {
        return this.attributes[index];
    }

    public getIndexOfAttribute(value) {
        let result = this.attributeIndexSynonyms[value.toString()];

        if(result) {
            return result;
        }

        return 0;
    }

    public addAttributeIndexSynonym(name, index) {
        this.attributeIndexSynonyms[name] = index;
    }

    protected abstract addAllAttributeIndexSynonyms();

}