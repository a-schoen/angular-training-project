import { Injectable } from '@angular/core';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryDataService {

  testEntries = [
    {
     id: 1,
     type: 'feed',
     link: 'testlink 1',
     title: 'title 1',
     imageUrl: 'img url 1',
     content: 'test content 1',
    },
    {
      id: 2,
      type: 'feed',
      link: 'testlink 2',
      title: 'title 2',
      imageUrl: 'img url 2',
      content: 'test content 2',
     }
  ]

  constructor() { }

  getEntry(id){
    return this.testEntries[id - 1];
  }

  getAllEntries(type: string) {
    //toDo: replace test version
    return this.testEntries;

  }

  createEntry(entry: Entry) {

  }

  updateEntry(oldEntryId, newEntry) {

  }

  deleteEntry(id) {

  }

}
