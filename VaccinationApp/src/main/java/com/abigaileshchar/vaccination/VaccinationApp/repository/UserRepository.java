package com.abigaileshchar.vaccination.VaccinationApp.repository;

import com.abigaileshchar.vaccination.VaccinationApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
