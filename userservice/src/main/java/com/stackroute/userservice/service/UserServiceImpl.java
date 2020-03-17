package com.stackroute.userservice.service;

import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.exeption.UserAlreadyExistsException;
import com.stackroute.userservice.exeption.UserNotFoundException;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

  private UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository){
    this.userRepository = userRepository;
  }
  @Override
  public User saveUser(User user) throws UserAlreadyExistsException {
    if(userRepository.findByUserName(user.getUserName())!=null){
      throw new UserAlreadyExistsException();
    }
    return userRepository.save(user);
  }

  @Override
  public User findByUserNameAndAndPassword(String userName, String password) throws UserNotFoundException {
    User user = userRepository.findByUserNameAndPassword(userName,password);
  if(user == null){
    throw new UserNotFoundException();
  }
  return user;
  }
}
