import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Administration } from '../model/administration';

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


@Injectable({ providedIn: 'root' })
export class AdministrationService {

    constructor(private http: HttpClient, private messageService: MessageService) { }
    /** Search Employee by Name */
    searchEmployeeByName(username: string): Observable<Administration> {
        const url = `${environment.urlUserManagement}/administration/search-persal-name/${username}`;
        return this.http.get<Administration>(url).pipe(
            tap(_ => this.log(`fetched employee username=${username}`)),
            catchError(this.handleError<Administration>(`searchEmployeeByName username=${username}`))
        );
    }
    searchPersalEmployeeByName(searchTerm) {
        var users = this.http.get(`${environment.urlUserManagement}/administration/search-employee-name/${searchTerm}`)
            .pipe(map(
                (data: any) => {
                    return (
                        data.length != 0 ? data as Administration[] : [{ "employee": "No Record Found" } as unknown as Administration]
                    );
                },
                catchError(this.handleError<Administration[]>('searchPersalEmployeeByName', []))
            ));
        return users;
    }

    /** GET Employee by Name */
    findEmployeeByName(username: string): Observable<Administration> {
        const url = `${environment.urlUserManagement}/administration/find-persal-name/${username}`;
        return this.http.get<Administration>(url).pipe(
            tap(_ => this.log(`fetched user username=${username}`)),
            catchError(this.handleError<Administration>(`findEmployeeByName username=${username}`))
        );
    }


    findPersalEmployeeByName(persal_number: number): Observable<Administration> {
        const url = `${environment.urlUserManagement}/administration/find-employee-name/${persal_number}`;
        return this.http.get<Administration>(url).pipe(
            tap(_ => this.log(`fetched user persal_number=${persal_number}`)),
            catchError(this.handleError<Administration>(`findPersalEmployeeByName persal_number=${persal_number}`))
        );
    }
    /** Search User by Name */
    searchPrimaryUser(searchTerm: string): Observable<Administration> {
        const url = `${environment.urlUserManagement}/administration/search-AD-username/${searchTerm}`;
        return this.http.get<Administration>(url).pipe(
            tap(_ => this.log(`fetched user searchTerm=${searchTerm}`)),
            catchError(this.handleError<Administration>(`searchEmployeeByName first_names=${searchTerm}`))
        );
    }
    /** GET user by displayName */
    findADPrimaryByName(primary_name: string): Observable<Administration> {
        const url = `${environment.urlUserManagement}/administration/find-AD-username/${primary_name}`;
        return this.http.get<Administration>(url).pipe(
            tap(_ => this.log(`fetched user primary_name=${primary_name}`)),
            catchError(this.handleError<Administration>(`findADPrimaryByName primary_name=${primary_name}`))
        );
    }
    /** POST: Link an existing employee to active directory */
    updateUserProfile(role_id: number, persal_number: string, persal_current_user: number, employee: Administration): Observable<Administration> {
        return this.http.post<Administration>(`${environment.urlUserManagement}/administration/update-user-profile/${role_id}/${persal_number}/${persal_current_user}`, employee);
    }
    updateADPersalLink(employee_id: number, username: string, email: string, telNo: string, employee: Administration): Observable<Administration> {
        return this.http.post<Administration>(`${environment.urlUserManagement}/administration/link-user-employee/${employee_id}/${username}/${email}/${telNo}`, employee);
    }
    createADPersalLink(primary_name: string, primary_email: string, tel_no: string, persal_number: number, employee: Administration): Observable<Administration> {
        return this.http.post<Administration>(`${environment.urlUserManagement}/administration/create-user-profile/${primary_name}/${primary_email}/${tel_no}/${persal_number}`, employee);
    }
    listRoles() {
        return this.http.get<Administration[]>(`${environment.urlUserManagement}/administration/roles`);
    }

    /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console insteadng 
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    /** Log a UserService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`EmployeeService: ${message}`);
    }

    updateSupervisor(persalCurrentUser: string, persalNumberManager: string): Observable<any> {
        const url = `${environment.urlUserManagement}/administration/update-supervisor/${persalCurrentUser}/${persalNumberManager}`;
        return this.http.post(url, {});
      }

    updateRecomender(persalCurrentUser: string, persalNumberRecomender: string): Observable<any> {
    const url = `${environment.urlUserManagement}/administration/update-supervisor-recomender/${persalCurrentUser}/${persalNumberRecomender}`;
    return this.http.post(url, {});
    }

      findSupervisorByPostLevel(
        post_salary_level: number,
        username: string
      ): Observable<Supervisor[]> {
        const url = `${environment.urlUserManagement}/administration/search-supervisor-name/${post_salary_level}/${username}`;
        return this.http.get<Supervisor[]>(url).pipe(
          tap((_) => console.log(`fetched supervisors for post level: ${post_salary_level}`)),
          catchError(this.handleError<Supervisor[]>(`findSupervisorByPostLevel post_salary_level=${post_salary_level}`)),
          map((response) => {
            return response.map((item) => {
              return {
                component_code: item.component_code,
                email_address: item.email_address,
                full_names: item.full_names.trim(),
                objective_code: item.objective_code,
                organisation_code: item.organisation_code,
                paypoint_code: item.paypoint_code,
                persal_number: item.persal_number,
                post_salary_level_code: item.post_salary_level_code,
                region_code: item.region_code,
                responsibility_code: item.responsibility_code,
                sub_component_code: item.sub_component_code,
                surname: item.surname.trim(),
                system_approver: item.system_approver, // You can set a static value here or modify as per your requirement
                system_recommender: item.system_recommender,
              };
            });
          })
        );
      }
    

      updateActingCapacity(
        persal_number: number,
        persal_current_user: number,
        post_salary_level_code: number,
        start_date: Date,
        end_date: Date
      ): Observable<any> {
        const url = `${environment.urlUserManagement}/administration/acting-capacity-update/${persal_number}/${persal_current_user}/${post_salary_level_code}/${start_date}/${end_date}`;
        return this.http.post(url, {});
      }

}