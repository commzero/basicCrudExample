import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponent implements OnInit {
  // this input controls which button to show on navbar
  @Input() page: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  // to navigate to home page
  onClickLogin() {
    this.router.navigate(['home']);
  }

}
