import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LastfmService } from '../lastfm.service';
import { ArtistDetails } from '../artistDetails';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  artist: ArtistDetails;

  constructor(
    private route: ActivatedRoute,
    private lastfmService: LastfmService
  ) { }

  ngOnInit(): void {
    const mbid: string = this.route.snapshot.paramMap.get('mbid');
    this.lastfmService.getArtistDetails(mbid)
      .subscribe(artist => this.artist = artist);
  }

}
