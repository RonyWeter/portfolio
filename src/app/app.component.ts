import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTabChangeEvent, ScrollDirection } from '@angular/material/tabs';
import { Router, Scroll } from '@angular/router';
import * as $ from 'jquery';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { fromEvent, debounceTime, tap, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dataToExport', { static: false })
  public dataToExport!: ElementRef;


  public sections: string[] = ['home', 'about', 'experience', 'skills', 'contact'];


  public home: boolean = true;
  public flipCard1: boolean = false;
  public flipCard2: boolean = false;
  public flipCard3: boolean = false;
  public alone: boolean = true;
  public readMore: boolean = false;
  public about = false;
  public experience = false;
  public skills = false;
  public contact = false;
  public cv = false;
  public Message: string = '';
  public fullName: string = '';
  public emailSubject: string = '';
  public emailAddress: string = '';
  public mobileNumber: string = '';
  public topButton: boolean = false;
  public leftArrow : boolean = true; 
  public rightArrow : boolean = false; 
  @ViewChild('myCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  public ctx = CanvasRenderingContext2D;
  public myScriptElement1: HTMLScriptElement | undefined;
  public myScriptElement2: HTMLScriptElement | undefined;
  public myScriptElement3: HTMLScriptElement | undefined;


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    console.log("test1 ")
    this.topButton = true;
  }

  constructor(private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone) {

    this.myScriptElement1 = document.createElement("script");
    this.myScriptElement2 = document.createElement("script");
    this.myScriptElement3 = document.createElement("script");
    this.myScriptElement1.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js";
    this.myScriptElement2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js";
    this.myScriptElement3.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js";
    document.body.appendChild(this.myScriptElement1);
    document.body.appendChild(this.myScriptElement2);
    document.body.appendChild(this.myScriptElement3);



  }
  ngOnInit(): void {
    $("#contentToConvert").hide();
  }

  onTabChange(selectedIndex: string) {
    this.changeSelectedTab(selectedIndex);
    let e = document.getElementById(selectedIndex);
    if (selectedIndex == 'home') {
      e?.scrollIntoView({ behavior: "smooth" });
      
      setTimeout(() => {
        this.topButton = false;
      }, 800);
      
      // window.location.reload();
    }
    else {
      e?.scrollIntoView({ behavior: "smooth" });
    }
  }

  changeSelectedTab(selectedTab: string) {
    this.home = false;
    this.about = false;
    this.experience = false;
    this.skills = false;
    this.contact = false;
    if (selectedTab == 'home') {
      this.home = true;
    }
    else if (selectedTab == 'about') {
      this.about = true;
    }
    else if (selectedTab == 'experience') {
      this.experience = true;
    }
    else if (selectedTab == 'skills') {
      this.skills = true;
    }
    else if (selectedTab == 'contact') {
      this.contact = true;
    }
  }


  OpenBrowser(value: string) {
    if (value == "instagrame") {
      window.open('https://www.instagrame.com/ronyelweter/', '_blank');
    }
    else if (value == "facebook") {
      window.open('https://www.facebook.com/ronyelweter/', '_blank');
    }
    else if (value == "linkedin") {
      window.open('https://www.linkedin.com/in/Rony Weter', '_blank');
    }
    else if (value == "whatsapp") {
      const myNumber = +96171644187;
      const defaultMessage = "Dear Mr.Rony"
      window.open('https://wa.me/${myNumber}?text=${defaultMessage}', '_blank');
    }
  }



  downloadAsPDF() {
    $("#contentToConvert").show();
    var data: any = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('RonyElWeter-Cv.pdf'); // Generated PDF
      $("#contentToConvert").hide();
    });
  }

  READMore() {
    this.readMore = true;
    this.alone = false;
  }
  Cancel() {
    this.readMore = false;
    this.alone = true;
  }

  rotateCard(value: number) {
    if (value == 1) {
      if (this.flipCard1 == true) {
        this.flipCard1 = false;
      }
      else {
        this.flipCard1 = true;
        this.flipCard2 = false;
        this.flipCard3 = false;
      }
    }
    else if (value == 2) {
      if (this.flipCard2 == true) {
        this.flipCard2 = false;
      }
      else {
        this.flipCard1 = false;
        this.flipCard2 = true;
        this.flipCard3 = false;
      }
    }
    else if (value == 3) {
      if (this.flipCard3 == true) {
        this.flipCard3 = false;
      }
      else {
        this.flipCard1 = false;
        this.flipCard2 = false;
        this.flipCard3 = true;
      }
    }
  }

  sendMessage() {

    window.location.href =
      'mailto:' + this.emailAddress + '?subject=' + this.emailSubject + '&body=' +
      this.Message + 'Full Name :' + this.fullName + ' MobileNumber: ' + this.mobileNumber;

    console.log("donee >>>>>>");
  }

  scrollTop() {
    // document.addEventListener('DOMContentLoaded',function(){
    //   window.scrollTo({top : 0, behavior: 'smooth'})
    // });

  }

  openSetting(){
    if(this.leftArrow == true){
      $(".sidNav").animate({right: '0vh'});
      this.leftArrow = false;
      this.rightArrow = true;
    }
    else{
      $(".sidNav").animate({right: '-11vh'});
      this.leftArrow = true;
      this.rightArrow = false;
    }
    
  }

  refresh(){
    window.location.reload();
  }


}
