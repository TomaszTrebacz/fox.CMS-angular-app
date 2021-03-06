import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostComponent } from './post/post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { CategoryComponent } from './category/category.component';
import { AccessDirective } from 'src/app/core/directives/access.directive';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [BlogComponent, PostComponent, CategoryComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    PaginatorModule,
    DataViewModule,
  ],
  exports: [BlogComponent, PostComponent, CategoryComponent],
})
export class BlogModule {}
