package com.example.movie.controller;


import com.example.movie.User;
import com.example.movie.JwtUtil;
import com.example.movie.Repository.UserRepository;
import com.example.movie.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")

public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = passwordEncoder.encode(body.get("password"));

        if (userRepository.findByEmail(email).isPresent()) {
            return new ResponseEntity<>(
                    "Email Already Exists",
                    HttpStatus.CONFLICT
            );
        }
        userService.createUser(
                User.builder()
                        .email(email)
                        .password(password)
                        .build()
        );

        return new ResponseEntity<>(
                "Successfully Registered",
                HttpStatus.CREATED
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        var userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(
                    "User Not Registered",
                    HttpStatus.UNAUTHORIZED
            );
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>(
                    "Invalid Password",
                    HttpStatus.UNAUTHORIZED
            );
        }

        String token = jwtUtil.generateToken(email);

        return ResponseEntity.ok(
                Map.of("token", token)
        );
    }
}


