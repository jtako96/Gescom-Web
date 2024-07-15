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

import ibssolutions.entity.parametre.Exercice;
import ibssolutions.metiers.ExerciceMetier;


@RestController
@RequestMapping("/api/exercice/")
public class ExerciceController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Exercice [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 11/01/2022
	 */
	
	@Autowired
	private ExerciceMetier exerciceMetier;
	
	@PostMapping(value = "/save" )
	public Exercice saveExercice(@RequestBody Exercice m)
	{
		return exerciceMetier.addExercice(m);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Exercice updateExercice(@PathVariable(value ="id") Long id)
	{
		return exerciceMetier.editeExercice(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteExercice ( @PathVariable(value ="id") Long id) 
	{
		exerciceMetier.deleteExercice(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Exercice> ListeExercice() 
	{
		return exerciceMetier.findAllOrdonly();
	}
	
	@GetMapping( value = "/getExerciceActif")
	public Exercice getExerciceActive ( ) 
	{
		return exerciceMetier.getExerciceActif();
		
	}
	
	@GetMapping( value = "/activeExercice/{id}")
	public void activeExercice (@PathVariable(value ="id") Long id ) 
	{
		 exerciceMetier.activerExercice(id);
	}

	
}
