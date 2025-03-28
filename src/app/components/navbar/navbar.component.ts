import { Component } from '@angular/core';
import { abecedarioUIColores } from '../../utils/index';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title = "Carlos Medina";
}
