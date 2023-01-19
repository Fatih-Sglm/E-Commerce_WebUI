import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { LoginModel } from 'src/app/contracts/auth/login-model';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/common/notification/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/common/notification/custom-toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    spinner: NgxSpinnerService,
    private formbuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {
    super(spinner);
  }

  loginForm: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      userNameOrEmail: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get validation() {
    return this.loginForm.controls;
  }

  login(loginuser: LoginModel) {
    if (this.loginForm.invalid) return;

    this.showSpinner(SpinnerType.SquareJellyBox);
    this.loginForm.reset();
    this.userAuthService.login(loginuser, () => {
      this.authService.IdentityCheck();
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertifyService.message('Kullanıcı girişi başarıyla sağlanmıştır.', {
        messageType: MessageType.Succes,
        position: Position.TopRight,
      });
      this.router.navigate(['/admin']);
    });
  }
}
