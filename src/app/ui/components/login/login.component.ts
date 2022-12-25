import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { LoginModel } from 'src/app/contracts/auth/login-model';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/common/notification/custom-toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService
    , private formbuilder: FormBuilder, private toastrService: CustomToastrService,
    private authService: AuthService  , private dialogRef? : MatDialogRef<LoginComponent>) { super(spinner) }

  loginForm: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.loginForm =this.formbuilder.group({
      userNameOrEmail: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  get validation() {
    return this.loginForm.controls;
  }

  login(loginuser: LoginModel) {

    if (this.loginForm.invalid)
      return;

    this.showSpinner(SpinnerType.SquareJellyBox);
    this.loginForm.reset();
    this.userAuthService.login(loginuser, () => {
      this.authService.IdentityCheck();
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.dialogRef.close();
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        toastrMessageType: ToastrMessageType.Success,
        toastrPosition: ToastrPosition.TopRight,
        timeout: 1,
      });
    },);
  }
  
}
