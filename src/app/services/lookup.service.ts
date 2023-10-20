import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Lookup } from '../model/lookup';

@Injectable({ providedIn: 'root' })
export class LookupService {
    constructor(private http: HttpClient) { }

    listRoles() {
        return this.http.get<Lookup[]>(`${environment.urlLeave}/lookup/roles`);
    }
    status() {
        return this.http.get<Lookup[]>(`${environment.urlFleet}/lookup/status`)
    }

    listLeaveTypes() {
        return this.http.get<Lookup[]>(`${environment.urlLeave}/lookup/leave-type`);
    }

    listOffices() {
        return this.http.get<Lookup[]>(`${environment.urlFleet}/lookup/offices`);
    }

    listUnits() {
        return this.http.get<Lookup[]>(`${environment.urlFleet}/lookup/units`);
    }

    listRanks() {
        return this.http.get<Lookup[]>(`${environment.urlFleet}/lookup/ranks`);
    }

    listBranches() {
        return this.http.get<Lookup[]>(`${environment.urlFleet}/lookup/branches`);
    }

    listLeaveSubCategory() {
        return this.http.get<Lookup[]>(`${environment.urlLeave}/lookup/leave-category/`);
    }
    listSub(leave_category_code:any) {
        return this.http.get<any>(`${environment.urlLeave}/lookup/leave-category/${leave_category_code}`);
    }


    listUnionAffiliation() {
        return this.http.get<Lookup[]>(`${environment.urlLeave}/lookup/union-affiliation`);
    }


    getRoles() {
        return this.http.get<Lookup[]>(`${environment.urlLeave}/lookup/role-list`);
    }

}