import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, 
  MatExpansionModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class AngularMaterialsModule { }
