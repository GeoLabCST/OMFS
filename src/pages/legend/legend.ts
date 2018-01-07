import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-legend',
  templateUrl: 'legend.html',
})
export class LegendPage {

  public alreadyLyr: any;
  public alreadyTh: any;
  public lyr_ls: any;
  public legend: Array<string>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.alreadyLyr = navParams.get('alreadyLyr');
    this.alreadyTh = navParams.get('alreadyTh');
    //this.lyr_ls = navParams.get('lyr_ls');
  }

  ionViewDidLoad() {
    //console.log(this.lyr_ls);
    this.loadLyr();
  }

  loadLyr(){
    const obj=[];
    let i = 0;
    console.log(this.alreadyTh)
    for(let a in this.alreadyLyr){
      obj[a]={
        lyr: this.alreadyLyr[i],
        lyr_th: this.alreadyTh[i]
      }
      i++;
    }
    this.lyr_ls=obj;
    //console.log(obj);
  }

  closeLegend(){
    this.viewCtrl.dismiss();
  }


}
