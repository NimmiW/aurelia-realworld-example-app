import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {ArticleService} from "../../shared/services/articleservice"
import {AccountService} from "../../shared/services/accountservice"
import {TagService} from '../../shared/services/tagservice';

@inject(SharedState, BindingEngine,AccountService, ArticleService, TagService)
export class AccountComponent {
  accounts = [];
  shownList = 'all';
  tags = [];
  filterTag = undefined;
  pageNumber;
  totalPages;
  currentPage = 1;
  limit = 10;
  
  constructor(sharedState, bindingEngine, accountService, articleService, tagService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.accountService = accountService;
    this.tagService = tagService;
  }

  attached() {
    this.getAccounts();
  }
  
  getAccounts() {
    let params = {
      limit: this.limit,
      offset: this.limit * (this.currentPage - 1)
    };

    this.accountService.getList(this.shownList, params)
      .then(response => {
        this.accounts = response.accounts;
        console.log(this.accounts);
      })
  }

}
