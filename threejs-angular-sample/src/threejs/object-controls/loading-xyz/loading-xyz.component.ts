import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PointcloudRender } from 'src/app/Basic/angularthreejs';
import { RestAPI } from 'src/app/Basic/libs/RestAPI';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';
@Component({
  selector: 'app-loading-xyz',
  templateUrl: './loading-xyz.component.html',
  styleUrls: ['./loading-xyz.component.css']
})
export class LoadingXYZComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
    //UI변수
    threejsMapComp: ComponentRef<ThreejsMapComponent>;
    
    constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector, private http: HttpClient){
      this.threejsMapComp = createComponent(ThreejsMapComponent, {
        environmentInjector: this.injector,
    });
    }
  
    ngOnInit(): void {

    }
  
    ngAfterViewInit(): void {  
      //PoinrcloudApi정의
      const pointcloudAPI: RestAPI = new RestAPI(this.http, "39.115.113.230", 4660);

      this.mapcanvas?.nativeElement.appendChild(this.threejsMapComp.location.nativeElement);
      this.threejsMapComp.instance.OnInitFinish = () => {
        this.threejsMapComp!.instance.InitMap(this.mapcanvas?.nativeElement, false)
        //this.threejsMapComp!.instance.GISControl?.InitGround(true);     
      } 
      this.threejsMapComp!.changeDetectorRef.detectChanges();
       //스트림처리정보 초기화
    const StreamXYZ = new PointcloudRender(pointcloudAPI, //포인트클라우드서버에 RestAPㅑ정보
    this.threejsMapComp.instance.threeJsLib!, //표시할 ThreejsLib
    "LayerName", //레이어명 (해당 레이어에 오브젝트를 따로 추가하지 않도록 주의)
    new THREE.Vector3(0, 0, 1), //원점 좌표 (해당 위치 만큼 이동)
    15, //최대 LOD 레벨 입력
    0.025, // 포인트클라우드의 크기
    false // 좌측 하단에 있는 점을 기준점으로 표시 (원점좌표 이동도 중복 적용됨)
  );


  //오브젝트 추가
  StreamXYZ.Init("20211112155945345", //포인트클라우드 DB에 저장된 Code값으로 데이터 불러오기
    0, //idx번호
    false //0레벨의 LOD를 모두 불러온 상태에서 시작
  );

  //기준오브젝트 정의
  this.threejsMapComp!.instance.ObjectControl!.Add3DS("layerName", //레이어명 입력 
    "targetObj", //오브젝트 명
    true, //클릭이 가능한 오브젝트로 처리
    new THREE.Vector3(0, 0, 0), //오브젝트의 위치 (pos)
    new THREE.Vector3(0, 0, 0), //오브젝트의 방향 (deg)
    1, //오브젝트 사이즈
    'assets/resources/models/3DS/robot/ROBOT.3ds', //오브젝트 파일 경로
    'assets/resources/models/3DS/robot/robot.jpg', //텍스쳐 파일 경로
    0.1, //오브젝트가 보이는 거리 (최소)
    30000 //오브젝트가 보이는 거리 (최대)
  );
  }
            
    ngOnDestroy(): void {
        
    }
  }
