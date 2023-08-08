import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map.component';

const appComponents = [MapComponent];
const ngModules = [CommonModule, HttpClientModule];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngModules],
  exports: [...appComponents],
})
export class MapModule {}
