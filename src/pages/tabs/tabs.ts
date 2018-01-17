import { Component } from '@angular/core';

import { AddDataPage } from '../add-data/add-data';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddDataPage;
  tab3Root = ContactPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
