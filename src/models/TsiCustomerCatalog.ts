import { TsiArticle } from './TsiArticle';
export class TsiCustomerCatalog {

    public articles;

    constructor() {
        this.articles = [];
    }

    public addArticle(article : TsiArticle) {
        this.articles.push(article)
    }
}