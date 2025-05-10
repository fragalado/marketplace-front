import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'marketplace-saap';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.authService.getUser(); // aquí es seguro llamarlo
    }
  }
}
