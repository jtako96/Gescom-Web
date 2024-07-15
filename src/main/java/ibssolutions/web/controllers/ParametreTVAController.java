package ibssolutions.web.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.parametre.ParametreTVA;
import ibssolutions.metiers.ParametreTVAMetier;


@RestController
@RequestMapping("/api/parametreTVA/")
public class ParametreTVAController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité ParametreTVA [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 14/01/2022
	 */
	
	@Autowired
	private ParametreTVAMetier parametreTVAMetier;
	
	@PostMapping(value = "/save" )
	public ParametreTVA saveParametreTVA(@RequestBody ParametreTVA p)
	{
		return parametreTVAMetier.addParametreTVA(p);
	}
	
	@GetMapping(value = "/edite/{id}")
	public ParametreTVA updateParametreTVA(@PathVariable(value ="id") Long id)
	{
		return parametreTVAMetier.editeParametreTVA(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteParametreTVA ( @PathVariable(value ="id") Long id) 
	{
		parametreTVAMetier.deleteParametreTVA(id);
	}
	
	@GetMapping( value = "/liste")
	public List<ParametreTVA> ListeParametreTVA() 
	{
		return parametreTVAMetier.findAllOrdonly();
	}
	
	@GetMapping(value = "/getTVA")
	public double getTVAbyScrussal(HttpSession httpSession)
	{
		return parametreTVAMetier.getTVAScrussale(httpSession);
	}
	
}
