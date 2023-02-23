import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-addobj',
  templateUrl: './add-obj.component.html',
  styleUrls: ['./add-obj.component.css']
})
export class AddobjComponent implements OnInit, AfterViewInit{
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  createMode: boolean = false;
  createObj?: THREE.Object3D;
  
  threejsMapComp!: ComponentRef<ThreejsMapComponent>;

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {
    this.threejsMapComp = createComponent(ThreejsMapComponent, {
      environmentInjector: this.injector,
    });
  }
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
    }
    this.threejsMapComp!.changeDetectorRef.detectChanges();
    
    this.threejsMapComp!.instance.ObjectControl!.AddOBJ( "layerName", //레이어명 입력 
                                          "ObjectName", //오브젝트 명
                                          true, //클릭이 가능한 오브젝트로 처리
                                          new THREE.Vector3(0,20,0), //오브젝트의 위치 (pos)
                                          new THREE.Vector3(90,0,0), //오브젝트의 방향 (deg)
                                          1, //오브젝트 사이즈
                                          'assets/resources/models/OBJ/building.obj', //오브젝트 파일 경로
                                          'assets/resources/models/OBJ/building.png', //텍스쳐 파일 경로
                                          0.1, //오브젝트가 보이는 거리 (최소)
                                          30000 //오브젝트가 보이는 거리 (최대)
                                        );
  }
}
