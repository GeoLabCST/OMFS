import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { DomSanitizer } from '@angular/platform-browser';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-editdata',
  templateUrl: 'editdata.html',
})
export class EditdataPage {
  public key: any;
  public lat: number;
  public lon: number;
  public fplace: string;
  public fdesc: string;
  public ftype: string;
  public ddmmyy: string;
  public yymmdd: string;
  public imgData: any;
  public imageFile: any;
  public fname: any;
  public user_id: number;

  public pos: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private loadingCtrl : LoadingController,
    private camera : Camera,     
    private alertCtrl: AlertController,
    private transfer: FileTransfer,    
    public http: HttpClient,
    public dom: DomSanitizer,
    public storage: Storage
  ) {
    this.key=navParams.get('key');
    this.lat=navParams.get('lat');
    this.lon=navParams.get('lon');
    this.pos='lat: '+String(this.lat)+', lon: '+String(this.lon);
    this.fplace=navParams.get('fplace');
    this.ftype=navParams.get('ftype');
    this.fdesc=navParams.get('fdesc');
    this.ddmmyy=navParams.get('ddmmyy');
    this.yymmdd=navParams.get('yymmdd');
    this.imgData=navParams.get('img');
    this.imageFile=navParams.get('imgfile');
    this.fname=navParams.get('fname');
    this.user_id=navParams.get('user_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdataPage');
  }

  openGallery() {
    const camOpt: CameraOptions={      
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true      
      //targetWidth: 1000,
      //targetHeight: 1000,
    }
    this.camera.getPicture(camOpt).then((imageData) => {
      this.imgData = imageData;
      this.imageFile=imageData.substr(imageData.lastIndexOf('/') + 1);
    }, (err) => {
      console.log(err);
    });
  }

  sendData() {
    let loader = this.loadingCtrl.create({content: "กำลังบันทึกข้อมูล.."});    

    let data = JSON.stringify({
      'lat': this.lat,
      'lon': this.lon,
      'fplace': this.fplace,
      'fdesc': this.fdesc,
      'ftype': this.ftype,
      'yymmdd': this.yymmdd,
      'img': this.imgData,
      'imgfile': this.imageFile,
      'fname': 'fnamedasdada',
      'user_id': 1
    });
        
    loader.present();    
    this.http.post('http://119.59.125.191/service/omfs_report.php', data)
    .subscribe(res => {      
      loader.dismiss();      
      let alert=this.alertCtrl.create({
        title: 'ส่งข้อมูลสำเร็จ!',
        subTitle: 'ข้อมูลของคุณsถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว',
        buttons:['ok']
      });
      alert.present();
    }, error => {
      console.log("Oooops!");
      loader.dismiss();
    });

    setTimeout(() => {
      this.deleteData(this.key);
    }, 1000);


  } 

  deleteData(key : string) {
    this.storage.remove(key);
    this.viewCtrl.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
