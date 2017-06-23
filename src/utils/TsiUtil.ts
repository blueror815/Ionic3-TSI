import { TsiArticle } from '../models/TsiArticle';
import { DatePipe } from "@angular/common/common";

export class TsiUtil {
    public static nUnitIndex = 0;
    
    constructor(public file : File) {

    }

    public static  getArticleUnit() {
        let unit = "";
        switch (TsiUtil.nUnitIndex) {
            case 1:
                unit = "SLE";
                break;
            case 2:
                unit = "VEN";
                break;
            case 3:
                unit = "LEH";
                break;
            case 4:
                unit = "APO";
                break;
            default:
                break;
        }
        return unit;
    }


    public static checkReservationDate(article : TsiArticle) {
        return true;
    }

    public static parseAndFormatDate(sourceDate, pattern) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(sourceDate, pattern);
    }


}