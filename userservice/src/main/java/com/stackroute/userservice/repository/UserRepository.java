package com.stackroute.userservice.repository;

import com.stackroute.userservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

    public User findByUserNameAndAndPassword(String userName,String password);

    public User findByUserName(String userName);
}
