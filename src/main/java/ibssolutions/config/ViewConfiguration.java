package ibssolutions.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;


import nz.net.ultraq.thymeleaf.LayoutDialect;


public class ViewConfiguration extends WebMvcConfigurerAdapter {

	@Bean
	  public ViewResolver viewResolver() {
	    ThymeleafViewResolver resolver = new ThymeleafViewResolver();
	    resolver.setTemplateEngine(templateEngine());
	  
	    return resolver;
	  }
	
		
	@Bean
	  public ITemplateEngine templateEngine() {
	    SpringTemplateEngine engine = new SpringTemplateEngine();
	    engine.setEnableSpringELCompiler(true);
	    engine.setDialect(new LayoutDialect());
	    engine.setTemplateResolver(templateResolver());
	    return engine;
	  }
	
	 private ITemplateResolver templateResolver() {
		    SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
		    resolver.setCharacterEncoding("UTF-8");
		    resolver.setPrefix("classpath:/templates/");
		    resolver.setSuffix(".html");
		    resolver.setTemplateMode(TemplateMode.HTML);
		    resolver.setCacheable(false);
		    
		    return resolver;
		  }
	
	
}
