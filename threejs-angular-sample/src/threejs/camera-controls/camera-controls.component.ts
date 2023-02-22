import { ApplicationRef, Component, EnvironmentInjector, OnInit, AfterViewInit, createComponent, ViewChild, ElementRef, ComponentRef, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Subject } from "rxjs";
import { ThreeUtils } from "src/app/Basic/angularthreejs";
import { ThreejsMapComponent } from "src/app/Basic/threejs-map.component";
import * as THREE from 'three';


enum CamMode{
    MapMode,
    FPSMode,
    TPSMode,
  }

interface Layer {
    name: string,
    code: string
}
@Component({
    selector: 'app-camera-controls',
    templateUrl: './camera-controls.component.html',
})


export class CameraControlsComponent implements OnInit, AfterViewInit , OnDestroy {
    @ViewChild('mapcanvas') mapcanvas?: ElementRef;
    //UI변수
    Layers: Layer[] = [];
    SelectObjects: Layer[] = [];
    threejsMapComp!: ComponentRef<ThreejsMapComponent>;
    targetObj?: THREE.Object3D;
    moveValue:number = 0;
    
    //UI변수
    lockRotateChecked: boolean = false;
    LockMode: FormControl = new FormControl('');
    FPSMode: FormControl = new FormControl('');
    TPSMode: FormControl = new FormControl('');
    zoomValue:number = 1;
    
    //마우스 위치 변수
    mouseX:number = 0;
    mouseY:number = 0;

    //카메라 고정 처리
    tempMousePos:THREE.Vector2 = new THREE.Vector2(0,0);

    constructor(private route: ActivatedRoute, private appRef: ApplicationRef, private injector: EnvironmentInjector) {
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
         };
        this.threejsMapComp!.changeDetectorRef.detectChanges(); 
  
        
        //애니메이션 이벤트
        this.threejsMapComp!.instance.AnimateEvent.subscribe(val => {
  
            if(this.targetObj != undefined)
            {
              this.moveValue += 0.1;
              this.targetObj.position.set(0, this.moveValue, 0);
              this.LockTarget();
            }
        });

      
    }

    ngOnDestroy(): void {

    }

    move() {
        this.targetObj?.position.set(this.targetObj?.position.x + 1, 1, 1);
    }
    
    RandomMove() {
        this.threejsMapComp.instance.CammeraControl.SetCamViewPosition(new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100), true, 2000);
        this.threejsMapComp.instance.CammeraControl.SetCamPosition(new THREE.Vector3(100 + Math.random() * 100, 100 + Math.random() * 100, 100 + Math.random() * 100), true, 2000);
      }
    
      LockRotate() {
        this.threejsMapComp.instance.CammeraControl.SetLockCamControl(this.lockRotateChecked);
      }
    
      LockTarget() {
        if (this.targetObj != undefined && this.LockMode.value) //Lock모드
        {
          //완전 고정 모드
          this.threejsMapComp.instance.CammeraControl.SetMapView();
          this.threejsMapComp.instance.CammeraControl.SetCamViewPosition(this.targetObj.position);
          this.threejsMapComp.instance.CammeraControl.SetCamPosition(new THREE.Vector3(this.targetObj.position.x + this.zoomValue * 15, this.targetObj.position.y - this.zoomValue * 15, this.targetObj.position.z + this.zoomValue * 15));
        }
        else if (this.targetObj != undefined && this.FPSMode.value) //FPS모드
        {
          const maxHDeg = 30;
          const maxVdeg = 90;
    
          const xRate = this.mouseX / (window.innerWidth / 2);
          const yRate = this.mouseY / (window.innerHeight / 2);
    
          // 1인칭 처리할 때 타겟의 시점으로 넓은 시야를 보는 방식 (1인칭 뷰) - FPS
          this.threejsMapComp.instance.CammeraControl.SetFirstPersonView();
          this.threejsMapComp.instance.CammeraControl.SetCamPosition(new THREE.Vector3(this.targetObj.position.x - 10, this.targetObj.position.y - 10, 10));
          this.threejsMapComp.instance.CammeraControl.SetCamViewPosition(ThreeUtils.GetDegDisToPos(new THREE.Vector3(this.targetObj.position.x - 10, this.targetObj.position.y - 10, 10), 40, maxHDeg * xRate, maxVdeg * yRate));
        }
        else if (this.targetObj != undefined && this.TPSMode.value) //TPS모드
        {
          const maxHDeg = 30;
          const maxVdeg = 90;
    
          const xRate = this.mouseX / (window.innerWidth / 2);
          const yRate = this.mouseY / (window.innerHeight / 2);
    
          // 타겟을 시점으로 카메라가 위성 처럼 보는 방식 (3인칭 뷰) - TPS
          this.threejsMapComp.instance.CammeraControl.SetThirdPersonView();
          this.threejsMapComp.instance.CammeraControl.SetCamPosition(ThreeUtils.GetDegDisToPos(new THREE.Vector3(this.targetObj.position.x, this.targetObj.position.y, 1), 40, maxHDeg * xRate, maxVdeg * yRate));
          this.threejsMapComp.instance.CammeraControl.SetCamViewPosition(new THREE.Vector3(this.targetObj.position.x, this.targetObj.position.y, 1));
        }
        else if (this.targetObj != undefined) //맵모드
        {
    
            this.threejsMapComp.instance.CammeraControl.SetMapView();
        }
      }
    
      ResetZoom() {
        this.zoomValue = 1;
        this.threejsMapComp.instance.CammeraControl.SetZoom(this.zoomValue);
      }
    
      ZoomPlus() {
        this.zoomValue += 0.1;
        this.threejsMapComp.instance.CammeraControl.SetZoom(this.zoomValue);
      }
    
      ZoomMinus() {
        this.zoomValue -= 0.1;
        this.threejsMapComp.instance.CammeraControl.SetZoom(this.zoomValue);
      }
      
  }
  
