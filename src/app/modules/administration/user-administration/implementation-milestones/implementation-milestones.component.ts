import { Component, OnInit, ViewChild } from '@angular/core';
import { ChallengesComponent } from '../challenges/challenges.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectDetails } from 'src/app/model/project.model';
import { CloseOut } from 'src/app/model/close-out.model';
import { NgForm } from '@angular/forms';
import { ImplementationDetails } from 'src/app/model/implemetation.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ProjectService } from 'src/app/services/project.service';
import { ImplementationService } from 'src/app/services/implementation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-implementation-milestones',
  templateUrl: './implementation-milestones.component.html',
  styleUrls: ['./implementation-milestones.component.scss']
})
export class ImplementationMilestonesComponent implements OnInit {

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;
  activeTabIndex = 0;

  isEditingAwarded: boolean = false;
  isEditingExpenditure: boolean = false;
  isEditingAppointed : boolean = false;
  isEditingKickoff: boolean = false;
  isEditingPurchase: boolean = false;
  isEditingCharter: boolean = false;
  isEditingSLA: boolean = false;
  isEditingURS: boolean = false;
  isEditingFRS: boolean = false;
  isEditingSoftware: boolean = false;
  isEditingHardware: boolean = false;
  isEditingInstalation: boolean = false;
  isEditingDevelopment: boolean = false;
  isEditingTesting: boolean = false;
  isEditingProgress: boolean = false;
  isEditingClose: boolean = false;

  statusChange = "Completed";

  awardedProjectValueDate: Date;
  expenditureDate: Date;
  appointedServiceProviderDate: Date;
  kickoffMeetingDate: Date;
  purchasedOrderDate: Date;
  projectCharterDate: Date;
  serviceLevelDate: Date;
  informationGatheringDate: Date;
  architecturalDesignDate: Date;
  softwareDeliveredDate: Date;
  hardwareDeliveredDate: Date;
  installationDate: Date;
  systemDevelopmentDate: Date;
  solutionTestingDate: Date;
  progressDate: Date;
  challengesDate: Date;
  closeoutDate: Date;


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

  closeOut: CloseOut = {
    id: 0,
    closeOutStatus: '',
    closeoutDate: '',
    ptsRef: ''
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

  AwardedProjectValue: any;
  Expenditure: any;
  AppointedServiceProvider: any;
  KickOffMeeting: any;
  PurchaseOrders: any;
  ProjectCharters: any;
  ServiceLevelAgreements: any;
  InformationGatherings: any;
  ArchitecturalDesigns: any;
  SoftwareDeliveries: any;
  HardwareDeliveries: any;
  InstallationAndConfigurations: any;
  SystemDevelopmentEnhancements: any;
  SolutionTestings: any;
  ProgressToDates: any;
  Challenges: any; 
  CloseOutHandOverReports: any;

  constructor(private projectService: ProjectService, private implementationService: ImplementationService, 
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { 
    this.awardedProjectValueDate = new Date();
    this.expenditureDate = new Date();
    this.appointedServiceProviderDate = new Date();
    this.kickoffMeetingDate = new Date();
    this.purchasedOrderDate = new Date();
    this.projectCharterDate = new Date();
    this.serviceLevelDate = new Date();
    this.informationGatheringDate = new Date();
    this.architecturalDesignDate = new Date();
    this.softwareDeliveredDate = new Date();
    this.hardwareDeliveredDate = new Date();
    this.installationDate = new Date();
    this.systemDevelopmentDate = new Date();
    this.solutionTestingDate = new Date();
    this.progressDate = new Date();
    this.challengesDate = new Date();
    this.closeoutDate = new Date();
  }

  ngOnInit(): void {

    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
    this.getProject(ptsRef);

    this.getAllImplementation();

  }

  setawardedProjectValueDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.awardedProjectValueDate = event.value ?? new Date();
  }
  setexpenditureDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.expenditureDate = event.value ?? new Date();
  }
  setappointedServiceProviderDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.appointedServiceProviderDate = event.value ?? new Date();
  }
  setkickoffMeetingDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.kickoffMeetingDate = event.value ?? new Date();
  }
  setpurchasedOrderDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.purchasedOrderDate = event.value ?? new Date();
  }
  setprojectCharterDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.projectCharterDate = event.value ?? new Date();
  }
  setserviceLevelDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.serviceLevelDate = event.value ?? new Date();
  }
  setinformationGatheringDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.informationGatheringDate = event.value ?? new Date();
  }
  setarchitecturalDesignDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.architecturalDesignDate = event.value ?? new Date();
  }
  setsoftwareDeliveredDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.softwareDeliveredDate = event.value ?? new Date();
  }
  sethardwareDeliveredDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.hardwareDeliveredDate = event.value ?? new Date();
  }
  setinstallationDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.installationDate = event.value ?? new Date();
  }
  setsystemDevelopmentDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.systemDevelopmentDate = event.value ?? new Date();
  }
  setsolutionTestingDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.solutionTestingDate = event.value ?? new Date();
  }
  setprogressDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.progressDate = event.value ?? new Date();
  }
  setchallengesDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.challengesDate = event.value ?? new Date();
  }
  setcloseoutDatePicker(event: MatDatepickerInputEvent<Date>) {
    this.closeoutDate = event.value ?? new Date();
  }


  addAwardedProjectValue(awardedProjectForm: NgForm): void {
    const awardedProjectValueDate = new Date(this.implementation.awardedProjectValueDate); // Convert the string to a Date object
    awardedProjectValueDate.setDate(awardedProjectValueDate.getDate()+1);
  
    this.implementation.awardedProjectValueStatus;
    this.implementation.ptsRef = this.project.ptsRef;
    this.implementation.awardedProjectValueDate = awardedProjectValueDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementationService.addAwardedProjectValue(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        awardedProjectForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addExpenditure(expenditureForm: NgForm): void {
    const expenditureDate = new Date(this.implementation.expenditureDate); // Convert the string to a Date object
    expenditureDate.setDate(expenditureDate.getDate()+1);
   
    this.implementation.expenditureStatus;
    this.implementation.ptsRef = this.project.ptsRef; 
    this.implementation.expenditureDate = expenditureDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format


    this.implementationService.addExpenditure(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        expenditureForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addAppointedServiceProvider(serviceProviderForm: NgForm): void {
    const appointedServiceProviderDate = new Date(this.implementation.appointedServiceProviderDate); // Convert the string to a Date object
    appointedServiceProviderDate.setDate(appointedServiceProviderDate.getDate()+1);
   
    this.implementation.appointedServiceProviderStatus;
    this.implementation.ptsRef = this.project.ptsRef;
    this.implementation.appointedServiceProviderDate = appointedServiceProviderDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementationService.addAppointedServiceProvider(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        serviceProviderForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addKickOffMeeting(kickoffForm: NgForm): void {
    const kickoffMeetingDate = new Date(this.implementation.kickoffMeetingDate); // Convert the string to a Date object
    kickoffMeetingDate.setDate(kickoffMeetingDate.getDate()+1);
 
    this.implementation.kickoffMeetingStatus;
    this.implementation.ptsRef = this.project.ptsRef;   
    this.implementation.kickoffMeetingDate = kickoffMeetingDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementationService.addKickOffMeeting(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        kickoffForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addPurchaseOrder(purchaseOrderForm: NgForm): void {
    const purchasedOrderDate = new Date(this.implementation.purchasedOrderDate); // Convert the string to a Date object
    purchasedOrderDate.setDate(purchasedOrderDate.getDate()+1);
    this.implementation.purchasedOrderDate = purchasedOrderDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.purchaseOrderStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addPurchaseOrder(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        purchaseOrderForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addProjectCharter(projectCharterForm: NgForm): void {
    const projectCharterDate = new Date(this.implementation.projectCharterDate); // Convert the string to a Date object
    projectCharterDate.setDate(projectCharterDate.getDate()+1);
    this.implementation.projectCharterDate = projectCharterDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.projectCharterStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addProjectCharter(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        projectCharterForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addServiceLevelAgreement(slaForm: NgForm): void {
    const serviceLevelDate = new Date(this.implementation.serviceLevelDate); // Convert the string to a Date object
    serviceLevelDate.setDate(serviceLevelDate.getDate()+1);
    this.implementation.serviceLevelDate = serviceLevelDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.serviceLevelStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addServiceLevelAgreement(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        slaForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addInformationGathering(informationGatheringForm: NgForm): void {
    const informationGatheringDate = new Date(this.implementation.informationGatheringDate); // Convert the string to a Date object
    informationGatheringDate.setDate(informationGatheringDate.getDate()+1);
    this.implementation.informationGatheringDate = informationGatheringDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.informationGatheringStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addInformationGathering(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        informationGatheringForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addArchitecturalDesign(architecturalForm: NgForm): void {
    const architecturalDesignDate = new Date(this.implementation.architecturalDesignDate); // Convert the string to a Date object
    architecturalDesignDate.setDate(architecturalDesignDate.getDate()+1);
    this.implementation.architecturalDesignDate = architecturalDesignDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.architecturalDesignStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addArchitecturalDesign(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        architecturalForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addSoftwareDelivered(softwareDeliveryForm: NgForm): void {
    const softwareDeliveredDate = new Date(this.implementation.softwareDeliveredDate); // Convert the string to a Date object
    softwareDeliveredDate.setDate(softwareDeliveredDate.getDate()+1);
    this.implementation.softwareDeliveredDate = softwareDeliveredDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.softwareDeliveredStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addSoftwareDelivered(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        softwareDeliveryForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addHardwareDelivered(hardwareDeliveryForm: NgForm): void {
    const hardwareDeliveredDate = new Date(this.implementation.hardwareDeliveredDate); // Convert the string to a Date object
    hardwareDeliveredDate.setDate(hardwareDeliveredDate.getDate()+1);
    this.implementation.hardwareDeliveredDate = hardwareDeliveredDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.hardwareDeliveredStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addHardwareDelivered(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        hardwareDeliveryForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addInstallationAndConfiguration(instalationForm: NgForm): void {
    const installationDate = new Date(this.implementation.installationDate); // Convert the string to a Date object
    installationDate.setDate(installationDate.getDate()+1);
    this.implementation.installationDate = installationDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.installationStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addInstallationAndConfiguration(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        instalationForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addSystemDevelopmentEnhancement(systemDevForm: NgForm): void {
    const systemDevelopmentDate = new Date(this.implementation.systemDevelopmentDate); // Convert the string to a Date object
    systemDevelopmentDate.setDate(systemDevelopmentDate.getDate()+1);
    this.implementation.systemDevelopmentDate = systemDevelopmentDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.systemDevelopmentStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addSystemDevelopmentEnhancement(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        systemDevForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addSolutionTesting(solutionForm: NgForm): void {
    const solutionTestingDate = new Date(this.implementation.solutionTestingDate); // Convert the string to a Date object
    solutionTestingDate.setDate(solutionTestingDate.getDate()+1);
    this.implementation.solutionTestingDate = solutionTestingDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.solutionTestingStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addSolutionTesting(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        solutionForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addProgressToDate(toDateForm: NgForm): void {
    const progressDate = new Date(this.implementation.progressDate); // Convert the string to a Date object
    progressDate.setDate(progressDate.getDate()+1);
    this.implementation.progressDate = progressDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.implementation.progressStatus;
    this.implementation.ptsRef = this.project.ptsRef;

    this.implementationService.addProgressToDate(this.implementation).subscribe({
      next: (response: ImplementationDetails) => {
        toDateForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
                console.log('Added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
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
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
  }

  addCloseOut(closeOutForm: NgForm): void {

    this.project.status = this.statusChange;
    this.closeOut.ptsRef = this.project.ptsRef;

    if (this.closeOut.closeOutStatus === 'Completed') {
    const closeoutDate = new Date(this.closeOut.closeoutDate); // Convert the string to a Date object
    closeoutDate.setDate(closeoutDate.getDate()+1);
    this.closeOut.closeoutDate = closeoutDate.toISOString().slice(0, 10);   // Convert the Date object back to a string in ISO format

    this.projectService.updateProject(this.project.ptsRef, this.project).subscribe({
      next: (response: ProjectDetails) => {
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Close Out Details Updated successfully.');
      },
    });
    this.router.navigate(['/project/update-milestone']);
  }

    this.implementationService.addCloseOut(this.closeOut).subscribe({
      next: (response: CloseOut) => {
        closeOutForm.reset();
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('Close Out added successfully.');
        const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
        this.getProject(ptsRef);
        this.openSnackBar('Milestone added successfully');
        this.getAllImplementation();
        
      },
    });
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

  getAllImplementation(){

    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();

    this.implementationService.awardedProjectValue(ptsRef).subscribe(data =>{
      this.AwardedProjectValue = data
    })
    this.implementationService.expenditure(ptsRef).subscribe(data =>{
      this.Expenditure = data
    })
    this.implementationService.appointedServiceProvider(ptsRef).subscribe(data =>{
      this.AppointedServiceProvider = data
    })
    this.implementationService.kickOffMeeting(ptsRef).subscribe(data =>{
      this.KickOffMeeting = data
    })
    this.implementationService.purchaseOrders(ptsRef).subscribe(data =>{
      this.PurchaseOrders = data
    })
    this.implementationService.projectCharters(ptsRef).subscribe(data =>{
      this.ProjectCharters = data
    })
    this.implementationService.serviceLevelAgreements(ptsRef).subscribe(data =>{
      this.ServiceLevelAgreements = data
    })
    this.implementationService.informationGatherings(ptsRef).subscribe(data =>{
      this.InformationGatherings = data
    })
    this.implementationService.architecturalDesigns(ptsRef).subscribe(data =>{
      this.ArchitecturalDesigns = data
    })
    this.implementationService.softwareDeliveries(ptsRef).subscribe(data =>{
      this.SoftwareDeliveries = data
    })
    this.implementationService.hardwareDeliveries(ptsRef).subscribe(data =>{
      this.HardwareDeliveries = data
    })
    this.implementationService.installationAndConfigurations(ptsRef).subscribe(data =>{
      this.InstallationAndConfigurations = data
    })
    this.implementationService.systemDevelopmentEnhancements(ptsRef).subscribe(data =>{
      this.SystemDevelopmentEnhancements = data
    })
    this.implementationService.solutionTestings(ptsRef).subscribe(data =>{
      this.SolutionTestings = data
    })
    this.implementationService.progressToDates(ptsRef).subscribe(data =>{
      this.ProgressToDates = data
    })
    this.implementationService.challenges(ptsRef).subscribe(data =>{
      this.Challenges = data
    })
    this.implementationService.closeOutHandOverReports(ptsRef).subscribe(data =>{
      this.CloseOutHandOverReports = data
    })

  }

  editAwarded(implementation: any) {
    this.isEditingAwarded = true;
    this.implementation = { ...implementation };
  }

  editExpenditure(implementation: any) {
    this.isEditingExpenditure = true;
    this.implementation = { ...implementation };
  }
  editAppointed(implementation: any) {
    this.isEditingAppointed = true;
    this.implementation = { ...implementation };
  }
  editKickoff(implementation: any) {
    this.isEditingKickoff = true;
    this.implementation = { ...implementation };
  }
  editPurchase(implementation: any) {
    this.isEditingPurchase = true;
    this.implementation = { ...implementation };
  }
  editCharter(implementation: any) {
    this.isEditingCharter = true;
    this.implementation = { ...implementation };
  }
  editSLA(implementation: any) {
    this.isEditingSLA = true;
    this.implementation = { ...implementation };
  }
  editURS(implementation: any) {
    this.isEditingURS = true;
    this.implementation = { ...implementation };
  }
  editFRS(implementation: any) {
    this.isEditingFRS = true;
    this.implementation = { ...implementation };
  }
  editSoftware(implementation: any) {
    this.isEditingSoftware = true;
    this.implementation = { ...implementation };
  }
  editHardware(implementation: any) {
    this.isEditingHardware = true;
    this.implementation = { ...implementation };
  }
  editInstalation(implementation: any) {
    this.isEditingInstalation = true;
    this.implementation = { ...implementation };
  }
  editDevelopment(implementation: any) {
    this.isEditingDevelopment = true;
    this.implementation = { ...implementation };
  }
  editTesting(implementation: any) {
    this.isEditingTesting = true;
    this.implementation = { ...implementation };
  }
  editProgress(implementation: any) {
    this.isEditingProgress = true;
    this.implementation = { ...implementation };
  }
  editClose(implementation: any) {
    this.isEditingClose = true;
    this.implementation = { ...implementation };
  }

  openDialog(ptsRef: string) {
    const dialogRef = this.dialog.open(ChallengesComponent, {
      disableClose: true,
      width: '25%',
      data: { ptsRef: ptsRef } 
    });

    dialogRef.afterClosed().subscribe(result => {
     
        this.getAllImplementation();
 
    });
  }

  
  previousTab(): void {
    if (this.activeTabIndex > 0) {
      this.activeTabIndex--;
    }
  }

  nextTab(): void {
    if (this.activeTabIndex < 6) { // Adjust this number based on the total number of tabs
      this.activeTabIndex++;
    }
  }
  

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

}
