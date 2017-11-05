import { RouterModule } from '@angular/router';
// Importing necessary modules
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Importing necessary Services
import { MoviesService } from './services/movies.service';
import { SearchService } from './services/search.service';

// Importing necessary components
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { MovieComponent } from './movie/movie.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { HomeComponent } from './home/home.component';
import { DiscoverMoviesComponent } from './discover-movies/discover-movies.component';
import { DiscoverTvComponent } from './discover-tv/discover-tv.component';
import { TvShowComponent } from './tv-show/tv-show.component';

export const myComponents = [
  AppComponent,
  SearchResultsComponent,
  SearchComponent,
  MovieComponent,
  WatchlistComponent,
  HomeComponent,
  DiscoverMoviesComponent,
  DiscoverTvComponent,
  TvShowComponent
];

@NgModule({
  declarations: [
    ...myComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    RouterModule
  ],
  providers: [MoviesService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
