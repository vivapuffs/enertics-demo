import { Component } from '@angular/core';
//import { UserInfo } from 'angular-oauth2-oidc';
import { GoogleApiService, UserInfo} from './google-api.service';
import { StatusService } from 'src/shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';

  userInfo?: UserInfo

  constructor(private readonly google: GoogleApiService, private statusService: StatusService) {
    google.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn()
  }

  logout(){
    this.google.signOut()
  }

  getStatus() {
    this.statusService.getStatus(this.google.getAccessToken()).subscribe(status => {
      console.log(status)
    })
  }
}
