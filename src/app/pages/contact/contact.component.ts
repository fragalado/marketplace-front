import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-contact',
  imports: [NavbarComponent, FooterComponent, MapComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
