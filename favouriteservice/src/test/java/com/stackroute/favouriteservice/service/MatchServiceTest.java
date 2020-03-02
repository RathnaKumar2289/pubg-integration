package com.stackroute.favouriteservice.service;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.stackroute.favouriteservice.domain.Match;
import com.stackroute.favouriteservice.domain.MatchAttributes;
import com.stackroute.favouriteservice.domain.User;
import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.repository.UserRepository;

public class MatchServiceTest {

	@Mock
	private UserRepository userRepository;

	private Match match;
	private MatchAttributes matchAttributes;
	private User user;
	List<Match> matches;
	@InjectMocks
	private MatchServiceImpl matchService;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		matchAttributes = new MatchAttributes("2020-01-11T10:24:34Z", 1791, "esports-squad", "Baltic_Main",
				"bluehole-pubg", "progress");
		match = new Match("1234", "test", matchAttributes);
		matches = new ArrayList();
		matches.add(match);
		user = new User("John123", "john@gmail.com", matches);
	}

	@After
	public void tearDown() {
		matchAttributes = null;
		match = null;
		user = null;
	}

	@Test
	public void testSaveFavoriteMatchToList() throws MatchAlreadyExistsException {
		user = new User("John156", "john@gmail.com", null);
		when(userRepository.findByUserName(user.getUserName())).thenReturn(user);
		User fetchedUser = matchService.saveFavoriteMatchToList(match, user.getUserName());
		Assert.assertEquals(fetchedUser, user);
		verify(userRepository, times(1)).findByUserName(user.getUserName());
		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void testDeleteMatchFromFavouriteList() throws MatchNotFoundException {
		when(userRepository.findByUserName(user.getUserName())).thenReturn(user);
		User fetchedUser = matchService.deleteMatchFromFavouriteList(user.getUserName(), match.getId());
		Assert.assertEquals(fetchedUser, user);
		verify(userRepository, times(1)).findByUserName(user.getUserName());
		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void testUpdateCommentForMatch() throws MatchNotFoundException {
		when(userRepository.findByUserName(user.getUserName())).thenReturn(user);
		User fetchedUser = matchService.updateCommentForMatch("new updated comments", match.getId(),
				user.getUserName());
		Assert.assertEquals(fetchedUser.getFavouritematches().get(0).getComments(), "new updated comments");
		verify(userRepository, times(1)).findByUserName(user.getUserName());
		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void testGetAllFavouriteMatches() throws Exception {
		when(userRepository.findByUserName(user.getUserName())).thenReturn(user);
		List<Match> fetchedMatches = matchService.getAllFavouriteMatches(user.getUserName());
		Assert.assertEquals(fetchedMatches, matches);
		verify(userRepository, times(1)).findByUserName(user.getUserName());
	}
	

}
