import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
// import { ItSupportComponent } from '../it-support/it-support.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visible: boolean = true;
  changetype: boolean = true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  signinForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog ,private router: Router, private authenticationService: AuthenticationService,
    private snackBar: SnackBarService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.returnUrl = '/';
    }
  }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = '/dashboard';
  }
  // convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }

  loginUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    this.isLoadingResults = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        localStorage.setItem('roles', data.roles);
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.snackBar.openSnackBar('Bad Credentials', '', 'X', 5000);
        this.isLoadingResults = false;
      });
  }


}