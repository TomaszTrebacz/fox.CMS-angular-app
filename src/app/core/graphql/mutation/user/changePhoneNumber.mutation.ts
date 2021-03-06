import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ChangePhoneNumberGQL extends Mutation<boolean> {
  document = gql`
    mutation($token: String) {
      changePhoneNumber(token: $token)
    }
  `;
}
