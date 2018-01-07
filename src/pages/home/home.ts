import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Modal, AlertController} from 'ionic-angular';

import {HttpClient} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation';
import L from 'leaflet';
import 'leaflet.gridlayer.googlemutant'

import { LocationPage } from '../location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map : L.map;
  public control: L.control;
  public marker : L.marker;
  public usrId : string;

  public locType : string;
  public locName : string;
  public locCode : string;
  public bbox:Array<number>;
  public alreadyLyr = [];
  public alreadyTh = [];
  
  public lyr : string;
  public lyr_ls:any;
  public cql : string;
  public pos: any;
  public pos2: any=[];
  public measure:boolean;
  public mapOtp: any;

  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams, 
    public http : HttpClient,    
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {    
      this.usrId = navParams.get('usrId');
      this.locType = navParams.get('locType');
      this.locName = navParams.get('locName');
      this.locCode = navParams.get('locCode'); 
      this.bbox = navParams.get('bbox');
  }

  ionViewDidLoad() {
    this.loadMap();
    // initial map
    if(typeof this.locType !== 'undefined'){
      this.locFn(this.locType, this.locCode, this.bbox);
    }else{
      this.locFn("all", "all", "all");
    }    
  }

  ionViewWillEnter(){
    //this.loadMap();
  }

  loadMap() {
    this.map = L.map('map', {
      center: [13.00, 101.50],
      zoom: 5,
      zoomControl: false,
      //measureControl: true,
      //layersControl: true
    })
    
    // let osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attributions: 'OSM'});

    // let mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access' +
    //     '_token=pk.eyJ1IjoicGF0cmlja3IiLCJhIjoiY2l2aW9lcXlvMDFqdTJvbGI2eXUwc2VjYSJ9.trTzs' +
    //     'dDXD2lMJpTfCVsVuA')
    //   .addTo(this.map);
    
    var roads = L.gridLayer.googleMutant({
        type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    }).addTo(this.map);

    var satellite = L.gridLayer.googleMutant({
      type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    });

    var terrain = L.gridLayer.googleMutant({
      type: 'terrain' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    });
    
    let baseLayers = {   
      "แผนที่ถนน": roads,
      "แผนที่ภาพดาวเทียม": satellite,
      "แผนที่ภูมิประเทศ": terrain,
    };        
    L.control.layers(baseLayers).addTo(this.map);
    //set measure default
    this.measure = false;
  } 

  locFn(locType, locCode, bbox){
    if(locType=='all'){
      this.alreadyLyr.push('c02_province');
      this.alreadyTh.push('ขอบเขตจังหวัด');
      this.lyr = 'c02_province';
      this.mapOtp = {
        layers: 'isnre:'+this.lyr,
        format: 'image/png',
        zIndex: 5,
        transparent: true
      }
      L.tileLayer.wms("http://119.59.125.189/geoserver/ows?", this.mapOtp).addTo(this.map);
      this.map.fitBounds([
        [7.09056009354302, 104.18985100564],
        [19.7358085431644, 98.6106951024982]
      ]);
    }else if(locType=='tam'){
      this.alreadyLyr.push('c04_subdistrict');
      this.alreadyTh.push('ขอบเขตตำบล');
      this.lyr = 'c04_subdistrict';
      this.cql = 'tamcode=' + locCode;
      this.mapOtp = {
        layers: 'isnre:'+this.lyr,
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: this.cql 
      }
      L.tileLayer.wms("http://119.59.125.189/geoserver/ows?", this.mapOtp).addTo(this.map);
      this.map.fitBounds([
        [Number(bbox[1]), Number(bbox[2])],
        [Number(bbox[3]), Number(bbox[0])]
      ]);
    }else if(locType=='amp'){
      this.alreadyLyr.push('c03_district');      
      this.alreadyTh.push('ขอบเขตอำเภอ');
      this.lyr = 'c03_district';
      this.cql = 'ampcode=' + locCode;
      this.mapOtp = {
        layers: 'isnre:'+this.lyr,
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: this.cql 
      }
      L.tileLayer.wms("http://119.59.125.189/geoserver/ows?", this.mapOtp).addTo(this.map);  
      this.map.fitBounds([
        [Number(bbox[1]), Number(bbox[2])],
        [Number(bbox[3]), Number(bbox[0])]
      ]);
    }else if(locType=='pro'){
      this.alreadyLyr.push('c02_province');
      this.alreadyTh.push('ขอบเขตจังหวัด');
      this.lyr = 'c02_province';
      this.cql = 'procode=' + locCode;
      this.mapOtp = {
        layers: 'isnre:'+this.lyr,
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: this.cql
      }
      L.tileLayer.wms("http://119.59.125.189/geoserver/ows?", this.mapOtp).addTo(this.map); 
      this.map.fitBounds([
        [Number(bbox[1]), Number(bbox[2])],
        [Number(bbox[3]), Number(bbox[0])]
      ]);
    }  
  }

  lyrFn(lyr_ls){
    //list layers
    this.map.eachLayer(function(l){
      if(l instanceof L.TileLayer.WMS ){
        l.remove();
      }      
     })
       
    //add layer
    for(let ls in lyr_ls){
      this.lyr = lyr_ls[ls];
      
      if(typeof this.locType =='undefined'){
        this.mapOtp = {
          layers: 'isnre:'+this.lyr,
          format: 'image/png',
          zIndex: 5,
          transparent: true
        }
      }else{
        this.mapOtp = {
          layers: 'isnre:'+this.lyr,
          format: 'image/png',
          transparent: true,
          zIndex: 5,
          CQL_FILTER: this.cql
        }
      }        
      L.tileLayer.wms("http://119.59.125.189/geoserver/ows?", this.mapOtp).addTo(this.map);      
    }    
  }
    
  addMeasure(){
    let options = { 
      position: 'topright',
      primaryLengthUnit: 'meters',
      secondaryLengthUnit: 'kilometers',
      primaryAreaUnit: 'sqmeters',
      activeColor: '#ff7700',
      completedColor: '#ff0000',
      someNewUnit: {
        factor:1600, // Required. Factor to apply when converting to this unit. Length in meters or area in sq meters will be multiplied by this factor.
        display: 'rai', // Required. How to display in results, like.. "300 Meters (0.3 My New Unit)".
        decimals: 2 // Number of decimals to round results when using this unit. `0` is the default value if not specified.
      }, 
      myOtherNewUnit: {
        factor: 1234,
        display: 'My Other Unit',
        decimals: 0
      }
    };

    if(this.measure==false) {
      this.control = L.control.measure(options).addTo(this.map);
      this.measure = true;
      //console.log(this.measure);
    } else {
      //L.Control.remove()
      this.measure = false;
      //console.log(this.measure);
      this.map.removeControl(this.control );
    }
  }

  addLocation(){
    this.geolocation.getCurrentPosition().then((res) => {   
      this.pos=[res.coords.latitude, res.coords.longitude];
      this.map.setView(this.pos, 16);
      this.marker = L.marker(this.pos, {draggable: true}).addTo(this.map).bindPopup("ตำแหน่งของคุณ").openPopup();
      console.log(this.pos);
      // drage marker
      this.marker.on("dragend", function(e){
        console.log([e.target._latlng.lat, e.target._latlng.lng])
      });  
    })
  } 

  addSelectarea(){
    this.navCtrl.push(LocationPage, {});
  }

  addLayer(){    
    const modelLyr: Modal =  this.modalCtrl.create('LayerPage',{
      alreadyLyr: this.alreadyLyr,
      alreadyTh: this.alreadyTh
    });
    modelLyr.present();
    //call lyrFn when onDidDismiss
    modelLyr.onDidDismiss((data)=>{
      this.alreadyLyr = data.lyr_ls;
      this.alreadyTh = data.lyr_th;
      //load array layer to map
      this.lyrFn(this.alreadyLyr);

    });
  }

  addLegend(){
    const modalLeg: Modal =  this.modalCtrl.create('LegendPage',{
      alreadyLyr: this.alreadyLyr,
      alreadyTh: this.alreadyTh
    });
    modalLeg.present();
  }

  addData(){
    if(typeof this.pos == 'undefined'){      
      let alert=this.alertCtrl.create({
        //title: 'คุณยังไม่ได้ระบุตำแหน่ง!',
        subTitle: 'กรุณากดที่ปุ่ม "ตำแหน่งปัจจุบัน" และขยับ marker ไปยังตำแหน่งที่ต้องการก่อนเพิ่มข้อมูล',
        buttons:['ตกลง']
      });
      alert.present(); 
    }else{
      const modalAdd: Modal =  this.modalCtrl.create('AddDataPage',{
        pos:this.marker.getLatLng(),
        usrId: this.usrId
      });
      modalAdd.present();
      //console.log(this.pos);
    }
  }
    

}
