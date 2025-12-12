import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from 'emailjs-com';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    email: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl('')
  });

  @ViewChild('titleSection', { static: true }) titleSection!: ElementRef;
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;
  titleSection_isVisible = false; 
  contactSection_isVisible = false;

  constructor(private ngxService: NgxUiLoaderService, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    const titleSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.titleSection_isVisible = true;
        }
      });
    }, { threshold: 0.3 });

    if (this.titleSection) {
      titleSection_observer.observe(this.titleSection.nativeElement);
    }


    const contactSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.contactSection_isVisible = true;
        }
      });
    }, { threshold: 0.3 });

    if (this.contactSection) {
      contactSection_observer.observe(this.contactSection.nativeElement);
    }
  }

  sendMessage() {
    const email = this.contactForm.get('email')?.value;
    const subject = this.contactForm.get('subject')?.value;
    const message = this.contactForm.get('message')?.value;
    if (!this.isValidEmail(email!) || this.isEmptyOrNull(email)) {
      this.snackbar.open('Set a valid email', '', {
        duration: 3000,
      });
      return;
    }

    const templateParams = {
      from_email: email,
      message: message,
      subject: subject
    };

    this.ngxService.start();
    emailjs.send('service_ubxc2sd', 'template_7omszyx', templateParams, 'Md7IzZnsEe9nZfOIl')
      .then((response) => {
        this.snackbar.open('Email sent successfully', '', {
          duration: 3000,
        });
        this.contactForm.reset();
        this.ngxService.stop();
      })
      .catch((error) => {
        this.snackbar.open('Something went wrong', '', {
          duration: 3000,
        });
        this.ngxService.stop();
      });
  }

  isEmptyOrNull(message: any) {
    if (message === '' || message === undefined || message === null) {
      return true
    } else {
      return false
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = '../../../assets/CV-Rony El Weter.pdf'; // adjust path if needed
    link.download = 'Rony-ElWeter-CV.pdf';
    link.click();
  }

}
