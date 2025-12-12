import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit,OnInit {
  @ViewChild('mainSection', { static: true }) mainSection!: ElementRef;
  public isVisible = false;

  ngOnInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
        }
      });
    }, { threshold: 0.3 });

    if (this.mainSection) {
      observer.observe(this.mainSection.nativeElement);
    }
  }



  ngAfterViewInit() {
    
  }

  viewWork() {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  openLinkedIn() {
    window.open('https://www.linkedin.com/in/rony-weter-4567a121b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
  }

  sendEmail() {
    window.location.href = 'mailto:roniweter@gmail.com';
  }
}
