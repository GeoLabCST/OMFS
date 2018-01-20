import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//import { MapPage } from '../map/map';



@IonicPage()
@Component({
  selector: 'page-layer',
  templateUrl: 'layer.html',
})
export class LayerPage {

  public alreadyLyr:any;
  public alreadyTh:any;
  public lyrs: any;  
  //public lyr: any;  
  public lyr_ls=[];  
  public lyr_th=[];

 
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public http: HttpClient
  ) {
    this.alreadyLyr = navParams.get('alreadyLyr');
    this.alreadyTh = navParams.get('alreadyTh');
    this.initLyr();    
    //this.lyr_old = navParams.get('lyr')
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LayerPage');
  }

  initLyr() {
    // this.http.get('http://119.59.125.189/service/isnre_lyr.php')
    // .subscribe(res => {
    //   this.lyrs = res;
    //   //console.log(res);
    // }, error => {
    //   console.log("Oooops!");
    // });    

    this.lyrs=[{
      "id": "1",
      "lyr": "province",
      "lyr_desc": "ขอบเขตจังหวัด",
      "checked": []
    },
    {
      "id": "2",
      "lyr": "amphoe",
      "lyr_desc": "ขอบเขตอำเภอ",
      "checked": []
    },
    {
      "id": "3",
      "lyr": "tambon",
      "lyr_desc": "ขอบเขตตำบล",
      "checked": []
    },
    {
      "id": "5",
      "lyr": "c05_municipa",
      "lyr_desc": "เขตเทศบาล",
      "checked": []
    },
    {
      "id": "6",
      "lyr": "c06_village",
      "lyr_desc": "ตำแหน่งหมู่บ้าน",
      "checked": []
    },
    {
      "id": "7",
      "lyr": "c07_ngo_prj",
      "lyr_desc": "ที่ตั้งโครงการ (NGO)",
      "checked": []
    },
    {
      "id": "8",
      "lyr": "c08_eia_prj",
      "lyr_desc": "พื้นที่ตั้งโครงการ (EIA)",
      "checked": []
    },
    {
      "id": "9",
      "lyr": "c09_urb_plan",
      "lyr_desc": "ผังเมือง",
      "checked": []
    },
    {
      "id": "15",
      "lyr": "c15_contour",
      "lyr_desc": "เส้นชั้นความสูง",
      "checked": []
    },
    {
      "id": "17",
      "lyr": "c17_basin",
      "lyr_desc": "ขอบเขตลุ่มน้ำ",
      "checked": []
    },
    {
      "id": "18",
      "lyr": "c18_stream",
      "lyr_desc": "ทางน้ำ ",
      "checked": []
    },
    {
      "id": "19",
      "lyr": "c19_natural_wtr_body",
      "lyr_desc": "แหล่งน้ำธรรมชาติ",
      "checked": []
    },
    {
      "id": "20",
      "lyr": "c20_reservoir",
      "lyr_desc": "แหล่งน้ำที่มนุษย์สร้างขึ้น",
      "checked": []
    },
    {
      "id": "21",
      "lyr": "c21_strm_gage",
      "lyr_desc": "ตำแหน่งสถานีตรวจวัดระดับน้ำ",
      "checked": []
    },
    {
      "id": "22",
      "lyr": "c22_wshd_cl",
      "lyr_desc": "ชั้นคุณภาพลุ่มน้ำ",
      "checked": []
    },
    {
      "id": "23",
      "lyr": "c23_vil_wtrsupply",
      "lyr_desc": "ประปาหมู่บ้าน",
      "checked": []
    },
    {
      "id": "24",
      "lyr": "c24_hydrogeology",
      "lyr_desc": "อุทกธรณีวิทยา",
      "checked": []
    },
    {
      "id": "25",
      "lyr": "c25_well",
      "lyr_desc": "บ่อน้ำบาดาล",
      "checked": []
    },
    {
      "id": "27",
      "lyr": "c27_concession",
      "lyr_desc": "ประทานบัตรเหมืองแร่",
      "checked": []
    },
    {
      "id": "28",
      "lyr": "c28_fault",
      "lyr_desc": "รอยเลื่อนมีพลัง",
      "checked": []
    },
     {
      "id": "29",
      "lyr": "c29_conregeology",
      "lyr_desc": "แหล่งอนุรักษ์ทางธรณีวิทยา",
      "checked": []
    },
     {
      "id": "30",
      "lyr": "c30_hotspring",
      "lyr_desc": "น้ำพุร้อน",
      "checked": []
    },                         
    {
      "id": "31",
      "lyr": "c31_soil",
      "lyr_desc": "แผนที่ดิน",
      "checked": []
    },               
    {
      "id": "32",
      "lyr": "c32_foresttype",
      "lyr_desc": "ขอบเขตชนิดป่าไม้ปี 51-55",
      "checked": []
    },
    {
      "id": "33",
      "lyr": "c33_nrf",
      "lyr_desc": "อุทยานแห่งชาติ",
      "checked": []
    },
    {
      "id": "34",
      "lyr": "c34_nprk",
      "lyr_desc": "วนอุทยาน 53",
      "checked": []
    },
    {
      "id": "35",
      "lyr": "c35_fprk",
      "lyr_desc": "ป่าสงวนแห่งชาติ",
      "checked": []
    },
    {
      "id": "36",
      "lyr": "c36_wlds",
      "lyr_desc": "เขตรักษาพันธุ์สัตว์ป่า 53",
      "checked": []
    },
    {
      "id": "37",
      "lyr": "c37_nhw",
      "lyr_desc": "เขตห้ามล่าสัตว์ป่า 53",
      "checked": []
    },
    {
      "id": "38",
      "lyr": "c38_forestzoning",
      "lyr_desc": "ผลการจำแนกเขตการใช้ประโยชน์พื้นที่ป่า",
      "checked": []
    },
    {
      "id": "39",
      "lyr": "c39_alro",
      "lyr_desc": "พื้นที่ สปก.",
      "checked": []
    },
    {
      "id": "40",
      "lyr": "c40_landuse",
      "lyr_desc": "ประเภทการใช้ที่ดิน",
      "checked": []
    },
    {
      "id": "41",
      "lyr": "c41_heritage",
      "lyr_desc": "แหล่งศิลปกรรม",
      "checked": []
    },
    {
      "id": "42",
      "lyr": "c42_road",
      "lyr_desc": "เส้นทางคมนาคม",
      "checked": []
    },
    {
      "id": "43",
      "lyr": "c43_mainroad",
      "lyr_desc": "เส้นทางคมนาคมสายหลัก",
      "checked": []
    },
    {
      "id": "44",
      "lyr": "c44_rail",
      "lyr_desc": "ทางรถไฟ",
      "checked": []
    },
    {
      "id": "45",
      "lyr": "c45_harbour",
      "lyr_desc": "ท่าเรือ",
      "checked": []
    },
    {
      "id": "46",
      "lyr": "c46_airport",
      "lyr_desc": "ท่าอากาศยาน",
      "checked": []
    },
    {
      "id": "47",
      "lyr": "c47_electr",
      "lyr_desc": "ไฟฟ้า",
      "checked": []
    },
    {
      "id": "48",
      "lyr": "c48_watersupply",
      "lyr_desc": "ประปา",
      "checked": []
    },
    {
      "id": "49",
      "lyr": "c49_telephone",
      "lyr_desc": "โทรศัพท์",
      "checked": []
    },
    {
      "id": "50",
      "lyr": "c50_hospital",
      "lyr_desc": "โรงพยาบาล",
      "checked": []
    },
    {
      "id": "51",
      "lyr": "c51_school",
      "lyr_desc": "สถานศึกษา",
      "checked": []
    },
    {
      "id": "52",
      "lyr": "c52_religious",
      "lyr_desc": "ศาสนสถาน",
      "checked": []
    },
    {
      "id": "53",
      "lyr": "c53_gasoline",
      "lyr_desc": "สถานีบริการเชื้อเพลิง",
      "checked": []
    },
    {
      "id": "54",
      "lyr": "c54_postoffice",
      "lyr_desc": "ไปรษณีย์",
      "checked": []
    },
    {
      "id": "55",
      "lyr": "c55_hazard",
      "lyr_desc": "พื้นที่เสี่ยงภัยจากสารอันตราย",
      "checked": []
    }
  ]

    //show already layers
    console.log(this.alreadyLyr);
    //set already layer to checked
    for (let l in this.lyrs){
      for(let a in this.alreadyLyr){
        if(this.lyrs[l].lyr==this.alreadyLyr[a]){
          this.lyrs[l]['checked'].push(1);
        }
      }     
    }
    //console.log(this.lyrs);
    //init lyr_ls array layers
    this.initLyrArr();
    //console.log(this.lyr_ls);    
  }

  initLyrArr(){
    //load alreadyLyr to array
    for(let l in this.alreadyLyr){
      this.lyr_ls.push(this.alreadyLyr[l]);
    }
    //load lyr_ls to array
    for(let t in this.alreadyTh){
      this.lyr_th.push(this.alreadyTh[t]);
    }
  }
  
  onChange(lyr, lyr_th, isChecked, index) {
    
    if(isChecked) {
     this.lyr_ls.push(lyr);
     this.lyr_th.push(lyr_th);
    } else {
      this.lyr_ls.splice(this.lyr_ls.indexOf(lyr),1)
      this.lyr_th.splice(this.lyr_th.indexOf(lyr_th),1)
    }
    //console.log(this.lyr_ls);
  }

  lyrSelected(){
    const data = {
      lyr_ls : this.lyr_ls,
      lyr_th : this.lyr_th
    }    
    this.viewCtrl.dismiss(data);
  }

}
