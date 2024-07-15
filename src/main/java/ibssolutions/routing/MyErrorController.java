package ibssolutions.routing;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyErrorController implements ErrorController {

	private  static final String PATH = "/error";
	
	@Override
	public String getErrorPath() {
		// TODO Auto-generated method stub
		return PATH;
	}
	
	@RequestMapping(value=PATH)
	public String handlErrorPath() {
		// TODO Auto-generated method stub
		return "error";
	}

}
