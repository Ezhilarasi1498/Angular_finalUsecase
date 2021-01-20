import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountServiceService } from 'src/app/account-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  AccountDetails:any=[];
  constructor(
    public accountService: AccountServiceService,
    private actRoute: ActivatedRoute
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.accountService.getAccountProfile(id).subscribe(res => {
      this.AccountDetails = res.msg;
    })
  }

  ngOnInit(): void {
  }

}
