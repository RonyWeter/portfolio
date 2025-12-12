import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import type { Container, Engine, IOptions } from 'tsparticles-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public menuValue: string = 'menu';
  public selectedMenu?: string;

  ngOnInit(): void {
  }

  changeMenu() {
    if (this.menuValue === 'menu') {
      this.menuValue = 'close';
    } else {
      this.menuValue = 'menu';
    }
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.menuValue = 'menu';
    }
  }
}
