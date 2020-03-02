package com.stackroute.userservice.service;


import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.exeption.UserAlreadyExistsException;
import com.stackroute.userservice.exeption.UserNotFoundException;

public interface UserService {

  public User saveUser(User user) throws UserAlreadyExistsException;

  public User findByUserNameAndAndPassword(String userName, String password) throws UserNotFoundException;
}
