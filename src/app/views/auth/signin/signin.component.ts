import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@component/logo-box.component'
import { AuthenticationService } from '@core/services/auth.service'
import { AuthService } from '@core/services/auth/auth.service'
import { Store } from '@ngrx/store'
import { login } from '@store/authentication/authentication.actions'

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signin.component.html',
  styles: ``,
})
export class SigninComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)


  loginForm:FormGroup = this._FormBuilder.group({
    username:['admin'],
    password:['123123']
  })

  submitLoginForm():void{
    let data = this.loginForm.value


    this._AuthService.login(data).subscribe({
      next:(res)=>{
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        this._Router.navigate(['/projects']);
      }
    })
  }



  // signinForm!: UntypedFormGroup
  // submitted: boolean = false

  // public fb = inject(UntypedFormBuilder)
  // store = inject(Store)
  // route = inject(Router)
  // service = inject(AuthenticationService)

  // constructor() {
  //   this.signinForm = this.fb.group({
  //     email: ['user@demo.com', [Validators.required, Validators.email]],
  //     password: ['123456', [Validators.required]],
  //   })
  // }

  // get form() {
  //   return this.signinForm.controls
  // }

  // onLogin() {
  //   this.submitted = true
  //   if (this.signinForm.valid) {
  //     const email = this.form['email'].value // Get the username from the form
  //     const password = this.form['password'].value // Get the password from the form

  //     // Login Api
  //     this.store.dispatch(login({ email: email, password: password }))
  //   }
  // }
}
