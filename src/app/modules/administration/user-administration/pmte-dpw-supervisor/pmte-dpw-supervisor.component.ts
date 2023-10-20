import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { Administration } from 'src/app/model/administration';
import { CurrentUser } from 'src/app/model/currentuser';
import { AdministrationService } from 'src/app/services/administration.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

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
  system_recommender: number;
}

@Component({
  selector: 'app-pmte-dpw-supervisor',
  templateUrl: './pmte-dpw-supervisor.component.html',
  styleUrls: ['./pmte-dpw-supervisor.component.scss']
})
export class PmteDpwSupervisorComponent implements OnInit {

  supervisors: Supervisor[] = [];
  recomenders: Supervisor[] = [];
  postLevel: number = 1;
  username: string;
  recomender_name: string;
  findUser: Administration;
  findemployee: Administration;

  selectedSupervisor: Supervisor;
  selectedRecomender: Supervisor;

  errorMessage: string = '';

  persalCurrentUser: any;
  persalNumberManager: any;
  persalNumberRecomender: any;


  currentUserSubscription: Subscription;
  currentUser: CurrentUser;


  constructor(
    private http: HttpClient,
    private adminService: AdministrationService,
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<PmteDpwSupervisorComponent>, 
    private snackBar: SnackBarService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        // Set the persalCurrentUser field to the current user's persal number
        this.persalCurrentUser = user.persal_number;
        // Set the persalNumberManager field to the first supervisor's persal number or 0 if there are no supervisors  
        this.persalNumberManager = this.supervisors[0]?.persal_number || 0;
        this.persalNumberRecomender = this.recomenders[0]?.persal_number || 0;
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
    system_recommender: [{ value: '', disabled: true }, [Validators.required]],
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

  RecomenderForm = this.formBuilder.group({
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
    system_recomender: [{ value: '', disabled: true }, [Validators.required]],
  });

  findRecomenderByName(persal_number: number) {
    this.adminService
      .findPersalEmployeeByName(this.currentUser.persal_number)
      .subscribe(
        (res) => {
          this.findemployee = res as Administration;
          this.RecomenderForm.patchValue(this.findemployee);
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
    this.findUser.system_recommender = userFormValue.system_recommender;
  }

  searchRecomender() {
    if (this.postLevel && this.recomender_name) {
      this.adminService.findSupervisorByPostLevel(this.postLevel, this.recomender_name).subscribe(
        (recomender) => {
          this.recomenders = recomender;
          console.log(this.recomenders);
        },
        (error) => {
          console.error('Error fetching supervisors:', error);
        }
      );
    }
  }


selectSupervisor(supervisor: Supervisor) {
  this.selectedSupervisor = supervisor;
  this.persalNumberManager = supervisor.persal_number;
}


  updateSupervisor(): void {
    this.adminService
      .updateSupervisor(this.persalCurrentUser, this.persalNumberManager)
      .subscribe(
        (response) => {
          console.log('Supervisor updated successfully:', response);
          // Perform any additional actions upon successful update
          this.dialogRef.close(); // Close the modal after update
          this.snackBar.openSnackBar('Approver updated successfully', '', 'X', 5000);
        },
        (error) => {
          console.error('Error updating supervisor:', error);
          this.snackBar.openSnackBar('Error updating Approver', '', 'X', 5000);
          // Handle error scenario
        }
      );
  }

  selectRecomender(supervisor: Supervisor) {
    this.selectedRecomender = supervisor;
    this.persalNumberRecomender = supervisor.persal_number;
  }

  updateRecomender(): void {
    this.adminService
      .updateRecomender(this.persalCurrentUser, this.persalNumberRecomender)
      .subscribe(
        (response) => {
          console.log('Recomender updated successfully:', response);
          this.snackBar.openSnackBar('Recomender updated successfully', '', 'X', 5000);
          // Perform any additional actions upon successful update
          // this.dialogRef.close(); // Close the modal after update
        },
        (error) => {
          console.error('Error updating recomender:', error);
          this.snackBar.openSnackBar('Error updating recomender', '', 'X', 5000);
          // Handle error scenario
        }
      );
  }
}
