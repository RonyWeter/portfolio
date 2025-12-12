import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {



  @ViewChild('skillsBox', { static: true }) skillsBox!: ElementRef;
  @ViewChild('skills', { static: true }) skills!: ElementRef;
  skillsBox_isVisible = false;
  skillsBox_1_isVisible = false;
  skillsBox_2_isVisible = false;
  skills_isVisible = false;

  ngOnInit(): void {
    const skillsBox_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.skillsBox_isVisible = true;
          setTimeout(() => {
            this.skillsBox_1_isVisible = true;
            setTimeout(() => {
              this.skillsBox_2_isVisible = true;
            }, 400);
          }, 400);
        }
      });
    }, { threshold: 0.3 });

    if (this.skillsBox) {
      skillsBox_observer.observe(this.skillsBox.nativeElement);
    }

    const skills_observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.skills_isVisible = true;
        }
      });
    }, { threshold: 0.3 });

    if (this.skills) {
      skills_observer.observe(this.skills.nativeElement);
    }
  }
}
