import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetails } from 'src/app/model/project.model';
import { ImplementationService } from 'src/app/services/implementation.service';
import { ProcurementService } from 'src/app/services/procurement.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-milestones',
  templateUrl: './view-milestones.component.html',
  styleUrls: ['./view-milestones.component.scss']
})
export class ViewMilestonesComponent implements OnInit {


  BusinessCase: any;
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

  constructor(private projectService: ProjectService, private implementationService: ImplementationService, 
    private route: ActivatedRoute, private router: Router, private procurementService: ProcurementService) {  }

  ngOnInit(): void {
    this.getAllMilestones();

    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();
    this.getProject(ptsRef);
  }


  
  
  

  

  extractDate(ptsRef: string): string {
    const datePart = ptsRef.substring(4, 14); // Extract the date part from the ptsRef
    return datePart;
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

  getAllMilestones(){

    const ptsRef = this.route.snapshot.paramMap.get('ptsRef')!.toString();

    this.projectService.getBusinessCase(ptsRef).subscribe(data =>{
      this.BusinessCase = data
      console.error(this.BusinessCase);
    });

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
}
