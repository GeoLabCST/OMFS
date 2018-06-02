import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service/service';

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
  public yymmdd: any;
  public ddmmyy: any;

  public reportForm: FormGroup;
  public fplace: FormControl;
  public fdesc: FormControl;
  public ftype: FormControl;
  public imageData: any;
  public imageFile: any;

  public stockKey: string;

  constructor(
    //private transfer: FileTransfer,
    public fb: FormBuilder,
    private camera: Camera,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public view: ViewController,
    public http: HttpClient,
    private geolocation: Geolocation,
    private storage: Storage,
    public service: ServiceProvider
  ) {
    //this.pos = navParams.get('pos');
    this.fplace = fb.control('', Validators.required);
    this.ftype = fb.control('', Validators.required);
    this.fdesc = fb.control('');
    this.usrData = this.service.getUserData();
    //this.fname = fb.control('', Validators.required);
    this.reportForm = fb.group({
      'fplace': this.fplace,
      'ftype': this.ftype,
      'fdesc': this.fdesc,
      //'fname': this.fname
    });
    //console.log(this.usrData);
  }

  ionViewDidLoad() {
    this.findLocation();
    this.getStorage();
    let today = new Date();
    this.yymmdd = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.ddmmyy = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //console.log(Date.now());
  }

  getStorage() {
    this.storage.length().then(res => {
      this.stockKey = "data" + (res + 1);
      // console.log(this.stockKey);
    });
  }

  findLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.pos = [res.coords.latitude, res.coords.longitude];
      this.lat = res.coords.latitude;
      this.lon = res.coords.longitude;
      //console.log(this.lon+"-"+this.lat);       
    })
  }

  takePicture() {
    const camOpt: CameraOptions = {
      quality: 20,
      //destinationType: this.camera.DestinationType.FILE_URI,
      // sourceType: this.camera.PictureSourceType.CAMERA,
      // encodingType: this.camera.EncodingType.JPEG,
      // correctOrientation: true

      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(camOpt).then((imageData) => {
      this.imageData = imageData;
      //this.imageFile=imageData.substr(imageData.lastIndexOf('/') + 1);
      this.imageFile = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  // openGallery() {
  //   const camOpt: CameraOptions={      
  //     quality: 100,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     correctOrientation: true      
  //     //targetWidth: 1000,
  //     //targetHeight: 1000,
  //   }
  //   this.camera.getPicture(camOpt).then((imageData) => {
  //     this.imageName = imageData;
  //     this.imageFile=imageData.substr(imageData.lastIndexOf('/') + 1);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  storeData() {
    let data = {
      'key': this.stockKey,
      'lat': this.lat,
      'lon': this.lon,
      'fplace': this.reportForm.controls['fplace'].value,
      'fdesc': this.reportForm.controls['fdesc'].value,
      'ftype': this.reportForm.controls['ftype'].value,
      'yymmdd': this.yymmdd,
      'ddmmyy': this.ddmmyy,
      'img': this.imageData,
      'imgfile': this.imageFile,
      'fname': this.usrData.name_user,
      'user_id': this.usrData.id_user,
      'type': 'data'
    };

    this.storage.set(this.stockKey, data).then(
      (res) => {
        //console.log('Stored item!');      
        this.resetForm();
        this.getStorage();
      },
      (error) => {
        console.error('Error storing item', error)
      }
    );
  }

  sendData() {
    let loader = this.loadingCtrl.create({ content: "กำลังบันทึกข้อมูล.." });

    let data = JSON.stringify({
      'lat': this.lat,
      'lon': this.lon,
      'fplace': this.reportForm.controls['fplace'].value,
      'fdesc': this.reportForm.controls['fdesc'].value,
      'ftype': this.reportForm.controls['ftype'].value,
      'yymmdd': this.yymmdd,
      'img': this.imageData,
      //'imgfile': this.imageFile,
      'fname': this.usrData.name_user,
      'user_id': this.usrData.id_user
    });

    loader.present();
    this.http.post('http://119.59.125.191/service/omfs_report.php', data)
      .subscribe(res => {
        loader.dismiss();
        this.resetForm();
        let alert = this.alertCtrl.create({
          title: 'ส่งข้อมูลสำเร็จ!',
          subTitle: 'ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว',
          buttons: ['ok']
        });
        alert.present();
      }, error => {
        console.log("Oooops!");
        loader.dismiss();
      });
  }

  resetForm() {
    this.reportForm.reset();
    this.imageFile = '';
    //this.view.dismiss();
    //this.navCtrl.setRoot(MapPage, this.dat)
  }

}
