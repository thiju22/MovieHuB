package com.example.movie.controller;

import com.example.movie.Repository.WatchlistMovieRepository;
import com.example.movie.WatchlistMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistMovieRepository watchlistMovieRepository;

    @PostMapping("/add")
    public WatchlistMovie addWatchlist(
            @RequestBody WatchlistMovie watchlistMovie) {

        return watchlistMovieRepository.save(watchlistMovie);
    }

    @GetMapping("/{email}")
    public List<WatchlistMovie> getWatchlist(
            @PathVariable String email) {

        return watchlistMovieRepository.findByEmail(email);
    }
}