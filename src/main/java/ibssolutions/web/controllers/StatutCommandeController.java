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

import ibssolutions.entity.parametre.StatutCommande;
import ibssolutions.metiers.StatutCommandeMetier;


@RestController
@RequestMapping("/api/statutCommande")
public class StatutCommandeController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité StatutCommande [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 14/01/2022
	 */
	
	@Autowired
	private StatutCommandeMetier statutCommandeMetier;
	
	@PostMapping(value = "/save" )
	public StatutCommande saveStatutCommande(@RequestBody StatutCommande s)
	{
		return statutCommandeMetier.addStatutCommande(s);
	}
	
	@GetMapping(value = "/edite/{id}")
	public StatutCommande updateStatutCommande(@PathVariable(value ="id") Long id)
	{
		return statutCommandeMetier.editeStatutCommande(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteStatutCommande ( @PathVariable(value ="id") Long id) 
	{
		statutCommandeMetier.deleteStatutCommande(id);
	}
	
	@GetMapping( value = "/liste")
	public List<StatutCommande> ListeStatutCommande() 
	{
		return statutCommandeMetier.findAllOrdonly();
	}
	
}
