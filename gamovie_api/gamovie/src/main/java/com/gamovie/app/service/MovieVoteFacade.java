package com.gamovie.app.service;

import java.time.LocalDate;
import java.util.List;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.gamovie.app.dto.MovieVoteDTO;
import com.gamovie.app.entity.Movie;
import com.gamovie.app.entity.MovieVote;
import com.gamovie.app.entity.User;

@Service
public class MovieVoteFacade {
	
	@Autowired
	private MovieVoteService movieVoteService;
	
	@Autowired
	private MovieService movieService;
	
	@Autowired
	  private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public MovieVoteDTO findById(int id) {
		return convertToMovieVoteDTO(movieVoteService.findById(id));
	}
	
	public List<MovieVote> allVotesByUserId(int id) {
		User user= userService.findById(id);
		return movieVoteService.allVotesByUserId(user);
	}
	
	public MovieVote addMovieVote(int user_id, int movie_id, int user_note) {
		User theUser= userService.findById(user_id);
		Movie theMovie= movieService.findById(movie_id);
		LocalDate voted_at= LocalDate.now();
		MovieVote theMovieVote= new MovieVote();
		theMovieVote.setMovie(theMovie);
		theMovieVote.setUser(theUser);
		theMovieVote.setVoted_at(voted_at);
		theMovieVote.setVote(user_note);
		movieVoteService.save(theMovieVote);
		return theMovieVote;
	}
	
	public MovieVote updateMovieVote(int id, int user_note) {
		MovieVote theMovieVote= movieVoteService.findById(id);
		theMovieVote.setVote(user_note);
		movieVoteService.save(theMovieVote);
		return theMovieVote;
	}
	
	public void deleteById(int id) {
		movieVoteService.deleteBy(id);
	}
	
	private MovieVoteDTO convertToMovieVoteDTO(MovieVote movieVote) {
		MovieVoteDTO movieVoteDto = modelMapper.map(movieVote, MovieVoteDTO.class);
		return movieVoteDto;
	}

	public MovieVote convertToMovieVote(MovieVoteDTO movieVoteDTO) {
		MovieVote movieVote = modelMapper.map(movieVoteDTO, MovieVote.class);
		return movieVote;
	}
}
