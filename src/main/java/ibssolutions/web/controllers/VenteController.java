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

import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.vente.VenteMetier;


@RestController
@RequestMapping("/api/vente")
public class VenteController {

	
	@Autowired
	private VenteMetier venteMetier;
	
	@PostMapping(value = "/save" )
	public Vente saveVente(@RequestBody Vente p,HttpSession httpsession)
	{
		return venteMetier.addVente(p,httpsession);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Vente updateVente(@PathVariable(value ="id") Long id)
	{
		return venteMetier.editeVente(id);
	}
	

	@GetMapping( value = "/liste")
	public List<Vente> ListeVente(HttpSession httpSession) 
	{
		return venteMetier.ventetByScrussale(httpSession);
	}
	
	@PostMapping(value = "/update" )
	public Vente updateVente(@RequestBody Vente p)
	{
		return venteMetier.updateVente(p);
	}
	
	@GetMapping( value = "/generate/{id}")
	public boolean genererVente(@PathVariable(value ="id") Long id) 
	{
		return venteMetier.genererVente(id);
	}
	
	
	@GetMapping( value = "/generate/ecriture/{id}")
	public boolean genererEcriture(@PathVariable(value ="id") Long id,HttpSession httpsession) 
	{
		return venteMetier.genererEcriture(id,httpsession);
	}
	
	@GetMapping( value = "/liste/nonregler/{id}")
	public List<Vente> ListeVente(@PathVariable(value ="id") Long id) 
	{
		return venteMetier.venteNonSolde(id);
	}
}
