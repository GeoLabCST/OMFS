import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  //define type
  public pros: any; 
  public amps: any; 
  public tams: any; 
  public lyrs: any; 
   
  public prov_ls: any; 
  public amp_ls:any; 
  public tam_ls:any; 
  public lyr_ls:any; 
  public data: any;

  public xmin:number;
  public ymin:number;
  public xmax:number;
  public ymax:number;
  public bbox:Array<number>;

  public errorMessage:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public view: ViewController,
    public http: HttpClient
  ) {
    this.initializePro();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  initializePro() {
    this.http.get('http://119.59.125.189/service/isnre_prov.php')
    .subscribe(res => {
      this.pros = res;
      //console.log(res);
    }, error => {
      console.log("Oooops!");
    });
  }

  initializeAmp(provcode: any) {
    this.http.get('http://119.59.125.189/service/isnre_amp.php?procode='+provcode.procode)
    .subscribe(res => {
      this.amps = res;
      //console.log(res);
    }, error => {
      console.log("Oooops!");
    });

    this.http.get('http://119.59.125.189/service/isnre_prov.php?procode='+provcode.procode)
    .subscribe(res => {
      this.bbox = [res[0].xmin, res[0].ymin, res[0].xmax, res[0].ymax];
      //console.log(this.bbox);
    }, error => {
      console.log("Oooops!");
    });
  }

  initializeTam(ampcode: any) {
    this.http.get('http://119.59.125.189/service/isnre_tam.php?ampcode='+ampcode.ampcode)
    .subscribe(res => {
      this.tams = res;
      //console.log(res);
    }, error => {
      console.log("Oooops!");
    });

    this.http.get('http://119.59.125.189/service/isnre_amp.php?ampcode='+ampcode.ampcode)
    .subscribe(res => {
      this.bbox = [res[0].xmin, res[0].ymin, res[0].xmax, res[0].ymax];
      //console.log(this.bbox);
    }, error => {
      console.log("Oooops!");
    });
  }

  tamExt(tamcode: any) {
    this.http.get('http://119.59.125.189/service/isnre_tam.php?tamcode='+tamcode.tamcode)
    .subscribe(res => {
      this.bbox = [res[0].xmin, res[0].ymin, res[0].xmax, res[0].ymax];
      //console.log(this.bbox);
    }, error => {
      console.log("Oooops!");
    });
  }

  // initializeLyr() {
  //   this.http.get('http://119.59.125.189/service/isnre_lyr.php')
  //   .subscribe(res => {
  //     this.lyrs = res;
  //   }, error => {
  //     console.log("Oooops!");
  //   });
  // }

  // itemSelected(item: string) {
  //   let lyr=[];
  //   let lyn=[];

  //   for(let l in this.lyr_ls){
  //     lyr.push(this.lyr_ls[l].lyr); 
  //     lyn.push(this.lyr_ls[l].lyr_desc);     
  //   }

  //   console.log(lyr+'-'+lyn);  

  //   this.dat = {
  //     pro: this.prov_ls,
  //     amp: this.amp_ls,
  //     tam: this.tam_ls,
  //     lyr_ls: this.lyr_ls,
  //     lyr: lyr,
  //     lyn: lyn,
  //     bbox: this.bbox
  //   }
  //   this.navCtrl.setRoot(MapPage, this.dat)
  //   this.view.dismiss(this.dat);
  // }

  itemSelected(item: string) {
    let locType: string;
    let locName: string;
    let locCode: string;
    
    if(typeof this.tam_ls !== 'undefined'){
      locType="tam";
      locName='ต.'+this.tam_ls.tam_namt+' อ.'+this.amp_ls.amp_namt+' จ.'+this.prov_ls.prov_namt;
      locCode=this.tam_ls.tamcode;
    }else if(typeof this.amp_ls !== 'undefined'){
      locType="amp";
      locName='อ.'+this.amp_ls.amp_namt+' จ.'+this.prov_ls.prov_namt;
      locCode=this.amp_ls.ampcode;
    }else if(typeof this.prov_ls !== 'undefined'){
      locType="pro";
      locName='จ.'+this.prov_ls.prov_namt;
      locCode=this.prov_ls.procode;
    }else{
      locType="all";
      locName="all";
      locCode="all";
    }

    this.data = {
      locType: locType,
      locName: locName,
      locCode: locCode,
      bbox: this.bbox
    }
    //this.view.dismiss(this.data);
    this.navCtrl.setRoot(HomePage,this.data);
  }

  
}
