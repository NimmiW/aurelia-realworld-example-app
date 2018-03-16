import {inject} from 'aurelia-dependency-injection';
import {TransactionService} from "../../shared/services/transactionservice";
import {AccountService} from "../../shared/services/accountservice";
import moment from 'moment';

@inject(TransactionService, AccountService)
export class UpdateBalance {
  transactions = [];
  months = [
    { id:0, name:"January"},
    { id:1, name:"February"},
    { id:2, name:"March"},
    { id:3, name:"April"},
    { id:4, name:"May"},
    { id:5, name:"June"},
    { id:6, name:"July"},
    { id:7, name:"August"},
    { id:8, name:"September"},
    { id:9, name:"October"},
    { id:10, name:"November"},
    { id:11, name:"December"}
    
  ]
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
        })
  }

  getAll(year, month) {


      this.year = year;
      this.month = month;
      let params = {
        year: year,
        month: month
      };

      this.transactions = []
  
  
      this.transactionService.getAll(params)
        .then(response => {
          this.transactions = response;

          this.transactions.forEach(element => {
            element.month = moment(month+1, 'MM').format('MMMM');
          });
          this.monthString =  moment(month+1, 'MM').format('MMMM');
        })

    
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



      this.transactionService.save(params).then(response => {
        this.getAll(this.year, this.month)
      },err => {
        console.log(err)
      });
    }


  }

  deleteTransaction(transactionId){
    this.transactionService.destroy(transactionId)
    .then(response => {
      this.getAll(this.year, this.month)

    })
  }


}
