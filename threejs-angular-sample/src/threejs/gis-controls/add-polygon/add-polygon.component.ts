import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-add-polygon',
  templateUrl: './add-polygon.component.html',
  styleUrls: ['./add-polygon.component.css']
})
export class AddPolygonComponent implements OnInit, AfterViewInit{
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
          //this.threejsMapComp!.instance.GISControl?.InitGround(true);
          this.threejsMapComp!.changeDetectorRef.detectChanges();
      }
      this.threejsMapComp!.changeDetectorRef.detectChanges();
      
    }
    
    
}
