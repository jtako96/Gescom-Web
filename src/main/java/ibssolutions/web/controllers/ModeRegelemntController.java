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

import ibssolutions.entity.parametre.ModeReglement;
import ibssolutions.metiers.ModeReglementMetier;


@RestController
@RequestMapping("/api/modeReglement/")
public class ModeRegelemntController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité ModeReglement [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 17/01/2022
	 */
	
	@Autowired
	private ModeReglementMetier ModeReglementMetier;
	
	@PostMapping(value = "/save" )
	public ModeReglement saveModeReglement(@RequestBody ModeReglement m)
	{
		return ModeReglementMetier.addModeReglement(m);
	}
	
	@GetMapping(value = "/edite/{id}")
	public ModeReglement updateModeReglement(@PathVariable(value ="id") Long id)
	{
		return ModeReglementMetier.editeModeReglement(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteModeReglement ( @PathVariable(value ="id") Long id) 
	{
		ModeReglementMetier.deleteModeReglement(id);
	}
	
	@GetMapping( value = "/liste")
	public List<ModeReglement> ListeModeReglement() 
	{
		return ModeReglementMetier.findAllOrdonly();
	}
	
}
