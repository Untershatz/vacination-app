package com.abigaileshchar.vaccination.VaccinationApp.service;

import com.abigaileshchar.vaccination.VaccinationApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.abigaileshchar.vaccination.VaccinationApp.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        // Perform any necessary business logic before saving the user
        // For example, you can validate the user data, perform additional computations, etc.
        // Once the business logic is complete, save the user object to the database
        return userRepository.save(user);
    }

    // Add any additional methods and business logic here
}
