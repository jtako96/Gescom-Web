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

import ibssolutions.entity.comptabilite.Classe;
import ibssolutions.metiers.comptabilite.ClasseMetier;


@RestController
@RequestMapping("/api/classe")
public class ClasseController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Classe [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private ClasseMetier classeMetier;
	
	@PostMapping(value = "/save" )
	public Classe saveClasse(@RequestBody Classe c)
	{
		return classeMetier.addClasse(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Classe updateClasse(@PathVariable(value ="id") Long id)
	{
		return classeMetier.editeClasse(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteClasse ( @PathVariable(value ="id") Long id) 
	{
		classeMetier.deleteClasse(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Classe> ListeClasse() 
	{
		return classeMetier.findAllOrdonly();
	}
	
}
