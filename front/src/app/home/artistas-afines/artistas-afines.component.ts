import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { Artista } from '../interfaces/home.interface';

@Component({
  selector: 'app-artistas-afines',
  templateUrl: './artistas-afines.component.html',
  styleUrls: ['./artistas-afines.component.scss']
})
export class ArtistasAfinesComponent implements OnInit{

  artistas:Artista[] = [];

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {

  }

}
