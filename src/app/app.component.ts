import { Component } from '@angular/core';
//import { UserInfo } from 'angular-oauth2-oidc';
import { GoogleApiService, UserInfo} from './google-api.service';
import { StatusService } from 'src/shared/status.service';

interface MotorDataObj {
  DeviceID: number;
  CompanyName: string;
  ClientFullName: string;
  Email: string;
  PhoneNumber: string;
  MotorModel: string;
  MotorLocation: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';

  userInfo?: UserInfo

  motorData: any;
  isButtonClicked = false;

  motorInformation: {result: MotorDataObj []} | null = null;
  parsedData: MotorDataObj[] = [];

  constructor(private readonly google: GoogleApiService, private statusService: StatusService) {
    google.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
    this.motorData = null;
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn()
  }

  logout(){
    this.google.signOut()
  }

  getStatus() {
    this.statusService.getStatus(this.google.getAccessToken()).subscribe(status => {
      
      this.motorData = status;
      console.log(this.motorData.result[0].DeviceID)
      for (const resultinfo of this.motorData.result) {
       const motorDataa: MotorDataObj = {
        DeviceID: resultinfo.DeviceID,
        CompanyName: resultinfo.CompanyName,
        ClientFullName: resultinfo.ClientFullName,
        Email: resultinfo.Email,
        PhoneNumber: resultinfo.PhoneNumber,
        MotorModel: resultinfo.MotorModel,
        MotorLocation: resultinfo.MotorLocation
       };
       this.parsedData.push(motorDataa);
     }
      

    })
  }
}
