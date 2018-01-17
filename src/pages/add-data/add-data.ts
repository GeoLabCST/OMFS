import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { ShareService } from '../../providers/service/share';

import {Geolocation} from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  public pos: any;  
  public lat: number;
  public lon: number;
  public usrData: any;

  public reportForm : FormGroup;
  public fplace : FormControl;
  public fdesc : FormControl;
  public ftype : FormControl;
  public imageURI:any;
  public imageFileName:any;
  
  constructor(
    private transfer: FileTransfer,
    public fb : FormBuilder,  
    private camera : Camera, 
    public navParams: NavParams, 
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public view: ViewController,
    public http: HttpClient,    
    private geolocation: Geolocation
    //public shareService: ShareService
  ) {    
    //this.pos = navParams.get('pos');
    this.fplace = fb.control('', Validators.required);
    this.ftype = fb.control('', Validators.required);
    this.fdesc = fb.control('');
    //this.usrData = this.shareService.getUserData();
    //this.fname = fb.control('', Validators.required);
    this.reportForm = fb.group({ 
      'fplace': this.fplace,
      'ftype': this.ftype,
      'fdesc': this.fdesc, 
      //'fname': this.fname
    })
  }

  ionViewDidLoad() {
    this.fineLocation();
  }  

  fineLocation(){
    this.geolocation.getCurrentPosition().then((res) => {   
      this.pos=[res.coords.latitude, res.coords.longitude];
      this.lat = res.coords.latitude;
      this.lon = res.coords.longitude; 
      console.log(this.lon+"-"+this.lat);       
    })
  } 

  takePicture() {
    const imgCam: CameraOptions={
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG
    }
    
    this.camera.getPicture(imgCam).then((imageData) => {
        this.imageURI = imageData;
        this.imageFileName=imageData.substr(imageData.lastIndexOf('/') + 1);
      }, (err) => {
        console.log(err);
      });
  }

  submit() {
    let loader = this.loadingCtrl.create({content: "กำลังบันทึกข้อมูล.."});    
    let fplace = this.reportForm.controls['fplace'].value;    
    let ftype = this.reportForm.controls['ftype'].value;
    let fdesc = this.reportForm.controls['fdesc'].value;
    let lat = this.lat;
    let lon = this.lon;
    let img64 = this.imageFileName;
    //let usrId = this.usrData.id_user;
    //let usrEmail = this.usrData.email_user;

    let data = JSON.stringify({
      'lat': lat,
      'lon': lon,
      'fplace': fplace,
      'fdesc': fdesc,
      'ftype': ftype,
      'img': img64,
      'fname': 'fname',
      'user_id': 12
    });
    
    console.log(data);
    
    loader.present();    
    this.http.post('http://119.59.125.191/service/omfs_report.php', data)
    .subscribe(res => {
      
      loader.dismiss(); 
      this.closeModal();      
      let alert=this.alertCtrl.create({
        title: 'ส่งข้อมูลสำเร็จ!',
        subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว',
        buttons:['ok']
      });
      alert.present();
    }, error => {
      console.log("Oooops!");
      loader.dismiss();
    });

    //upload image
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageFileName,      
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://119.59.125.191/service/omfs_upload.php', options)
    .then(res => {   
      loader.dismiss(); 
      this.closeModal();      
      let alert=this.alertCtrl.create({
        title: 'ส่งข้อมูลสำเร็จ!',
        subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว',
        buttons:['ok']
      });
      alert.present(); 
    }, (err) => {
      loader.dismiss();
    });
  }  
   
  closeModal() {
    this.reportForm.reset();
    //this.view.dismiss();
    //this.navCtrl.setRoot(MapPage, this.dat)
  }

}
