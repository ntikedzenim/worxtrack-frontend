import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ADdetails } from 'src/app/model/ad-details.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  
  fullName!: string;
  adDetails: ADdetails[] = [];

  // @Input() adDetails: any[] = [];
  @Output() userSelected = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  linkAdDetails(user: any): void {
    this.userSelected.emit(user);
    this.dialogRef.close(); // Close the dialog
  }

  searchUsersByName(fullName: string) {
    this.projectService.searchUsersByName(fullName).subscribe({
      next: (response: ADdetails[]) => {
        this.adDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error occurred while searching users by name:', error);
      }
    });
  }


}

