import { Component } from '@angular/core';

/**
 * Generated class for the CatalogCell1Component component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'catalog-cell1',
  templateUrl: 'catalog-cell1.html'
})
export class CatalogCell1Component {

  text: string;

  constructor() {
    console.log('Hello CatalogCell1Component Component');
    this.text = 'Hello World';
  }

}
