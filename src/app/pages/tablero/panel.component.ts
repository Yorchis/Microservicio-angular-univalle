import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: []
})
export class PanelComponent implements OnInit {
  
  constructor() { }

  newData: any[] = [];

  ngOnInit() {
    // this.getGrafica();
  }

  // public barChartType: ChartType = 'bar';
  // public barChartLabels: Label[] = [];
 
  // public barChartData: ChartDataSets[] = [
  //   // ene/feb/mar/abr/may
  //   { data: this.newData, label: 'Ventas' },
  // ];

  // public barChartData: ChartDataSets[] = [
  //   // ene/feb/mar/abr/may
  //   { data: this.valores, label: 'Ventas' },
  // ];



  // getGrafica() {
  //   this.graficaService.getGrafica()
  //     .subscribe(({ok, grafica}) => {
  //       if (ok) {
  //         for (let index = 0; index < grafica.meses.length; index++) {
  //           this.barChartLabels[index] = grafica.meses[index];
  //         }
  //         for (let index = 0; index < grafica.valores.length; index++) {
  //           this.newData[index] =  grafica.valores[index];
  //         }
  //       }
  //     });
  // }

}
