import { AfterViewInit, ApplicationRef, Component, ComponentRef, createComponent, ElementRef, EnvironmentInjector, OnInit, ViewChild } from '@angular/core';
import { ThreejsMapComponent } from 'src/app/Basic/threejs-map.component';
import * as THREE from 'three';


interface Robot {
    object? : THREE.Object3D;
    speed? : number;
}

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css']
})
export class AddLineComponent implements OnInit, AfterViewInit{
  @ViewChild('mapcanvas') mapcanvas?: ElementRef;
  createMode: boolean = false;
  pointArr : Array<THREE.Vector3> = [];
  robot? : Robot;
  threejsMapComp!: ComponentRef<ThreejsMapComponent>;
  lineObj? : THREE.Object3D;
  

  speed : number = 0;;
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
              
      this.threejsMapComp!.instance.ClickObjectEvent.subscribe(val => {         
        if(this.createMode) {
          this.pointArr.push(val.point);
          this.threejsMapComp!.instance.GISControl!.AddPOI('POILayer',
          'ObjectName' + val.point.x,
          true,
          'assets/resources/texture/POI/b3.png',
          new THREE.Vector3(val.point.x, val.point.y, val.point.z + 0.2),
          0.05,
          "",
          "Data",
          { name: "", pos: new THREE.Vector3(127.6767, 37.3232, 0) },
          0.1,
          500
        );
        }
        console.log(val);
        console.log(this.pointArr);
        

          
      })   
    //삼각형 라인그리기
    this.threejsMapComp!.instance.GISControl!.AddLine( 'LayerName',
        'ObjectName1',
        false,
        [new THREE.Vector3(0,0,3), new THREE.Vector3(3,0,6), new THREE.Vector3(6,0,3), new THREE.Vector3(0,0,3)],
        100,
        new THREE.Color(0,0,1)
    )}
    
    //라인 object 생성
    createLine(){
      this.threejsMapComp!.instance.GISControl!.AddLine( 'lineLayer',
      'lineObj',
      false,
      this.pointArr,
      100,
      new THREE.Color(0,0,1)
    )
      this.threejsMapComp!.instance.ObjectControl!.Add3DS('ROBOT', //레이어명 입력 
      "ObjectName1", //오브젝트 명
      true, //클릭이 가능한 오브젝트로 처리
      this.pointArr[0], //오브젝트의 위치 (pos)
      new THREE.Vector3(this.pointArr[1].x, this.pointArr[1].y, 0), //오브젝트의 방향 (deg)
      0.5, //오브젝트 사이즈
      'assets/resources/models/3DS/robot/BB-8.3ds', //오브젝트 파일 경로
      'assets/resources/models/3DS/robot/Texture.jpg', //텍스쳐 파일 경로
      0.1, //오브젝트가 보이는 거리 (최소)
      30000,//오브젝트가 보이는 거리 (최대)
      (obj: THREE.Object3D) => {
        if(this.robot == undefined)
        this.robot = { object : obj, speed : 0.1}        
      })
      this.threejsMapComp!.instance.AddObjectEvent.subscribe(val => {

      })   
      this.threejsMapComp!.instance.RemoveLayerFromName('POILayer')
      this.createMode = false;
    }
      
      //this.threejsMapComp!.instance.GetLayerGrpInNames().forEach(layername=>{
      
      //this.SelectObjects.push({name:layername, code:layername});
      //this.Layers = layer;
    start(){
      const geometry = new THREE.BufferGeometry();     
      this.threejsMapComp!.instance.AnimateEvent.subscribe(val => {     
        if(this.robot!.object != undefined){
          console.log(this.robot!.speed)
          console.log(this.robot!.speed)
          this.robot!.object.position.set(this.pointArr[0].x += this.robot!.speed!, this.pointArr[0].y += this.robot!.speed!, this.pointArr[0].z);                     
            console.log(this.robot!.object.position); 
        }

        //마지막 순간 좌표 값이 넘어가는 순간 포인트 좌표로 셋
  


    });

    }
    

}
