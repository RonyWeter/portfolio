import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('projectTitleSection', { static: true }) projectTitleSection!: ElementRef;
  @ViewChild('eKycSection', { static: true }) eKycSection!: ElementRef;
  @ViewChild('kycSection', { static: true }) kycSection!: ElementRef;
  @ViewChild('carSection', { static: true }) carSection!: ElementRef;
  @ViewChild('loanSection', { static: true }) loanSection!: ElementRef;
  projectTitleSection_isVisible = false;
  eKycSection_isVisible = false;
  kycSection_isVisible = false;
  carSection_isVisible = false;
  loanSection_isVisible = false;

  ekycList = ['Angular', 'Spring Boot', 'PL/SQL'];
  carList = ['Angular', 'Node.js', 'PostgreSQL'];
  loanList = ['Angular', 'Angular Material', 'Bootstrap', 'CSS'];

  ngOnInit(): void {

    const projectTitleSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.projectTitleSection_isVisible = true;
        }
      });
    }, { threshold: 0.5 });


    const eKycSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.eKycSection_isVisible = true;
        }
      });
    }, { threshold: 0.5 });

    const kycSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.kycSection_isVisible = true;
        }
      });
    }, { threshold: 0.5 });

    const carSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.carSection_isVisible = true;
        }
      });
    }, { threshold: 0.5 });

    const loanSection_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loanSection_isVisible = true;
        }
      });
    }, { threshold: 0.5 });

    if (this.projectTitleSection) {
      projectTitleSection_observer.observe(this.projectTitleSection.nativeElement);
    }

    if (this.eKycSection) {
      eKycSection_observer.observe(this.eKycSection.nativeElement);
    }

    if (this.kycSection) {
      kycSection_observer.observe(this.kycSection.nativeElement);
    }

    if (this.carSection) {
      carSection_observer.observe(this.carSection.nativeElement);
    }

    if (this.loanSection) {
      loanSection_observer.observe(this.loanSection.nativeElement);
    }
  }




  openProject() {
    window.open('https://www.unionautosleasing.com', '_blank');
  }

}
