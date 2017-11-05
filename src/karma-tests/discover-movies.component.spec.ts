import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoverMoviesComponent } from '../app/discover-movies/discover-movies.component';
import { SearchService } from '../app/services/search.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DiscoverMoviesComponent', () => {
  let component: DiscoverMoviesComponent;
  let fixture: ComponentFixture < DiscoverMoviesComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DiscoverMoviesComponent],
        imports: [
          HttpModule,
          RouterTestingModule
        ],
        providers: [SearchService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
