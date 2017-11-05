import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoverTvComponent } from '../app/discover-tv/discover-tv.component';
import { SearchService } from '../app/services/search.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DiscoverTvComponent', () => {
  let component: DiscoverTvComponent;
  let fixture: ComponentFixture < DiscoverTvComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DiscoverTvComponent],
        imports: [
          HttpModule,
          RouterTestingModule
        ],
        providers: [SearchService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
