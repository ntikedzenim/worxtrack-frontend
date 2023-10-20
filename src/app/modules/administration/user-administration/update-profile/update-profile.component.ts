import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Administration } from 'src/app/model/administration';
import { CurrentUser } from 'src/app/model/currentuser';
import { AdministrationService } from 'src/app/services/administration.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  isLoadingResults = false;
  listEmployees: Administration[];
  findemployee: Administration;
  roles: Administration[];
  dataSaved = false;
  massage = null;
  errorMessage: string = '';
  currentUserSubscription: Subscription;
  currentUser: CurrentUser;

  constructor(private adminService: AdministrationService, private router: Router, private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService, private authenticationService: AuthenticationService) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUuser => {
        this.currentUser = currentUuser;
      });
    this.employee.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.adminService.searchEmployeeByName(term).subscribe(
            data => {
              this.listEmployees = data as unknown as Administration[];
            });
        }
      });
    this.getRoles();
  }

  ngOnInit(): void {
  }

  myGroup = this.formBuilder.group({
    employee: [null, Validators.required],
    first_names: [{ value: '', disabled: true }, [Validators.required]],
    username: [{ value: '', disabled: true }, [Validators.required]],
    telephone_number: [{ value: '', disabled: true }, [Validators.required]],
    email_address: [{ value: '', disabled: true }, [Validators.required]],
    role_id: [null],
    persal_number:[null],
    role_name: [null]
  });
  // search for the employee list**
  onKeyEmployee(value: string) {
    this.listEmployees = this.searchEmployee(value);
  }
  // Filter the employee list and send back to populate the selectedEmployees**
  searchEmployee(value: string) {
    let filter = value.toLowerCase();
    return this.listEmployees.filter(option => option.username.toLowerCase().startsWith(filter));
  }

  findEmployeeByName(username: string) {
    this.adminService.findEmployeeByName(username)
      .subscribe(res => {
        this.findemployee = res as Administration;
        this.myGroup.patchValue(this.findemployee);
      },
        (error) => {
           this.errorHandler.handleError(error);
           this.errorMessage = this.errorHandler.errorMessage;
        })
  } 

  displayEmployee(employee?: Administration): string | undefined {
    return employee ? employee.username : undefined;
  }

  onChangeEmployee(event) {
    this.findEmployeeByName(event.option.value.username);
    let url: string = `/administration/update-profile`;
    this.router.navigate([url]);
  }

  get employee() {
    return this.myGroup.get('employee');
  }

  resetForm() {
    this.myGroup.reset();
    this.massage = null;
  }

  public updateADPersalLink(userFormValue) {
    if (this.myGroup.valid) {
      this.executeupdateADPersalLink(userFormValue);
    }
  }

  get role_id() {
    return this.myGroup.get('role_id');
  }

  get persal_number() {
    return this.myGroup.get('persal_number');
  }

  public executeupdateADPersalLink(userFormValue) {

    console.log('userFormValue called', this.findemployee.persal_number);
    console.log('userFormValue called', this.currentUser.persal_number);


    this.findemployee.persal_number = userFormValue.persal_number;
   // this.currentUser.persal_number = userFormValue.persal_number;

    this.findemployee.role_id = userFormValue.role_id;
    this.findemployee.username = userFormValue.username;
    this.findemployee.telephone_number = userFormValue.telephone_number;
    this.findemployee.email_address = userFormValue.email_address;

    this.adminService.updateUserProfile(this.findemployee.role_id, this.findemployee.persal_number, 
      this.currentUser.persal_number, this.findemployee).subscribe(res => {
      this.dataSaved = true;
      this.massage = 'Employee Updated Successfully';
    },
      (error => {
        //  this.errorHandler.handleError(error);
        //  this.errorMessage = this.errorHandler.errorMessage;
        this.massage = 'User Not Updated';
      })
    )
  }

  public getRoles = () => {
    this.adminService.listRoles()
      .subscribe(res => {
        this.roles = res;
      })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe(); 
  }

}
