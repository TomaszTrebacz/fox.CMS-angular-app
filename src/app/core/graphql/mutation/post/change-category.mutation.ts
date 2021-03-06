import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ChangeCategoryGQL extends Mutation<boolean> {
  document = gql`
    mutation($input: ChangeCategoryPostInput) {
      changeCategoryPost(changeCategoryPostInput: $input)
    }
  `;
}
