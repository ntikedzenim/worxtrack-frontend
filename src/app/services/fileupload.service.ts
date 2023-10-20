import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Attachment } from '../model/attachment';
import { FleetAttachment } from '../model/FleetAttachment';
import { ClaimAttachment } from '../model/ClaimAttachment';


@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    httpHeaders: HttpHeaders | { [header: string]: string | string[]; };

    constructor(private http: HttpClient, private messageService: MessageService,) { }

    upload(file: File, persal_number: number): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${environment.urlLeave}/leave-upload/upload/${persal_number}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
    attachments(file: File, persal_number: number): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${environment.urlClaims}/attachments/saveAttachment/${persal_number}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    getFilesByRefNo(leave_reference_no: string): Observable<any> {
        const url = `${environment.urlLeave}/leave-upload/files-by-refno/${leave_reference_no}`;
        return this.http.get(url).pipe(
            tap(_ => this.log(`fetched user leave_reference_no=${leave_reference_no}`)),
            catchError(this.handleError<any>(`getFilesByRefNo leave_reference_no=${leave_reference_no}`))
        );
    }
    downloadFile(leave_reference_no: string) {
        return this.http.get<Blob>(`${environment.urlLeave}/leave-upload/download/${leave_reference_no}`,
            { observe: 'response', responseType: 'blob' as 'json' })
    }
    /** GET Employee by Name */
    getFilesByPersalNo(persal_number: number): Observable<Attachment> {
        return this.http.get<Attachment>
            (`${environment.urlLeave}/leave-upload/files/${persal_number}`);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // upload signature
    signUpload(file: File, persal_number: number): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file); 
        
        const req = new HttpRequest('POST', `${environment.urlFleet}/sign/upload/${persal_number}`, formData, {
            reportProgress: true,            
            responseType: 'json'
        })
          return this.http.request(req);
      }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fleetUpload(file: File, persal_number: number): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);      
        
        const req = new HttpRequest('POST', `${environment.urlFleet}/fleet/upload/${persal_number}`, formData, {
            reportProgress: true,            
            responseType: 'json'
        

        });
        return this.http.request(req);
    }
    
    getFleetFilesByPersalNo(persal_number: number): Observable<FleetAttachment> {
        return this.http.get<FleetAttachment>
            (`${environment.urlFleet}/fleet/files/${persal_number}`);
    }
    getFleetFilesByRefNo(trip_ref_no: string): Observable<any> {
        const url = `${environment.urlFleet}/fleet/files-by-refno/${trip_ref_no}`;
        return this.http.get(url).pipe(
            tap(_ => this.log(`fetched user trip_ref_no=${trip_ref_no}`)),
            catchError(this.handleError<any>(`getFleetFilesByRefNo trip_ref_no=${trip_ref_no}`))
        );
    }
    ///SNT Claim Upload//

    uploadMemo(persal_number: number): Observable<ClaimAttachment> {
        return this.http.get<ClaimAttachment>
            (`${environment.urlClaims}/snt/files/${persal_number}`);
    }
    uploadfile(persal_number: number): Observable<ClaimAttachment> {
        return this.http.get<ClaimAttachment>
            (`${environment.urlClaims}/snt/files/${persal_number}`);
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
    
    uploadActingLetter(file: File, persal_number: number): Observable<HttpEvent<any>> {

        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', `${environment.urlLeave}/leave-upload/upload-acting-letter/${persal_number}`, formData, {

            reportProgress: true,

            responseType: 'json'

        });

        return this.http.request(req);

    }
    

}