package com.gamovie.app.service;

import java.util.List;

import com.gamovie.app.entity.Movie;

public interface MovieService {
	/**
	 * Find all.
	 *
	 * @return the list
	 */
	public List<Movie> findAll();

	/**
	 * Find by id.
	 *
	 * @param theId the the id
	 * @return the movie
	 */
	public Movie findById(int theId);

	/**
	 * Save.
	 *
	 * @param theMovie the the movie
	 */
	public void save(Movie theMovie);

	/**
	 * Delete by.
	 *
	 * @param theId the the id
	 */
	public void deleteBy(int theId);
}
