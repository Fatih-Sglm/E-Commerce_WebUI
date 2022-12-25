import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorServices } from './services/common/http-error-handler-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule , MatDialogActions} from '@angular/material/dialog';
import { NgImageSliderModule } from 'ng-image-slider';



@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide:"baseUrl" , useValue:"https://localhost:6161", multi:true},
        {provide: HTTP_INTERCEPTORS , useClass : HttpErrorHandlerInterceptorServices , multi:true}
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, 
        AppRoutingModule,
        NgxSpinnerModule, MatDialogModule,
        AdminModule, UiModule,
        HttpClientModule,
        NgImageSliderModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
            config:{
                tokenGetter : () => localStorage.getItem("accessToken"),
                allowedDomains : ["localhost:6161"],
            }
        })
    ]
})
export class AppModule { }
