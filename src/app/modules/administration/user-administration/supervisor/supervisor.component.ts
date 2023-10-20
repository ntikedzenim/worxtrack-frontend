import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Administration } from 'src/app/model/administration';
import { CurrentUser } from 'src/app/model/currentuser';
import { AdministrationService } from 'src/app/services/administration.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { environment } from 'src/environments/environment';

interface Supervisor {
  component_code: number;
  email_address: string;
  full_names: string;
  objective_code: string;
  organisation_code: string;
  paypoint_code: number;
  persal_number: number;
  post_salary_level_code: number;
  region_code: number;
  responsibility_code: string;
  sub_component_code: number;
  surname: string;
  system_approver: number;
}

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {
  supervisors: Supervisor[] = [];
  postLevel: number = 13;
  username: string;
  findUser: Administration;
  findemployee: Administration;

  selectedSupervisor: Supervisor;

  errorMessage: string = '';

  persalCurrentUser: any;
  persalNumberManager: any;


  currentUserSubscription: Subscription;
  currentUser: CurrentUser;


  constructor(
    private http: HttpClient,
    private adminService: AdministrationService,
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<SupervisorComponent>
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        // Set the persalCurrentUser field to the current user's persal number
        this.persalCurrentUser = user.persal_number;
        // Set the persalNumberManager field to the first supervisor's persal number or 0 if there are no supervisors
        this.persalNumberManager = this.supervisors[0]?.persal_number || 0;
      }
    );
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
    let persal_number: number = this.activeRoute.snapshot.params['persal_number'];
    this.findEmployeeByName(persal_number);
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
    post_salary_level_code: [{ value: '', disabled: true }, [Validators.required]],
    system_approver: [{ value: '', disabled: true }, [Validators.required]],
  });

  findEmployeeByName(persal_number: number) {
    this.adminService
      .findPersalEmployeeByName(this.currentUser.persal_number)
      .subscribe(
        (res) => {
          this.findemployee = res as Administration;
          this.myGroup.patchValue(this.findemployee);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      );
  }

  public executeupdateSupervisor(userFormValue) {
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
    this.findUser.system_approver = userFormValue.system_approver;
  }

  searchSupervisors() {
    if (this.postLevel && this.username) {
      this.adminService.findSupervisorByPostLevel(this.postLevel, this.username).subscribe(
        (supervisors) => {
          this.supervisors = supervisors;
          console.log(this.supervisors);
        },
        (error) => {
          console.error('Error fetching supervisors:', error);
        }
      );
    }
  }


selectSupervisor(supervisor: Supervisor) {
  this.selectedSupervisor = supervisor;
  // Assign the persal_number of the selected supervisor to system_approver field
  this.persalNumberManager = supervisor.persal_number;
  // this.myGroup.patchValue({
  //   persalNumberManager: supervisor.persal_number
  // });
}


  updateSupervisor(): void {
    this.adminService
      .updateSupervisor(this.persalCurrentUser, this.persalNumberManager)
      .subscribe(
        (response) => {
          console.log('Supervisor updated successfully:', response);
          // Perform any additional actions upon successful update
          this.dialogRef.close(); // Close the modal after update
        },
        (error) => {
          console.error('Error updating supervisor:', error);
          // Handle error scenario
        }
      );
  }
}
