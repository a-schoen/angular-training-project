import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from '../entry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryDataService {

  dbUrl: string = 'https://****.firebaseio.com/';
  collectionUrl: string = 'https://****.firebaseio.com/entries.json';

  entries: Entry[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getEntry(id: string): Observable<any>{
    const entryUrl = this.dbUrl + 'entries/'+ id + '.json';
    return this.http.get(entryUrl);
  }

  getAllEntries(): Observable<any> {
    return this.http.get(this.collectionUrl);
  }

  createEntry(entry: Entry): Observable<any> {
    //toDo: sanitize input 
    const newEntry = { ...entry };
    if(newEntry.hasOwnProperty('id')) {
      delete newEntry.id;
    }
    const body = JSON.stringify(newEntry);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.collectionUrl, body, {headers: headers});
  }

  updateEntry(newEntry: Entry): Observable<any> {
    const entryId = newEntry.id;
    //toDo: sanitize input 
    const entryUrl = this.dbUrl + 'entries/' +  entryId + '.json';
    const body = JSON.stringify(newEntry);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(entryUrl, body, {headers: headers});
  }

  deleteEntry(id: string): Observable<any> {
    const entryUrl = this.dbUrl + 'entries/' +  id + '.json';
    return this.http.delete(entryUrl);
  }

}
