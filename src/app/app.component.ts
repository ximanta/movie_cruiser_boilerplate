import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Movie Cruiser';

  constructor(private searchService: SearchService, private router: Router) {}

  searchQuery: string;
  navigateTo() {
    const link = ['/search-results'];
    this.router.navigate(link);
  }

  public search() {
    this.searchService.find(this.searchQuery).then(response => {
      this.searchService.sharedSearchResult = response.results;
      this.navigateTo();
    });
  }
}
