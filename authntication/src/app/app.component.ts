import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './components/common/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'authntication';
  showLoader = false;
  constructor(private loader:LoaderService,private router:Router){}
  ngOnInit(): void {
    this.loader.isLoaderShown.subscribe(
      (isLoderShown) => (this.showLoader = isLoderShown)
    );
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.loader.showLoader();
      } else if (routerEvent instanceof NavigationEnd) {
        this.loader.hideLoader();
      } else if (routerEvent instanceof NavigationCancel) {
        this.loader.hideLoader();
      } else if (routerEvent instanceof NavigationEnd) {
        this.loader.hideLoader();
      }
    });
  }
}
