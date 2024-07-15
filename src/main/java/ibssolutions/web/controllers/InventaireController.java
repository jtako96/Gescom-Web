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

import ibssolutions.commande.DetailsInventaire;
import ibssolutions.commande.Inventaire;
import ibssolutions.metiers.commande.InventaireMetier;



@RestController
@RequestMapping("/api/inventaire")
public class InventaireController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Inventaire [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] 
	 */
	
	@Autowired
	private InventaireMetier inventaireMetier;
	
	@PostMapping(value = "/save" )
	public Inventaire saveInventaire(@RequestBody Inventaire i,HttpSession httpsession)
	{
		return inventaireMetier.addInventaire(i, httpsession);
	}
	
	@PostMapping(value = "/savedetails" )
	public void savedetails(@RequestBody DetailsInventaire d,HttpSession httpsession)
	{
		 inventaireMetier.saveDetails(d);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Inventaire updateInventaire(@PathVariable(value ="id") Long id)
	{
		return inventaireMetier.editeInventaire(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteInventaire ( @PathVariable(value ="id") Long id) 
	{
		inventaireMetier.deleteInventaire(id);
	}
	
	@GetMapping( value = "/generate/{id}/{id2}")
	public boolean ListeInventaire(@PathVariable(value ="id") Long id, @PathVariable(value ="id2") Long id2,HttpSession httpsession) 
	{
		return inventaireMetier.generateDetails(httpsession, id, id2);
	}
	
	@GetMapping(value = "/liste")
	public List<Inventaire>listinv(HttpSession httpsession)
	{
		return inventaireMetier.ListeInventaire(httpsession);
	}
	
	@GetMapping(value = "/listeDetails/{id}/{id2}")
	public List<DetailsInventaire> listdetailsinv(@PathVariable(value ="id") Long id, @PathVariable(value ="id2") Long id2,HttpSession httpsession)
	{
		return inventaireMetier.listedetails(id,id2, httpsession);
	}
	
	@GetMapping(value = "/liste/validation/{id}/{id2}")
	public List<Inventaire>listeValidation(@PathVariable(value ="id") Long id, @PathVariable(value ="id2") Long id2)
	{
		return inventaireMetier.ListeInventaire(id, id2);
	}
	
	@GetMapping(value = "/verification/detail/{id}")
	public List<DetailsInventaire> findDetails(@PathVariable(value ="id") Long id)
	{
		return inventaireMetier.listeDetailsbyIDinve(id);
	}
	
	@GetMapping(value = "/validate/detail/{id}")
	public void validerInv(@PathVariable(value ="id") Long idDetails) {
		inventaireMetier.validerInventaire(idDetails);
	}
	
}
