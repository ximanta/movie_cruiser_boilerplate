import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from '../app/home/home.component';
import { SearchService } from '../app/services/search.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture < HomeComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [
          HttpModule,
          RouterTestingModule
        ],
        providers: [SearchService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
