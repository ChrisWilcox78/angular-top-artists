import { Component, OnInit } from '@angular/core';
import { ArtistSummary } from '../artistSummary';
import { LastfmService } from '../lastfm.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artists: ArtistSummary[];

  constructor(private lastfmService: LastfmService) { }

  ngOnInit() {
    this.lastfmService.getArtists()
      .subscribe(artists => this.artists = artists);
  }

}
