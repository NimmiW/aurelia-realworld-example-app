import {bindable} from 'aurelia-framework';

export class ReportPreview {
  @bindable reportData;

  constructor(){
    console.log('hello');
    console.log(this.reportData)
  }
  
}
