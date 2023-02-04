import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Route from 'src/app/route';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  gotoLogin(){
    this.router.navigate([Route.AUTHNTICATE])
  }
}
