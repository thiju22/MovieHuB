package com.example.movie.Repository;

import com.example.movie.FavoriteMovie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteMovieRepository
        extends JpaRepository<FavoriteMovie, Long> {

    List<FavoriteMovie> findByEmail(String email);
}