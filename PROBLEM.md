We have this MOVIE CRUISER application, which enables a user to search for movies from a third party database, add them to a common watchlist, update comments on watchlisted movies and remove them from watchlist, but voila! we don't have a way to view the list of watchlisted movies. We need your help here!

We are giving you following requirements according to which you have to add this feature to our Movie Cruiser.

###########
Backend
###########

Technologies used are spring boot, hibernate, java and mysql

Step 1. Define getAllMovies() method in the DAO and Service layer of the application,
which returns list of movies

Step 2. Define fetchAllMovies() in controller which calls the getAllMovies() method of service layer. This method shall support restful behaviour and mapped to following api -
URL - http://localhost:8080/v1.0/movieservice/movie
METHOD - GET

JUnit test cases for the methods that we just added are also supposed to be written 
so write one for controller and one for DAO.



##########
Frontend
##########

Step 1. Create a new component 'watchlist' (class-name: WatchlistComponent) in the application at path src/app/watchlist

Step 2. Bind the Component's template to the list of watchlisted movies fetched from server with the help of MoviesService

Step 3. Though you are free to show your creativity while building this view but we would be looking for some specific description for every movie item on the page -
	- Movie poster to be shown using an image element decorated with class-name 'moviePoster'. Clicking on the image shall lead the user to movie details page using route 'movie/:id'.
	- Movie description to be shown in a div in format '{{name}} ({{year of release}})', for example 'PK (2015)' and decorated with class-name 'movieDescription'
	- Movie ratings to be shown in a div in format 'Rating: {{vote average}} ({{vote count}})', for example 'Rating: 4.4 (120)' and decorated with class-name 'movieRating'
	- Enable posting comment on a movie. Add an input box with class 'movieCommentsInpt' and a button with class 'movieUpdateCommentsBtn' which shall call the service of updating movie comments. The input box should display the already set comments for the movie, if there are any. 
	- Enable removing movie from the watchlist. Add a button with class 'movieRemoveBtn' which shall call the service of removing movie from watchlist.

Step 4. Add a new route 'watchlist' triggering which the 'watchlist' component should get loaded in the <router-outlet>

Step 5. Add a new link with text 'Your Watchlist' in the NavBar of the page, which invokes 'watchlist' route.

Step 6. Try writing some unit and e2e test cases for your new component

Step 7. Ensure following commands pass before submitting your assignments -
	- 'ng lint' - to check for all lint rules
	- 'ng test' - to check for unit test cases
	- 'ng e2e' - to check for end to end test cases
