package com.repairshop.data;

import com.repairshop.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    UserJdbcTemplateRepository repository;

    static boolean hasRun = false;

    @BeforeEach
    void setup() {
        if (!hasRun) {
            jdbcTemplate.update("call set_known_good_state();");
            hasRun = true;
        }
    }

    @Test
    void shouldFindAllUsers() {
        List<User> actual = repository.findAllUsers();
        assertTrue(actual.size() > 1 && actual.size() < 5);
    }

    @Test
    void shouldFindUserOneByUsername() {
        User actual = repository.findByUsername("user@one.com");

        assertEquals(1, actual.getAuthorities().size());
        assertTrue(actual.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN")));

    }

    @Test
    void shouldFindUserTwoByUsername() {
        User actual = repository.findByUsername("user@two.com");

        assertEquals(1, actual.getAuthorities().size());
        assertTrue(actual.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER")));
    }

    @Test
    void shouldCreateTestUser() {
        User user = new User(0, "testuser", "strongPassPhrase", true, List.of("USER"));

        User actual = repository.createUser(user);

        assertEquals(4, actual.getUserId());

        User test = repository.findByUsername("testuser");

        assertTrue(test.isEnabled());
        assertEquals("testuser", test.getUsername());
        assertEquals("strongPassPhrase", test.getPassword());
        assertEquals(1, test.getAuthorities().size());
        assertTrue(test.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER")));
    }

    @Test
    void shouldUpdateUserOne() {
        User userOne = repository.findByUsername("user@one.com");
        userOne.setEnabled(false);

        assertTrue(repository.updateUser(userOne));

        User updatedUserOne = repository.findByUsername("user@one.com");
        assertFalse(updatedUserOne.isEnabled());
    }

    @Test
    void shouldDeleteUser() {
        assertTrue(repository.deleteUserById(3));

        assertNull(repository.findByUsername("user@three.com"));
    }
}
