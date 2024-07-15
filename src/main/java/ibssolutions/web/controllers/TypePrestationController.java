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

import ibssolutions.entity.vente.TypePrestation;
import ibssolutions.metiers.vente.TypePrestationMetier;

@RestController
@RequestMapping("/api/typePrestation")
public class TypePrestationController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité TypePrestation [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] 
	 */
	
	@Autowired
	private TypePrestationMetier typePrestationMetier;
	
	@PostMapping(value = "/save" )
	public TypePrestation saveTypePrestation(@RequestBody TypePrestation tp)
	{
		return typePrestationMetier.addTypePrestation(tp);
	}
	
	@GetMapping(value = "/edite/{id}")
	public TypePrestation updateTypePrestation(@PathVariable(value ="id") Long id)
	{
		return typePrestationMetier.editeTypePrestation(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteTypePrestation ( @PathVariable(value ="id") Long id) 
	{
		typePrestationMetier.deleteTypePrestation(id);
	}
	
	@GetMapping( value = "/liste")
	public List<TypePrestation> ListeTypePrestation() 
	{
		return typePrestationMetier.findAllOrdonly();
	}
	
}
