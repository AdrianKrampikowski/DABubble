import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAddPeopleComponent } from '../dialog-add-people/dialog-add-people.component';
import { ChannelService } from '../services/channel.service';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-dialog-members',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dialog-members.component.html',
  styleUrl: './dialog-members.component.scss'
})
export class DialogMembersComponent implements OnInit {
  allUsers: any[] = [];

  constructor(private dialogRef: MatDialogRef<DialogMembersComponent>, public dialog: MatDialog, public channelService: ChannelService, public firestoreService: FirestoreService) {}

  closeDialogMember(): void {
    this.dialogRef.close();
  }

  openAddPeopleDialog() {
    this.dialog.open(DialogAddPeopleComponent);
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.firestoreService.getAllUsers().then(users => {
      this.allUsers = users;
      console.log(users)
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }
}
