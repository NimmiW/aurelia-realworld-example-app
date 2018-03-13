import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {AccountService} from "../../shared/services/accountservice";
import moment from 'moment';

@inject(SharedState, BindingEngine,AccountService)
export class AccountComponent {
  accounts = [];
  
  constructor(sharedState, bindingEngine, accountService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.accountService = accountService;
  }

  attached() {
    this.getBalance();
  }
  
  getBalance() {
    let params = {
      year: moment().year(),
      month: moment().month()
    };

    console.log(params)

    this.accountService.getBalance(params)
      .then(response => {
        this.accounts = response;

        console.log(this.accounts);
      })
  }

}
