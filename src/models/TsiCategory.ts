export class TsiCategory {
    private name = '';
    private id = '';
    private childs : Map<string, TsiCategory>;

    constructor(name : string, id : string) {
        this.name = name;
        this.id = id;
        this.childs = new Map();
    }

    public addChild(child : TsiCategory) {
        this.childs.set(child.id, child);
    }

    public getChilds() {
        let sorted = new Map();

        // Object.keys(this.childs).sort((a : any, b : any) : number => {
            

        //     return 0;  
        // });

        return this.childs;
    }
}