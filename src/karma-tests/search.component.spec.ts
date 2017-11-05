import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from '../app/search/search.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../app/services/search.service';
import { SearchStub } from './search.service.stub';

const mockResult = [{
  adult: false,
  backdrop_path: '/mA3cMu5YdLQ6GgNf5kwTWINDXfC.jpg',
  id: 45132,
  original_language: 'en',
  original_title: 'Super',
  overview: 'After his wife falls under the influence of a drug dealer.',
  popularity: 11.743972,
  poster_path: '/wRYZdWGCcC7ttY7MFNbIKpR3pnn.jpg',
  release_date: '2010-09-09',
  title: 'Super',
  video: false,
  vote_average: 6.6,
  vote_count: 446
}];

class Dummy {

}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture < SearchComponent > ;
  let searchInput;
  let button;
  let searchService: SearchService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [SearchComponent],
        imports: [
          HttpModule,
          FormsModule,
          RouterTestingModule.withRoutes([{ path: 'search-results', component: Dummy }])
        ],
        providers: [{ provide: SearchService, useClass: SearchStub }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to make a search and set state of searchService', fakeAsync(() => {
    searchService = fixture.debugElement.injector.get(SearchService);
    searchInput = fixture.debugElement.nativeElement.querySelector('#search-box');
    button = fixture.debugElement.nativeElement.querySelector('#search-button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(searchService.sharedSearchResult).toEqual(mockResult);

  }));
});
