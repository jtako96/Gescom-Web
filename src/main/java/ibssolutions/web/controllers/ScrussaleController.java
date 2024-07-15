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

import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.metiers.ScrussaleMetier;


@RestController
@RequestMapping("/api/scrussale/")
public class ScrussaleController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Scrussale [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 11/01/2022
	 */
	
	@Autowired
	private ScrussaleMetier scrussaleMetier;
	
	@PostMapping(value = "/save" )
	public Scrussale saveScrussale(@RequestBody Scrussale s)
	{
		return scrussaleMetier.addScrussale(s);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Scrussale updateScrussale(@PathVariable(value ="id") Long id)
	{
		return scrussaleMetier.editeScrussale(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteScrussale ( @PathVariable(value ="id") Long id) 
	{
		scrussaleMetier.deleteScrussale(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Scrussale> ListeScrussale() 
	{
		return scrussaleMetier.findAllOrdonly();
	}
	

	
}
