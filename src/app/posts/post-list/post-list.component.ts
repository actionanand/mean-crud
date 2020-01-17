import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/models/posts.model';
import { PostService } from 'src/app/service/post.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  getPostSub: Subscription;
  authSub: Subscription;
  isLoading: boolean = false;
  currentPage: number = 1;
  totalPosts: number = 0;
  postsPerPage: number = 3;
  pageSizeOptions: number[] = [1,2,3,5,10,50];
  userIsAuthenticated: boolean = false;
  userId: string;

  constructor(private postServ: PostService, private authServ: AuthService) { }

  posts: Post[] = [];

  ngOnInit() {
    this.postServ.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authServ.getUserId();
    this.isLoading = true;
    this.getPostSub = this.postServ.postUpdateListener().subscribe(
      (postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      }, () => {
        this.isLoading = false;
      }
    );
    this.userIsAuthenticated = this.authServ.getIsAuthOk();
    this.authSub = this.authServ.getAuthStatus().subscribe(authStatus => {
      this.userIsAuthenticated = authStatus;
      this.userId = this.authServ.getUserId();
    });
  }

  onDelete(postId: string) {
    if (confirm('do you want to delete?')) {
      this.isLoading = true;
      this.postServ.deletePost(postId).subscribe(()=> {
        this.postServ.getPosts(this.postsPerPage, this.currentPage);
      }, ()=> {
        this.isLoading = false;
      });
    }
  }

  onChangePage(pageData: PageEvent) {
    //pagination logic
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postServ.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    if(this.getPostSub){
      this.getPostSub.unsubscribe();
    }
    this.authSub.unsubscribe();
  }

}
