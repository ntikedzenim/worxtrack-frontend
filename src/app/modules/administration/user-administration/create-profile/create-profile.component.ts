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
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  isLoadingResults = false;
  listEmployees: Administration[];
  findemployee: Administration;
  listUsers: Administration[];
  findUser: Administration;

  findSupervisor: Administration;

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
          this.adminService.searchPersalEmployeeByName(term).subscribe(
            data => {
              this.listEmployees = data as unknown as Administration[];
            });
        }
      });
    this.user.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.adminService.searchPrimaryUser(term).subscribe(
            data => {
              this.listUsers = data as unknown as Administration[];
              console.log('user data called', data);
            });
          console.log('user term called', term);
        }
      });

      
  }

  ngOnInit(): void {
  }

  myGroup = this.formBuilder.group({
    employee: [null, Validators.required],
    full_names: [{ value: '', disabled: true }, [Validators.required]],
    surname: [{ value: '', disabled: true }, [Validators.required]],
    persal_number: [{ value: '', disabled: true }, [Validators.required]],
    email_address: [{ value: '', disabled: true }, [Validators.required]],
    region_code: [{ value: '', disabled: true }, [Validators.required]],
    component_code: [{ value: '', disabled: true }, [Validators.required]],
    organisation_code: [{ value: '', disabled: true }, [Validators.required]],
    sub_component_code: [{ value: '', disabled: true }, [Validators.required]],
    paypoint_code: [{ value: '', disabled: true }, [Validators.required]],
    responsibility_code: [{ value: '', disabled: true }, [Validators.required]],
    objective_code: [{ value: '', disabled: true }, [Validators.required]],
    user: [null, Validators.required],
    primary_name: [{ value: '', disabled: true }, [Validators.required]],
    primary_email: [{ value: '', disabled: true }, [Validators.required]],
    tel_no: [{ value: '', disabled: true }, [Validators.required]],

  });
  // search for the employee list**
  onKeyEmployee(value: string) {
    this.listEmployees = this.searchEmployee(value);
  }
  onKeyUser(value: string) {
    this.listUsers = this.searchUser(value);
  }
  // Filter the employee list and send back to populate the selectedEmployees**
  searchEmployee(value: string) {
    let filter = value.toLowerCase();
    return this.listEmployees.filter(option => option.full_names.toLowerCase().startsWith(filter));
  }
  searchUser(value: string) {
    let filter = value.toLowerCase();
    return this.listUsers.filter(option => option.primary_name.toLowerCase().startsWith(filter));
  }

  findEmployeeByName(persal_number: number) {
    this.adminService.findPersalEmployeeByName(persal_number)
      .subscribe(res => {
        this.findemployee = res as Administration;
        this.myGroup.patchValue(this.findemployee);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }
  
  findUserByName(primary_name: string) {
    this.adminService.findADPrimaryByName(primary_name)
      .subscribe(res => {
        this.findUser = res as Administration;
        this.myGroup.patchValue(this.findUser);
      },
        (error) => {
          //  this.errorHandler.handleError(error);
          //  this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  displayEmployee(employee?: Administration): string | undefined {
    return employee ? employee.full_names : undefined;
  }

  displayUser(user?: Administration): string | undefined {
    return user ? user.primary_name : undefined;
  }

  onChangeEmployee(event) {
    this.findEmployeeByName(event.option.value.persal_number);
    let url: string = `/administration/create-profile`;
    this.router.navigate([url]);
    console.log('onChangeEmployee Employee', event.option.value.persal_number);
  }

  onChangeUser(event) {
    this.findUserByName(event.option.value.primary_name);
    let url: string = `/administration/create-profile`;
    this.router.navigate([url]);
    console.log('onSelectionChange user', event.option.value.primary_name);
  }

  get employee() {
    return this.myGroup.get('employee');
  }

  get user() {
    return this.myGroup.get('user');
  }

  resetForm() {
    this.myGroup.reset();
    this.massage = null;
  }


  get primary_email() {
    return this.myGroup.get('primary_email');
  }

  get primary_name() {
    return this.myGroup.get('primary_name');
  }

  get tel_no() {
    return this.myGroup.get('tel_no');
  }
  get role_id() {
    return this.myGroup.get('role_id');
  }

  get persal_number() {
    return this.myGroup.get('persal_number');
  }

  public updateADPersalLink(userFormValue) {
    if (this.myGroup.valid) {
      this.executeupdateADPersalLink(userFormValue);
    }
  }

  public executeupdateADPersalLink(userFormValue) {

    //  console.log('userFormValue called', this.primary_name.value);

    this.findUser.full_names = userFormValue.full_names;
    this.findUser.surname = userFormValue.surname;
    this.findUser.persal_number = userFormValue.persal_number;

    this.findUser.region_code = userFormValue.region_code;
    this.findUser.organisation_code = userFormValue.organisation_code;
    this.findUser.component_code = userFormValue.component_code;
    this.findUser.sub_component_code = userFormValue.sub_component_code;
    this.findUser.responsibility_code = userFormValue.responsibility_code;
    this.findUser.paypoint_code = userFormValue.paypoint_code;
    this.findUser.objective_code = userFormValue.objective_code;

    this.findUser.primary_name = userFormValue.primary_name;
    this.findUser.primary_email = userFormValue.primary_email;
    this.findUser.tel_no = userFormValue.tel_no;

    this.adminService.createADPersalLink(this.primary_name.value, this.primary_email.value,
      this.tel_no.value, this.currentUser.persal_number, this.findemployee).subscribe(res => {
        this.dataSaved = true;
        this.massage = 'Employee Created Successfully';
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
          this.massage = 'User Not Created';
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
