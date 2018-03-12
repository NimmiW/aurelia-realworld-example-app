export class UpdateBalance {
  constructor(api, ea){
    this.api = api;
    this.file = null;
    this.success = false;
    this.fail = false;
    console.log('File upload page');
  }

  

  upload(file){
    if (file) {
      if(file.search("xls") == -1) {
        this.success = false;
        this.fail = true;
        this.emptyFile = false;
        console.log('failed')
      } else {
        this.success = true;
        this.fail = false;
        this.emptyFile = false;
        console.log(file);
        console.log('File uploaded successfully');
      }
    } else {
      this.success = false;
      this.fail = false;
      this.emptyFile = true;
    }

    
  }


}
