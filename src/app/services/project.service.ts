import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ADdetails } from '../model/ad-details.model';
import { ProjectDetails } from '../model/project.model';
import { BusinessCase } from '../model/business.model';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  constructor(private httpclient: HttpClient) { }

  addProject(projectData: any): Observable<any> {
    return this.httpclient.post(`${environment.urlWorxtrack}/project/addProject`, projectData);
  }

  public getProjectsByCurrentUser(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/getProjectsByCurrentUser/${projectManagerEmail}`);
  }
  public getProjectsByCurrentUserArchived(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/getProjectsByCurrentUserArchived/${projectManagerEmail}`);
  }


  public getProjectsByCurrentUserCompleted(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/getProjectsByCurrentUserCompleted/${projectManagerEmail}`);
  }
  
  getProjectsByTechnicalUser(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/technicalLeader/${technicalLeaderEmail}`);
  }

  public getProjectsByTechArchived(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/getProjectsByTechnicalArchived/${technicalLeaderEmail}`);
  }


  public getProjectsByTechCompleted(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/getProjectsByTechnicalCompleted/${technicalLeaderEmail}`);
  }

  public getALLProject(){
    return this.httpclient.get<ProjectDetails>(`${environment.urlWorxtrack}/project/getAllProjectsDetails`);
  }

  public getAllClosedProjects(){
    return this.httpclient.get<ProjectDetails>(`${environment.urlWorxtrack}/project/getAllClosedProjectsDetails`);
  }

  public getAllCompletedProjects(){
    return this.httpclient.get<ProjectDetails>(`${environment.urlWorxtrack}/project/getAllCompletedProjectsDetails`);
  }

  public getProjectById(ptsRef: string) {
    return this.httpclient.get<ProjectDetails>(`${environment.urlWorxtrack}/project/getProjectsDetailsById/${ptsRef}`);
  }

  public addBusinessCase(businessCase: BusinessCase){
    return this.httpclient.post<BusinessCase>(`${environment.urlWorxtrack}/project/addBusinessCase`, businessCase);
  }

  public getFileByBusinessCaseId(fileId: any): Observable<Blob> {
    return this.httpclient.get(`${environment.urlWorxtrack}/project/downloadFile/`+fileId, { responseType: 'blob' });
  }

  public updateProject(ptsRef: string, project: ProjectDetails){
    return this.httpclient.put<any>(`${environment.urlWorxtrack}/project/updateProjectDetails/${ptsRef}`, project);
  }

  getAllBusinessCase(){
    return this.httpclient.get<BusinessCase>(`${environment.urlWorxtrack}/project/getAllBusinessCase`);
  }

  // public getDaysSinceCreation(id: number): Observable<number> {
  //   return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/days-since-creation/${id}`);
  // }

  // public getCalculateDaysBetween(id: number): Observable<number> {
  //   return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/calculate-days-between/${id}`);
  // }

  getProjectDetailsAndBusinessCase(ptsRef: string, userId: String): Observable<Object[]> {
    const url = `${environment.urlWorxtrack}/projects/${ptsRef}/${userId}`;
    return this.httpclient.get<Object[]>(url);
  }


  getProjectsInProcurementInProgress(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/procurement-in-progress/${projectManagerEmail}`);
  }

  getProjectsInImplementationInProgress(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/implementation-in-progress/${projectManagerEmail}`);
  }

  // Project Manager
  
  viewMilestoneProcurement(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/view-procurement/${projectManagerEmail}`);
  }
  viewMilestoneImplementation(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/view-implementation/${projectManagerEmail}`);
  }
  viewMilestoneCompleted(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/view-completed/${projectManagerEmail}`);
  }
  viewMilestoneHold(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/view-hold/${projectManagerEmail}`);
  }
  viewMilestoneCancelled(projectManagerEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/view-cancelled/${projectManagerEmail}`);
  }
// Technical Leader

  viewTechMilestoneProcurement(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/technical/procurement/${technicalLeaderEmail}`);
  }
  viewTechMilestoneImplementation(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/technical/implementation/${technicalLeaderEmail}`);
  }
  viewTechMilestoneCompleted(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/technical/completed/${technicalLeaderEmail}`);
  }
  viewTechMilestoneHold(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/technical/hold/${technicalLeaderEmail}`);
  }
  viewTechMilestoneCancelled(technicalLeaderEmail: String): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/technical/cancelled/${technicalLeaderEmail}`);
  }

// Management

  viewAllMilestoneProcurement(): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/all/procurement-in-progress`);
  }
  viewAllMilestoneImplementation(): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/all/implementation-in-progress`);
  }
  viewAllMilestoneCompleted(): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/all/completed`);
  }
  viewAllMilestoneHold(): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/all/hold`);
  }
  viewAllMilestoneCancelled(): Observable<ProjectDetails[]> {
    return this.httpclient.get<ProjectDetails[]>(`${environment.urlWorxtrack}/project/all/cancelled`);
  }


countTotalProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count`)
}

countWaitingProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count/waiting`)
}

countProcurementProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count/procurement`)
}

countImplementationProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count/implementation`)
}

countCompletedProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count/completed`)
}
countHoldProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count/hold`)
}
countCancelledProjects(): Observable<number> {
  return this.httpclient.get<number>( `${environment.urlWorxtrack}/project/count/cancelled`)
}



countByOwnerAndStatus(username: string, status: string): Observable<number> {
  const url = `${environment.urlWorxtrack}/project/count/owner/${username}/status/${status}`;
  return this.httpclient.get<number>(url);
}

countByTechnicalLeaderAndStatus(email: string, status: string): Observable<number> {
  const url = `${environment.urlWorxtrack}/project/count/technical-leader/${email}/status/${status}`;
  return this.httpclient.get<number>(url);
}

//Project Manager
countAllOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/all/${projectManagerEmail}`);
}
countBusinessOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/businessCase/${projectManagerEmail}`);
}
countProcurementOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/procurement/${projectManagerEmail}`);
}
countImplementationOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/implementation/${projectManagerEmail}`);
}
countCompletedOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/completed/${projectManagerEmail}`);
}
countHoldOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/hold/${projectManagerEmail}`);
}
countCancelledOwner(projectManagerEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/owner/cancelled/${projectManagerEmail}`);
}

//Technical Leader
countAllTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/all/${technicalLeaderEmail}`);
}
countBusinessTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/businessCase/${technicalLeaderEmail}`);
}
countProcurementTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/procurement/${technicalLeaderEmail}`);
}
countImplementationTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/implementation/${technicalLeaderEmail}`);
}
countCompletedTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/completed/${technicalLeaderEmail}`);
}
countHoldTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/hold/${technicalLeaderEmail}`);
}
countCancelledTechnical(technicalLeaderEmail: String): Observable<number> {
  return this.httpclient.get<number>(`${environment.urlWorxtrack}/project/tech/cancelled/${technicalLeaderEmail}`);
}


searchUsersByName(fullName: string): Observable<ADdetails[]> {
  const url = `${environment.urlWorxtrack}/project/search`;
  const params = new HttpParams().set('fullName', fullName);
  return this.httpclient.get<ADdetails[]>(url, { params });
}

searchTechnicalLeader(fullName: string): Observable<ADdetails[]> {
  const url = `${environment.urlWorxtrack}/project/technical`;
  const params = new HttpParams().set('fullName', fullName);
  return this.httpclient.get<ADdetails[]>(url, { params });
}

searchPractitioner(fullName: string): Observable<ADdetails[]> {
  const url = `${environment.urlWorxtrack}/project/practitioner`;
  const params = new HttpParams().set('fullName', fullName);
  return this.httpclient.get<ADdetails[]>(url, { params });
}

searchSupervisor(fullName: string): Observable<ADdetails[]> {
  const url = `${environment.urlWorxtrack}/project/supervisor`;
  const params = new HttpParams().set('fullName', fullName);
  return this.httpclient.get<ADdetails[]>(url, { params });
}

searchADusers(fullName: string): Observable<ADdetails[]> {
  const url = `${environment.urlWorxtrack}/project/viewADUsers`;
  const params = new HttpParams().set('fullName', fullName);
  return this.httpclient.get<ADdetails[]>(url, { params });
}


//Upload documents
public uploadfile(file:File,ptsRef: string,projectTitle: string){
  //  const headers = new HttpHeaders({ "Content-Type": "multipart/form-data" })
    let formParams = new FormData()
    formParams.append('file',file,)
    formParams.append('ptsRef',ptsRef)
    formParams.append('projectTitle',projectTitle)
    return this.httpclient.post(`${environment.urlWorxtrack}/files/upload/${projectTitle}`,formParams)  
  }

  getBusinessCase(ptsRef: String){
    return this.httpclient.get<any>( `${environment.urlWorxtrack}/files/businessCase/${ptsRef}`)
  }

  deleteFile(fileId: string): Observable<any> {
    const url = `${environment.urlWorxtrack}/files/delete/${fileId}`; // Adjust the URL to match your API endpoint
    return this.httpclient.delete(url, { responseType: 'text' });
  }

  getPreviewDocument(fileId: string): Observable<Blob> {
    const url = `${environment.urlWorxtrack}/files/get-document/${fileId}`;
    const headers = new HttpHeaders({
      Accept: 'application/octet-stream',
    });

    return this.httpclient.get(url, {
      responseType: 'blob',
      headers: headers,
    });
  }


}
