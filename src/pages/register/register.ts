import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

// import {HomePage} from '../home/home';
import {WelcomePage} from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-register', 
  templateUrl: 'register.html'
})

export class RegisterPage {
  public reportForm : FormGroup;
  public name_user : FormControl;
  public lname_user : FormControl;
  public tel_user : FormControl;
  public prov_user : FormControl;
  public amp_user : FormControl;
  public tam_user : FormControl;
  public email_user : FormControl;
  public pass_user : FormControl;
  public level_user : FormControl;
  public iden_number : FormControl;
  public location : number;
  public imageURI:any;
  public imageFileName:any;
  public res: any;

  constructor(
    private transfer: FileTransfer,
    public fb : FormBuilder,  
    private camera : Camera, 
    private navCtrl : NavController, 
    //private navParams : NavParams, 
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public http: HttpClient)
  {
    //this.location= navParams.get('location');
    this.name_user = fb.control('', Validators.required);
    this.lname_user = fb.control('', Validators.required);
    this.tel_user = fb.control('', Validators.required);
    this.prov_user = fb.control('', Validators.required);
    this.amp_user = fb.control('', Validators.required);
    this.tam_user = fb.control('', Validators.required);
    this.email_user = fb.control('', Validators.required);
    this.pass_user = fb.control('', Validators.required);
    this.iden_number = fb.control('', Validators.required);
    this.level_user = fb.control('', Validators.required);
    this.reportForm = fb.group({
      'name_user': this.name_user, 
      'lname_user': this.lname_user, 
      'tel_user': this.tel_user, 
      'prov_user': this.prov_user, 
      'amp_user': this.amp_user, 
      'tam_user': this.tam_user, 
      'email_user': this.email_user, 
      'pass_user': this.pass_user, 
      'iden_number': this.iden_number,
      'level_user': this.level_user
    })
  }

  ionViewDidLoad() {
    //console.log(this.location);
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
    let name_user = this.reportForm.controls['name_user'].value;
    let lname_user = this.reportForm.controls['lname_user'].value;
    let tel_user = this.reportForm.controls['tel_user'].value;
    let prov_user = this.reportForm.controls['prov_user'].value;
    let amp_user = this.reportForm.controls['amp_user'].value;
    let tam_user = this.reportForm.controls['tam_user'].value;
    let email_user = this.reportForm.controls['email_user'].value;
    let pass_user = this.reportForm.controls['pass_user'].value;
    let level_user = this.reportForm.controls['level_user'].value;
    let iden_number = this.reportForm.controls['iden_number'].value;
    let img64 = this.imageFileName;
   
    let data = JSON.stringify({
      'name_user':name_user,
      'lname_user':lname_user,
      'tel_user':tel_user,
      'prov_user':prov_user,
      'amp_user':amp_user,
      'tam_user':tam_user,
      'email_user':email_user,
      'pass_user':pass_user,
      'level_user':level_user,
      'iden_number':iden_number,
      'img64':img64
    });

    loader.present();    
    this.http.post('http://119.59.125.191/libs/add_user_omfs.php', data)
    .subscribe(res => {
      this.res = res;
    	

    	// if (res.message == 'error-email') {
    	// 	 loader.dismiss(); 
		   //    this.gotoHome();      
		   //    let alert=this.alertCtrl.create({
		   //      title: 'ไม่สามารถบันทึกได้!',
		   //      subTitle: 'E-Mail ของท่านเคยมีการสมัครสมาชิกแล้ว กรุณาเข้าสู่ระบบ',
		   //      buttons:['ok']
		   //    });
		   //    alert.present();     
    	// }else if(res.message == 'success'){
    	// 	 loader.dismiss(); 
		   //    this.gotoHome();      
		   //    let alert=this.alertCtrl.create({
		   //      title: 'ลงทะเบียนเสร็จสิ้น',
		   //      subTitle: 'ท่านสามารถ Log in เข้าใช้งานระบบได้ทันที',
		   //      buttons:['ok']
		   //    });
		   //    alert.present();     
    	// }else if(res.message == 'error-other'){
    	// 	 loader.dismiss();     
		   //    let alert=this.alertCtrl.create({
		   //      title: 'ไม่สามารถบันทึกข้อมูลได้',
		   //      subTitle: 'กรุณาลองอีกครั้ง',
		   //      buttons:['ok']
		   //    });
		   //    alert.present();     
    	// }

    	if (this.res.message == 'error-email') {
    		 loader.dismiss(); 
		      this.gotoHome();      
		      let alert=this.alertCtrl.create({
		        title: 'ไม่สามารถบันทึกได้!',
		        subTitle: 'Username ของท่านเคยมีการสมัครสมาชิกแล้ว กรุณาเข้าสู่ระบบ',
		        buttons:['ok']
		      });
		      alert.present();     
    	}else if(this.res.message == 'success'){
    		 loader.dismiss(); 
		      this.gotoHome();      
		      let alert=this.alertCtrl.create({
		        title: 'ลงทะเบียนเสร็จสิ้น',
		        subTitle: 'ท่านสามารถ Log in เข้าใช้งานระบบได้ทันที',
		        buttons:['ok']
		      });
		      alert.present();     
    	}else if(this.res.message == 'error-other'){
    		 loader.dismiss();     
		      let alert=this.alertCtrl.create({
		        title: 'ไม่สามารถบันทึกข้อมูลได้',
		        subTitle: 'กรุณาลองอีกครั้ง',
		        buttons:['ok']
		      });
		      alert.present();     
    	}

      
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




  
    fileTransfer.upload(this.imageURI, 'http://119.59.125.191/libs/img_up_omfs.php', options)
    .then(res => {   
      loader.dismiss(); 
      this.gotoHome();      
    
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

  gotoHome(){
      this.navCtrl.setRoot(WelcomePage, {
        
      })
  }

}