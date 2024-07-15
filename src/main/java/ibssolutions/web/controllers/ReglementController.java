package ibssolutions.web.controllers;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.comptabilite.Reglement;
import ibssolutions.metiers.comptabilite.ReglementMetier;

@RestController
@RequestMapping(value = "api/reglement")
public class ReglementController {

	@Autowired
	private ReglementMetier reglementMetier;
	
	@PostMapping(value = "/save")
	public Reglement saveReglement(@RequestBody Reglement r) {
		return reglementMetier.addReglement(r);
	}
	
	
	@GetMapping(value = "/edite/{id}")
	public Reglement updateReglement(@PathVariable Long id) {
		return reglementMetier.editeReglement(id);
		
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public void removeReglement(@PathVariable Long id) {
		reglementMetier.deleteReglement(id);
	}
	
	@GetMapping(value = "/liste")
	public List<Reglement> listeReglement(){
		return reglementMetier.findAllOrdorlyByName();
	}
	
	@GetMapping(value = "/liste/vente/{id}")
	public List<Reglement> listeReglementDette(@PathVariable Long id){
		return reglementMetier.findAllOrdorlyByDette(id);
	}
	
		
	@SuppressWarnings("rawtypes")
	@GetMapping(value = "/situation/{id}")
	public Vector situationReglement(@PathVariable Long id) {
		return reglementMetier.situationReglement(id);
		
	}
	
	@GetMapping(value = "/testerValidation/{id}/{montant}")
	public int testerValidation(@PathVariable Long id, @PathVariable Double montant) {
		return reglementMetier.testervalidation(id, montant);
		
	}
	
	@GetMapping(value = "/montantPayer/{id}")
	public Double renvoieMontantPayer( @PathVariable Long id) {
		return reglementMetier.renvoieMontantPayer(id);
		
	}
	
	@GetMapping(value = "/montantAPayer/{id}")
	public Double renvoieMontantaPayer( @PathVariable Long id) {
		return reglementMetier.renvoieMontantApayer(id);
		
	}
	
	@GetMapping(value = "/apayer_payer_rapayer/{id1}")
	public Map<String,Object> apayer_payer_rapayer(@PathVariable Long id1) {
		return reglementMetier.apayer_payer_rapayer(id1);
		
	}
	

	@GetMapping( value = "/generate/{id}")
	public boolean genererReg(@PathVariable(value ="id") Long id) 
	{
		return reglementMetier.generateEcritureRegBancaire(id);
	}
	
	@GetMapping( value = "/generate/espece/{id}")
	public boolean genererRegEspece(@PathVariable(value ="id") Long id) 
	{
		return reglementMetier.generateEcritureRegEspece(id);
	}
	
	@GetMapping( value = "/generate/cheque/{id}")
	public boolean genererRegCheque(@PathVariable(value ="id") Long id) 
	{
		return reglementMetier.generateEcritureRegCheque(id);
	}
	
	@GetMapping( value = "/miseajours/{id}")
	public void desactiverReglement(@PathVariable(value ="id") Long id) 
	{
		 reglementMetier.etatFacturation(id);
	}

}
