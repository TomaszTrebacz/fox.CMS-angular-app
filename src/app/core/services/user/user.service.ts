import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  CurrentUserSQL,
  RegisterGQL,
  UpdateUserGQL
} from 'src/app/core/graphql';
import { User } from 'src/app/core/models';

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateUserForm {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private currentUserSQL: CurrentUserSQL,
    private registerGQL: RegisterGQL,
    private updateUserGQL: UpdateUserGQL
  ) {}

  getCurrentUser(): Observable<User> {
    return this.currentUserSQL
      .fetch()
      .pipe(map(result => result.data.currentUser));
  }

  register(credentials: RegisterForm): Observable<any> {
    return this.registerGQL.mutate({
      input: credentials
    });
  }

  updateUser(input: UpdateUserForm): Observable<any> {
    return this.updateUserGQL.mutate({ input: input });
  }
}