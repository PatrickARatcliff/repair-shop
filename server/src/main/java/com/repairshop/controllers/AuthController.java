package com.repairshop.controllers;

import com.repairshop.domain.ActionStatus;
import com.repairshop.domain.Result;
import com.repairshop.models.Appointment;
import com.repairshop.models.User;
import com.repairshop.security.UserService;
import com.repairshop.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter converter,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody Map<String, String> credentials) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                String jwtToken = converter.getTokenFromUser((User) authentication.getPrincipal());

                HashMap<String, String> map = new HashMap<>();
                map.put("jwt_token", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }

        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<Map<String, String>> refreshToken(@AuthenticationPrincipal User user) {
        String jwtToken = converter.getTokenFromUser(user);

        HashMap<String, String> map = new HashMap<>();
        map.put("jwt_token", jwtToken);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/create_account")
    public ResponseEntity<?> createAccount(@RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        Result<User> result = userService.create(username, password);

        if (!result.isSuccess()) {
            new ResponseEntity<>(result.getStatus() == ActionStatus.INVALID ? result.getMessages() : result.getPayload(), getStatus(result, HttpStatus.CREATED));
        }

        HashMap<String, Integer> map = new HashMap<>();
        map.put("userId", result.getPayload().getUserId());

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    private HttpStatus getStatus(Result<User> result, HttpStatus statusDefault) {
        switch (result.getStatus()) {
            case INVALID:
                return HttpStatus.BAD_REQUEST;
            case DUPLICATE:
                return HttpStatus.FORBIDDEN;
            case NOT_FOUND:
                return HttpStatus.NOT_FOUND;
        }
        return statusDefault;
    }
}
