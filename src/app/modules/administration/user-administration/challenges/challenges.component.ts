import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImplementationDetails } from 'src/app/model/implemetation.model';
import { ProjectDetails } from 'src/app/model/project.model';
import { ImplementationService } from 'src/app/services/implementation.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  challengesDate: Date;

  implementation: ImplementationDetails = {
    ptsRef: '',
    awardedProjectValueStatus: '',
    awardedProjectValueDate: '',
    expenditureStatus: '',
    expenditureDate: '',
    appointedServiceProviderStatus: '',
    appointedServiceProviderDate: '',
    kickoffMeetingStatus: '',
    kickoffMeetingDate: '',
    purchaseOrderStatus: '',
    purchasedOrderDate: '',
    projectCharterStatus: '',
    projectCharterDate: '',
    serviceLevelStatus: '',
    serviceLevelDate: '',
    informationGatheringStatus: '',
    informationGatheringDate: '',
    architecturalDesignStatus: '',
    architecturalDesignDate: '',
    softwareDeliveredStatus: '',
    softwareDeliveredDate: '',
    hardwareDeliveredStatus: '',
    hardwareDeliveredDate: '',
    installationStatus: '',
    installationDate: '',
    systemDevelopmentStatus: '',
    systemDevelopmentDate: '',
    solutionTestingStatus: '',
    solutionTestingDate: '',
    progressStatus: '',
    progressDate: '',
    challengesStatus: '',
    challengesDate: '',
    remarks: '',
    remarksEx: '',
    remarksAppointed: '',
    remarksKickoff: '',
    remarksPurchase: '',
    remarksCharter: '',
    remarksSLA: '',
    remarksURS: '',
    remarksFRS: '',
    remarksSoftware: '',
    remarksHardware: '',
    remarksInstallation: '',
    remarksDevelopment: '',
    remarksTesting: '',
    remarksProgress: '',
    remarksClose: ''
  }

  project: ProjectDetails = {
    projectTitle: '',
    projectDescription: '',
    estimatedValue: '',
    startDate: '',
    endDate: '',
    status: '',
    projectManager: '',
    projectManagerEmail: '',
    technicalLeader: '',
    technicalLeaderEmail: '',
    unit: '',
    projectCategory: '',
    inHouse: '',
    comments: '',
    ptsRef: '',
    id: 0,
    dateCreated: '',
    otherUnit: '',
    outSourced: '',
    archived: '',
    completed: ''
  }

  Challenges: any; 

  constructor(private projectService: ProjectService, private implementationService: ImplementationService, 
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,  @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.challengesDate = new Date();
  }

  setchallengesDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.challengesDate = event.value ?? new Date();
  }

  ngOnInit(): void {

    const ptsRef = this.data.ptsRef;

    // const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
    this.getProject(ptsRef);
    this.getAllImplementation()

  }

  addChallenges(challengesForm: NgForm): void {
    const challengesDate = new Date(this.implementation.challengesDate); // Convert the string to a Date object
    challengesDate.setDate(challengesDate.getDate()+1);
    this.implementation.challengesDate = challengesDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.challengesStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addChallenges(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        challengesForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        this.openSnackBar('Challenges added successfully');
      },
    });
  }

  getAllImplementation(){

    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();

    this.implementationService.challenges(ptsRef).subscribe(data =>{
      this.Challenges = data
    })

  }

  public getProject(ptsRef: string) {
    this.projectService.getProjectById(ptsRef).subscribe({
      next: (response: ProjectDetails) => {
        this.project = response;
        console.log("Response received:", response);
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error:", error);
      },
      complete: () => {
        console.log("Request completed");
      },
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

}
