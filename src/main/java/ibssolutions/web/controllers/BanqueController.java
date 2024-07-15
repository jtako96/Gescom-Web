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

import ibssolutions.entity.parametre.Banque;
import ibssolutions.metiers.BanqueMetier;


@RestController
@RequestMapping("/api/banque")
public class BanqueController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Banque [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 14/01/2022
	 */
	
	@Autowired
	private BanqueMetier banqueMetier;
	
	@PostMapping(value = "/save" )
	public Banque saveBanque(@RequestBody Banque b)
	{
		return banqueMetier.addBanque(b);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Banque updateBanque(@PathVariable(value ="id") Long id)
	{
		return banqueMetier.editeBanque(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteBanque ( @PathVariable(value ="id") Long id) 
	{
		banqueMetier.deleteBanque(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Banque> ListeBanque() 
	{
		return banqueMetier.findAllOrdonly();
	}
	
}
