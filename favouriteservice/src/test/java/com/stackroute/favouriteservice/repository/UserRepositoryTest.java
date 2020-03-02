package com.stackroute.favouriteservice.repository;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.favouriteservice.domain.Match;
import com.stackroute.favouriteservice.domain.MatchAttributes;
import com.stackroute.favouriteservice.domain.User;

@RunWith(SpringRunner.class)
@DataMongoTest
public class UserRepositoryTest {
	@Autowired
	private UserRepository userRepository;
	private Match match;
	private MatchAttributes attributes;
	private User user;

	@Before
	public void setUp() {
		MatchAttributes matchAttributes = new MatchAttributes("2020-01-11T10:24:34Z", 1791, "esports-squad",
				"Baltic_Main", "bluehole-pubg", "progress");
		match = new Match("1234", "test", matchAttributes);
		List<Match> matches = new ArrayList();
		matches.add(match);
		user = new User("John123", "john@gmail.com", matches);
	}

	@After
	public void tearDown() {

		userRepository.deleteAll();
	}
	
	@Test
	  public void testSaveMatch() {
		userRepository.save(user);
	    User fetchUser = userRepository.findByUserName(user.getUserName());
	    Match fetchedMatch = fetchUser.getFavouritematches().get(0);
	    Assert.assertEquals(fetchedMatch.getId(), user.getFavouritematches().get(0).getId());
	  }

}
