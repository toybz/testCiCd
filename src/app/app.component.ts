import { Component } from '@angular/core';
import {Flutterwave} from './modules/flutterwave.service';
import {InlinePaymentOptions, PaymentSuccessResponse} from './modules/models';

@Component({
  selector: 'app-root',
  template: `<button (click)="makePayment()" >Pay</button>`,
})
export class AppComponent {


  paymentData: InlinePaymentOptions = {
    public_key: 'FLWPUBK_TEST-XXXXX-X',
    tx_ref: '8*********',
    amount: 9000,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta : {
      counsumer_id: '7898' ,
      consumer_mac  : 'kjs9s8ss7dd'
    },
    customer : {
      name: 'Demo Customer  Name',
      email: 'customer@mail.com',
      phone_number: '08184******'
    },
    customizations: {
      title: 'Customization Title' ,
      description: 'Customization Description'  ,
      logo : 'https://flutterwave.com/images/logo-colored.svg'
    } ,
    callback:  this.makePaymentCallback ,
    onclose:  this.cancelledPayment,
    callbackContext: this
  };


  constructor(private flutterwave: Flutterwave ) {
  }


  makePayment() { this.flutterwave.inlinePay(this.paymentData)}

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log('Payment callback', response);
  }
  cancelledPayment(): void {
    console.log('payment is closed');

  }



}
