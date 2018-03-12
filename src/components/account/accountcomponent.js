import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {AccountService} from "../../shared/services/accountservice";

@inject(SharedState, BindingEngine,AccountService)
export class AccountComponent {
  accounts = [];
  
  constructor(sharedState, bindingEngine, accountService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.accountService = accountService;
  }

  attached() {
    this.getAccounts();
  }
  
  getAccounts() {
    let params = {
      limit: this.limit
    };

    this.accountService.getList(this.shownList, params)
      .then(response => {
        this.accounts = response.accounts;
        console.log(this.accounts);
      })
  }

}