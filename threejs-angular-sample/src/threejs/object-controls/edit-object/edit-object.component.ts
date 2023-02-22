import { ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { TransfromControlSetMode } from 'src/app/Basic/angularthreejs';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
interface EditMode {
  modeName: string;
  mode: TransfromControlSetMode;
}
@Component({
  selector: 'app-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.css']
})
export class EditObjectComponent implements OnInit{
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;   
  //UI변수
    enableMode:boolean = false;
    enableXAxis:boolean = true;
    enableYAxis:boolean = true;
    enableZAxis:boolean = true;
  
    modes: EditMode[] = [];
    selectedMode: EditMode = {modeName:'translate', mode:TransfromControlSetMode.translate};
  
    originPointModes: EditMode[] =[];
    selectedOriginPointMode: EditMode = {modeName:'space_local', mode:TransfromControlSetMode.space_local};

    threejsMapComp!: ComponentRef<ThreejsMapComponent>;
    targetObj?: THREE.Object3D;


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
          this.threejsMapComp!.changeDetectorRef.detectChanges();
      }
      this.threejsMapComp!.changeDetectorRef.detectChanges();
      
      this.threejsMapComp!.instance.ObjectControl?.AddPLY("layerName", //레이어명 입력 
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
      this.threejsMapComp!.instance.ObjectControl!.Add3DS('ROBOT', //레이어명 입력 
        "ObjectName1", //오브젝트 명
        true, //클릭이 가능한 오브젝트로 처리
        new THREE.Vector3(0, 0, 0), //오브젝트의 위치 (pos)
        new THREE.Vector3(0, 0, 0), //오브젝트의 방향 (deg)
        1, //오브젝트 사이즈
        'assets/resources/models/3DS/robot/ROBOT.3ds', //오브젝트 파일 경로
        'assets/resources/models/3DS/robot/ROBOT.jpg', //텍스쳐 파일 경로
        0.1, //오브젝트가 보이는 거리 (최소)
        30000,//오브젝트가 보이는 거리 (최대)
        (obj: THREE.Object3D) => {
            this.targetObj = obj;
            //console.log(obj.position.set(2,2,2));
        })

    }

}
