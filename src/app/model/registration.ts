export class Registration {
    constructor() { }
   
    count?:number;
    registration_id?: number;
    system_id: number;
    system_module_id: number;
    system_role_id: number;
    registration_status_id?: number;
    nature_of_appointment_id: number;
    office_id: number;
    directorate_id: number;
    rank_id: number;
    registration_reference_no: string;
    system_name?: string;
    system_module_name?: string;
    system_role_name?: string;
    office_name?: string;
    nature_of_appointment?: string;
    directorate_name?: string;
    rank_name?: string;
    registration_status?: string;
    line_manager: string;
    line_manager_email: string;
    username: string;
    email_address: string;
    telephone_number: string;
    cellphone_number: string;
    first_name: string;
    last_name: string;
    passport_number: string;
    persal_number: string;
    id_number: string;
    office_no: string;
    start_date: Date;
    end_date: Date;
    captured_by?: string;
    captured_date?: Date;
    verified_by?: string;
    verified_date?: Date;
    approved_by?: string;
    approved_date?: Date;
    archived_by?: string;
    archived_date?: Date;
    verified?: string;
    archived?: string;
    approved?: string;

}
