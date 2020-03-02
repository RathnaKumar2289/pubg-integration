package com.stackroute.userservice.service;

import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.exeption.UserAlreadyExistsException;
import com.stackroute.userservice.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;


import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class UserServiceTest {
  @Mock
  private UserRepository  userRepository;
  private User user;

  @InjectMocks
  private UserServiceImpl userService;


  @Before
  public void setUp(){
    MockitoAnnotations.initMocks(this);
    user = new User();
    user.setUserName("John");
    user.setPassword("John123");

  }

  @Test
  public void testSaveUserSuccess() throws UserAlreadyExistsException {
    Mockito.when(userRepository.save(user)).thenReturn(user);
    User fetchUser = userService.saveUser(user);
    Assert.assertEquals(user,fetchUser);
    verify(userRepository,times(1)).save(user);
  }

  @Test
  public void testFindByUserNameAndPassword(){
    Mockito.when(userRepository.findByUserNameAndAndPassword(user.getUserName(),user.getPassword())).thenReturn(user);
    User fetchedUser = userRepository.findByUserNameAndAndPassword(user.getUserName(),user.getPassword());
    Assert.assertEquals(user.getUserName(),fetchedUser.getUserName());
    verify(userRepository,times(1)).findByUserNameAndAndPassword(user.getUserName(),user.getPassword());
  }
}
