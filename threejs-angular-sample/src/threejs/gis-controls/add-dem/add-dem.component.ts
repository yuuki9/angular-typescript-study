import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, ViewChild } from '@angular/core';
import { RestAPI } from 'src/app/Basic/libs/RestAPI';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
interface Layer {
  name: string,
  code: string
}
@Component({
  selector: 'app-add-dem',
  templateUrl: './add-dem.component.html',
  styleUrls: ['./add-dem.component.css']
})
export class AddDEMComponent {
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;   
  worldWidth = 256;
  worldDepth = 256;
  worldHalfWidth = this.worldWidth / 2;
  worldHalfDepth = this.worldDepth / 2;

  Layers: Layer[] = [];
  SelectObjects: Layer[] = [];
  targetObj?: THREE.Object3D;
  threejsMapComp: ComponentRef<ThreejsMapComponent>;

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector, private http: HttpClient){
    this.threejsMapComp = createComponent(ThreejsMapComponent, {
      environmentInjector: this.injector,  
  });
  }

  ngOnInit(): void {
    console.log(this.http);
  }

  ngAfterViewInit(): void {
    
    this.mapcanvas?.nativeElement.appendChild(this.threejsMapComp.location.nativeElement);
    this.threejsMapComp.instance.OnInitFinish = () => {
        this.threejsMapComp!.instance.InitMap(this.mapcanvas?.nativeElement, false)
        //this.threejsMapComp!.instance.GISControl?.InitGround(true);
    }
    this.threejsMapComp!.changeDetectorRef.detectChanges();

    new RestAPI(this.http! , "39.115.113.230", 4660).PostRequest('geotifflib',{file_name:'sejong.tif'},(res:any)=>{
      console.log(res);
      const altitudeData = res.data.altitude;
      const size = res.data.width * res.data.height;
      const array = new Float32Array(size);
      for(let i = 0; i < size; i++)
      {
          array[i] = altitudeData[i]/20;
      }
      this.threejsMapComp!.instance.GISControl!.AddTerain("Terrain","sejong",true,new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,0),18000,18000,res.data.width,res.data.height, array, 'assets/resources/texture/terrain/geoImg.PNG');
      this.threejsMapComp!.instance.CammeraControl!.SetZoomMax(1000000);
      this.threejsMapComp!.instance.CammeraControl!.SetCamPosition(new THREE.Vector3(0,0,400));
      this.threejsMapComp!.instance.CammeraControl!.SetCamViewPosition(new THREE.Vector3(0,0,1000));
    });  

  }          
} 
