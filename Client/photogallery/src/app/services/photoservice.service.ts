import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/photo.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhotoserviceService {
  private server = environment.server;
  private url = this.server + "photos"
  private fileuploadURL = this.server + "upload";

  constructor(private http:HttpClient) { }

  getAllPhotos(){
    return this.http.get<{allphotos:[Photo[]], message:string}>(this.url);
  }

  getPhotoById(id:number){
    return this.http.get<{photo:Photo, message:any}>(this.url + "/" + id);
  }

  uploadFile(formdata: any) {
    return this.http.post(this.fileuploadURL, formdata);
  }
  
  addNewPhoto(albumId: number, title: string, filename: string) {
    let newphotobody = {
        "albumId_fromC": albumId,
        "title_fromC": title,
        "url_fromC": filename,
        "tn_fromC": "tn_tesimg.jpg"
    }
    return this.http.post<{ newPhoto: [Photo], message:any }>(this.url, newphotobody);
  }

  deletePhoto(id:number) {
    return this.http.delete<{delStatus:any, message:any}>(this.url + "/" + id);
  }
}
