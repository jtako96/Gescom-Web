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

import ibssolutions.entity.parametre.Societe;
import ibssolutions.metiers.SocieteMetier;


@RestController
@RequestMapping("/api/societe/")
public class SocieteController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Societe [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 11/01/2022
	 */
	
	@Autowired
	private SocieteMetier societeMetier;
	
	@PostMapping(value = "/save" )
	public Societe saveSociete(@RequestBody Societe s)
	{
		return societeMetier.addSociete(s);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Societe updateSociete(@PathVariable(value ="id") Long id)
	{
		return societeMetier.editeSociete(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteSociete ( @PathVariable(value ="id") Long id) 
	{
		societeMetier.deleteSociete(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Societe> ListeSociete() 
	{
		return societeMetier.findAllOrdonly();
	}
	

	
}
