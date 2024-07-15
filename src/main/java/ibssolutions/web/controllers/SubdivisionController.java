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

import ibssolutions.entity.comptabilite.Subdivision;
import ibssolutions.metiers.comptabilite.SubdivisionMetier;


@RestController
@RequestMapping("/api/subdivision")
public class SubdivisionController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Subdivision [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private SubdivisionMetier subdivisionMetier;
	
	@PostMapping(value = "/save" )
	public Subdivision saveSubdivision(@RequestBody Subdivision s)
	{
		return subdivisionMetier.addSubdivision(s);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Subdivision updateSubdivision(@PathVariable(value ="id") Long id)
	{
		return subdivisionMetier.editeSubdivision(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteSubdivision ( @PathVariable(value ="id") Long id) 
	{
		subdivisionMetier.deleteSubdivision(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Subdivision> ListeSubdivision() 
	{
		return subdivisionMetier.findAllOrdonly();
	}
	
	@GetMapping( value = "/liste/sousClasse/{id}")
	public List<Subdivision> ListeSubdivisionBySousClasse( @PathVariable(value ="id") Long id) 
	{
		return subdivisionMetier.findAllOrdonlyBySousClasse(id);
	}
}
