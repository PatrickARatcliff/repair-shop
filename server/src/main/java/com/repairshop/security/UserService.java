package com.repairshop.security;

import com.repairshop.data.UserRepository;
import com.repairshop.domain.ActionStatus;
import com.repairshop.domain.Result;
import com.repairshop.models.User;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repository,
                          PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<User> loadAllUsers() {
        return repository.findAllUsers();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);

        if (user == null || !user.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return user;
    }

    public Result<User> create(String username, String password) {
        Result<User> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        User user = new User(0, username, password, true, List.of("USER"));

        try {
            user = repository.createUser(user);
            result.setPayload(user);
        } catch (DuplicateKeyException e) {
            result.addMessage(ActionStatus.INVALID, "The provided username already exists.");
        }

        return result;
    }

    public Result<User> update(User user) {
        Result<User> result = validate(user.getUsername(), user.getPassword());
        if (!result.isSuccess()) {
            return result;
        }

        String password = encoder.encode(user.getPassword());

        User newUser = new User(user.getUserId(), user.getUsername(), password, user.isEnabled(), List.of(String.valueOf(user.getAuthorities())));

        System.out.println(newUser);

        try {
            boolean success = repository.updateUser(newUser);
            if (success) {
                result.setPayload(newUser);
            } else {
                result.addMessage(ActionStatus.INVALID, "Update operation failed. Please try again later.");
            }
        } catch (DuplicateKeyException e) {
            result.addMessage(ActionStatus.INVALID, "The provided username already exists.");
        }

        return result;
    }

    public Result<User> delete(int userId) {
        Result<User> result = new Result<>();
        boolean deleted = repository.deleteUserById(userId);
        if (!deleted) {
            result.addMessage(ActionStatus.NOT_FOUND, "user id `" + userId + "` not found.");
        }
        return result;
    }

    private Result<User> validate(String username, String password) {
        Result<User> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage(ActionStatus.INVALID, "Username is required.");
            return result;
        }

        if (password == null) {
            result.addMessage(ActionStatus.INVALID, "Password is required.");
            return result;
        }

        if (username.length() > 50) {
            result.addMessage(ActionStatus.INVALID, "Username must be less than 50 characters.");
        }

        if (!isValidPassword(password)) {
            result.addMessage(ActionStatus.INVALID,
                    "password must be at least 8 character and contain a digit," +
                            " a letter, and a non-digit/non-letter");
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}
