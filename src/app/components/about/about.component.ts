import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('titleSection', { static: true }) titleSection!: ElementRef;
  @ViewChild('descriptionSection', { static: true }) descriptionSection!: ElementRef;
  titleSection_isVisible = false;
  descriptionSection_isVisible = false;


  ngAfterViewInit() {
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

     const descriptionSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.descriptionSection_isVisible = true;
        } 
      });
    }, { threshold: 0.3 });

    if (this.descriptionSection) {
      descriptionSection_observer.observe(this.descriptionSection.nativeElement);
    }
  }

}
