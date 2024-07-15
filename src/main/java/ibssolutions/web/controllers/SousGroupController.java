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

import ibssolutions.entity.stockarticle.SousGroup;
import ibssolutions.metiers.stockarticle.SousGroupMetier;



@RestController
@RequestMapping("/api/sousGroup")
public class SousGroupController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité SousGroup [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private SousGroupMetier sousGroupMetier;
	
	@PostMapping(value = "/save" )
	public SousGroup saveSousGroup(@RequestBody SousGroup c)
	{
		return sousGroupMetier.addSousGroup(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public SousGroup updateSousGroup(@PathVariable(value ="id") Long id)
	{
		return sousGroupMetier.editeSousGroup(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteSousGroup ( @PathVariable(value ="id") Long id) 
	{
		sousGroupMetier.deleteSousGroup(id);
	}
	
	@GetMapping( value = "/liste")
	public List<SousGroup> ListeSousGroup() 
	{
		return sousGroupMetier.findAllOrdonly();
	}
	
}
