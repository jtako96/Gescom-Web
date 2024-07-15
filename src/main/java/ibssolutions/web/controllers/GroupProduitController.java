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

import ibssolutions.entity.stockarticle.GroupProduit;
import ibssolutions.metiers.stockarticle.GroupProduitMetier;



@RestController
@RequestMapping("/api/groupProduit")
public class GroupProduitController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité GroupProduit [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private GroupProduitMetier groupProduitMetier;
	
	@PostMapping(value = "/save" )
	public GroupProduit saveGroupProduit(@RequestBody GroupProduit c)
	{
		return groupProduitMetier.addGroupProduit(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public GroupProduit updateGroupProduit(@PathVariable(value ="id") Long id)
	{
		return groupProduitMetier.editeGroupProduit(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteGroupProduit ( @PathVariable(value ="id") Long id) 
	{
		groupProduitMetier.deleteGroupProduit(id);
	}
	
	@GetMapping( value = "/liste")
	public List<GroupProduit> ListeGroupProduit() 
	{
		return groupProduitMetier.findAllOrdonly();
	}
	
}
