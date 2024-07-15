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

import ibssolutions.commande.BonLivraison;
import ibssolutions.commande.DetailsLivraison;
import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.commande.BonLivraisonMetier;



@RestController
@RequestMapping("/api/bonLivraison")
public class BonLivraisonController {

	@Autowired
	private BonLivraisonMetier bonLivraisonMetier;
	
	@PostMapping(value = "/save" )
	public BonLivraison saveBonLivraison(@RequestBody BonLivraison p,HttpSession httpsession)
	{
		
		return bonLivraisonMetier.addBonLivraison(p,httpsession);
	}
	
	@PostMapping(value = "/update" )
	public BonLivraison updaBonLivraison(@RequestBody BonLivraison p)
	{
		
		return bonLivraisonMetier.updateBonLivraison(p);
	}
	
	@GetMapping(value = "/edite/{id}")
	public BonLivraison updateBonLivraison(@PathVariable(value ="id") Long id)
	{
		return bonLivraisonMetier.editeBonLivraison(id);
	}
	
	@GetMapping( value = "/liste")
	public List<BonLivraison> ListeBonLivraison(HttpSession httpSession) 
	{
		return bonLivraisonMetier.findAllOrdonly(httpSession);
	}

	@GetMapping( value = "/generate/{id}")
	public boolean genererBonLivraison(@PathVariable(value ="id") Long id) 
	{
		return bonLivraisonMetier.generateEcritureSortieStock(id);
	}
	
	@GetMapping( value = "/calculer/quantite/{id}")
	public boolean calculQuantite(@PathVariable(value ="id") Long id) 
	{
		return bonLivraisonMetier.calculeQte(id);
	}
	
	@GetMapping( value = "/generate/details/{id}/{idbon}")
	public boolean genererBonLivraison(@PathVariable(value ="id") Long id,@PathVariable(value ="idbon") Long idbon,HttpSession httpsession) 
	{
		return bonLivraisonMetier.generateDetailsBon(id, idbon, httpsession);
	}
	
	@GetMapping( value = "/liste/vente")
	public List<Vente> ListeAchatEffectuer(HttpSession httpSession) 
	{
		return bonLivraisonMetier.findAllVenteScrussale(httpSession);
	}

	
	@GetMapping( value = "/liste/details/{id}")
	public List<DetailsLivraison> ListeAchatEffectuer(@PathVariable(value ="id") Long id,HttpSession httpSession) 
	{
		return bonLivraisonMetier.findDetailsBonScrussale(id, httpSession);
	}
	
	@GetMapping( value = "/validate/details/{id}/{qte}")
	public void validateDetails(@PathVariable(value ="id") Long id,@PathVariable(value ="qte") int qte) {
		bonLivraisonMetier.validerDetails(id,qte);
	}
	
	
	@GetMapping( value = "/ctrl/{id}")
	public boolean ctrlGeneration(@PathVariable(value ="id") Long id) 
	{
		return bonLivraisonMetier.controle(id);
	}
}
