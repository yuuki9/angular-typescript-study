import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-add-xyz',
  templateUrl: './add-xyz.component.html',
  styleUrls: ['./add-xyz.component.css']
})
export class AddXYZComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('mapcanvas') mapcanvas?: ElementRef;
  //UI변수
  threejsMapComp: ComponentRef<ThreejsMapComponent>;
  
  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector){
    this.threejsMapComp = createComponent(ThreejsMapComponent, {
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
    //오브젝트 추가
    this.threejsMapComp!.instance.ObjectControl!.AddXYZ( "layerName", //레이어명 입력 
    "ObjectName", //오브젝트 명
    true, //클릭이 가능한 오브젝트로 처리
    new THREE.Vector3(0,0,0), //오브젝트의 위치 (pos)
    new THREE.Vector3(0,0,0), //오브젝트의 방향 (deg)
    0.05, //포인트 사이즈
    'assets/resources/models/XYZ/VILLA_DONDI.xyz', //오브젝트 파일 경로
    );

  }
          
  ngOnDestroy(): void {
      
  }
}



