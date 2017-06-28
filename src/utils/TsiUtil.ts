import { TsiArticle } from '../models/TsiArticle';
import { DatePipe } from '@angular/common';




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
        let year = parseInt(sourceDate.substring(0, 4));
        let month = parseInt(sourceDate.substring(4, 6));
        let date = parseInt(sourceDate.substring(6));

        let newDate = new Date();
        newDate.setFullYear(year, month, date);

        let datePipe = new DatePipe('en-US');
        return datePipe.transform(newDate, pattern);
    }

    public static formatMoney(value, digits) {
        if (value == null || value.length == 0) {
            value = '0';
        }

        let result = parseInt(value).toFixed(digits).toString();

        let indexOfDot = result.indexOf('.');
        if (indexOfDot != -1) {
            result = TsiUtil.removeChar(result, indexOfDot);
            result = TsiUtil.insertChar(result, ',', indexOfDot);
        }

        return result + ' €';
    }

    public static insertChar(source, ch, index)
    {
        return source.substring( 0, index ) + ch + source.substring( index );
    }

    public static removeChar(source, index)
    {
        return source.substring( 0, index ) + source.substring( index + 1 );
    }

    public static getAFIFullName(afi) {
        let result = '';
        
        if (afi) {
            if (afi == 'A') {
                result = 'Angebotskunde';
            }
            else {
                if (afi == 'F') {
                    result = 'Filiale';
                }
                else {
                    if (afi == 'I') {
                        result = 'Interessent';
                    }
                }
            }

        }

        return result;
    }

    public static getOrderNameFromIds(orderID)
    {
        let result = '';
        if (orderID == "1")
            result = "Letzte Rechnung";
        else
            if (orderID == "2")
                result = "Vorletzte Rechnung";
            else
                if (orderID == "3")
                    result = "Drittletzte Rechnung";
                else
                    if (orderID == "99")
                        result = "Vorschlag";
        return result;
    }

    public static getIdOfOrderName(item)
    {
        let result = '';
        if (item)
        {
            if (item.startsWith( "Letzte Rechnung" ))
                result = "1";
            else
                if (item.startsWith( "Vorletzte Rechnung" ))
                    result = "2";
                else
                    if (item.startsWith( "Drittletzte Rechnung" ))
                        result = "3";
                    else
                        if (item.startsWith( "Vorschlag" ))
                            result = "99";
        }
        return result;
    }

    public static formatDate(date, pattern) {
        let newDate = new Date();
        newDate.setUTCMilliseconds(date);

        let datePipe = new DatePipe('en-US');
        return datePipe.transform(newDate, pattern);
    }

    // public static roundAndToString(number, digits) {
    //     let pattern = '0.';
    //     for (let i = 0;i < digits;i ++) {
    //         pattern += '0';
    //     }


    // }


}