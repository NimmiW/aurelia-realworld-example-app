export class UpdateBalance {
  constructor(api, ea){
    this.api = api;
    this.file = null;
    this.success = false;
    this.fail = false;
    console.log('File upload page');
  }

  attached(){
    httpClient.get('http://jsonplaceholder.typicode.com/posts')
          .then(data => {        
          this.UserRecords = JSON.parse(data.response);
          console.log(this.UserRecords)
        });
    
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
        /*console.log(this.htmlElement)
        var html = this.htmlElement
        var reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload = function(event){
            var csv = event.target.result;
            console.log(csv)
        };*/


        

      }
    } else {
      this.success = false;
      this.fail = false;
      this.emptyFile = true;
    }

    
  }


}
