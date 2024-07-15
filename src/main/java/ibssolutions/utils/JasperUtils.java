package ibssolutions.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsViewResolver;

@Configuration
public class JasperUtils extends WebMvcConfigurerAdapter {

	@Bean
	public JasperReportsViewResolver getJasperReportsViewResolver() 
	{
		   
		JasperReportsViewResolver resolver = new JasperReportsViewResolver();
		resolver.setPrefix("classpath:/etat/");
		resolver.setSuffix(".jrxml");
		resolver.setViewNames("report_*");
		resolver.setViewClass(JasperReportsMultiFormatView.class);
		resolver.setOrder(0);
		
		return resolver;
	}
}
