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

import ibssolutions.entity.parametre.TypeMagasin;
import ibssolutions.metiers.TypeMagasinMetier;


@RestController
@RequestMapping("/api/typeMagasin")
public class TypeMagasinController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité TypeMagasin [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 19/01/2022
	 */
	
	@Autowired
	private TypeMagasinMetier typeMagasinMetier;
	
	@PostMapping(value = "/save" )
	public TypeMagasin saveTypeMagasin(@RequestBody TypeMagasin b)
	{
		return typeMagasinMetier.addTypeMagasin(b);
	}
	
	@GetMapping(value = "/edite/{id}")
	public TypeMagasin updateTypeMagasin(@PathVariable(value ="id") Long id)
	{
		return typeMagasinMetier.editeTypeMagasin(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteTypeMagasin ( @PathVariable(value ="id") Long id) 
	{
		typeMagasinMetier.deleteTypeMagasin(id);
	}
	
	@GetMapping( value = "/liste")
	public List<TypeMagasin> ListeTypeMagasin() 
	{
		return typeMagasinMetier.findAllOrdonly();
	}
	
}
