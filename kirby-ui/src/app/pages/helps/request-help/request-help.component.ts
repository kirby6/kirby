import { HelpsService } from 'src/app/services/helps';
import { Help } from 'src/app/services/helps/interfaces';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
    selector: 'request-help',
    templateUrl: './request-help.component.html',
})
export class RequestHelpComponent implements OnInit {
    public help: Help;
    @Input()
    public context: object;

    constructor(
        public dialog: MatDialog,
        private helpsService: HelpsService,
        private auth: AuthenticationService,
    ) { }

    ngOnInit() {
        this.help = {
            context: this.context,
            sender_id: this.auth.currentUserValue.id,
            message: null,
            receiving_group_id: '5c84e1b1939fd59194f9a3b9'
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(RequestHelpDialogComponent, {
            width: '50%',
            data: { message: this.help.message },
            panelClass: 'help-dialog',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.help.message = result;
            this.helpsService.create(this.help).subscribe();
        });
    }
}

@Component({
    templateUrl: 'request-help-dialog.component.html',
    styleUrls: ['request-help-dialog.component.scss'],
})
export class RequestHelpDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<RequestHelpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
