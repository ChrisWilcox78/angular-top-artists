import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArtistSummary } from './artistSummary';
import { ArtistDetails } from './artistDetails';
import { Data } from '@angular/router';

// TODO error handling


@Injectable({
  providedIn: 'root'
})
export class LastfmService {

  private baseUrl: string = "https://ws.audioscrobbler.com/2.0/";
  private apiKey: string = "24c990f786fd892d7c74a62505a795c8";

  getArtists(): Observable<ArtistSummary[]> {
    return this.http.get<Data>(this.baseUrl, {
      params: {
        method: "geo.gettopartists",
        country: "australia",
        limit: "10",
        api_key: this.apiKey,
        format: "json"
      }
    }).pipe(
      map(data => this._extractRelevantSummaryDetails(data.topartists.artist))
    );
  }

  getArtistDetails(mbid: string): Observable<ArtistDetails> {
    return this.http.get<Data>(this.baseUrl, {
      params: {
        method: "artist.getinfo",
        api_key: this.apiKey,
        format: "json",
        mbid: mbid
      }
    }).pipe(
      map(data => this._extractRelevantArtistDetails(data))
    );
  }

  private _extractRelevantSummaryDetails(artistsArray): ArtistSummary[] {
    return artistsArray.map(rawArtist => {
      return {
        mbid: rawArtist.mbid,
        name: rawArtist.name,
        imageUrl: rawArtist.image[4]["#text"]
      };
    });
  }

  private _extractRelevantArtistDetails(data): ArtistDetails {
    return {
      name: data.artist.name,
      imageUrl: data.artist.image[2]["#text"],
      bio: this.sanitizer.sanitize(SecurityContext.HTML, data.artist.bio.content)
    };
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }
}
