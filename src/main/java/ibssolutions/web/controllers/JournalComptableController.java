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

import ibssolutions.entity.comptabilite.JournalComptable;
import ibssolutions.metiers.comptabilite.JournalComptableMetier;



@RestController
@RequestMapping("/api/journal")
public class JournalComptableController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité JournalComptable [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 16/03/2022
	 */
	
	@Autowired
	private JournalComptableMetier journalComptableMetier;
	
	@PostMapping(value = "/save" )
	public JournalComptable saveJournalComptable(@RequestBody JournalComptable b)
	{
		return journalComptableMetier.addJournalComptable(b);
	}
	
	@GetMapping(value = "/edite/{id}")
	public JournalComptable updateJournalComptable(@PathVariable(value ="id") Long id)
	{
		return journalComptableMetier.editeJournalComptable(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteJournalComptable ( @PathVariable(value ="id") Long id) 
	{
		journalComptableMetier.deleteJournalComptable(id);
	}
	
	@GetMapping( value = "/liste")
	public List<JournalComptable> ListeJournalComptable() 
	{
		return journalComptableMetier.findAllOrdonly();
	}
	
}
