package com.stackroute.favouriteservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.constants.FavouriteServiceConstants;
import com.stackroute.favouriteservice.domain.Match;
import com.stackroute.favouriteservice.domain.User;
import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.exception.UserAlreadyExistsException;
import com.stackroute.favouriteservice.model.Response;
import com.stackroute.favouriteservice.service.MatchService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/userservice")
public class FavouriteController {

 private ResponseEntity responseEntity;
 private MatchService matchService;

 @Autowired
 public FavouriteController(MatchService matchService) {
  this.matchService = matchService;
 }

@PostMapping("/user/{username}/match")
public ResponseEntity<?> saveFavoriteMatchToList(@RequestBody Match match, @PathVariable("username") String username) 
		throws MatchAlreadyExistsException {
  try {
    User user = matchService.saveFavoriteMatchToList(match, username);
    responseEntity = new ResponseEntity(new Response(FavouriteServiceConstants.SAVE_MESSAGE), HttpStatus.CREATED);
  } catch (MatchAlreadyExistsException e) {
    throw new MatchAlreadyExistsException();
  } catch (Exception e) {
    responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
  }
  return responseEntity;

}

@PatchMapping("/user/{username}/match")
public ResponseEntity<?> updateCommentForFavouriteMatch(@RequestBody Match match,@PathVariable("username") String username) 
		throws MatchNotFoundException {
  try {
    matchService.updateCommentForMatch(match.getComments(), match.getId(),username);
    responseEntity = new ResponseEntity(new Response(FavouriteServiceConstants.UPDATE_MESSAGE), HttpStatus.OK);
  } catch (MatchNotFoundException e) {
    throw new MatchNotFoundException();
  } catch (Exception e) {
    responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
  }
  return responseEntity;

}

@DeleteMapping("/user/{username}/match")
public ResponseEntity<?> deleteFavouriteMatch(@PathVariable("username") String username, @RequestBody Match match) 
		throws MatchNotFoundException {
  try {
    matchService.deleteMatchFromFavouriteList(username, match.getId());
    responseEntity = new ResponseEntity(new Response(FavouriteServiceConstants.DELETE_MESSAGE), HttpStatus.OK);
  } catch (MatchNotFoundException e) {
    throw new MatchNotFoundException();
  } catch (Exception e) {
    responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
  }
  return responseEntity;

}

@GetMapping("/user/{username}/matches")
public ResponseEntity<?> getAllFavouriteMatches( @PathVariable("username") String userName) {
  try {
    responseEntity = new ResponseEntity(matchService.getAllFavouriteMatches(userName), HttpStatus.OK);
  } catch (Exception e) {
    responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
  }
  return responseEntity;

}

}
