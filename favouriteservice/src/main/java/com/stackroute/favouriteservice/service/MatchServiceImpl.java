package com.stackroute.favouriteservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.domain.Match;
import com.stackroute.favouriteservice.domain.User;
import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.exception.UserAlreadyExistsException;
import com.stackroute.favouriteservice.repository.UserRepository;
@Service
public class MatchServiceImpl implements MatchService{
private UserRepository userRepository;
@Autowired
public MatchServiceImpl(UserRepository userRepository) {
 this.userRepository = userRepository;
}
    @Override
    public User saveFavoriteMatchToList(Match match, String userName) throws MatchAlreadyExistsException {
    	User fetchedUser = Optional.ofNullable(userRepository.findByUserName(userName)).orElseGet(()->{
    	    User user = new User();
    	    user.setUserName(userName);
    	    return user;
        });
    	
        List<Match> fetchedMatches = fetchedUser.getFavouritematches();

        if(fetchedMatches!=null){
          for(Match existingMatch:fetchedMatches){
            if(existingMatch.getId().equals(match.getId())){
              throw new MatchAlreadyExistsException();
            }
          }
          fetchedMatches.add(match);
          userRepository.save(fetchedUser);
        }else{
        	fetchedMatches = new ArrayList<>();
        	fetchedMatches.add(match);
          fetchedUser.setFavouritematches(fetchedMatches);
          userRepository.save(fetchedUser);
        }
        return fetchedUser;
    }

    @Override
    public User deleteMatchFromFavouriteList(String userName, String matchId) throws MatchNotFoundException {
    	 User fetchUser = userRepository.findByUserName(userName);
    	    List<Match> fetchMathes = fetchUser.getFavouritematches();
    	    if(fetchMathes!=null && fetchMathes.size()>0){
    	      for(int i=0;i<fetchMathes.size();i++){
    	        if(matchId.equals(fetchMathes.get(i).getId())){
    	        	fetchMathes.remove(i);
    	          fetchUser.setFavouritematches(fetchMathes);
    	          userRepository.save(fetchUser);
    	          break;
    	        }
    	      }

    	    }else{
    	      throw new MatchNotFoundException();
    	    }
    	    return fetchUser;
    }

    @Override
    public User updateCommentForMatch(String comments, String matchId, String userName) throws MatchNotFoundException {
    	User fetchUser = userRepository.findByUserName(userName);
        List<Match> fetchMatches = fetchUser.getFavouritematches();

        if(fetchMatches.size()>0){
          for(int i=0;i<fetchMatches.size();i++){
            if(matchId.equals(fetchMatches.get(i).getId())){
            	fetchMatches.get(i).setComments(comments);
            	userRepository.save(fetchUser);
              break;
            }
          }

        }else{
          throw new MatchNotFoundException();
        };
        return fetchUser;
    }

    @Override
    public List<Match> getAllFavouriteMatches(String userName) throws Exception {
    	return userRepository.findByUserName(userName).getFavouritematches();
    }


}
