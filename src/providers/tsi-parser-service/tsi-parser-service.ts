import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {TsiAbstractLineProcessor} from '../../parser/TsiAbstractLineProcessor';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';
import { TsiConfLineProcessor } from '../../parser/TsiConfLineProcessor';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiEmailServiceProvider } from '../tsi-email-service/tsi-email-service';
import { TsiConnectionServiceProvider } from '../tsi-connection-service/tsi-connection-service';
import { TsiCategoryLineProcessor } from '../../parser/TsiCategoryLineProcessor';
import { TsiArticleLineProcessor } from '../../parser/TsiArticleLineProcessor';
import { TsiCustomerLineProcessor } from '../../parser/TsiCustomerLineProcessor';
import { TsiCustomerCatalogLineProcessor } from '../../parser/TsiCustomerCatalogLineProcessor';
import { TsiOrderLineProcessor } from '../../parser/TsiOrderLineProcessor';
import { TsiShoppingCartOrdersLineProcessor } from '../../parser/TsiShoppingCartOrdersLineProcessor';
import { TsiShoppingCartServiceProvider } from '../tsi-shopping-cart-service/tsi-shopping-cart-service';
import { TsiShoppingCartDataLineProcessor } from '../../parser/TsiShoppingCartDataLineProcessor';
import { TsiExpendituresConfLineProcessor } from '../../parser/TsiExpendituresConfLineProcessor';
import { TsiExpenditureSuggestionLineProcessor } from '../../parser/TsiExpenditureSuggestionLineProcessor';
import { TsiLicenceNumberLineProcessor } from '../../parser/TsiLicenceNumberLineProcessor';
import { TsiLicenceNumberSuggestionLineProcessor } from '../../parser/TsiLicenceNumberSuggestionLineProcessor';
import { TsiKmConfLineProcessor } from '../../parser/TsiKmConfLineProcessor';
import { TsiCatalogTabHeadersLineProcessor } from '../../parser/TsiCatalogTabHeadersLineProcessor';
import { TsiNewCustomerConfLineProcessor } from '../../parser/TsiNewCustomerConfLineProcessor';
import { TsiSyncFileLineProcessor } from '../../parser/TsiSyncFileLineProcessor';

/*
  Generated class for the TsiParserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiParserServiceProvider {

  private parserConfigs : Map<string, TsiAbstractLineProcessor<any>>;

  constructor(public http: Http, public dataService : TsiDataServiceProvider, public emailService : TsiEmailServiceProvider, 
              public connectionService: TsiConnectionServiceProvider, public shoppingService: TsiShoppingCartServiceProvider) {
    console.log('Hello TsiParserServiceProvider Provider');

    this.parserConfigs = new Map();
    this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_CONF, new TsiConfLineProcessor(this.dataService, this.emailService, this.connectionService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_CATEGORY, new TsiCategoryLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_ARTICLE, new TsiArticleLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_CUSTOMER, new TsiCustomerLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_CUSTOMER_CATALOG, new TsiCustomerCatalogLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_ORDER, new TsiOrderLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_SYNCFILE, new TsiSyncFileLineProcessor(this.dataService));
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_SHOPPING_CART_ORDERS, new TsiShoppingCartOrdersLineProcessor(this.dataService, this.shoppingService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_SHOPPING_CART_DATA, new TsiShoppingCartDataLineProcessor(this.dataService, this.shoppingService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_EXPENDITURES, new TsiExpendituresConfLineProcessor(this.dataService));
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_EXPENDITURE_SUGGESTIONS, new TsiExpenditureSuggestionLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_LICENCE_NUMBER, new TsiLicenceNumberLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_LICENCE_NUMBER_SUGGESTIONS, new TsiLicenceNumberSuggestionLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_EXPANDITURES_EMAIL, new TsiExpendituresConfLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_KM_EMAIL, new TsiKmConfLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_CATALOG_TAB_HEADERS, new TsiCatalogTabHeadersLineProcessor(this.dataService) );
    // this.addParserConfig( TsiParserConfigNames.PARSER_CONFIG_NEW_CUSTOMER_CONF, new TsiNewCustomerConfLineProcessor(this.dataService) );
  }

  public addParserConfig(name, lineProcessor) {
    this.parserConfigs.set(name, lineProcessor);
  }

  public parse(filePath, fileName, parserConfigname) {
    let lineProcessor = this.parserConfigs.get( parserConfigname );

    console.log ( "///////////////////", "Parser" );
    console.log ( "Parsing File: " + lineProcessor, "Parser" );
    console.log ( "///////////////////", "Parser" );
    
    return new Promise((resolve, reject) => {
        this.dataService.file.readAsText(filePath, fileName).then((res) => {
            console.log("Config Bat file", res);

            let linesText = res.split("\n");
            for (let line of linesText) {
              let lineResult : Object = lineProcessor.parse(line, fileName);
              lineProcessor.process(lineResult);
            }

            resolve(true);
        }, (err) => {
            console.log("error for checking file", err);
            reject(err);
        });

    });
  }

}
