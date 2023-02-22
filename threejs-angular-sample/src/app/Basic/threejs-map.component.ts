import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import * as angularthreejs from './angularthreejs';
import * as THREE from 'three'
import { Subject } from 'rxjs';
import { IObjectClickEvent, IObjectEvent, ThreeJSLib, ThreeLayer } from './angularthreejs/ThreeJsLib';
import { CameraControlClass } from "./CameraControlClass";
import { GISControlClass } from "./GISControlClass";
import { LightControlClass } from "./LightControlClass";
import { ObjectControlClass } from "./ObjectControlClass";
import { FormControl } from '@angular/forms';
import { ThreeUtils } from './angularthreejs';
import Stats from 'three/examples/jsm/libs/stats.module.js';

@Component({
  selector: 'app-threejs-map',
  templateUrl: './threejs-map.component.html',
  styleUrls: ['./threejs-map.component.css']
})
export class ThreejsMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threejsDiv') localElement!: ElementRef;

  private stats: Stats | undefined;
  //콜백 구문
  OnInitFinish?: Function

  //Threejs관련 변수
  threeJsLib?: ThreeJSLib;
  CammeraControl!: CameraControlClass;
  GISControl?: GISControlClass;
  LightControl?: LightControlClass;
  ObjectControl?: ObjectControlClass;

  //Subject
  AnimateEvent: Subject<void> = new Subject();
  AddObjectEvent: Subject<IObjectEvent> = new Subject();
  ClickObjectEvent: Subject<IObjectClickEvent> = new Subject();
  AddPOIEvent: Subject<IObjectEvent> = new Subject();
  AddLayerEvent: Subject<ThreeLayer> = new Subject();
  AddLineEvent: Subject<IObjectEvent> = new Subject();
  AddPolygonEvent: Subject<IObjectEvent> = new Subject();
  

  constructor() {

  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.OnInitFinish != undefined) this.OnInitFinish();

  }

  //해당 컴포넌트 삭제시 관련된 데이터 모두 삭제
  ngOnDestroy(): void {
    if (this.threeJsLib != undefined) this.threeJsLib.Destory();
    this.threeJsLib = undefined;
  }

  InitMap(viewElement?: HTMLDivElement, is2DMap: boolean = false) {
    //맵의 기본 초기화 옵션 
    if (is2DMap)
      this.threeJsLib = new ThreeJSLib(this.localElement!.nativeElement, new THREE.Vector3(0, 0, 10), 0.01, 10000, true);
    else
      this.threeJsLib = new ThreeJSLib(this.localElement!.nativeElement);

    //view 옵션이 있는 경우
    if (viewElement != undefined) viewElement.appendChild(this.threeJsLib.container);

    this.CammeraControl = new CameraControlClass(this.threeJsLib);
    this.GISControl = new GISControlClass(this.threeJsLib);
    this.LightControl = new LightControlClass(this.threeJsLib);
    this.ObjectControl = new ObjectControlClass(this.threeJsLib);
    //this.GISControl.InitGround(true);

    //사이즈 정리
    this.ResizeMap();

    this.threeJsLib.AnimateEvent.subscribe(val => {
      this.AnimateEvent.next()
    });

    //오브젝트 추가
    this.threeJsLib.AddObjectEvent.subscribe(val => {
      this.AddObjectEvent.next(val);
    })

    this.threeJsLib.ClickObjectEvent.subscribe(val => {
      this.ClickObjectEvent.next(val);
    })

    this.threeJsLib.AddPOIEvent.subscribe(val => {
      this.AddPOIEvent.next(val);
    })
  }
  ResizeMap() {
    if (this.threeJsLib == undefined) return;
    this.threeJsLib.SetSceneSize(this.localElement!.nativeElement.clientWidth, this.localElement!.nativeElement.clientHeight);
  }
  /////////////////////////////////////
  /////////// 업무 단위 기능 ///////////
  /////////////////////////////////////
  //SetSlamMap(restApi: RestAPI,) {

  //  }

  SetFirstPersonView() {

  }
  //레이어 관련 조작 기능
  GetLayerGrpInNames(): string[] {
    return this.threeJsLib!.GetLayerGrpInNames();
  }

  GetLayerInObjectNames(layerName: string): string[] {
    return this.threeJsLib!.GetLayerInObjectNames(layerName);
  }

  RemoveLayerFromName(layerName: string): boolean {
    return this.threeJsLib!.RemoveLayerFromName(layerName);
  }


  SetAxesHelper() {
    // 축 헬퍼
    const axesHelper = new THREE.AxesHelper(5);
    this.threeJsLib?.SetAxesHelper();
  }

  SetViewStats() {
    this.stats = Stats();
    this.localElement!.nativeElement.appendChild(this.stats.dom);
}
}

