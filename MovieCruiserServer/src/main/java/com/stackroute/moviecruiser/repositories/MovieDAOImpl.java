package com.stackroute.moviecruiser.repositories;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.stackroute.moviecruiser.domain.Movie;
import com.stackroute.moviecruiser.exceptions.MovieNotFoundException;

@Repository
public class MovieDAOImpl implements MovieDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
	/**
	 * Save the movie in the database.
	 * 
	 */
	public boolean saveMovie(Movie movie) throws MovieNotFoundException {
		if (getSession().get(Movie.class, movie.getId()) != null) {
			throw new MovieNotFoundException("Could not save movie , Movie already exists!");
		}
		getSession().save(movie);
		return true;
	}

	/**
	 * update the movie in the database.
	 */
	public Movie updateMovieComments(Integer id, String comments) throws MovieNotFoundException {
		Movie movie = getSession().get(Movie.class, id);
		if (movie == null) {
			throw new MovieNotFoundException("Couldn't update movie. Movie not found!");
		}
		movie.setComments(comments);
		getSession().update(movie);
		return movie;
	}

	/**
	 * Delete the movie from the database.
	 */
	public boolean deleteMovieById(int id) throws MovieNotFoundException {
		Movie movie = getSession().get(Movie.class, id);
		if (movie == null) {
			throw new MovieNotFoundException("Could not delete , Movie not found!");
		}
		getSession().delete(movie);
		return true;
	}

	/**
	 * Return the movie having the passed id.
	 */
	public Movie getMovieById(int id) throws MovieNotFoundException {
		Movie movie = getSession().get(Movie.class, id);
		if (movie == null) {
			throw new MovieNotFoundException("Movie not found!");
		}
		return movie;
	}

	/**
	 * Return all the movies stored in the database.
	 */
	@SuppressWarnings("unchecked")
	public List<Movie> getAllMovies() {
		return getSession().createQuery("from Movie").list();
	}

}
