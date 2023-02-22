import { HttpClient } from "@angular/common/http";

export class RestAPI {
    //restapi전용
    private http: HttpClient;
    private serverIP: string;
    private serverPort: number;

    constructor(http: HttpClient, serverIP: string = "39.115.113.230", serverPort: number = 4660) {
        this.http = http;
        this.serverIP = serverIP;
        this.serverPort = serverPort;
    }

    /**
     * 서버 정보 재설정
     * @param serverIP 서버아이피
     * @param serverPort 서버포트
     */
    Set(serverIP: string, serverPort: number) {
        this.serverIP = serverIP;
        this.serverPort = serverPort;
    }

    GetRequest(apiUrl: string = "", dataRes?: Function, errRes?: Function, finish?: Function) {
        this.http.get('http://' + this.serverIP + ":" + this.serverPort + "/" + apiUrl).subscribe((data: any) => {
            if (dataRes != undefined) dataRes(data);
        }, (err: any) => {
            if (errRes != undefined) errRes(err);
        }, () => {
            if (finish != undefined) finish();
        });
    }

    PostRequest(apiUrl: string = "", reqData?: any, dataRes?: Function, errRes?: Function, finish?: Function) {
        this.http.post('http://' + this.serverIP + ":" + this.serverPort + "/" + apiUrl, reqData).subscribe((data: any) => {
            if (dataRes != undefined) dataRes(data);
        }, (err: any) => {
            if (errRes != undefined) errRes(err);
        }, () => {
            if (finish != undefined) finish();
        });
    }

    PostRequestOption(apiUrl: string = "", reqData?: any, options?:any, dataRes?: Function, errRes?: Function, finish?: Function) {
        this.http.post('http://' + this.serverIP + ":" + this.serverPort + "/" + apiUrl, reqData, options).subscribe((data: any) => {
            if (dataRes != undefined) dataRes(data);
        }, (err: any) => {
            if (errRes != undefined) errRes(err);
        }, () => {
            if (finish != undefined) finish();
        });
    }
}
