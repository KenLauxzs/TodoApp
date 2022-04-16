import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FirebaseService, List } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @Input() id: string;
  list: List[] = [];
  
  constructor(public alertController: AlertController, public toastController: ToastController, private firebase: FirebaseService, private modalCtrl: ModalController, private router: Router ) {
    this.firebase.getList().subscribe( res => {
      console.log(res);
      this.list = res;
    })
  }
  async confirmation(index: number) {
    const alert = await this.alertController.create({
      header: 'Are You Sure You Want To Delete?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {

             
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', 
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
    });

    await alert.present();
  }
  async addUser() {
    let prompt = await this.alertController.create({
      header: 'Add',
      inputs: [
        {
          name: 'name',
          placeholder: 'Title',
          type: 'text'
        },
        {
          name : 'text',
          placeholder: 'Description',
          type: 'textarea'
        },
        {
          name: 'date',
          placeholder: 'date',
          type: 'date',
        },
        {
          name: 'time',
          placeholder: 'time',
          type: 'time',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: res => {
            console.log('Saved clicked');
            var nameLetter = /^[A-Za-z]+$/;
            var datetime = (res.date + '  ' + res.time);
            

            if((res.name != null)){
               if(!res.name.match(nameLetter)){
              this.showErrorToast('<ion-text color="danger"><b>Name should be aphabet only</b></ion-text>');
              return false;
              }
              else{
              
               this.firebase.addList({
              name: res.name,
              text: res.text,
              date: datetime
              });
            
              this.showErrorToast('<ion-text color="danger"><b>Added</b></ion-text>');
            }
            }
            else{
              this.showErrorToast('<ion-text color="danger"><b>Pls fill in the blanks</b></ion-text>');
              return false;
            }
          
        
          }
        }
      ]
    });
    await prompt.present();

  }
  async showErrorToast(data: any) {
    let toast = this.toastController.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
    (await toast).present();
  }

  

    async deleteList(todolist){
      const alert = await this.alertController.create({
        header: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.firebase.deleteList(todolist);
              console.log('deleted')
              this.showErrorToast('<ion-text color="danger"><b>Deleted</b></ion-text>');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', 
          }
        ],
      });
  
      await alert.present();
     
    }
   

     
}

