import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponentComponent } from '../../Header/navbar-component/navbar-component.component';
import { FooterComponentComponent } from '../../Footer/footer-component/footer-component.component';

@Component({
  selector: 'app-home-principal-component',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavbarComponentComponent, FooterComponentComponent],
  templateUrl: './home-principal-component.component.html',
  styleUrl: './home-principal-component.component.css'
})
export class HomePrincipalComponentComponent {

}
