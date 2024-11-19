import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-email-verification-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './email-verification-modal.component.html',
  styleUrl: './email-verification-modal.component.scss'
})
export class EmailVerificationModalComponent {
  code: string = '';

  constructor(
    private dialogRef: MatDialogRef<EmailVerificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  verify() {
    this.dialogRef.close(this.code);
  }

  close() {
    this.dialogRef.close();
  }
}
