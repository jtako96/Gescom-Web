package ibssolutions.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

	@EnableWebSecurity
	@Configuration
	@EnableGlobalMethodSecurity(securedEnabled=true)
	public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		
		 @Autowired
		 DataSource dataSource;
		 
		 @Bean
			public PasswordEncoder passwordEncoder() {
				return new BCryptPasswordEncoder();
			}

			// Enable jdbc authentication
			@Autowired
			public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
				auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder());
			}
		 
		
	   @Autowired
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	      /*  auth.inMemoryAuthentication()

	                .withUser("ajay").password("test").roles("USER").and()
	                .withUser("demo").password("test21").roles("ADMIN");*/
	        
	        
	       // auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder())
	       // .usersByUsernameQuery(
	        		auth.jdbcAuthentication().dataSource(dataSource)
	    	        .usersByUsernameQuery(
	         "select username as principal,mot_de_passe as credentials, true from users where username=? and etat=true")
	        .authoritiesByUsernameQuery(
	         "select user_username as principal, roles_role as role from user_role where  user_username=?")
	        .rolePrefix("ROLE_");
	    }

	    @Override
	    protected void configure(HttpSecurity httpSecurity) throws Exception {

	        httpSecurity
	                .authorizeRequests()
	                .anyRequest()
	                
	                .authenticated()
	                
	                //.antMatchers("**/rest/*")
	                .and()
	                //.addFilterBefore(customFilter(), BasicAuthenticationFilter.class)
	                .formLogin()
	                .loginPage("/login")
	                .permitAll()
	                .defaultSuccessUrl("/layout")
	                .and()
	                .exceptionHandling().accessDeniedPage("/404");
	                //.and().csrf();
	               httpSecurity.csrf().disable();
	    }
	    
	    @Override
		public void configure(WebSecurity web) throws Exception {
		    web
		       .ignoring()
		      // .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**","/impressionrecu");
		    .antMatchers("/resources/**", "/static/**", "/assets/**", "/css/**", "/js/**");
		}

}
 
