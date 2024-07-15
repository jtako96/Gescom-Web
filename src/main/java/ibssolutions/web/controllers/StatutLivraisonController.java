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

import ibssolutions.entity.parametre.StatutLivraison;
import ibssolutions.metiers.StatutLivraisonMetier;


@RestController
@RequestMapping("/api/statutLivraison")
public class StatutLivraisonController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité StatutLivraison [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 14/01/2022
	 */
	
	@Autowired
	private StatutLivraisonMetier statutLivraisonMetier;
	
	@PostMapping(value = "/save" )
	public StatutLivraison saveStatutLivraison(@RequestBody StatutLivraison s)
	{
		return statutLivraisonMetier.addStatutLivraison(s);
	}
	
	@GetMapping(value = "/edite/{id}")
	public StatutLivraison updateStatutLivraison(@PathVariable(value ="id") Long id)
	{
		return statutLivraisonMetier.editeStatutLivraison(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteStatutLivraison ( @PathVariable(value ="id") Long id) 
	{
		statutLivraisonMetier.deleteStatutLivraison(id);
	}
	
	@GetMapping( value = "/liste")
	public List<StatutLivraison> ListeStatutLivraison() 
	{
		return statutLivraisonMetier.findAllOrdonly();
	}
	
}
