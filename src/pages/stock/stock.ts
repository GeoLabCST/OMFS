import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Modal, LoadingController, AlertController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {DomSanitizer} from '@angular/platform-browser';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({selector: 'page-stock', templateUrl: 'stock.html'})
export class StockPage {

  public imageName : any;
  public imageFile : any;
  public stock = [];

  public ddmmyy:string;

  // public lat: number;
  // public lon: number;
  // public fplace: string;
  // public fdesc: string;
  // public ftype: string;
  // public img: any;
  // public imgfile: any;
  // public fname: any;
  // public user_id: number;
  // public data: any;

  constructor(
    private transfer : FileTransfer, 
    public navCtrl : NavController, 
    public navParams : NavParams, 
    public loadingCtrl : LoadingController,
    private alertCtrl : AlertController, 
    public http : HttpClient, 
    private storage : Storage,
    public dom: DomSanitizer,
    private modalCtrl: ModalController,
  ) {}

  ionViewWillEnter() {
    this.getStorage();
  }

  getStorage() {
    this.stock = [];
    this.storage.length().then(res => {
        if (res > 0) {
          this.storage.forEach((value, key, index) => {
              this.stock.push(value);
              console.log(this.stock);
            })
        }
    });
  }

  deleteData(key : string) {
    this.storage.remove(key);
    this.getStorage();
  }

  sendData(key:string) {
    let loader = this.loadingCtrl.create({content: "กำลังบันทึกข้อมูล.."});
    this.storage.get(key).then((val) => {    
      let data = JSON.stringify({
        'lat': val.lat,
        'lon': val.lon,
        'fplace': val.fplace,
        'fdesc': val.fdesc,
        'ftype': val.ftype,
        'yymmdd': val.yymmdd,
        'img': val.img,
        'imgfile': val.imgfile,
        'fname': val.fname,
        'user_id': val.user_id
      });

      //this.imgFile=val.imgFile;

      loader.present();
      this.http.post('http://119.59.125.191/service/omfs_report.php', data).subscribe(res => {
          loader.dismiss();
          let alert = this.alertCtrl.create({title: 'ส่งข้อมูลสำเร็จ!', subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว', buttons: ['ok']});
          alert.present();

          setTimeout(() => {
            this.storage.remove(key);
            this.getStorage();
          }, 2000);

        }, error => {
          console.log("Oooops!");
          loader.dismiss();
        });

      //upload image
      // const fileTransfer : FileTransferObject = this.transfer.create();
      // let options : FileUploadOptions = {
      //   fileKey: 'file',
      //   //fileName: this.imageFile,
      //   fileName: val.imgFile,
      //   chunkedMode: false,
      //   mimeType: "image/jpeg",
      //   headers: {}
      // }

      // fileTransfer.upload(this.imageName, 'http://119.59.125.191/service/omfs_upload.php', options).then(res => {
      //     loader.dismiss();
      //     let alert = this.alertCtrl.create({
      //       title: 'ส่งข้อมูลสำเร็จ!', 
      //       subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว', 
      //       buttons: ['ok']
      //     });
      //     alert.present();
      //   }, (err) => {
      //     loader.dismiss();
      //   });      
    });   
  }

  editData(key:string){
    this.storage.get(key).then((val) => {    
      let data = {
        'key': key,
        'lat': val.lat,
        'lon': val.lon,
        'fplace': val.fplace,
        'fdesc': val.fdesc,
        'ftype': val.ftype,
        'yymmdd': val.yymmdd,
        'ddmmyy': val.ddmmyy,
        'img': val.img,
        'imgfile': val.imgfile,
        'fname': val.fname,
        'user_id': val.user_id
      };

      const modalLeg: Modal =  this.modalCtrl.create('EditdataPage',data);    
      modalLeg.present();

      modalLeg.onDidDismiss((data)=>{
        this.getStorage();  
      });
    });
  }

}
