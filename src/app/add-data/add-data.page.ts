import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService} from '../firebase.service';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {
  title: any;
  description: any;
  dateTime: any;
  constructor(private firebase: FirebaseService, private toastController: ToastController, private router: Router) { }
  ngOnInit() {
  }

  addTask(){

    this.firebase.addList({
      name: this.title,
      text: this.description,
      date: this.dateTime
      });
      this.router.navigate(['/home'])
      this.showErrorToast('<ion-text color="danger"><b>Added</b></ion-text>');
  }
  async showErrorToast(data: any) {
    let toast = this.toastController.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
    (await toast).present();
  }
}


