import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryGQL extends Mutation<boolean> {
  document = gql`
    mutation($id: Int!) {
      deleteCategory(id: $id)
    }
  `;
}
