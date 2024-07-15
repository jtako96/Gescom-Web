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

import ibssolutions.commande.Fournisseur;
import ibssolutions.metiers.commande.FournisseurMetier;


@RestController
@RequestMapping(value = "api/fournisseur")
public class FournisseurController {

	@Autowired
	private FournisseurMetier fournisseurMetier;
	
	@PostMapping(value = "/save")
	public Fournisseur saveFournisseur(@RequestBody Fournisseur f) {
		return fournisseurMetier.addFournisseur(f);
		
	}
	
	@GetMapping(value = "/edite/{id}")
	public Fournisseur updateFournisseur(@PathVariable Long id) {
		return fournisseurMetier.editeFournisseur(id);
		
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public void removeFournisseur(@PathVariable Long id) {
		fournisseurMetier.deleteFournisseur(id);
	}
	
	@GetMapping(value = "/liste")
	public List<Fournisseur> listeFournisseur(){
		return fournisseurMetier.findAllOrdonly();
		
	}
}
