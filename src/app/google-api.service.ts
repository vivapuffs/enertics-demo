import {OAuthService,AuthConfig, ReceivedTokens} from 'angular-oauth2-oidc'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig ={
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '648073497353-ev4h38c3hpk9ov6hf9vrbdb1mtk9me1d.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService) { 
    oAuthService.configure(oAuthConfig)
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if(!oAuthService.hasValidAccessToken()){
          oAuthService.initLoginFlow();
        }else{
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
            //console.log(JSON.stringify(userProfile))
            //console.log('\n'+ JSON.stringify(this.oAuthService.getGrantedScopes()))
            
            
          })
        }
      })
    })
  }

  isLoggedIn(): boolean{
    return this.oAuthService.hasValidAccessToken()
  }

  getAccessToken(): string{
    return this.oAuthService.getIdToken()
  }

  signOut() {
    this.oAuthService.logOut()
  }
}
