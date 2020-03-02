package com.stackroute.favouriteservice.repository;

import com.stackroute.favouriteservice.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends MongoRepository<User,String> {

   User findByUserName(String userName);
}
