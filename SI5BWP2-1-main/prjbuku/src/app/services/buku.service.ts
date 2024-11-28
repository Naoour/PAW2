
// import { Injectable } from '@angular/core';
// import { Buku } from '../models/buku.model';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class BukuService {
//   private url : string ="http://localhost:3000/buku";

//   constructor(private http : HttpClient) { }

//   addBuku(judul : string, penulis : string, genres : string[]){
//     const buku : Buku= {
//       _id : null,
//       judul : judul,
//       penulis : penulis,
//       genre : genres
//     }

//     console.log(buku);

//     this.http.post<{message : string}>(this.url,buku)
//     .subscribe((response)=>{
//       console.log(response.message)
//     });

//   }
// }


import { Injectable } from '@angular/core';
import { Buku } from '../models/buku.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BukuService {
  //private url : string ="http://localhost:3000/buku/";
  private url : string ="https://apisi51.vercel.app/buku/";


  private subjectBuku = new Subject<Buku[]>();
  private subjectExexute = new Subject<string>;


  constructor(private http : HttpClient) { }


  exexuteBukuListener(){
    return this.subjectExexute.asObservable();
  }


  getBukuListener(){
    return this.subjectBuku.asObservable();    
  }


  getBuku(){
    this.http.get<{message : string, bukus : Buku[]}>(this.url)
    .subscribe((value)=>{
      this.subjectBuku.next(value.bukus)
    });
  }


  addBuku(judul : string, penulis : string, genres : string[]){
    const buku : Buku= {
      _id : null,
      judul : judul,
      penulis : penulis,
      genre : genres
    }


    //console.log(buku);


    this.http.post<{message : string}>(this.url,buku)
    .subscribe((response)=>{
      this.getBuku();
      this.subjectExexute.next(response.message);
      //console.log(response.message)
    });


  }


  deleteBuku(buku : Buku){
    this.http.delete<{message : string}>(this.url + buku._id)
    .subscribe((response)=>{
      //console.log(response.message);
      this.getBuku();
      this.subjectExexute.next(response.message);
    });
  }
}

