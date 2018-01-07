import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ShareService } from '../../providers/service/share';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  public pos: any;
  public usrData: any;

  public reportForm : FormGroup;
  public title : FormControl;
  public descpt : FormControl;
  //public fname : FormControl;
  public imageURI:any;
  public imageFileName:any;

  constructor(
    private transfer: FileTransfer,
    public fb : FormBuilder,  
    private camera : Camera, 
    public navParams: NavParams, 
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public view: ViewController,
    public http: HttpClient,
    public shareService: ShareService
  ) {    
    this.pos = navParams.get('pos');
    this.title = fb.control('', Validators.required);
    this.descpt = fb.control('', Validators.required);
    this.usrData = this.shareService.getUserData();
    //this.fname = fb.control('', Validators.required);
    this.reportForm = fb.group({
      'title': this.title, 
      'descpt': this.descpt, 
      //'fname': this.fname
    })
  }

  ionViewDidLoad() {
    // Receiving data via Service
    //this.usrData = this.shareService.getUserData();
    //console.log(this.usrData);
    //console.log(this.pos.lng);
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
    let title = this.reportForm.controls['title'].value;
    let descpt = this.reportForm.controls['descpt'].value;
    let lat = this.pos.lat;
    let lon = this.pos.lng;
    let img64 = this.imageFileName;
    let usrId = this.usrData.id_user;
    let usrEmail = this.usrData.email_user;

    let data = JSON.stringify({
      'lat':lat,
      'lon':lon,
      'title':title,
      'descpt':descpt,
      'usrId':usrId,
      'usrEmail': usrEmail,
      'img64':img64
    });
    
    loader.present();    
    this.http.post('http://119.59.125.189/service/isnre_report.php', data)
    .subscribe(res => {
      loader.dismiss();
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
  
    fileTransfer.upload(this.imageURI, 'http://119.59.125.189/service/isnre_upload.php', options)
    .then(res => {   
      loader.dismiss(); 
      this.closeModal();      
      let alert=this.alertCtrl.create({
        title: 'ส่งข้อมูลสำเร็จ!',
        subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว',
        buttons:['ok']
      });
      alert.present();     
      //this.presentToast("Image uploaded successfully");
    }, (err) => {
      loader.dismiss();
      this.presentToast(err);
    });
  }  
  
  presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 6000,
        position: 'bottom'
      });  
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });  
      toast.present();
  } 
  
  closeModal() {
    this.view.dismiss();
    //this.navCtrl.setRoot(MapPage, this.dat)
  }

}
