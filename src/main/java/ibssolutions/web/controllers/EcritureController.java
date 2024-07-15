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

import ibssolutions.dao.EcritureRepository;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.metiers.comptabilite.EcritureMetier;


@RestController
@RequestMapping("/api/ecriture/")
public class EcritureController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Ecriture [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 11/03/2022
	 */
	
	@Autowired
	private EcritureMetier ecritureMetier;
	
	@Autowired
	private EcritureRepository  ecritureRep;
	
	@PostMapping(value = "/save" )
	public Ecriture saveEcriture(@RequestBody Ecriture m)
	{
		return ecritureMetier.addEcriture(m);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Ecriture updateEcriture(@PathVariable(value ="id") Long id)
	{
		return ecritureMetier.editeEcriture(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteEcriture ( @PathVariable(value ="id") Long id) 
	{
		ecritureMetier.deleteEcriture(id);
	}
	
	@GetMapping( value = "/liste/{id}/{id2}")
	public List<Ecriture> ListeEcriture(@PathVariable(value ="id") Long id,@PathVariable(value ="id2") Long id2) 
	{
		return ecritureMetier.findAllOrdonly(id, id2);
	}
	
	@GetMapping( value = "/liste/true/{id}/{id2}")
	public List<Ecriture> ListeEcritureTrue(@PathVariable(value ="id") Long id,@PathVariable(value ="id2") Long id2) 
	{
		return ecritureMetier.findAllOrdonlyTrue(id, id2);
	}
	
	
	@GetMapping( value = "/validate/{id}")
	public void validerEcriture ( @PathVariable(value ="id") Long id) 
	{
		ecritureMetier.validateEcriture(id);
	}
	
	@GetMapping( value = "/listeSaisi")
	public List<Ecriture> ListeEcriture() 
	{
		return ecritureRep.findAllSaisir();
	}
	
	
}
