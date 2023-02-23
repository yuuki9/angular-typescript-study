import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
interface Layer {
  name: string,
  code: string
}
@Component({
  selector: 'app-add-fbx',
  templateUrl: './add-fbx.component.html',
  styleUrls: ['./add-fbx.component.css']
})
export class AddFbxComponent implements OnInit, AfterViewInit {
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  //UI변수
  Layers: Layer[] = [];
  SelectObjects: Layer[] = [];
  targetObj?: THREE.Object3D;
  threejsMapComp: ComponentRef<ThreejsMapComponent>;
  createObj?: THREE.Object3D;
  createMode: boolean = false;

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {
    this.threejsMapComp = createComponent(ThreejsMapComponent, {
      environmentInjector: this.injector,
    });
  }
  ngOnInit(): void {

  };

  ngAfterViewInit(): void {

    this.mapcanvas?.nativeElement.appendChild(this.threejsMapComp.location.nativeElement);
    this.threejsMapComp.instance.OnInitFinish = () => {
      this.threejsMapComp!.instance.InitMap(this.mapcanvas?.nativeElement, false)
      this.threejsMapComp!.instance.GISControl?.InitGround(true);
    }
    this.threejsMapComp!.changeDetectorRef.detectChanges();

    this.threejsMapComp!.instance.ObjectControl!.AddFBX( "layerName", //레이어명 입력 
    "ObjectName1", //오브젝트 명
    true, //클릭이 가능한 오브젝트로 처리
    new THREE.Vector3(0,20,0), //오브젝트의 위치 (pos)
    new THREE.Vector3(90,0,0), //오브젝트의 방향 (deg)
    1, //오브젝트 사이즈
    'assets/resources/models/FBX/abandoned-building/source/Budova01.fbx', //오브젝트 파일 경로
    '', //텍스쳐 파일 경로
    0.1, //오브젝트가 보이는 거리 (최소)
    30000 //오브젝트가 보이는 거리 (최대)
  );

  };
}