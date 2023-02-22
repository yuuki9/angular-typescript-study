import { AfterViewInit, Component } from '@angular/core';
import {MegaMenuItem, MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent implements AfterViewInit{
  title = 'threejs-sample-page';
  
  items: MegaMenuItem[] = [];
  
  constructor(){   
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'LayerManager'/*, icon: 'pi pi-fw pi-camera'*/, routerLink: ['/layerManager'] },
      {
        label: 'ObjectControl', icon: 'pi pi-fw pi-file',
        items: [ 
          [
            {
                label: 'AddObject',
                items: [
                  {label: 'AddPanel', routerLink: ['/addPanel']}, 
                  {label: 'Add3DS', routerLink: ['/add3DS']},
                  {label: 'AddOBJ', routerLink: 'addOBJ'},
                  {label: 'AddPLY', routerLink: 'addPLY'},
                  {label: 'AddPCD', routerLink: 'addPCD'},
                  {label: 'AddFBX', routerLink: 'addFBX'},
                  {label: 'AddXYZ', routerLink: ['/addXYZ']},
                ]
            },
            {
              label: 'Control',
              items: [
                {label: 'EditObject', routerLink: ['/editObject']}, 
              ]
            },
            {
                label: 'Server',
                items: [
                  {label: 'StreamXYZ', routerLink: 'streamXYZ'}, 
                  {label: 'LoadingXYZ', routerLink: 'loadingXYZ'}, 
                  {label: 'LoadingEPCL', routerLink: 'EPCL'}, 
                ]
            }
          ]
        ]
      },
      {
        label: 'GISControl', icon: 'pi pi-fw pi-globe',
        items: [ 
          [
            {
                label: 'GISObject',
                items: [
                  {label: 'SurveyMode', routerLink: ['/surveyMode']}, 
                  {label: 'AddPOI', routerLink: ['/addPOI']}, 
                  {label: 'AddLine', routerLink: ['/addLine']},
                  {label: 'AddPolygon', routerLink: ['/addPolygon']},
                  {label: 'AddDem', routerLink: ['/addDEM']},
                  {label: 'AddGeofence', routerLink: ['/addGeofence']}
                ]
            },
            {
              label: '2DMap',
              items: [
                {label: 'MiniMap', routerLink: 'miniMap'}, 
              ]
            },
            {
              label: 'GeoMap',
              items: [
                {label: 'InitMap', routerLink: 'initMap'}, 
              ]
            }
          ]
        ]
      },
      { label: 'CamControl', icon: 'pi pi-fw pi-camera', routerLink: ['/camControl'] },
      {
        label: 'OTHER', icon: 'pi pi-fw pi-cog',
        items: [ 
          [
            {
              label: 'Controler',
              items: [
                {label: 'JoystickControl', routerLink: 'joystickControl'}, 
                {label: 'GamepadControl1', routerLink: 'gamepadControl1'},
                {label: 'GamepadControl2', routerLink: 'gamepadControl2'},
              ]
            },
            {
              label: 'Systems',
              items: [
                {label: 'UploadFile', routerLink: ['/uploadFile']}, 
                {label: 'NG2UploadFile', routerLink: ['/n2UploadFile']}, 
                {label: 'AngularSplit', routerLink: ['/angularSplit']}, 
              ]
            },
          ]
        ]
      }
    ]
  }
  
  ngAfterViewInit(): void {

  }
  
}
