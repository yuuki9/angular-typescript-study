import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraControlsComponent } from 'src/threejs/camera-controls/camera-controls.component';
import { AddDEMComponent } from 'src/threejs/gis-controls/add-dem/add-dem.component';
import { AddGeofenceComponent } from 'src/threejs/gis-controls/add-geofence/add-geofence.component';
import { AddLineComponent } from 'src/threejs/gis-controls/add-line/add-line.component';
import { AddPOIComponent } from 'src/threejs/gis-controls/add-poi/add-poi.component';
import { AddPolygonComponent } from 'src/threejs/gis-controls/add-polygon/add-polygon.component';
import { MiniMapComponent } from 'src/threejs/gis-controls/mini-map/mini-map.component';
import { SurveyModeComponent } from 'src/threejs/gis-controls/survey-mode/survey-mode.component';
import { LayerManagerComponent } from 'src/threejs/layer-manager/layer-manager.component';
import { Add3dsComponent } from 'src/threejs/object-controls/add-3ds/add-3ds.component';
import { AddFbxComponent } from 'src/threejs/object-controls/add-fbx/add-fbx.component';
import { AddobjComponent } from 'src/threejs/object-controls/add-obj/add-obj.component';
import { AddPanelComponent } from 'src/threejs/object-controls/add-panel/add-panel.component';
import { AddpcdComponent } from 'src/threejs/object-controls/add-pcd/add-pcd.component';
import { AddplyComponent } from 'src/threejs/object-controls/add-ply/add-ply.component';
import { AddXYZComponent } from 'src/threejs/object-controls/add-xyz/add-xyz.component';
import { EditObjectComponent } from 'src/threejs/object-controls/edit-object/edit-object.component';
import { LoadingXYZComponent } from 'src/threejs/object-controls/loading-xyz/loading-xyz.component';
import { StreamXYZComponent } from 'src/threejs/object-controls/stream-xyz/stream-xyz.component';
import { AppComponent } from './app.component';
import { ThreejsMapComponent } from './Basic/threejs-map.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  //LayerManager
  { path: 'layerManager', component: LayerManagerComponent },

  //ObjectControls
    { path: 'addPanel', component: AddPanelComponent },
    { path: 'add3DS', component: Add3dsComponent },
    { path: 'addOBJ', component: AddobjComponent },
    { path: 'addPLY', component: AddplyComponent },
    { path: 'addPCD', component: AddpcdComponent },
    { path: 'addFBX', component: AddFbxComponent },
    { path: 'addXYZ', component: AddXYZComponent },
    { path: 'streamXYZ', component: StreamXYZComponent },
    { path: 'loadingXYZ', component: LoadingXYZComponent },
    { path: 'editObject', component: EditObjectComponent },

  //GISControls
    { path: 'surveyMode', component: SurveyModeComponent },
    { path: 'addPOI', component: AddPOIComponent },
    { path: 'addLine', component: AddLineComponent },
    { path: 'addPolygon', component: AddPolygonComponent },
    { path: 'addDEM', component: AddDEMComponent },
    { path: 'miniMap', component: MiniMapComponent },
    { path: 'addGeofence', component: AddGeofenceComponent },

  //CameraControls
  { path: 'camControl', component: CameraControlsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
