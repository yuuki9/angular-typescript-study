import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import { RestAPI } from 'src/app/Basic/libs/RestAPI';
import * as THREE from 'three';

import { PointcloudStreamRender } from '../../../app/Basic/angularthreejs/Managers/PointcloudManager';
@Component({
  selector: 'app-stream-xyz',
  templateUrl: './stream-xyz.component.html',
  styleUrls: ['./stream-xyz.component.css']
})
export class StreamXYZComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  //UI변수
  threejsMapComp: ComponentRef<ThreejsMapComponent>;
  targetObj?: THREE.Object3D;
  moveValue: number = 0;

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector, private http: HttpClient) {
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
      //this.threejsMapComp!.instance.GISControl?.InitGround(true);     
    }
    this.threejsMapComp!.changeDetectorRef.detectChanges();
    //PointcloudApi정의
    const pointcloudAPI: RestAPI = new RestAPI(this.http, "192.168.1.253", 4660);

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


    //애니메이션 이벤트
    this.threejsMapComp!.instance.AnimateEvent.subscribe(val => {
      //console.log(this.targetObj)
      if (this.targetObj != undefined) {
        this.moveValue += 0.1;
        this.targetObj.position.set(0, this.moveValue, 0);
        // this.LockTarget();
      }
    });

    const StreamXYZ = new PointcloudStreamRender(pointcloudAPI, //포인트클라우드서버에 RestAPㅑ정보
      this.threejsMapComp!.instance.threeJsLib!, //표시할 ThreejsLib
      "LayerName", //레이어명 (해당 레이어에 오브젝트를 따로 추가하지 않도록 주의)
      new THREE.Vector3(0, 0, 1), //원점 좌표 (해당 위치 만큼 이동)
      this.targetObj, //랜더링 기준이 될 오브젝트 (undefined = 카메라를 기준으로 사용)
      1, //각 LOD가 보여질 범위(칸) - 가공데이터 기준
      10, // LOD의 최대 레벨 표시 - 가공데이터 기준
      0.025, // 포인트클라우드의 크기
      false // 좌측 하단에 있는 점을 기준점으로 표시 (원점좌표 이동도 중복 적용됨)
    );
    //오브젝트 추가
    StreamXYZ.Init("20221219110127385", //포인트클라우드 DB에 저장된 Code값으로 데이터 불러오기
      0, //idx번호
      false, //0레벨의 LOD를 모두 불러온 상태에서 시작
      true
    );

  }

  ngOnDestroy(): void {

  }
}
