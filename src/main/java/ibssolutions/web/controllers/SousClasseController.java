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

import ibssolutions.entity.comptabilite.SousClasse;
import ibssolutions.metiers.comptabilite.SousClasseMetier;


@RestController
@RequestMapping("/api/sousClasse")
public class SousClasseController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité SousClasse [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private SousClasseMetier sousClasseMetier;
	
	@PostMapping(value = "/save" )
	public SousClasse saveSousClasse(@RequestBody SousClasse c)
	{
		return sousClasseMetier.addSousClasse(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public SousClasse updateSousClasse(@PathVariable(value ="id") Long id)
	{
		return sousClasseMetier.editeSousClasse(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteSousClasse ( @PathVariable(value ="id") Long id) 
	{
		sousClasseMetier.deleteSousClasse(id);
	}
	
	@GetMapping( value = "/liste")
	public List<SousClasse> ListeSousClasse() 
	{
		return sousClasseMetier.findAllOrdonly();
	}
	
	@GetMapping( value = "/liste/classe/{id}")
	public List<SousClasse> ListeSousClasseByClasse( @PathVariable(value ="id") Long id) 
	{
		return sousClasseMetier.findAllOrdonlyByClasse(id);
	}
}
