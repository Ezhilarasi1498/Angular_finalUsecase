import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, RouterModule } from '@angular/router';
import { UserDataService } from 'src/app/user-data.service';
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  signinForm: FormGroup;
  email:any="";
  password:any="";
  constructor(
    public fb: FormBuilder,
    public userDataService: UserDataService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }
  ngOnInit(): void {
  }

  submitForm(){
    this.userDataService.signIn(this.signinForm.value);
  
  }

}
