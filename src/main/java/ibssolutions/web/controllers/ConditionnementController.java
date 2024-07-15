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

import ibssolutions.entity.stockarticle.Conditionnement;
import ibssolutions.metiers.stockarticle.ConditionnementMetier;



@RestController
@RequestMapping("/api/conditionnement")
public class ConditionnementController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Conditionnement [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private ConditionnementMetier conditionnementMetier;
	
	@PostMapping(value = "/save" )
	public Conditionnement saveConditionnement(@RequestBody Conditionnement c)
	{
		return conditionnementMetier.addConditionnement(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Conditionnement updateConditionnement(@PathVariable(value ="id") Long id)
	{
		return conditionnementMetier.editeConditionnement(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteConditionnement ( @PathVariable(value ="id") Long id) 
	{
		conditionnementMetier.deleteConditionnement(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Conditionnement> ListeConditionnement() 
	{
		return conditionnementMetier.findAllOrdonly();
	}
	
}
