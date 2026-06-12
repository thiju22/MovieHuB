package com.example.movie;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WatchlistMovie {

    @Id
    @GeneratedValue
    private Long id;

    private String email;

    private Long movieId;
}
