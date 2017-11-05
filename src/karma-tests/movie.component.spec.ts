import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieComponent } from '../app/movie/movie.component';
import { MoviesService } from '../app/services/movies.service';
import { SearchService } from '../app/services/search.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture < MovieComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [MovieComponent],
        imports: [
          HttpModule,
          RouterTestingModule
        ],
        providers: [MoviesService, SearchService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
