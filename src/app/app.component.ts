import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  get isDarkMode(): boolean {
    return this.currentTheme === 'theme-dark';
  }

  private currentTheme = 'theme-light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // this.currentTheme = localStorage.getItem('activeTheme') || 'theme-light';
    // this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  switchMode(isDarkMode: boolean) {
    this.className = isDarkMode ? 'theme-dark' : 'theme-light';
    // this.currentTheme = isDarkMode ? 'theme-dark' : 'theme-light';
    // this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    // localStorage.setItem('activeTheme', this.currentTheme);
  }
}
