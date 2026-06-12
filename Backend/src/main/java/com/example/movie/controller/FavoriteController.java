package com.example.movie.controller;

import com.example.movie.FavoriteMovie;
import com.example.movie.Repository.FavoriteMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteMovieRepository favoriteMovieRepository;

    @PostMapping("/add")
    public FavoriteMovie addFavorite(
            @RequestBody FavoriteMovie favoriteMovie) {

        return favoriteMovieRepository.save(favoriteMovie);
    }

    @GetMapping("/{email}")
    public List<FavoriteMovie> getFavorites(
            @PathVariable String email) {

        return favoriteMovieRepository.findByEmail(email);
    }
}