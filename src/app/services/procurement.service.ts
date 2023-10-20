import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProcurementDetails } from '../model/procurement.model';
import { AwardLetter } from '../model/award-letter.model';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {
  getProjectsInImplementationInProgress(username: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient: HttpClient) { }


  public addSCMPractitioner(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addSCMPractitioner`, procurement);
  }
  public addBSCFormation(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBSCFormation`, procurement);
  }
  public addBSCMeeting(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBSCMeeting`, procurement);
  }
  public addToREndorsed(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addToREndorsed`, procurement);
  }
  public addProcurementStrategy(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addProcurementStrategy`, procurement);
  }
  public addBudgetConfirmation(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBudgetConfirmation`, procurement);
  }
  public addSubmittedNBAC(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addSubmittedNBAC`, procurement);
  }
  public addFeedbackNBAC(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addFeedbackNBAC`, procurement);
  }
  public addBSCMeetingCorrections(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBSCMeetingCorrections`, procurement);
  }
  public addReconfirmationOfBudget(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addReconfirmationOfBudget`, procurement);
  }

  public addResubmittedNBAC(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addResubmittedNBAC`, procurement);
  }
  public getResubmittedNBAC(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/getResubmittedNBAC/`+ ptsRef);
  }

  public addApprovedNBAC(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addApprovedNBAC`, procurement);
  }
  public addTenderAdvertised(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addTenderAdvertised`, procurement);
  }
  public addBriefingSession(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBriefingSession`, procurement);
  }
  public addTenderClosure(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addTenderClosure`, procurement);
  }
  public addBECFormation(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBECFormation`, procurement);
  }
  public addBECMeeting(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBECMeeting`, procurement);
  }
  public addSubmitRecommendationNBAC(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addSubmitRecommendationNBAC`, procurement);
  }
  public addNBACFeedbackRecommendation(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addNBACFeedbackRecommendation`, procurement);
  }
  public addBECMeetingCorrections(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addBECMeetingCorrections`, procurement);
  }
  public addResubmittedNBAC2(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addResubmittedNBAC2`, procurement);
  }
  public addApprovedNBAC2(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addApprovedNBAC2`, procurement);
  }
  public addLegalServices(procurement: ProcurementDetails){
    return this.httpclient.post<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/addLegalServices`, procurement);
  }
  public addAward(award: AwardLetter){
    return this.httpclient.post<AwardLetter>(`${environment.urlWorxtrack}/procurement/addAwardLetter`, award);
  }

  
  getAllAwardLetter(){
    return this.httpclient.get<AwardLetter>(`${environment.urlWorxtrack}/procurement/getAllAwardLetter`);
  }
  
  // Get Methods

  public scmPractitioners(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/scmPractitioners/`+ ptsRef);
  }
  public bscFormations(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/bscFormations/`+ ptsRef);
  }
  public bscMeetings(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/bscMeetings/`+ ptsRef);
  }
  public toREndorseds(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/toREndorseds/`+ ptsRef);
  }
  public procurementStrategies(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/procurementStrategies/`+ ptsRef);
  }
  public budgetConfirmations(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/budgetConfirmations/`+ ptsRef);
  }
  public submittedNBACS(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/submittedNBACS/`+ ptsRef);
  }
  public feedbackNBACS(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/feedbackNBACS/`+ ptsRef);
  }
  public bscMeetingCorrections(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/bscMeetingCorrections/`+ ptsRef);
  }
  public reconfirmationOfBudgets(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/reconfirmationOfBudgets/`+ ptsRef);
  }
  public resubmittedNBACS(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/resubmittedNBACS/`+ ptsRef);
  }
  public approvedNBACS(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/approvedNBACS/`+ ptsRef);
  }
  public tenderAdvertiseds(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/tenderAdvertiseds/`+ ptsRef);
  }
  public briefingSessions(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/briefingSessions/`+ ptsRef);
  }
  public tenderClosures(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/tenderClosures/`+ ptsRef);
  }
  public becFormations(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/becFormations/`+ ptsRef);
  }
  public becMeetings(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/becMeetings/`+ ptsRef);
  }
  public submitRecommendationNBACS(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/submitRecommendationNBACS/`+ ptsRef);
  }
  public nbacFeedbackRecommendations(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/nbacFeedbackRecommendations/`+ ptsRef);
  }
  public becMeetingCorrections(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/becMeetingCorrections/`+ ptsRef);
  }  
  public resubmittedNBAC2s(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/resubmittedNBAC2s/`+ ptsRef);
  }  
  public approvedNBAC2s(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/approvedNBAC2s/`+ ptsRef);
  }
  public legalServices(ptsRef: string) {
    return this.httpclient.get<ProcurementDetails>(`${environment.urlWorxtrack}/procurement/legalServices/`+ ptsRef);
  }
  public awardLetters(ptsRef: string) {
    return this.httpclient.get<AwardLetter>(`${environment.urlWorxtrack}/procurement/awardLetters/`+ ptsRef);
  }
}
