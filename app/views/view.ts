export abstract class View<T>{

    protected elemento: HTMLElement;

    private escape = false;

    constructor(selector: string, escape?: boolean){
        const elemento =  document.querySelector(selector);
        if(elemento){
            this.elemento = elemento as HTMLElement;
        }else{
            throw Error(`Seletor ${selector} não existe no DOM. Verifique com o desenvolvedor`);
        }
        if(escape){
            this.escape = escape;
        }
    }

    protected abstract template(model: T): string;

    public update(model: T): void{
        let template = this.template(model);
        if(this.escape){
            template =  template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}