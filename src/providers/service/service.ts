import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceProvider {
  public usrData: any;   
  public res: any;

  constructor(public http: HttpClient,) {
    this.usrData="";
  }

  setUserData(usrData){
    this.usrData=usrData;
  }

  getUserData() {
    return this.usrData;
  }  

  // getUserData(){
  //   let data = JSON.stringify({
  //     'iden_number':1234567890,
  //     'pass_user':"geolabadmin"
  //   });

  //   this.http.post('http://119.59.125.191/service/checklogin_omfs.php', data)
  //   .subscribe(res => {       
  //   return this.usrData;      
  //   }, error => {
  //     console.log("error!");
  //   });
  // }

}
