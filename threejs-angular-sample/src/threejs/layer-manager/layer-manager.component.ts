import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ThreejsMapComponent } from "src/app/Basic/threejs-map.component";
import * as THREE from 'three';
interface Layer {
  name: string,
  code: string
}
@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit, AfterViewInit {
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  //UI변수
  Layers: Layer[] = [];
  SelectObjects: Layer[] = [];
  targetObj?: THREE.Object3D;
  threejsMapComp: ComponentRef<ThreejsMapComponent>;


  createObj?: THREE.Object3D;

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
          //this.threejsMapComp!.changeDetectorRef.detectChanges();
      }
      this.threejsMapComp!.changeDetectorRef.detectChanges();

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

        //오브젝트 추가
      this.threejsMapComp!.instance.ObjectControl!.Add3DS( "TDSLayer", //레이어명 입력 
      "ObjectName3", //오브젝트 명
      true, //클릭이 가능한 오브젝트로 처리
      new THREE.Vector3(0,20,4), //오브젝트의 위치 (pos)
      new THREE.Vector3(0,0,0), //오브젝트의 방향 (deg)
      1, //오브젝트 사이즈
      'assets/resources/models/3DS/B0104002.3DS', //오브젝트 파일 경로
      'assets/resources/models/3DS/B0104002.JPG', //텍스쳐 파일 경로
      0.1, //오브젝트가 보이는 거리 (최소)
      30000 //오브젝트가 보이는 거리 (최대)
    );  
      

     //POI의 보이는 거리설정에 따른 표시를 확인하기 위한 테스트 코드
     for(let i = 0; i< 10; i++) {
       //POI추가
       this.threejsMapComp!.instance.GISControl!.AddPOI('POILayer',
         'ObjectName'+i,
         true,
         'assets/resources/texture/POI/b1.png',
         new THREE.Vector3(-20+i*4,-2,3),
         0.05,
         "POI "+i,
         "Data",
         {name:i+"번째 데이터", pos:new THREE.Vector3(127.1212,37.5252,0)},
         0.1,
         30
       );
    }
    
    this.threejsMapComp!.instance.AddObjectEvent.subscribe(val => {   
        this.threejsMapComp!.instance.GetLayerGrpInNames().forEach(layername=>{
        const layer = this.Layers.filter(value=>value.name!=layername)
        layer.push({name:layername, code:layername});
        this.SelectObjects.push({name:layername, code:layername});
        this.Layers = layer;
      })
    });

    //오브젝트 클릭 이벤트 구독
    this.threejsMapComp!.instance.ClickObjectEvent.subscribe(val => {
        console.log(val)
    });

   
  }

  ngOnDestroy(): void {
    console.log("레이어 컴포넌트 소멸")
  }

  click(event:any)
  {
    const SelOption:Layer = event.option;
    const getLayer = this.threejsMapComp!.instance.threeJsLib?.GetLayer(SelOption.name)
    console.log(getLayer)
    if(this.SelectObjects.includes(SelOption) && getLayer != undefined)
      getLayer.visible=true;
    else if(!this.SelectObjects.includes(SelOption) && getLayer != undefined)
      getLayer.visible=false;
      this.threejsMapComp!.instance.threeJsLib?.LayerRefresh();
  }


}
