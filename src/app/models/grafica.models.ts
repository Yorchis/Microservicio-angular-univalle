
export class Grafica {

    private id!: string;
    private meses!: string[];
    private valores!: number[];

    constructor() { }
    
    getDataGrafica(){
        return [
            { data: this.meses, label: 'Ventas'}
        ]
    }

    incrementarValor(mes: string, valor: number){
        mes = mes.toLocaleLowerCase().trim();
        for (let i in this.meses) {
            if(this.meses[i] === mes){
                this.valores[i]+= valor;
            }
        }
        return this.getDataGrafica();
    }

}