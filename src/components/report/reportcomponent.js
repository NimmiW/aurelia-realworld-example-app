import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {ReportService} from "../../shared/services/reportservice";

@inject(SharedState, BindingEngine,ReportService)
export class ReportComponent {
  reportdata = [];
  
  constructor(sharedState, bindingEngine, reportService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.reportService = reportService;
  }

  attached() {
    this.getReport();
  }
  
  getReport() {
    let params = {
      year: this.year
    };

    this.reportService.getReport(params)
      .then(response => {
        this.reportdata = response.months;
        console.log(this.reportdata);
      })
  }

}
