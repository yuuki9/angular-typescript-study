import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-addpcd',
  templateUrl: './add-pcd.component.html',
  styleUrls: ['./add-pcd.component.css']
})
export class AddpcdComponent implements OnInit, AfterViewInit{
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  createMode: boolean = false;
  createObj?: THREE.Object3D;
  fileServerIP:string = "39.115.113.230";
  fileServerPort:number = 4660;
  
  threejsMapComp!: ComponentRef<ThreejsMapComponent>;
  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector, private http:HttpClient) {
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
    
    this.threejsMapComp!.instance.ObjectControl!.AddPCD( "layerName", //레이어명 입력 
      "ObjectName", //오브젝트 명
      true, //클릭이 가능한 오브젝트로 처리
      new THREE.Vector3(0,0,0), //오브젝트의 위치 (pos)
      new THREE.Vector3(0,0,90), //오브젝트의 방향 (deg)
      1, //오브젝트 사이즈
      'assets/resources/models/PCD/cloud_bongmyeong.pcd', //오브젝트 파일 경로
      0.014, //포인트 사이즈 처리
      0.1, //오브젝트가 보이는 거리 (최소)
      30000 //오브젝트가 보이는 거리 (최대)
    );

    for(let i = 0; i<300; i++)
    {
      //오브젝트 추가
      this.threejsMapComp!.instance.ObjectControl!.Add3DS( "wireRight", //레이어명 입력 
        "ObjectName"+i, //오브젝트 명
        true, //클릭이 가능한 오브젝트로 처리
        new THREE.Vector3(0.6,1+i*10,0.2), //오브젝트의 위치 (pos)
        new THREE.Vector3(-90,0,180), //오브젝트의 방향 (deg)
        1, //오브젝트 사이즈
        'http://'+this.fileServerIP+":"+this.fileServerPort+"/resources/models/3DS/cableWire/model_10.3DS", //오브젝트 파일 경로
        'http://'+this.fileServerIP+":"+this.fileServerPort+"/resources/models/3DS/cableWire/wire.jpg", //텍스쳐
        0.1, //오브젝트가 보이는 거리 (최소)
        30000 //오브젝트가 보이는 거리 (최대)
      );

      //오브젝트 추가
      this.threejsMapComp!.instance.ObjectControl!.Add3DS( "wireLeft", //레이어명 입력 
      "ObjectName"+i, //오브젝트 명
        true, //클릭이 가능한 오브젝트로 처리
        new THREE.Vector3(-0.6,1+i*10,0.2), //오브젝트의 위치 (pos)
        new THREE.Vector3(-90,0,0), //오브젝트의 방향 (deg)
        1, //오브젝트 사이즈
        'http://'+this.fileServerIP+":"+this.fileServerPort+"/resources/models/3DS/cableWire/model_10.3DS", //오브젝트 파일 경로
        'http://'+this.fileServerIP+":"+this.fileServerPort+"/resources/models/3DS/cableWire/wire.jpg", //텍스쳐
        0.1, //오브젝트가 보이는 거리 (최소)
        30000 //오브젝트가 보이는 거리 (최대)
      );
    }

  }  
}
