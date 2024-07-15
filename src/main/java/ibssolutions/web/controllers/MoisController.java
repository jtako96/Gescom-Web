package ibssolutions.web.controllers;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.parametre.Mois;
import ibssolutions.metiers.MoisMetier;


@RestController @CrossOrigin("*")
@RequestMapping("/api/mois/")
public class MoisController {
	
	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Mois [ Methode : Ajouter ,Modifier ,Supprimer ,Liste,mois actif ] ce 11/01/2022
	 */
	
	@Autowired
	private MoisMetier moisMetier;
	
	@PostMapping(value = "/save" )
	public Mois saveMois(@RequestBody Mois m)
	{
		return moisMetier.addMois(m);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Mois updateMois(@PathVariable(value ="id") Long id)
	{
		return moisMetier.editeMois(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteMois ( @PathVariable(value ="id") Long id) 
	{
		moisMetier.deleteMois(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Mois> ListeMois() 
	{
		return moisMetier.findAllOrdonly();
	}
	
	@GetMapping( value = "/getMoisActif")
	public Mois getMoisActive ( ) 
	{
		return moisMetier.getMoisActif();
		
	}
	
	@GetMapping( value = "/activeMois/{id}")
	public void activeMois (@PathVariable(value ="id") Long id ) throws ParseException 
	{
		 moisMetier.activerMois(id);
	}

}
