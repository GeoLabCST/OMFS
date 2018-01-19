import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {
  public stock=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public http: HttpClient, 
    private storage: Storage
  ) { 
  }

  ionViewWillEnter() {    
    this.getStorage();
  } 

  getStorage() { 
    this.stock=[];   
    this.storage.length().then(res =>{
      if(res>0){
        this.storage.forEach((value, key, index) => {
          this.stock.push(value);
          console.log(this.stock);
        })
      }
    });    
  }

  deleteData(key:string){
    this.storage.remove(key);
    this.getStorage();
  }

  sendData(key:string,lat:number,lon:number,fplace:string,fdesc:string,ftype:string) {
    let loader = this.loadingCtrl.create({content: "กำลังบันทึกข้อมูล.."}); 
    let data = JSON.stringify({
      'lat': lat,
      'lon': lon,
      'fplace': fplace,
      'fdesc': fdesc,
      'ftype': ftype,
      'img': 'img64',
      'fname': 'fnamedasdada',
      'user_id': 1
    });
    loader.present();    
    this.http.post('http://119.59.125.191/service/omfs_report.php', data)
    .subscribe(res => {      
      loader.dismiss();      
      let alert=this.alertCtrl.create({
        title: 'ส่งข้อมูลสำเร็จ!',
        subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว',
        buttons:['ok']
      });
      alert.present();

      setTimeout(() => {
        this.storage.remove(key);
        this.getStorage();
      }, 2000);

    }, error => {
      console.log("Oooops!");
      loader.dismiss();
    });
  }

}
