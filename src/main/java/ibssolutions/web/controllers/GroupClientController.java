package ibssolutions.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.clientelle.GroupClient;
import ibssolutions.metiers.clientelle.GroupClientMetier;



@RestController
@RequestMapping("/api/groupClient")
public class GroupClientController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité GroupClient [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 14/01/2022
	 */
	
	@Autowired
	private GroupClientMetier groupClientMetier;
	
	@PostMapping(value = "/save" )
	public GroupClient saveGroupClient(@RequestBody GroupClient g)
	{
		return groupClientMetier.addGroupClient(g);
	}
	
	@GetMapping(value = "/edite/{id}")
	public GroupClient updateGroupClient(@PathVariable(value ="id") Long id)
	{
		return groupClientMetier.editeGroupClient(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteGroupClient ( @PathVariable(value ="id") Long id) 
	{
		groupClientMetier.deleteGroupClient(id);
	}
	
	@GetMapping( value = "/liste")
	public List<GroupClient> ListeGroupClient() 
	{
		return groupClientMetier.findAllGroupClient();
	}
	
}
