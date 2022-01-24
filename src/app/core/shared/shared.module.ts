import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, PipesModule, FormsModule],
  exports: [PipesModule, FormsModule],
})
export class SharedModule {}
