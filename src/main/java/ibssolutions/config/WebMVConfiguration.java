package ibssolutions.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMVConfiguration extends WebMvcConfigurerAdapter{
	
	
	 @Override
	 public void addViewControllers(ViewControllerRegistry registry) 
	 {
			
		   registry.addViewController("/login").setViewName("login");
		   registry.addViewController("/logout").setViewName("login");
		   registry.addViewController("/403").setViewName("403");
			
	 }
	

}
