package ibssolutions.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;

public class GetLoggers {

	
	 public static Map<String, Object> getUserLogger(HttpSession httpsession)
	{

		SecurityContext securityContext = (SecurityContext) httpsession.getAttribute("SPRING_SECURITY_CONTEXT");
		String username = securityContext.getAuthentication().getName();
		List<String> roles = new ArrayList<String>();

		for (GrantedAuthority ga : securityContext.getAuthentication().getAuthorities()) {

			roles.add(ga.getAuthority());

		}
		Map<String, Object> params = new HashMap<>();
		params.put("username", username);
		params.put("roles", roles);

		return params;

	}
	
}
