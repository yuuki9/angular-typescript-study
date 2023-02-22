import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//primeNG
import {MegaMenuModule} from 'primeng/megamenu';
import {ButtonModule} from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreejsMapComponent } from './Basic/threejs-map.component';
import { CameraControlsComponent } from 'src/threejs/camera-controls/camera-controls.component';
import { LayerManagerComponent } from 'src/threejs/layer-manager/layer-manager.component';
import { HomeComponent } from './home/home.component';
import { AddPOIComponent } from 'src/threejs/gis-controls/add-poi/add-poi.component';
import { AddLineComponent } from 'src/threejs/gis-controls/add-line/add-line.component';
import { AddPolygonComponent } from 'src/threejs/gis-controls/add-polygon/add-polygon.component';
import { Add3dsComponent } from 'src/threejs/object-controls/add-3ds/add-3ds.component';
import { EditObjectComponent } from 'src/threejs/object-controls/edit-object/edit-object.component';
import { AddobjComponent } from 'src/threejs/object-controls/add-obj/add-obj.component';
import { AddpcdComponent } from 'src/threejs/object-controls/add-pcd/add-pcd.component';
import { AddplyComponent } from 'src/threejs/object-controls/add-ply/add-ply.component';
import { AddDEMComponent } from 'src/threejs/gis-controls/add-dem/add-dem.component';
import { HttpClientModule } from '@angular/common/http';
import { AddXYZComponent } from 'src/threejs/object-controls/add-xyz/add-xyz.component';
import { StreamXYZComponent } from 'src/threejs/object-controls/stream-xyz/stream-xyz.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraControlsComponent,
    LayerManagerComponent,
    ThreejsMapComponent,
    HomeComponent,
    AddPOIComponent,
    AddPolygonComponent,
    AddLineComponent,
    Add3dsComponent,
    AddobjComponent,
    AddpcdComponent,
    EditObjectComponent,
    AddplyComponent,
    AddDEMComponent,
    AddXYZComponent,
    StreamXYZComponent

  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    //PrimeNG
    MegaMenuModule,
    ButtonModule,
    CheckboxModule,
    ToggleButtonModule,
    DropdownModule,
    ListboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
