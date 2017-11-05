import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowComponent } from '../app/tv-show/tv-show.component';
import { SearchService } from '../app/services/search.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('TvShowComponent', () => {
  let component: TvShowComponent;
  let fixture: ComponentFixture < TvShowComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [TvShowComponent],
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
    fixture = TestBed.createComponent(TvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
