import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.css']
})
export class AddPanelComponent implements OnInit, AfterViewInit{
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
        //this.threejsMapComp!.instance.GISControl?.InitGround(true);
    }
    this.threejsMapComp!.changeDetectorRef.detectChanges();
    
    this.threejsMapComp!.instance.ObjectControl!.AddPanel("layerName", //레이어명 입력 
    "ObjectName", //오브젝트 명
    true, //클릭이 가능한 오브젝트로 처리
    new THREE.Vector3(0,0,0), //오브젝트의 위치 (pos)
    new THREE.Vector3(0,0,0), //오브젝트의 방향 (deg)
    279, //가로 크기
    1218, //세로 크기
    'http://39.115.113.230:4660/20211112155945456/20211112155945456.jpg', //'assets/resources/texture/underground.jpg', //텍스쳐 이미지
    0.1, //오브젝트가 보이는 거리 (최소)
    30000 //오브젝트가 보이는 거리 (최대)
   );

  }  
}