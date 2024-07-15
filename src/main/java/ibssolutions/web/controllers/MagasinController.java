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

import ibssolutions.entity.parametre.Magasin;
import ibssolutions.metiers.MagasinMetier;


@RestController
@RequestMapping("/api/magasin")
public class MagasinController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Magasin [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private MagasinMetier magasinMetier;
	
	@PostMapping(value = "/save" )
	public Magasin saveMagasin(@RequestBody Magasin m)
	{
		return magasinMetier.addMagasin(m);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Magasin updateMagasin(@PathVariable(value ="id") Long id)
	{
		return magasinMetier.editeMagasin(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteMagasin ( @PathVariable(value ="id") Long id) 
	{
		magasinMetier.deleteMagasin(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Magasin> ListeMagasin() 
	{
		return magasinMetier.findAllOrdreBy();
	}
	
	@GetMapping( value = "/liste/scrussale/{id}")
	public List<Magasin> ListeMagasinByScrussale( @PathVariable(value ="id") Long id) 
	{
		return magasinMetier.findAllByTypeMagasin(id);
	}
	
}
