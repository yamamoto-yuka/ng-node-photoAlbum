import { Component, OnInit } from '@angular/core';
import { PhotoserviceService } from '../services/photoservice.service';
import { Photo, PhotoTB } from '../interfaces/photo.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  name_of_env = environment.name;
  server = environment.server;
  photos: any[] = [];
  formdata: any;
  albumId: number = 0;
  title: string = '';
  filename: string = '';
  myname = "John";
  textcolor = 'red'

  constructor(private ps:PhotoserviceService) { }

  trackFile(event: any) {
     console.log(event);
    let myfile = event.target.files[0];
    this.filename = myfile.name;
    console.log("MY FILE --->", myfile);
    const formdata = new FormData();
    console.log(formdata);
    formdata.append("file_fromC", myfile, myfile.name);
    this.formdata = formdata;
  }

  addNewPhoto() {
    // console.log(this.albumID, this.title, this.filename);
    this.ps.addNewPhoto(this.albumId, this.title, this.filename).subscribe(newphoto => {
      console.log(newphoto);
      this.ps.uploadFile(this.formdata).subscribe(uploadMessage => {
        console.log(uploadMessage);
        this.photos.unshift(newphoto.newPhoto[0]);
      })
    } )
  }

  deletePhotos(id: number, photocard:HTMLElement) {
    if (confirm("Are you sure you want to delete?")) {
      // we write code to delete the photo
      this.ps.deletePhoto(id).subscribe(deleteSuccessMesage => {
        if (deleteSuccessMesage.delStatus === 1)
        console.log(photocard);
        photocard.className = 'fadeout';
        console.log(id);
        let index = this.photos.findIndex(photoid => photoid.id === id)
        console.log(index);
        setTimeout(() => {
            this.photos.splice(index, 1);
        }, 2000)
      })
    }
  }
  
  ngOnInit(): void {
    //this.photos = this.jsonData;
    this.ps.getAllPhotos().subscribe( photos => {
      this.photos = photos.allphotos;
      console.log(photos.allphotos);
    });
  }

}
