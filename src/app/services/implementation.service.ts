import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImplementationDetails } from '../model/implemetation.model';
import { CloseOut } from '../model/close-out.model';

@Injectable({
  providedIn: 'root'
})
export class ImplementationService {

  constructor(private httpclient: HttpClient) { }



  public addAwardedProjectValue(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addAwardedProjectValue`, implementation);
  }
  public addExpenditure(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addExpenditure`, implementation);
  }
  public addAppointedServiceProvider(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addAppointedServiceProvider`, implementation);
  }
  public addKickOffMeeting(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addKickOffMeeting`, implementation);
  }
  public addPurchaseOrder(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addPurchaseOrder`, implementation);
  }
  public addProjectCharter(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addProjectCharter`, implementation);
  }
  public addServiceLevelAgreement(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addServiceLevelAgreement`, implementation);
  }
  public addInformationGathering(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addInformationGathering`, implementation);
  }
  public addArchitecturalDesign(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addArchitecturalDesign`, implementation);
  }
  public addSoftwareDelivered(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addSoftwareDelivered`, implementation);
  }
  public addHardwareDelivered(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addHardwareDelivered`, implementation);
  }
  public addInstallationAndConfiguration(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addInstallationAndConfiguration`, implementation);
  }
  public addSystemDevelopmentEnhancement(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addSystemDevelopmentEnhancement`, implementation);
  }
  public addSolutionTesting(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addSolutionTesting`, implementation);
  }
  public addProgressToDate(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addProgressToDate`, implementation);
  }
  public addChallenges(implementation: ImplementationDetails){
    return this.httpclient.post<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/addChallenges`, implementation);
  }
  public addCloseOut(closeOut: CloseOut){
    return this.httpclient.post<CloseOut>(`${environment.urlWorxtrack}/implementation/addCloseOut`, closeOut);
  }

// Get Methods

  public awardedProjectValue(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/awardedProjectValue/`+ ptsRef);
  }
  public expenditure(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/expenditure/`+ ptsRef);
  }
  public appointedServiceProvider(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/appointedServiceProvider/`+ ptsRef);
  }
  public kickOffMeeting(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/kickOffMeeting/`+ ptsRef);
  }
  public purchaseOrders(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/purchaseOrders/`+ ptsRef);
  }
  public projectCharters(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/projectCharters/`+ ptsRef);
  }
  public serviceLevelAgreements(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/serviceLevelAgreements/`+ ptsRef);
  }
  public informationGatherings(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/informationGatherings/`+ ptsRef);
  }
  public architecturalDesigns(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/architecturalDesigns/`+ ptsRef);
  }
  public softwareDeliveries(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/softwareDeliveries/`+ ptsRef);
  }
  public hardwareDeliveries(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/hardwareDeliveries/`+ ptsRef);
  }
  public installationAndConfigurations(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/installationAndConfigurations/`+ ptsRef);
  }
  public systemDevelopmentEnhancements(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/systemDevelopmentEnhancements/`+ ptsRef);
  }
  public solutionTestings(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/solutionTestings/`+ ptsRef);
  }
  public progressToDates(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/progressToDates/`+ ptsRef);
  }
  public challenges(ptsRef: string) {
    return this.httpclient.get<ImplementationDetails>(`${environment.urlWorxtrack}/implementation/challenges/`+ ptsRef);
  }
  public closeOutHandOverReports(ptsRef: string) {
    return this.httpclient.get<CloseOut>(`${environment.urlWorxtrack}/implementation/closeOutHandOverReports/`+ ptsRef);
  }
}
