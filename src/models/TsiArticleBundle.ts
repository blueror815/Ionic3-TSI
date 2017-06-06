import { TsiArticle } from './TsiArticle';
import { TsiCategory } from './TsiCategory';

export class TsiArticleBundle {

    private category : TsiCategory;
    private bundle = [TsiArticle];
    
    constructor(public m_Cate : TsiCategory) {
        this.category = m_Cate;
    }

    public getElemet(index)
    {
        if (index < this.bundle.length)
            return this.bundle[index];
        else
            return null;
    }

    public setElement(article)
    {
        this.bundle.push(article);
    }

    public getCategory()
    {
        return this.category;
    }

    public setCategory (value)
    {
        this.category = value;
    }

    public getFull()
    {
        return this.bundle.length > 5;
    }

}