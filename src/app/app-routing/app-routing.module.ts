import { TvShowComponent } from './../tv-show/tv-show.component';
import { DiscoverTvComponent } from './../discover-tv/discover-tv.component';
import { DiscoverMoviesComponent } from './../discover-movies/discover-movies.component';
import { HomeComponent } from './../home/home.component';
import { WatchlistComponent } from './../watchlist/watchlist.component';
import { MovieComponent } from './../movie/movie.component';
import { SearchComponent } from './../search/search.component';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'tv/:id', component: TvShowComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'home', component: HomeComponent },
  { path: 'discover-movies', component: DiscoverMoviesComponent },
  { path: 'discover-tv', component: DiscoverTvComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
