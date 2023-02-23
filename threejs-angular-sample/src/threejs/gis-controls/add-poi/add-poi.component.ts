import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-add-poi',
  templateUrl: './add-poi.component.html',
  styleUrls: ['./add-poi.component.css']
})
export class AddPOIComponent implements OnInit, AfterViewInit{
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  createMode: boolean = false;
  createObj?: THREE.Object3D;
  
  threejsMapComp!: ComponentRef<ThreejsMapComponent>;

constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector){}
    
    ngOnInit(): void {
      
    }

    ngAfterViewInit(): void {

      this.threejsMapComp = createComponent(ThreejsMapComponent, {
          environmentInjector: this.injector,
      });
      this.mapcanvas?.nativeElement.appendChild(this.threejsMapComp.location.nativeElement);
      this.threejsMapComp.instance.OnInitFinish = () => {
          this.threejsMapComp!.instance.InitMap(this.mapcanvas?.nativeElement, false)
          this.threejsMapComp!.instance.GISControl?.InitGround(true);
          this.threejsMapComp!.changeDetectorRef.detectChanges();
      }
      this.threejsMapComp!.changeDetectorRef.detectChanges();

      this.threejsMapComp!.instance.ClickObjectEvent.subscribe(val => {
        //AddOn이 되고 바닥이 클릭된 경우
        if (this.createMode) {
          this.threejsMapComp!.instance.GISControl!.AddPOI('POILayer',
            'ObjectName' + val.point.x,
            true,
            'assets/resources/texture/POI/b3.png',
            new THREE.Vector3(val.point.x, val.point.y, val.point.z + 0.2),
            0.05,
            "POI 003",
            "Data",
            { name: "구로커피집", pos: new THREE.Vector3(127.6767, 37.3232, 0) },
            0.1,
            500
          );
        }
      });
    }    
}
