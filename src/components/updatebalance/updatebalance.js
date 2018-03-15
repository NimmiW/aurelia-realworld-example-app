import {inject} from 'aurelia-dependency-injection';
import {TransactionService} from "../../shared/services/transactionservice";
import {AccountService} from "../../shared/services/accountservice";
import moment from 'moment';

@inject(TransactionService, AccountService)
export class UpdateBalance {
  transactions = [];
  constructor(transactionService, accountService){
    this.transactionService = transactionService;
    this.accountService = accountService;
    this.success = false;
    this.fail = false;
    this.year = moment().year();
    this.month = moment().month();
  }

  attached(){
    this.getAllAccounts()
    this.getAll(this.year, this.month)
  }

  getAllAccounts(){
    this.accountService.getAllAccounts()
        .then(response => {
          this.accountList = response;
          console.log(this.accountList);
        })
  }

  getAll(year, month) {

    if(year && month) {
      this.year = year;
      this.month = month;
      let params = {
        year: year,
        month: month
      };

      this.transactions = []
  
      console.log(params)
  
      this.transactionService.getAll(params)
        .then(response => {
          this.transactions = response;
          this.monthString =  moment(month+1, 'MM').format('MMMM');
        })
    }
    
  }

  addTransaction(){
    if(parseInt(this.newAmount)>0){
    //if(1){
      let transaction = {
        Month: this.month,
        Year: this.year,
        Amount: parseInt(this.newAmount),
        AccountId: this.selectedAccountId
      }

      let params = {
        transaction: transaction
      }

      console.log('lol')

      this.transactionService.save(params).then(response => {
        this.getAll(this.year, this.month)
      },err => {
        console.log(err)
      });

    } else {
      console.log('no')
    }
  }

  deleteTransaction(transactionId){
    this.transactionService.destroy(transactionId)
    .then(response => {
      this.getAll(this.year, this.month)

    })
  }


}
