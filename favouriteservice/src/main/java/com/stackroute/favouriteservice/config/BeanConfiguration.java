package com.stackroute.favouriteservice.config;

import com.stackroute.favouriteservice.filter.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public FilterRegistrationBean jwtFilter(){
        final FilterRegistrationBean  registrationBean =  new FilterRegistrationBean();
        registrationBean.setFilter(new JwtFilter());
        registrationBean.addUrlPatterns("/api/v1/userservice/user/*");
        return  registrationBean;
    }
}
