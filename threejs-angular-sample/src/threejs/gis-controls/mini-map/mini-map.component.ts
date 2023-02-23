import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})

export class MiniMapComponent implements OnInit, AfterViewInit{
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  @ViewChild('minicanvas') miniMapcanvas?: ElementRef;
 
  createMode: boolean = false;
  createObj?: THREE.Object3D;
  
  threejsMapComp!: ComponentRef<ThreejsMapComponent>;
  threejsMiniMapComp!: ComponentRef<ThreejsMapComponent>;
  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {
    this.threejsMapComp = createComponent(ThreejsMapComponent, {
      environmentInjector: this.injector,
    });

    this.threejsMiniMapComp = createComponent(ThreejsMapComponent, {
      environmentInjector: this.injector,
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.mapcanvas?.nativeElement.appendChild(this.threejsMapComp.location.nativeElement);
    this.threejsMapComp.instance.OnInitFinish = () => {
        this.threejsMapComp!.instance.InitMap(this.mapcanvas?.nativeElement, false)
        this.threejsMapComp!.instance.GISControl?.InitGround(true);       
    }
    this.threejsMapComp!.changeDetectorRef.detectChanges();

    this.miniMapcanvas?.nativeElement.appendChild(this.threejsMiniMapComp.location.nativeElement);
    this.threejsMiniMapComp.instance.OnInitFinish = () => {
      this.threejsMiniMapComp!.instance.InitMap(this.miniMapcanvas?.nativeElement, true, true)
      this.threejsMiniMapComp!.instance.GISControl?.InitGround(true);       
    }
    this.threejsMiniMapComp!.changeDetectorRef.detectChanges();
    this.threejsMiniMapComp!.instance.GISControl?.AddPOI('Target', "minimapRobotIcon", true, "assets/resources/texture/POI/b1.png", new THREE.Vector3(0, 0, 0), 4, '', '', '', 1, 200, () => {});
    
    this.threejsMiniMapComp!.instance.ObjectControl!.AddPanel("layerName", //레이어명 입력 
    "ObjectName", //오브젝트 명
    true, //클릭이 가능한 오브젝트로 처리
    new THREE.Vector3(0,0,0), //오브젝트의 위치 (pos)
    new THREE.Vector3(0,0,0), //오브젝트의 방향 (deg)
    279, //가로 크기
    1218, //세로 크기
    'assets/resources/texture/underground.jpg', //'assets/resources/texture/underground.jpg', //텍스쳐 이미지
    0.1, //오브젝트가 보이는 거리 (최소)
    30000 //오브젝트가 보이는 거리 (최대)
   );
  
  }  
}
