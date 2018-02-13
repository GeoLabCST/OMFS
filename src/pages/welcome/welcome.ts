import {TabsPage} from './../tabs/tabs';
import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController, Events} from 'ionic-angular';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ServiceProvider} from '../../providers/service/service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import {RegisterPage} from '../register/register';

//import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public reportForm : FormGroup;
  public iden_number : FormControl;
  public pass_user : FormControl;
  public res: any;

  constructor(
    public fb : FormBuilder,  
    private navCtrl : NavController, 
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    public http: HttpClient,
    public events: Events,
    public service: ServiceProvider,
    private screenOrientation: ScreenOrientation
  ){
    this.iden_number = fb.control('', Validators.required);
    this.pass_user = fb.control('', Validators.required);
    this.reportForm = fb.group({
      'iden_number': this.iden_number, 
      'pass_user': this.pass_user
    })
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }

  signup(){
    this.navCtrl.push(RegisterPage);
  }

  submit() {
    let loader = this.loadingCtrl.create({content: "กำลังเข้าสู่ระบบ.."});  
    let iden_number = this.reportForm.controls['iden_number'].value;
    let pass_user = this.reportForm.controls['pass_user'].value;
   
    let data = JSON.stringify({
      'iden_number':iden_number,
      'pass_user':pass_user
    });

    loader.present();    
    this.http.post('http://119.59.125.191/service/checklogin_omfs.php', data)
    .subscribe(res => {
       this.res = res;
       //console.log(res);      
      if (this.res.message == 'error') {
         loader.dismiss();      
          let alert=this.alertCtrl.create({
            title: 'E-Mail หรือรหัสผ่านของท่านไม่ถูกต้อง!',
            subTitle: 'กรุณาลองอีกครั้ง หรือสมัครสมาชิกใหม่',
            buttons:['ok']
          });
          alert.present();     
      }else if(this.res.message == 'success'){
         loader.dismiss(); 
          this.gotoindex();      
      }      
    }, error => {
      console.log("Oooops!");
      loader.dismiss();
    });
  }  

  gotoindex(){  
    // Sharing data using service
    this.service.setUserData(this.res);
    this.navCtrl.push(TabsPage);
  }

  



}
