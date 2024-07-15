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

import ibssolutions.entity.comptabilite.SousCompte;
import ibssolutions.metiers.comptabilite.SousCompteMetier;


@RestController
@RequestMapping("/api/souscompte")
public class SousCompteController {


	@Autowired
	private SousCompteMetier sousCompteMetier;
	
	@PostMapping(value = "/save" )
	public SousCompte saveSousCompte(@RequestBody SousCompte c)
	{
		return sousCompteMetier.addSousCompte(c);
	}
	
	@GetMapping(value = "/edite/{id}")
	public SousCompte updateSousCompte(@PathVariable(value ="id") Long id)
	{
		return sousCompteMetier.editeSousCompte(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteSousCompte ( @PathVariable(value ="id") Long id) 
	{
		sousCompteMetier.deleteSousCoompte(id);
	}
	
	@GetMapping( value = "/liste")
	public List<SousCompte> ListeSousCompte() 
	{
		return sousCompteMetier.findSousCompteAll();
	}
	
	@GetMapping( value = "/liste/compte/{id}")
	public List<SousCompte> ListeSousCompte2( @PathVariable(value ="id") Long id) 
	{
		return sousCompteMetier.findSousCompteByCompte(id);
	}
	
}
