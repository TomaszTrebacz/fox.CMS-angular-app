import { Injectable, Input, ɵConsole } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ChangeConfirmTokenGQL,
  ChangePassByTokenGQL,
  ChangePasswordGQL,
  ConfirmUserGQL,
  LoginGQL,
  LogoutGQL,
  ResetPasswordGQL,
  SendChangePassEmailGQL,
  SendCodePhoneGQL
} from 'src/app/core/graphql';
import { AccessToken, RefreshToken, UserStorage } from 'src/app/core/storage';

export interface LoginForm {
  email: string;
  password: string;
}

export interface resetForm {
  code: number;
  phoneNumber: string;
}

export interface jwtResponse {
  role: string;
  valid: boolean;
}

export interface changePassByTokenForm {
  token: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  @AccessToken() private accessToken: string;
  @RefreshToken() private refreshToken: string;
  @UserStorage() private userStorage: string;

  constructor(
    private loginGQL: LoginGQL,
    private logoutGQL: LogoutGQL,
    private confirmUserGQL: ConfirmUserGQL,
    private changeConfirmTokenGQL: ChangeConfirmTokenGQL,
    private sendCodePhoneGQL: SendCodePhoneGQL,
    private resetPasswordGQL: ResetPasswordGQL,
    private changePassByTokenGQL: ChangePassByTokenGQL,
    private sendChangePassEmailGQL: SendChangePassEmailGQL,
    private changePasswordGQL: ChangePasswordGQL
  ) {
    this.userSubject = new BehaviorSubject(this.userStorage || null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(credentials: LoginForm) {
    return this.loginGQL
      .fetch({
        input: credentials
      })
      .pipe(
        map(result => {
          const user = {
            ...result.data.login.user,
            role: result.data.login.role
          };

          this.accessToken = result.data.login.accessToken;
          this.refreshToken = result.data.login.refreshToken;
          this.userStorage = user;

          this.userSubject.next(user);
        })
      );
  }

  logout() {
    const user = this.userValue;
    this.logoutGQL.mutate({ id: user.id }).subscribe();

    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  confirmUser(token: string): Observable<any> {
    return this.confirmUserGQL.mutate({ token: token });
  }

  sendCodePhone(phoneNumber: string): Observable<any> {
    return this.sendCodePhoneGQL.mutate({ phoneNumber: phoneNumber });
  }

  changeConfirmToken(email: string) {
    return this.changeConfirmTokenGQL.mutate({ email: email });
  }

  resetPassword(input: resetForm) {
    return this.resetPasswordGQL.mutate({ input: input });
  }

  sendChangePassEmail(email: string) {
    return this.sendChangePassEmailGQL.mutate({ email: email });
  }

  changePassByToken(input: changePassByTokenForm) {
    return this.changePassByTokenGQL.mutate({ input: input });
  }

  changePassword(password: string) {
    return this.changePasswordGQL.mutate({ password: password });
  }
}