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

import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.metiers.comptabilite.CompteMetier;


@RestController
@RequestMapping("/api/compte")
public class CompteController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Compte [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 26/01/2022
	 */
	
	@Autowired
	private CompteMetier compteMetier;
	
	@PostMapping(value = "/save" )
	public Compte saveCompte(@RequestBody Compte c)
	{
		return compteMetier.addCompte(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Compte updateCompte(@PathVariable(value ="id") Long id)
	{
		return compteMetier.editeCompte(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteCompte ( @PathVariable(value ="id") Long id) 
	{
		compteMetier.deleteCompte(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Compte> ListeCompte() 
	{
		return compteMetier.findAllOrdonly();
	}
	
	@GetMapping( value = "/liste/subdivision/{id}")
	public List<Compte> ListeCompteBySubdivision( @PathVariable(value ="id") Long id) 
	{
		return compteMetier.findAllOrdonlyBySubdivision(id);
	}
	
}
