import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL, PostGQL, UserPostsGQL } from 'src/app/core/graphql';
import { Post } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private allPostsGQL: AllPostsGQL,
    private postGQL: PostGQL,
    private userPostsGQL: UserPostsGQL
  ) {}

  findAll(): Observable<Post[]> {
    return this.allPostsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.posts));
  }

  findOne(id: number): Observable<Post> {
    return this.postGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.post));
  }

  findUserPosts(id: string): Observable<Post[]> {
    return this.userPostsGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.userPosts));
  }
}
