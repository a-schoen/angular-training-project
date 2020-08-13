import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterFetchService {

  twitterApiUrl: string = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='

  constructor(
    private http: HttpClient
  ) {}

  fetchTweets(username: string, count: number): Observable<any> {
    const fetchUrl = this.twitterApiUrl + username + '?count=' + count;
    return this.http.get(fetchUrl).pipe(
      map((data: any) => {
        
        // ToDo: parse data
        return data;
        
      })
    );
  }

}