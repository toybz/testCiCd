import {Component, OnInit} from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse, AsyncPaymentOptions} from "flutterwave-angular-v3"
import {PaymentService} from './make-payment.service';

@Component({
  selector: 'app-root',
 templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  publicKey = "FLWPUBK_TEST-XXXXXXXXXXX";

  customerDetails = {
    name: 'Demo Customer  Name',
    email: 'customer@mail.com',
    phone_number: '08184505144'
  }

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg'
  }

  meta = {
    'counsumer_id': '7898',
    'consumer_mac': 'kjs9s8ss7dd'
  }

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this

  }

  promisePaymentData : AsyncPaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
  }

  constructor(private  paymentService: PaymentService, private flutterwave: Flutterwave) {}

  ngOnInit(){}

  payViaService() {
    this.paymentService.makePayment(this.paymentData)
  }

  payViaPromise() {
    this.paymentService.makePaymentViaPromise(this.promisePaymentData).then(
      (response) =>{
        console.log("Promise Res" , response)
        this.flutterwave.closePaymentModal(5)
      }
    )
  }

 public makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
   this.flutterwave.closePaymentModal(5)

  }

  closedPaymentModal(): void {
    console.log('payment modal is closed');
  }

  generateReference(): string {

    let date = new Date();
    return date.getTime().toString();

  }


}
