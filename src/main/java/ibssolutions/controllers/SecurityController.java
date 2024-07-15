package ibssolutions.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.dao.RoleRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.Role;
import ibssolutions.entity.parametre.User;



@RestController
@RequestMapping(value = "/Security/")
public class SecurityController {
	
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping (value="/addRole")
	public Role addrole(@RequestBody Role role){
		return roleRepository.save(role);
	}
	
	@GetMapping (value="/listeRole")
	public List<Role> listerole(){
		return roleRepository.findAll();
	}
	
	@GetMapping (value="/updaterole/{role}")
	public Role editerole(@PathVariable String role){
		return roleRepository.findOne(role);
	}
	
	@PostMapping (value="/addUser")
	public User addUser (@RequestBody User u) 
	{
		u.setEtat(true);
		return userRepository.save(u);
	}
	
	@GetMapping (value="/updateUser/{username}")
	public User editeUser(@PathVariable String username){
		return userRepository.findOne(username);
	}
	
	@GetMapping (value="/listeUser")
	public List<User> listeUser(){
		
		return userRepository.findAll();
	}
	
	@GetMapping (value="/validerprofil/{username}/{password}")
	public User addus(@PathVariable String username,@PathVariable String password){
		User u = new User();
		u.setPassword(password);
		u.setUsername(username);
		userRepository.save(u);
	    return u;
	}
	
	@GetMapping (value="/listeprofil")
	public List<User> listeuser(){
		return userRepository.findAll();
	}
	
	@GetMapping(value = "/validerprofil1/{username}/{password}/{httpsession}")
	public User validerprofil(@PathVariable String username,@PathVariable String password,@PathVariable HttpSession httpsession) {
		User u =userRepository.findOne(username);
		 u.setPassword(password);
		return userRepository.save(u);
	} 
	
	@GetMapping(value = "/trouverprofil/{u}/{httpsession}")
	public User trouverprofil(@PathVariable String u,@PathVariable HttpSession httpsession) {
		SecurityContext securityContext = (SecurityContext) httpsession.getAttribute("SPRING_SECURITY_CONTEXT");
		 u = securityContext.getAuthentication().getName();
		return userRepository.findOne(u);
	} 
	
	@GetMapping (value="/trouveradmin/{u}")
	public User editeuser(@PathVariable String u){
		return userRepository.findOne(u);
	}
	
	@GetMapping (value="/activerprofil/{u}")
	public User activuser(@PathVariable String u){
		User us = userRepository.findOne(u);
		System.out.println("ma function " +us.getNomComplet());
		us.setEtat(true);
	    userRepository.save(us);
	    return us;
	}
	
	@GetMapping (value="/desactiverprofil/{u}")
	public User desactivuser(@PathVariable String u){
		User us = userRepository.findOne(u);
		us.setEtat(false);
		userRepository.save(us);
		return us;
	}
	
	@GetMapping (value="/activerprofiltout")
	public void  activuserall(){
		List<User> us = userRepository.listeProfilDesactiver();
		for (User users : us) {
			users.setEtat(true);
			userRepository.save(users);
		}
	}
	
	@GetMapping (value="/desactiverprofiltout")
	public void  desactivuserall(){
		List<User> us = userRepository.listeProfilActiver();
		for (User users : us) {
			users.setEtat(false);
			userRepository.save(users);
		}
	}
	
	@GetMapping (value="/addUserToRole/{username}/{role}")
	public void addUserToRole(@PathVariable String username,@PathVariable String role){
		 User u=editeuser(username);
		 Role r=editerole(role);		  
	     u.getRoles().add(r);
	     userRepository.save(u);
	}
	
	@PostMapping(value = "/addRoleToUser2/{username}/{role}")
	public User addRoleToUser(@PathVariable String username,@PathVariable String role) {
		User p = userRepository.findOne(username);
		Role r = roleRepository.findOne(role);
		p.getRoles().add(r);
		System.out.println("xklfvndfkjbndfbk======= " +p);
		return userRepository.save(p);
	}
	
	@RequestMapping (value="/getLoggers")
	public User getLogger(HttpSession httpsession) {
		
		SecurityContext securityContext = (SecurityContext) httpsession.getAttribute("SPRING_SECURITY_CONTEXT");
		String  u = securityContext.getAuthentication().getName();	
		return userRepository.findOneUserName(u);
		
	}

}
