import { TsiShoppingCartEntry } from './TsiShoppingCartEntry';

export class TsiShoppingCart {
    private  customerID;
    private  infoText;
    private  date;
    private  creationDate;

    private  filename;
    private  modified;
    private  saved;

    private  indexCounter = 0;

    public   entrys : Map<string, TsiShoppingCartEntry>;

    constructor (customerID : string) {
        this.customerID = customerID;
        this.entrys = new Map();
    }
}