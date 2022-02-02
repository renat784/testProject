import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { LoginModule } from 'src/app/pages/login/login.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PipesModule, FormsModule, LoginModule],
  exports: [PipesModule, FormsModule, LoginModule],
})
export class SharedModule {}
