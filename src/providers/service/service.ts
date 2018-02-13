//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceProvider {
  public usrData: any; 

  constructor() {
    this.usrData="";
  }

  setUserData(usrData){
    this.usrData=usrData;
  }

  getUserData() {
    return this.usrData;
  }  

}
