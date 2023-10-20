export class Lookup {
    region_description: string;
    region_code: number;
    branch_code: number;
    branch_description: string;
    rank_code: number;
    rank_description: string;
    unit_code: number;
    unit_description: string;

    rank_name: string;
    rank_id: number;
    role_name: string;
    role_id: number;
    profile_name: string;
    profile_id: number;
    checked?: boolean;
    department?: string;
    leave_category_id?: number;
    leave_category_code?:number;
    leave_category_description?: string;
    leave_sub_category_id?: number;
    sub_category_code?: number;
    leave_sub_category_description?: string;
    union_affiliation_id?: number;
    union_affiliation_description?: string;

}