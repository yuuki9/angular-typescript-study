import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-survey-mode',
  templateUrl: './survey-mode.component.html',
  styleUrls: ['./survey-mode.component.css']
})
export class SurveyModeComponent implements OnInit, AfterViewInit{
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
    
      //3D모형로드
      this.threejsMapComp.instance.ObjectControl!.AddPLY("layerName", //레이어명 입력 
      "ObjectName1", //오브젝트 명
      true, //클릭이 가능한 오브젝트로 처리
      new THREE.Vector3(0, 0, 0), //오브젝트의 위치 (pos)
      new THREE.Vector3(0, 0, 0), //오브젝트의 방향 (deg)
      1, //오브젝트 사이즈
      'assets/resources/models/PLY/mesh.ply', //오브젝트 파일 경로
      false, //포인트클라우드 속성이면 True
      0.1, //오브젝트가 보이는 거리 (최소)
      30000 //오브젝트가 보이는 거리 (최대)
    );

    //오브젝트 추가
    this.threejsMapComp.instance.ObjectControl!.Add3DS("layerName", //레이어명 입력 
      "ObjectName2", //오브젝트 명
      true, //클릭이 가능한 오브젝트로 처리
      new THREE.Vector3(0, 1, 0.3), //오브젝트의 위치 (pos)
      new THREE.Vector3(0, 0, 180), //오브젝트의 방향 (deg)
      0.5, //오브젝트 사이즈
      'assets/resources/models/3DS/robot/ROBOT.3ds', //오브젝트 파일 경로
      'assets/resources/models/3DS/robot/robot.jpg', //텍스쳐 파일 경로
      0.1, //오브젝트가 보이는 거리 (최소)
      30000 //오브젝트가 보이는 거리 (최대)
    );

    this.threejsMapComp.instance.GISControl!.SetCalcMultiAreaMode();
  }
}  