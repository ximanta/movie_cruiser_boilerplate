import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from '../app/watchlist/watchlist.component';
import { MoviesService } from '../app/services/movies.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

const mockGetWatchlistResponse = [{
    'id': 33704,
    'name': 'Le Carton',
    'comments': '',
    'posterPath': '/4uH7XT0xB6ilhZe0UhgfGzHAmgz.jpg',
    'releaseDate': '1945-1-1',
    'voteAverage': 4.4,
    'voteCount': 120
  },
  {
    'id': 335984,
    'name': 'Blade Runner 2049',
    'comments': 'I would like to watch this complete',
    'posterPath': '/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg',
    'releaseDate': null,
    'voteAverage': 2,
    'voteCount': 89
  },
  {
    'id': 346364,
    'name': 'It',
    'comments': null,
    'posterPath': '/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
    'releaseDate': '2001-4-24',
    'voteAverage': 3,
    'voteCount': 250
  }
];

const updateCommentsResponse = [{
  'id': 33704,
  'name': 'Le Carton',
  'comments': 'this is the first movie to watch',
  'posterPath': '/4uH7XT0xB6ilhZe0UhgfGzHAmgz.jpg',
  'releaseDate': '1945-1-1',
  'voteAverage': 4.4,
  'voteCount': 120
}];

class Dummy {}

describe('WatchlistComponent - retrieval of watchlist', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture < WatchlistComponent > ;
  let mockBackend;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [WatchlistComponent],
        imports: [
          HttpModule,
          FormsModule,
          RouterTestingModule,
        ],
        providers: [MoviesService, { provide: XHRBackend, useClass: MockBackend }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    mockBackend = fixture.debugElement.injector.get(XHRBackend);
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') &&
        connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('same number of results should be rendered on the page as retrieved from the api', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let movieList = fixture.debugElement.queryAll(By.css('.moviePoster'));
    expect(movieList.length).toBe(3, `If there are three movies in watchlist, there should be
      three image elements on watchlist page decorated with class-name: 'moviePoster'`);
    movieList = fixture.debugElement.queryAll(By.css('.movieDescription'));
    expect(movieList.length).toBe(3, `If there are three movies in watchlist, there should be
      three elements on watchlist page decorated with class-name: 'movieDescription'`);
    movieList = fixture.debugElement.queryAll(By.css('.movieRating'));
    expect(movieList.length).toBe(3, `If there are three movies in watchlist, there should be
      three elements on watchlist page decorated with class-name: 'movieRating'`);
    movieList = fixture.debugElement.queryAll(By.css('.movieCommentsInpt'));
    expect(movieList.length).toBe(3, `If there are three movies in watchlist, there should be
      three input elements on watchlist page decorated with class-name: 'movieCommentsInpt'`);
    movieList = fixture.debugElement.queryAll(By.css('.movieUpdateCommentsBtn'));
    expect(movieList.length).toBe(3, `If there are three movies in watchlist, there should be
      three buttons on watchlist page decorated with class-name: 'movieUpdateCommentsBtn'`);
    movieList = fixture.debugElement.queryAll(By.css('.movieRemoveBtn'));
    expect(movieList.length).toBe(2, `If there are three movies in watchlist, there should be
      three buttons on watchlist page decorated with class-name: 'movieRemoveBtn'`);
  }));

  it('every list item should be showing up right in class:movieDescription', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieList = fixture.debugElement.queryAll(By.css('.movieDescription'));

    expect(movieList[0].nativeElement.innerText).toBe('Le Carton (1945)', `The element under
      first movie item in watchlist decorated with class-name:movieDescription is not
      displaying correctly`);
    expect(movieList[1].nativeElement.innerText).toBe('Blade Runner 2049 ()', `The element under
      second movie item in watchlist decorated with class-name:movieDescription is not
      displaying correctly`);
    expect(movieList[2].nativeElement.innerText).toBe('It (2001)', `The element under
      third movie item in watchlist decorated with class-name:movieDescription is not
      displaying correctly`);
  }));

  it('every list item should be showing up right in class:moviePoster', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieList = fixture.debugElement.queryAll(By.css('.moviePoster'));

    expect(movieList[0].properties.src).toBe('https://image.tmdb.org/t/p/w500/4uH7XT0xB6ilhZe0UhgfGzHAmgz.jpg',
      `The image element under first movie item in watchlist decorated with class-name:moviePoster is not pointing
      to the right source`);
    expect(movieList[1].properties.src).toBe('https://image.tmdb.org/t/p/w500/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg',
      `The image element under second movie item in watchlist decorated with class-name:moviePoster is not pointing
      to the right source`);
    expect(movieList[2].properties.src).toBe('https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
      `The image element under third movie item in watchlist decorated with class-name:moviePoster is not pointing
      to the right source`);
  }));

  it('every list item should be showing up right in class:movieRating', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieList = fixture.debugElement.queryAll(By.css('.movieRating'));

    expect(movieList[0].nativeElement.innerText).toBe('Rating: 4.4 (120)',
      `The element under first movie item in watchlist decorated with class-name:movieRating
      is not displaying correctly`);
    expect(movieList[1].nativeElement.innerText).toBe('Rating: 2 (89)',
      `The element under second movie item in watchlist decorated with class-name:movieRating
      is not displaying correctly`);
    expect(movieList[2].nativeElement.innerText).toBe('Rating: 3 (250)',
      `The element under third movie item in watchlist decorated with class-name:movieRating
      is not displaying correctly`);
  }));

  it('every list item should be showing up right in class:movieCommentsInpt', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieList = fixture.debugElement.queryAll(By.css('.movieCommentsInpt'));

    expect(movieList[0].nativeElement.value).toBe('', `The comments input element under
      first movie item in watchlist decorated with class-name:movieCommentsInpt should be empty`);
    expect(movieList[1].nativeElement.value).toBe('I would like to watch this complete', `The
      comments input element under first movie item in watchlist decorated with
      class-name:movieCommentsInpt should be set correctly`);
    expect(movieList[2].nativeElement.value).toBe('', `The comments input element under
      first movie item in watchlist decorated with class-name:movieCommentsInpt should be empty`);
  }));
});

describe('WatchlistComponent - navigation to movie details page', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture < WatchlistComponent > ;
  let mockBackend;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [WatchlistComponent],
        imports: [
          HttpModule,
          FormsModule,
          RouterTestingModule.withRoutes([{ path: 'movie/33704', component: Dummy },
            { path: 'movie/335984', component: Dummy },
            { path: 'movie/346364', component: Dummy }
          ]),
        ],
        providers: [MoviesService, { provide: XHRBackend, useClass: MockBackend }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    mockBackend = fixture.debugElement.injector.get(XHRBackend);
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') &&
        connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    location = fixture.debugElement.injector.get(Location);
  });

  it('every list item image click should switch to the movie detail page for right movieId', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieList = fixture.debugElement.queryAll(By.css('.moviePoster'));

    movieList[0].nativeElement.click();
    tick();
    expect(location.path()).toBe('/movie/33704', `Clicking on the image element of
      first movie item in watchlist decorated with class-name:moviePoster should
      redirect the page to corresponding movie detail page`);
    movieList[1].nativeElement.click();
    tick();
    expect(location.path()).toBe('/movie/335984', `Clicking on the image element of
      second movie item in watchlist decorated with class-name:moviePoster should
      redirect the page to corresponding movie detail page`);
    movieList[2].nativeElement.click();
    tick();
    expect(location.path()).toBe('/movie/346364', `Clicking on the image element of
      third movie item in watchlist decorated with class-name:moviePoster should
      redirect the page to corresponding movie detail page`);
  }));
});

describe('WatchlistComponent - updation of comments', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture < WatchlistComponent > ;
  let mockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [WatchlistComponent],
        imports: [
          HttpModule,
          FormsModule,
          RouterTestingModule,
        ],
        providers: [MoviesService, { provide: XHRBackend, useClass: MockBackend }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    mockBackend = fixture.debugElement.injector.get(XHRBackend);
  });

  it('first list item update comment button should pick the corresponding comment text and invoke the right api', fakeAsync(() => {
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') && connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie/33704')
      && connection.request.method === 2) {
        expect(connection.request.getBody()).toBe('comment on 33704', `Should send same text in
          request body of update comments movie service as set in input element for
          comments on the corresponding movie item`);
        connection.mockRespond(new Response(new ResponseOptions({
          body: ''
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieUpdateBtns = fixture.debugElement.queryAll(By.css('.movieUpdateCommentsBtn'));
    const movieCommentsInpt = fixture.debugElement.queryAll(By.css('.movieCommentsInpt'));

    movieCommentsInpt[0].nativeElement.value = 'comment on 33704';
    movieUpdateBtns[0].nativeElement.click();
  }));

  it('second list item update comment button should pick the corresponding comment text and invoke the right api', fakeAsync(() => {
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') && connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie/335984')
      && connection.request.method === 2) {
        expect(connection.request.getBody()).toBe('comment on 335984', `Should send same text in
          request body of update comments movie service as set in input element for
          comments on the corresponding movie item`);
        connection.mockRespond(new Response(new ResponseOptions({
          body: ''
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieUpdateBtns = fixture.debugElement.queryAll(
      By.css('.movieUpdateCommentsBtn'));
    const movieCommentsInpt = fixture.debugElement.queryAll(
      By.css('.movieCommentsInpt'));

    movieCommentsInpt[1].nativeElement.value = 'comment on 335984';
    movieUpdateBtns[1].nativeElement.click();
  }));

  it('third list item update comment button should pick the corresponding comment text and invoke the right api', fakeAsync(() => {
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') && connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie/346364')
      && connection.request.method === 2) {
        expect(connection.request.getBody()).toBe('comment on 346364', `Should send same text in
          request body of update comments movie service as set in input element for
          comments on the corresponding movie item`);
        connection.mockRespond(new Response(new ResponseOptions({
          body: ''
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieUpdateBtns = fixture.debugElement.queryAll(
      By.css('.movieUpdateCommentsBtn'));
    const movieCommentsInpt = fixture.debugElement.queryAll(
      By.css('.movieCommentsInpt'));

    movieCommentsInpt[2].nativeElement.value = 'comment on 346364';
    movieUpdateBtns[2].nativeElement.click();
  }));
});

describe('WatchlistComponent - removal from watchlist', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture < WatchlistComponent > ;
  let mockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [WatchlistComponent],
        imports: [
          HttpModule,
          FormsModule,
          RouterTestingModule,
        ],
        providers: [MoviesService, { provide: XHRBackend, useClass: MockBackend }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    mockBackend = fixture.debugElement.injector.get(XHRBackend);
  });

  it('first list item remove button should invoke right api to remove the item', fakeAsync(() => {
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie')
        && connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie/33704')
      && connection.request.method === 3) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: ''
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieRemoveBtns = fixture.debugElement.queryAll(By.css('.movieRemoveBtn'));

    movieRemoveBtns[0].nativeElement.click();
  }));

  it('second list item remove button should invoke right api to remove the item', fakeAsync(() => {
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') &&
        connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie/335984')
      && connection.request.method === 3) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: ''
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieRemoveBtns = fixture.debugElement.queryAll(By.css('.movieRemoveBtn'));

    movieRemoveBtns[1].nativeElement.click();
  }));

  it('third list item remove button should invoke right api to remove the item', fakeAsync(() => {
    mockBackend.connections.subscribe((connection) => {

      if (connection.request.url.startsWith('http://localhost:8080/v1.0/movieservice/movie') &&
        connection.request.method === 0) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGetWatchlistResponse)
        })));

      } else if (connection.request.url.startsWith(
        'http://localhost:8080/v1.0/movieservice/movie/346364')
      && connection.request.method === 3) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: ''
        })));

      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieRemoveBtns = fixture.debugElement.queryAll(By.css('.movieRemoveBtn'));

    movieRemoveBtns[2].nativeElement.click();
  }));
});
