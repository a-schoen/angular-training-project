import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../entry.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RssFetchService {

  feed: any = {
    feedObject: null,
    latestItem: null
  }
  
  rssApiUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(
    private http: HttpClient
  ) { }

  parseFeed(entry: Entry): Observable<Entry> {
    const encodedUrl = encodeURI(entry.link);

    return this.http.get(this.rssApiUrl + encodedUrl).pipe(
      map((data: any) => {
        const newestItem = data.items[0];
        const newEntry = {
          ...entry,
          title: newestItem.title,
          imageUrl: newestItem.thumbnail,
          subtitle: 'Feed: ' + data.feed.title,
          content: newestItem.content,
          published: newestItem.pubDate
        }
        return newEntry;
      })
    );
  }

}
