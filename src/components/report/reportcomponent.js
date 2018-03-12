import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {AccountService} from "../../shared/services/accountservice";

@inject(SharedState, BindingEngine,AccountService)
export class ReportComponent {
  reportData = [];
  
  constructor(sharedState, bindingEngine, accountService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.accountService = accountService;
    this.reportdata = [{name:"nimmi"}];
  }

  attached() {
    this.getAccounts();
    console.log(this.reportdata)
  }
  
  getAccounts() {
    let params = {
      year: this.year
    };

    this.accountService.getList(params)
      .then(response => {
        this.accounts = response.accounts;
        console.log(this.accounts);
      })
  }

}
