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

import ibssolutions.entity.clientelle.Gestionnaire;
import ibssolutions.metiers.clientelle.GestionnaireMetier;



@RestController
@RequestMapping("/api/gestionnaire")
public class GestionnaireController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Gestionnaire [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 14/01/2022
	 */
	
	@Autowired
	private GestionnaireMetier gestionnaireMetier;
	
	@PostMapping(value = "/save" )
	public Gestionnaire saveGestionnaire(@RequestBody Gestionnaire g)
	{
		return gestionnaireMetier.addGestionnaire(g);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Gestionnaire updateGestionnaire(@PathVariable(value ="id") Long id)
	{
		return gestionnaireMetier.editeGestionnaire(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteGestionnaire ( @PathVariable(value ="id") Long id) 
	{
		gestionnaireMetier.deleteGestionnaire(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Gestionnaire> ListeGestionnaire() 
	{
		return gestionnaireMetier.findAllGestionnaire();
	}
	
}
