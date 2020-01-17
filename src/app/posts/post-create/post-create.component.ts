import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/posts.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  form: FormGroup;
  private mode: string = 'create';
  private postId: string;
  public post: Post;
  isLoading: boolean = false;
  imagePreview: string;

  constructor(private postServ: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if(paraMap.has('postId')){
        this.mode = 'edit';
        this.postId = paraMap.get('postId');
        this.isLoading = true;
        this.postServ.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, 
            content: postData.content, imagePath: postData.imagePath, creator: postData.creator}
          
          this.form.setValue({
            'title': this.post.title, 'content': this.post.content, 
            'image': this.post.imagePath
          });
        }, ()=> {
          this.isLoading = false;
          this.router.navigate(["/page-not-found"]);
        });
      } else
      {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=> {
      this.imagePreview = (reader.result as string);
    }
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode == 'create'){
      this.postServ.addPosts(this.form.value.title, this.form.value.content, 
        this.form.value.image);
    } else
    {
      this.postServ.updatePost(this.postId, this.form.value.title, 
        this.form.value.content, this.form.value.image);
    }
    this.form.reset();
  }
}
