import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { AngularMaterialsModule } from './angular-materials.module';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialsModule
  ]
})
export class PostsModule { }
