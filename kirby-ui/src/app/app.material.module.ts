import { NgModule } from '@angular/core';
import { MatTooltipModule, MatChipsModule, MatMenuModule, MatTreeModule, MatNativeDateModule, MatSnackBarModule, MatIconModule, MatDialogModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule, MatCheckboxModule, MatToolbarModule, MatCard, MatCardModule, MatFormField, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatListModule, MatBadgeModule, MatGridListModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS} from '@angular/material/bottom-sheet/';
import { ActivityFileComponent } from './pages/Assignment/activity-file/activity-file.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({ 
    providers: [
        { provide: MatBottomSheetRef, useValue: {}},
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {}}
    ],
    imports: [DragDropModule, MatTooltipModule, OverlayModule, MatBottomSheetModule, MatChipsModule, MatMenuModule, MatTreeModule, FlexLayoutModule, MatTabsModule, MatDividerModule, MatSliderModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule, MatSortModule, MatTableModule, MatTabsModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatPaginatorModule, MatListModule, MatBadgeModule, MatGridListModule],
    exports: [DragDropModule, MatTooltipModule, OverlayModule, MatBottomSheetModule, MatChipsModule, MatMenuModule, MatTreeModule, FlexLayoutModule, MatTabsModule, MatDividerModule, MatSliderModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTableModule, MatTabsModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatPaginatorModule, MatListModule, MatBadgeModule, MatGridListModule],
    entryComponents: [ActivityFileComponent]
})

export class CustomMaterialModule { }
