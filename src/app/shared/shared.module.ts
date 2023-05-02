import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...AngularMaterialModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...AngularMaterialModule
  ]
})
export class SharedModule { }
