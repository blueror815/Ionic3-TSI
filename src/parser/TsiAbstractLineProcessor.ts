export abstract class TsiAbstractLineProcessor<T> {
    
    public abstract parse(line: string, sourceFileName: string);
    public abstract process(lineResult : T);
}