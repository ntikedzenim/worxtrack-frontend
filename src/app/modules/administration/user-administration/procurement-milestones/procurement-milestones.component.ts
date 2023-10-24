import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ADdetails } from 'src/app/model/ad-details.model';
import { AwardLetter } from 'src/app/model/award-letter.model';
import { ImplementationDetails } from 'src/app/model/implemetation.model';
import { ProcurementDetails } from 'src/app/model/procurement.model';
import { ProjectDetails } from 'src/app/model/project.model';
import { ImplementationService } from 'src/app/services/implementation.service';
import { ProcurementService } from 'src/app/services/procurement.service';
import { ProjectService } from 'src/app/services/project.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { NgForm } from '@angular/forms';
import { ChallengesComponent } from '../challenges/challenges.component';

@Component({
  selector: 'app-procurement-milestones',
  templateUrl: './procurement-milestones.component.html',
  styleUrls: ['./procurement-milestones.component.scss'],
  providers: [DatePipe],
})
export class ProcurementMilestonesComponent implements OnInit {
  

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;
  // @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  activeTabIndex = 0;

  // Initialize the completionStatus array with 'false' values
completionStatus: boolean[] = [false, false, false, false, false];

  editIconClickCount: number = 0;

  isEditing: boolean = false;
  isEditingBSCFormation: boolean = false;
  isEditingBSCMeeting: boolean = false;
  isEditingTOR: boolean = false;
  isEditingPS: boolean = false;
  isEditingBC: boolean = false;
  isEditingSCMNBAC: boolean = false;
  isEditingFNBAC: boolean = false;
  isEditingAdvertised: boolean = false;
  isEditingBriefing: boolean = false;
  isEditingClosure: boolean = false;
  isEditingBECFormation: boolean = false;
  isEditingBECMeeting: boolean = false;
  isEditingCB: boolean = false;
  isEditingRNBAC: boolean = false;
  isEditingNBACFR: boolean = false;
  isEditingLegal: boolean = false;
  isEditingAward: boolean = false;
  isEditingChallengies: boolean = false;

  // Dates
  scmPractitionerDate: Date;
  bscFormationDate: Date;
  bscMeetingDate: Date;
  torEndorsedDate: Date;
  procurementStrategyDate: Date;
  budgetConfirmationDate: Date;
  submittedNbacDate: Date;
  feedbackNBACDate: Date;
  bscMeetingCorrectionsDate: Date;
  reconfirmationBudgetDate: Date;
  resubmittedNbacDate: Date;
  approvedNBACDate: Date;
  tenderAdvertisedDate: Date;
  briefingSessionDate: Date;
  tenderClosureDate: Date;
  becFormationDate: Date;
  becMeetingDate: Date;
  submitRecommendationNbacDate: Date;
  nbacFeedbackRecommendationDate: Date;
  becMeetingCorrectionsDate: Date;
  resubmittedNbac2Date: Date;
  approvedNBAC2Date: Date;
  legalServicesDate: Date;
  awardLetterDate: Date;


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

  procurement: ProcurementDetails = {
    approvedNBACStatus: '',
    approvedNBACDate: '',
    ptsRef: '',
    approvedNBAC2Status: '',
    approvedNBAC2Date: '',
    scmPractitionerStatus: '',
    scmPractitionerDate: '',
    bscFormationStatus: '',
    bscFormationDate: '',
    bscMeetingStatus: '',
    bscMeetingDate: '',
    torEndorsedStatus: '',
    torEndorsedDate: '',
    procurementStrategyStatus: '',
    procurementStrategyDate: '',
    budgetConfirmationStatus: '',
    budgetConfirmationDate: '',
    submittedNbacStatus: '',
    submittedNbacDate: '',
    feedbackNBACStatus: '',
    feedbackNBACDate: '',
    bscMeetingCorrectionsStatus: '',
    bscMeetingCorrectionsDate: '',
    reconfirmationBudgetStatus: '',
    reconfirmationBudgetDate: '',
    resubmittedNbacStatus: '',
    resubmittedNbacDate: '',
    tenderAdvertisedStatus: '',
    tenderAdvertisedDate: '',
    briefingSessionStatus: '',
    briefingSessionDate: '',
    tenderClosureStatus: '',
    tenderClosureDate: '',
    becFormationStatus: '',
    becFormationDate: '',
    becMeetingStatus: '',
    becMeetingDate: '',
    submitRecommendationNbacStatus: '',
    submitRecommendationNbacDate: '',
    nbacFeedbackRecommendationStatus: '',
    nbacFeedbackRecommendationDate: '',
    becMeetingCorrectionsStatus: '',
    becMeetingCorrectionsDate: '',
    resubmittedNbac2Status: '',
    resubmittedNbac2Date: '',
    legalServicesStatus: '',
    legalServicesDate: '',
    remarks:''
  }

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

  award: AwardLetter = {
    id: 0,
    awardLetterStatus: '',
    awardLetterDate: '',
    ptsRef: '',
    projectTitle: '',
    remarks: ''
  }

  statusChange = "Implementation in Progress";

  ScmPractitioners: any;
  BscFormations: any;
  BscMeetings: any;
  ToREndorseds: any;
  ProcurementStrategies: any;
  BudgetConfirmations: any;
  SubmittedNBACS: any;
  FeedbackNBACS: any;
  BscMeetingCorrections: any;
  ReconfirmationOfBudgets: any;
  ResubmittedNBACS: any;
  ApprovedNBACS: any;
  TenderAdvertiseds: any;
  BriefingSessions: any;
  TenderClosures: any;
  BecFormations: any;
  BecMeetings: any;
  SubmitRecommendationNBACS: any;
  NbacFeedbackRecommendations: any;
  BecMeetingCorrections: any;
  ResubmittedNBAC2s: any;
  ApprovedNBAC2s: any;
  LegalServices: any;
  AwardLetters: any;

  Challenges: any; 

  adDetails: ADdetails[] = [];


  constructor( private projectService: ProjectService, private procurementService: ProcurementService, private route: ActivatedRoute, 
    private router: Router,private snackBar: MatSnackBar, private implementationService: ImplementationService,
    private dialog: MatDialog ) {
    this.scmPractitionerDate = new Date();
    this.bscFormationDate = new Date();
    this.bscMeetingDate = new Date();
    this.torEndorsedDate = new Date();
    this.procurementStrategyDate = new Date();
    this.budgetConfirmationDate = new Date();
    this.submittedNbacDate = new Date();
    this.feedbackNBACDate = new Date();
    this.bscMeetingCorrectionsDate = new Date();
    this.reconfirmationBudgetDate = new Date();
    this.resubmittedNbacDate = new Date();
    this.approvedNBACDate = new Date();
    this.tenderAdvertisedDate = new Date();
    this.briefingSessionDate = new Date();
    this.tenderClosureDate = new Date();
    this.becFormationDate = new Date();
    this.becMeetingDate = new Date();
    this.submitRecommendationNbacDate = new Date();
    this.nbacFeedbackRecommendationDate = new Date();
    this.becMeetingCorrectionsDate = new Date();
    this.resubmittedNbac2Date = new Date();
    this.approvedNBAC2Date = new Date();
    this.legalServicesDate = new Date();
    this.awardLetterDate = new Date();
   }

  ngOnInit(): void {
    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
    this.getProject(ptsRef);

    // this.getResubmittedNBAC(ptsRef);

    this.getAllProcurement();
  }



    setScmPractitionerDateDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.scmPractitionerDate = event.value ?? new Date();
    }
    setBscFormationDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.bscFormationDate = event.value ?? new Date();
    }
    setbscMeetingDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.bscMeetingDate = event.value ?? new Date();
    }
    settorEndorsedDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.torEndorsedDate = event.value ?? new Date();
    }
    setprocurementStrategyDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.procurementStrategyDate = event.value ?? new Date();
    }
    setbudgetConfirmationDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.budgetConfirmationDate = event.value ?? new Date();
    }
    setsubmittedNbacDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.submittedNbacDate = event.value ?? new Date();
    }
    setfeedbackNBACDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.feedbackNBACDate = event.value ?? new Date();
    }
    setbscMeetingCorrectionsDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.bscMeetingCorrectionsDate = event.value ?? new Date();
    }
    setreconfirmationBudgetDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.reconfirmationBudgetDate = event.value ?? new Date();
    }
    setResubmittedNbacDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.resubmittedNbacDate = event.value ?? new Date();
    }
    setapprovedNBACDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.approvedNBACDate = event.value ?? new Date();
    }
    settenderAdvertisedDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.tenderAdvertisedDate = event.value ?? new Date();
    }
    setbriefingSessionDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.briefingSessionDate = event.value ?? new Date();
    }
    settenderClosureDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.tenderClosureDate = event.value ?? new Date();
    }
    setbecFormationDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.becFormationDate = event.value ?? new Date();
    }
    setbecMeetingDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.becMeetingDate = event.value ?? new Date();
    }
    setsubmitRecommendationNbacDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.submitRecommendationNbacDate = event.value ?? new Date();
    }
    setnbacFeedbackRecommendationDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.nbacFeedbackRecommendationDate = event.value ?? new Date();
    }
    setbecMeetingCorrectionsDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.becMeetingCorrectionsDate = event.value ?? new Date();
    }
    setresubmittedNbac2DatePicker(event: MatDatepickerInputEvent<Date>) {
      this.resubmittedNbac2Date = event.value ?? new Date();
    }
    setapprovedNBAC2DatePicker(event: MatDatepickerInputEvent<Date>) {
      this.approvedNBAC2Date = event.value ?? new Date();
    }
    setlegalServicesDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.legalServicesDate = event.value ?? new Date();
    }
    setawardLetterDatePicker(event: MatDatepickerInputEvent<Date>) {
      this.awardLetterDate = event.value ?? new Date();
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
  

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '500px', // Set the desired width
      data: { adDetails: this.adDetails }
    });
  
    dialogRef.componentInstance.userSelected.subscribe((selectedUser: any) => {
      if (selectedUser) {
        this.procurement.scmPractitionerStatus = selectedUser.displayName;
        // this.project.technicalLeaderEmail = selectedUser.email;
      }
    });
  }

  addSCMPractitioner(procurementForm: NgForm): void {

    const scmPractitionerDate = new Date(this.procurement.scmPractitionerDate); // Convert the string to a Date object
    scmPractitionerDate.setDate(scmPractitionerDate.getDate()+1);

    this.procurement.scmPractitionerDate = scmPractitionerDate.toISOString().slice(0, 10); // Convert the Date object back to a string in ISO format

    this.procurement.scmPractitionerStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addSCMPractitioner(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        procurementForm.reset();
        // this.router.navigate(['/milestones']);
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
        this.procurement.ptsRef = this.project.ptsRef;
        // this.router.navigate(['/milestones']);
      },
    });
  }

  addBSCFormation(BscFormationForm: NgForm): void {
    const bscFormationDate = new Date(this.procurement.bscFormationDate); // Convert the string to a Date object
    bscFormationDate.setDate(bscFormationDate.getDate()+1);
  
    this.procurement.bscFormationStatus;
    this.procurement.ptsRef = this.project.ptsRef;
    this.procurement.bscFormationDate = bscFormationDate.toISOString().slice(0, 10); // Convert the Date object back to a string in ISO format
  
    this.procurementService.addBSCFormation(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        BscFormationForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }
  
  

  addBSCMeeting(BscMeetingForm: NgForm): void {
    const bscMeetingDate = new Date(this.procurement.bscMeetingDate); // Convert the string to a Date object
    bscMeetingDate.setDate(bscMeetingDate.getDate()+1);
    this.procurement.bscMeetingDate = bscMeetingDate.toISOString().slice(0, 10);  // Convert the Date object back to a string in ISO format

    this.procurement.bscMeetingStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBSCMeeting(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        BscMeetingForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
      },
    });
  }

  addToREndorsed(ToRForm: NgForm): void {
    const torEndorsedDate = new Date(this.procurement.torEndorsedDate); // Convert the string to a Date object
    torEndorsedDate.setDate(torEndorsedDate.getDate()+1);
    this.procurement.torEndorsedDate = torEndorsedDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.torEndorsedStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addToREndorsed(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        ToRForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addProcurementStrategy(strategyForm: NgForm): void {
    const procurementStrategyDate = new Date(this.procurement.procurementStrategyDate); // Convert the string to a Date object
    procurementStrategyDate.setDate(procurementStrategyDate.getDate()+1);
    this.procurement.procurementStrategyDate = procurementStrategyDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.procurementStrategyStatus
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addProcurementStrategy(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        strategyForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addBudgetConfirmation(budgetForm: NgForm): void {    
  const budgetConfirmationDate = new Date(this.procurement.budgetConfirmationDate); // Convert the string to a Date object
  budgetConfirmationDate.setDate(budgetConfirmationDate.getDate()+1);
  this.procurement.budgetConfirmationDate = budgetConfirmationDate.toISOString().slice(0, 10);  // Convert the Date object back to a string in ISO format

    this.procurement.budgetConfirmationStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBudgetConfirmation(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        budgetForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addSubmittedNBAC(addSubmittedForm: NgForm): void {
    const submittedNbacDate = new Date(this.procurement.submittedNbacDate); // Convert the string to a Date object
    submittedNbacDate.setDate(submittedNbacDate.getDate()+1);
    this.procurement.submittedNbacDate = submittedNbacDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format
  
    this.procurement.submittedNbacStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addSubmittedNBAC(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addFeedbackNBAC(FeedbackNBACForm: NgForm): void {
    const feedbackNBACDate = new Date(this.procurement.feedbackNBACDate); // Convert the string to a Date object
    feedbackNBACDate.setDate(feedbackNBACDate.getDate()+1);
    this.procurement.feedbackNBACDate = feedbackNBACDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format
 
    this.procurement.feedbackNBACStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addFeedbackNBAC(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        FeedbackNBACForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addBSCMeetingCorrections(bscCorrectionForm: NgForm): void {
    const bscMeetingCorrectionsDate = new Date(this.procurement.bscMeetingCorrectionsDate); // Convert the string to a Date object
    bscMeetingCorrectionsDate.setDate(bscMeetingCorrectionsDate.getDate()+1);
    this.procurement.bscMeetingCorrectionsDate = bscMeetingCorrectionsDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.bscMeetingCorrectionsStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBSCMeetingCorrections(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        bscCorrectionForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addReconfirmationOfBudget(budgetRecoForm: NgForm): void {
    const reconfirmationBudgetDate = new Date(this.procurement.reconfirmationBudgetDate); // Convert the string to a Date object
    reconfirmationBudgetDate.setDate(reconfirmationBudgetDate.getDate()+1);
    this.procurement.reconfirmationBudgetDate = reconfirmationBudgetDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.reconfirmationBudgetStatus ;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addReconfirmationOfBudget(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        budgetRecoForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addResubmittedNBAC(addresubForm: NgForm): void {
    const resubmittedNbacDate = new Date(this.procurement.resubmittedNbacDate); // Convert the string to a Date object
    resubmittedNbacDate.setDate(resubmittedNbacDate.getDate()+1);
    this.procurement.resubmittedNbacDate = resubmittedNbacDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.resubmittedNbacStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addResubmittedNBAC(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        addresubForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.getAllProcurement();
        
        this.openSnackBar('Milestone added successfully');
      },
    });
  }

  addApprovedNBAC(approvedForm: NgForm): void {
    const approvedNBACDate = new Date(this.procurement.approvedNBACDate); // Convert the string to a Date object
    approvedNBACDate.setDate(approvedNBACDate.getDate()+1);
    this.procurement.approvedNBACDate = approvedNBACDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.approvedNBACStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addApprovedNBAC(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        approvedForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addTenderAdvertised(advertForm: NgForm): void {
    const tenderAdvertisedDate = new Date(this.procurement.tenderAdvertisedDate); // Convert the string to a Date object
    tenderAdvertisedDate.setDate(tenderAdvertisedDate.getDate()+1);
    this.procurement.tenderAdvertisedDate = tenderAdvertisedDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.tenderAdvertisedStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addTenderAdvertised(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        advertForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addBriefingSession(briefForm: NgForm): void {
    const briefingSessionDate = new Date(this.procurement.briefingSessionDate); // Convert the string to a Date object
    briefingSessionDate.setDate(briefingSessionDate.getDate()+1);
    this.procurement.briefingSessionDate = briefingSessionDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.briefingSessionStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBriefingSession(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        briefForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addTenderClosure(closureForm: NgForm): void {
    const tenderClosureDate = new Date(this.procurement.tenderClosureDate); // Convert the string to a Date object
    tenderClosureDate.setDate(tenderClosureDate.getDate()+1);
    this.procurement.tenderClosureDate = tenderClosureDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.tenderClosureStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addTenderClosure(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        closureForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addBECFormation(becRormationForm: NgForm): void {
    const becFormationDate = new Date(this.procurement.becFormationDate); // Convert the string to a Date object
    becFormationDate.setDate(becFormationDate.getDate()+1);
    this.procurement.becFormationDate = becFormationDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.becFormationStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBECFormation(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        becRormationForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addBECMeeting(becMeetingForm: NgForm): void {
    const becMeetingDate = new Date(this.procurement.becMeetingDate); // Convert the string to a Date object
    becMeetingDate.setDate(becMeetingDate.getDate()+1);
    this.procurement.becMeetingDate = becMeetingDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.becMeetingStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBECMeeting(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        becMeetingForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addSubmitRecommendationNBAC(submitRecoForm: NgForm): void {
    const submitRecommendationNbacDate = new Date(this.procurement.submitRecommendationNbacDate); // Convert the string to a Date object
    submitRecommendationNbacDate.setDate(submitRecommendationNbacDate.getDate()+1);
    this.procurement.submitRecommendationNbacDate = submitRecommendationNbacDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.submitRecommendationNbacStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addSubmitRecommendationNBAC(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        submitRecoForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }
  
  addNBACFeedbackRecommendation(nbacFeedbackForm: NgForm): void {
    const nbacFeedbackRecommendationDate = new Date(this.procurement.nbacFeedbackRecommendationDate); // Convert the string to a Date object
    nbacFeedbackRecommendationDate.setDate(nbacFeedbackRecommendationDate.getDate()+1);
    this.procurement.nbacFeedbackRecommendationDate = nbacFeedbackRecommendationDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.nbacFeedbackRecommendationStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addNBACFeedbackRecommendation(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        nbacFeedbackForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addBECMeetingCorrections(becMeetingCoForm: NgForm): void {
    const becMeetingCorrectionsDate = new Date(this.procurement.becMeetingCorrectionsDate); // Convert the string to a Date object
    becMeetingCorrectionsDate.setDate(becMeetingCorrectionsDate.getDate()+1);
    this.procurement.becMeetingCorrectionsDate = becMeetingCorrectionsDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.becMeetingCorrectionsStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addBECMeetingCorrections(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        becMeetingCoForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addResubmittedNBAC2(resubmittedForm: NgForm): void {
    const resubmittedNbac2Date = new Date(this.procurement.resubmittedNbac2Date); // Convert the string to a Date object
    resubmittedNbac2Date.setDate(resubmittedNbac2Date.getDate()+1);
    this.procurement.resubmittedNbac2Date = resubmittedNbac2Date.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.resubmittedNbac2Status;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addResubmittedNBAC2(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        resubmittedForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addApprovedNBAC2(approvedNbacForm: NgForm): void {
    const approvedNBAC2Date = new Date(this.procurement.approvedNBAC2Date); // Convert the string to a Date object
    approvedNBAC2Date.setDate(approvedNBAC2Date.getDate()+1);
    this.procurement.approvedNBAC2Date = approvedNBAC2Date.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.approvedNBAC2Status;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addApprovedNBAC2(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        approvedNbacForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

  addLegalServices(legalForm: NgForm): void {
    const legalServicesDate = new Date(this.procurement.legalServicesDate); // Convert the string to a Date object
    legalServicesDate.setDate(legalServicesDate.getDate()+1);
    this.procurement.legalServicesDate = legalServicesDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.procurement.legalServicesStatus;
    this.procurement.ptsRef = this.project.ptsRef;

    this.procurementService.addLegalServices(this.procurement).subscribe({
      next: (response: ProcurementDetails) => {
        legalForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Approved NBAC added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }

 
  addWard(awardForm: NgForm): void {

    this.award.projectTitle = this.project.projectTitle;
    this.award.ptsRef = this.project.ptsRef;

    this.project.status = this.statusChange;

    if (this.award.awardLetterStatus === 'Issued') {
      const awardLetterDate = new Date(this.award.awardLetterDate);
      awardLetterDate.setDate(awardLetterDate.getDate() + 1);
      this.award.awardLetterDate = awardLetterDate.toISOString().slice(0, 10);
      

  
      this.projectService.updateProject(this.project.ptsRef, this.project).subscribe({
        next: (response: ProjectDetails) => {
          console.log('Project Details Updated successfully.');
        },
        error: (error: HttpErrorResponse) => {
        },
        complete: () => {
        },
      });
      this.router.navigate(['/project/update-milestone']);
    }
  
    this.procurementService.addAward(this.award).subscribe({
      next: (response: AwardLetter) => {
        awardForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        console.log('Award Letter added successfully.');
        this.openSnackBar('Milestone added successfully');
        this.getAllProcurement();
        
      },
    });
  }
  

  getAllProcurement(){
    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();

    this.procurementService.scmPractitioners(ptsRef).subscribe(data =>{
      this.ScmPractitioners = data
      console.log(this.ScmPractitioners)
    })
    this.procurementService.bscFormations(ptsRef).subscribe(data =>{
      this.BscFormations = data
    })
    this.procurementService.bscMeetings(ptsRef).subscribe(data =>{
      this.BscMeetings = data
    })
    this.procurementService.toREndorseds(ptsRef).subscribe(data =>{
      this.ToREndorseds = data
    })
    this.procurementService.procurementStrategies(ptsRef).subscribe(data =>{
      this.ProcurementStrategies = data
    })
    this.procurementService.budgetConfirmations(ptsRef).subscribe(data =>{
      this.BudgetConfirmations = data
    })
    this.procurementService.submittedNBACS(ptsRef).subscribe(data =>{
      this.SubmittedNBACS = data
    })
    this.procurementService.feedbackNBACS(ptsRef).subscribe(data =>{
      this.FeedbackNBACS = data
    })
    this.procurementService.bscMeetingCorrections(ptsRef).subscribe(data =>{
      this.BscMeetingCorrections = data
    })
    this.procurementService.reconfirmationOfBudgets(ptsRef).subscribe(data =>{
      this.ReconfirmationOfBudgets = data
    })
    this.procurementService.resubmittedNBACS(ptsRef).subscribe(data =>{
      this.ResubmittedNBACS = data
    })
    this.procurementService.approvedNBACS(ptsRef).subscribe(data =>{
      this.ApprovedNBACS = data
    })
    this.procurementService.tenderAdvertiseds(ptsRef).subscribe(data =>{
      this.TenderAdvertiseds = data
    })
    this.procurementService.briefingSessions(ptsRef).subscribe(data =>{
      this.BriefingSessions = data
    })
    this.procurementService.tenderClosures(ptsRef).subscribe(data =>{
      this.TenderClosures = data
    })
    this.procurementService.becFormations(ptsRef).subscribe(data =>{
      this.BecFormations = data
    })
    this.procurementService.becMeetings(ptsRef).subscribe(data =>{
      this.BecMeetings = data
    })
    this.procurementService.submitRecommendationNBACS(ptsRef).subscribe(data =>{
      this.SubmitRecommendationNBACS = data
    })
    this.procurementService.nbacFeedbackRecommendations(ptsRef).subscribe(data =>{
      this.NbacFeedbackRecommendations = data
    })
    this.procurementService.becMeetingCorrections(ptsRef).subscribe(data =>{
      this.BecMeetingCorrections = data
    })
    this.procurementService.resubmittedNBAC2s(ptsRef).subscribe(data =>{
      this.ResubmittedNBAC2s = data
    })
    this.procurementService.approvedNBAC2s(ptsRef).subscribe(data =>{
      this.ApprovedNBAC2s = data
    })
    this.procurementService.legalServices(ptsRef).subscribe(data =>{
      this.LegalServices = data
    })
    this.procurementService.awardLetters(ptsRef).subscribe(data =>{
      this.AwardLetters = data
    })
    this.implementationService.challenges(ptsRef).subscribe(data =>{
      this.Challenges = data
    })

  }

  openReload(): void{
    const timeout = 0;
    const dialogRef = this.dialog.open(ChallengesComponent, {
      width: '5%',
      data: {}
    })
    dialogRef.afterOpened().subscribe(result =>{
      // this.getSavedFiles()
      setTimeout(()=> {
        dialogRef.close();
      }, timeout)
    });
  }

  editMilestone(procurement: any) {
    // Set the flag to indicate editing mode
    this.isEditing = true;
  
    // Assign the values of the selected procurement to the form model
    this.procurement = { ...procurement };
  }
  editBSCFormation(procurement: any) {
    this.isEditingBSCFormation = true;
    this.procurement = { ...procurement };
  }

  editBSCMeeting(procurement: any) {
    this.isEditingBSCMeeting = true;
    this.procurement = { ...procurement };
  }
  editTOR(procurement: any) {
    this.isEditingTOR = true;
    this.procurement = { ...procurement };
  }
  editPS(procurement: any) {
    this.isEditingPS = true;
    this.procurement = { ...procurement };
  }
  editBC(procurement: any) {
    this.isEditingBC = true;
    this.procurement = { ...procurement };
  }
  editSCMNBAC(procurement: any) {
    this.isEditingSCMNBAC = true;
    this.procurement = { ...procurement };
  }
  editFNBAC(procurement: any) {
    this.isEditingFNBAC = true;
    this.procurement = { ...procurement };
  }
  editAdvertised(procurement: any) {
    this.isEditingAdvertised = true;
    this.procurement = { ...procurement };
  }
  editBriefing(procurement: any) {
    this.isEditingBriefing = true;
    this.procurement = { ...procurement };
  }
  editClosure(procurement: any) {
    this.isEditingClosure = true;
    this.procurement = { ...procurement };
  }
  editBECFormation(procurement: any) {
    this.isEditingBECFormation = true;
    this.procurement = { ...procurement };
  }
  editBECMeeting(procurement: any) {
    this.isEditingBECMeeting = true;
    this.procurement = { ...procurement };
  }
  editCB(procurement: any) {
    this.isEditingCB = true;
    this.procurement = { ...procurement };
  }
  editRNBAC(procurement: any) {
    this.isEditingRNBAC = true;
    this.procurement = { ...procurement };
  }
  editNBACFR(procurement: any) {
    this.isEditingNBACFR = true;
    this.procurement = { ...procurement };
  }
  editLegal(procurement: any) {
    this.isEditingLegal = true;
    this.procurement = { ...procurement };
  }
  editAward(award: any) {
    this.isEditingAward = true;
    this.award = { ...award };
  }
  editChallengies(procurement: any) {
    this.isEditingChallengies = true;
    this.procurement = { ...procurement };
  }


  previousTab(): void {
    if (this.activeTabIndex > 0) {
      this.activeTabIndex--;
    }
  }

  nextTab(): void {
    if (this.activeTabIndex < 5) { // Adjust this number based on the total number of tabs
      this.activeTabIndex++;
    }
  }


  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

  openDialog(ptsRef: string) {
    const dialogRef = this.dialog.open(ChallengesComponent, {
      disableClose: true,
      width: '25%',
      data: { ptsRef: ptsRef } 
    });

    dialogRef.afterClosed().subscribe(result => {
     
        this.getAllProcurement();
 
    });
  }


  // isScmPractitionerStatusEmpty(): boolean {
  //   return this.ScmPractitioners.length === 0 || !this.ScmPractitioners[0].scmPractitionerStatus;
  // }

  // isBscFormationNotApproved(procurement): boolean {
  //   return procurement.bscFormationStatus !== 'Approved' || procurement.bscFormationStatus == 'Submited';
  // }

  // isBscFormationDropdownActive: boolean = false;

  // isBscFormationNotApproved(procurement): boolean {
  //   if (this.isBscFormationDropdownActive) {
  //     return false; // Don't apply gray styling when the dropdown is active.
  //   }
  //   return this.BscFormations.length === 0 || procurement.bscFormationStatus !== 'Approved';
  // }
  
  

}


