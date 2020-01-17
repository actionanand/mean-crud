import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/posts.model';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postChanged = new Subject<{ posts: Post[], postCount: number }>();
  private posts: Post[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerpage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerpage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>(BACKEND_URL +queryParams)
    .pipe(map((postData) => {
      return { posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator
        };
      }), maxPosts: postData.maxPosts };
    }))
    .subscribe((transformedPostsData) => {
      this.posts = transformedPostsData.posts;
      this.postChanged.next({ posts: [...this.posts], postCount: transformedPostsData.maxPosts} );
    });
  }


  postUpdateListener() {
    return this.postChanged.asObservable();
  }

  addPosts(title: string, content: string, image: File) {
    // const post: Post = {id: null, title, content};
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http.post<{message: string, post: Post}>(BACKEND_URL, postData).
    subscribe((responseData) => {
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string, imagePath: string, creator: string}>
    (BACKEND_URL + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    
    let postData: Post | FormData;
    if(typeof(image) ==='object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
        postData = {
        id: id, title: title, content: content, imagePath: image, creator: null
      }
    }

    this.http.put<{message: string}>(BACKEND_URL + id, postData).
    subscribe((responseData)=> {
      this.router.navigate(["/"]);
    }, ()=> {
      this.router.navigate(["/"]);
    });
  }

}
