package ibssolutions.web.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.vente.Prestation;
import ibssolutions.metiers.vente.PrestationMetier;


@RestController
@RequestMapping("/api/prestation")
public class PrestationController {

	
	@Autowired
	private PrestationMetier proformaMetier;
	
	@PostMapping(value = "/save" )
	public Prestation savePrestation(@RequestBody Prestation p,HttpSession httpsession)
	{
		return proformaMetier.addPrestation(p,httpsession);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Prestation updatePrestation(@PathVariable(value ="id") Long id)
	{
		return proformaMetier.editePrestation(id);
	}
	

	@GetMapping( value = "/liste")
	public List<Prestation> ListePrestation(HttpSession httpSession) 
	{
		return proformaMetier.prestationByScrussale(httpSession);
	}
	
	@PostMapping(value = "/update" )
	public Prestation updatePrestation(@RequestBody Prestation p)
	{
		return proformaMetier.updatePrestation(p);
	}
	
	@GetMapping( value = "/generate/ecriture/{id}")
	public boolean genererEcriture(@PathVariable(value ="id") Long id) 
	{
		return proformaMetier.genererEcriture(id);
	}
	
	
}
