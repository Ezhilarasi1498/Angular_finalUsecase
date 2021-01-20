import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/user-data.service';
import { FormBuilder, FormGroup,Validators  } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userDataService:UserDataService
    
  ) {
    this.signupForm = this.fb.group({
      userName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  get f() { return this.signupForm.controls; }
  
  ngOnInit(): void {
  }

  submitRegisterForm(){
    this.submitted = true;

    alert("Form Submitted");
    this.userDataService.signUp(this.signupForm.value);
    this.router.navigate(['login']); 
  }

}
