import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from '../app/search-results/search-results.component';
import { SearchService } from '../app/services/search.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture < SearchResultsComponent > ;
  let searchService: SearchService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [SearchResultsComponent],
        imports: [
          HttpModule,
          FormsModule,
          RouterTestingModule
        ],
        providers: [SearchService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should pick and show the movie results from searchService', () => {
    searchService = fixture.debugElement.injector.get(SearchService);
    fixture.detectChanges();
    searchService.sharedSearchResult = [{
      id: 1,
      poster_path: '/wRYZdWGCcC7ttY7MFNbIKpR3pnn.jpg',
      release_date: '2017-10-10',
      title: 'This is sample movie',
      vote_average: 1,
      vote_count: 2
    }];

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('movieTitle'));
  });
});
