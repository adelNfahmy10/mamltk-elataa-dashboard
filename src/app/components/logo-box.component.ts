import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-logo-box',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div [class]="className">
      <a routerLink="/projects" class="logo-dark">
        @if (size) {
          <img src="assets/images/sumou-image/Asset 4.png" class="logo-sm" alt="logo sm" />
          <img
            src="assets/images/sumou-image/logo-light.png"
            class="logo-lg"
            alt="logo dark"
          />
        } @else {
          <img src="assets/images/sumou-image/logo-light.png" style="width: 100%; height:80px" alt="logo dark" />
        }
      </a>

      <a routerLink="/projects" class="logo-light d-flex justify-content-center align-items-center mt-2 mb-1">
        @if (size) {
          <img src="assets/images/sumou-image/Asset 4.png" class="logo-sm mt-2" alt="logo sm" />
          <img src="assets/images/sumou-image/logo-light.png" style="width: 70%; height:30%" class="logo-lg" alt="logo light" />
        } @else {
          <img src="assets/images/sumou-image/logo-light.png" style="width: 70%; height:30%" alt="logo light" />
        }
      </a>
      <!-- <a routerLink="/" class="logo-dark">
        @if (size) {
          <img src="assets/images/logo-sm.png" class="logo-sm" alt="logo sm" />
          <img
            src="assets/images/logo-dark.png"
            class="logo-lg"
            alt="logo dark"
          />
        } @else {
          <img src="assets/images/logo-dark.png" height="32" alt="logo dark" />
        }
      </a>

      <a routerLink="/" class="logo-light">
        @if (size) {
          <img src="assets/images/logo-sm.png" class="logo-sm" alt="logo sm" />
          <img
            src="assets/images/logo-light.png"
            class="logo-lg"
            alt="logo light"
          />
        } @else {
          <img
            src="assets/images/logo-light.png"
            height="32"
            alt="logo light"
          />
        }
      </a> -->
    </div>
  `,
})
export class LogoBoxComponent {
  @Input() className: string = ''
  @Input() size: boolean = false
}
