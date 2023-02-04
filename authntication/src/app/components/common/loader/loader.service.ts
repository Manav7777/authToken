import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoaderShown = new BehaviorSubject<boolean>(false);
  constructor() { }

  public showLoader(){
    this.isLoaderShown.next(true);
  }
  public hideLoader(){
    this.isLoaderShown.next(false);
  }
}
