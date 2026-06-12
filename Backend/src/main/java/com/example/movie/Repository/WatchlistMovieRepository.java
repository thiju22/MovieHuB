package com.example.movie.Repository;

import com.example.movie.WatchlistMovie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistMovieRepository
        extends JpaRepository<WatchlistMovie, Long> {

    List<WatchlistMovie> findByEmail(String email);
}