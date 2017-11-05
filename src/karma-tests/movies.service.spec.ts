import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod,
  HttpModule,
  XHRBackend
} from '@angular/http';
import { MoviesService } from '../app/services/movies.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { RouterTestingModule } from '@angular/router/testing';
describe('Http-SearchService (mockBackend)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [],
        imports: [HttpModule, RouterTestingModule],
        providers: [
          MoviesService,
          { provide: XHRBackend, useClass: MockBackend }
        ]
      })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
    inject([MoviesService], (service: MoviesService) => {
      expect(service instanceof MoviesService).toBe(true);
    }));
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    const service = new MoviesService(http);
    expect(service instanceof MoviesService).toBe(true, 'new service should be ok');
  }));
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

});
