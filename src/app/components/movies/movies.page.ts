import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <div class="container">
      <div class="caricamento text-center">
        <div
          *ngIf="isLoading"
          class="spinner-grow text-light"
          style="width: 25px; height: 25px"
          role="status"
        ></div>
        <div
          *ngIf="isLoading"
          class="spinner-grow text-dark"
          style="width: 25px; height: 25px"
          role="status"
        ></div>
        <div
          *ngIf="isLoading"
          class="spinner-grow text-warning"
          style="width: 25px; height: 25px"
          role="status"
        ></div>
        <h3 id="caricamento" *ngIf="isLoading">Loading...</h3>
      </div>
      <div class="row justify-content-around ">
        <div
          *ngFor="let movie of movies"
          class="card text-center m-2 p-2 shadow-lg p-3 mb-5 rounded"
        >
          <img
            class="img-fluid"
            srcset="http://image.tmdb.org/t/p/w500{{movie.poster_path}}"
          />
          <div class="card-body">
            <h2 class="card-title">
              <strong>{{ movie.title }}</strong>
            </h2>
            <h3>
              Rilasciato il: <strong>{{ movie.release_date }}</strong>
            </h3>
            <h5>
              Lingua originale: <strong>{{ movie.original_language }}</strong>
            </h5>
            <h3>
              Voto medio: <strong>{{ movie.vote_average }}</strong>
            </h3>
          </div>
          <p
            class="rounded bg-light"
            *ngIf="!movie.like"
            (click)="miPiace(movie)"
          >
            👍
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        width: 30%;
        border-radius: 10px;
        box-shadow: 5px 5px 15px 5px #5a555e;
      }
      p {
        font-size: 30px;
        cursor: pointer;
        height: 20px;
        width: 20px;
      }
      img {
        border-radius: 10px;
      }
    `,
  ],
})
export class MoviesPage implements OnInit {
  constructor(private movieSrv: MovieService, private http: HttpClient) {}
  movies: Movie[] | undefined;
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    setInterval(() => {
      this.movies = this.movieSrv.movies;
      this.isLoading = false;
    }, 2000);
    if (!this.movies) {
      this.movieSrv.getMovies();
    }
  }

  miPiace(movie: Movie) {
    this.movieSrv.addFavorite(movie);
  }
}
