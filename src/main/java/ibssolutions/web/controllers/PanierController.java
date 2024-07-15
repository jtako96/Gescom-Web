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

import ibssolutions.entity.vente.Panier;
import ibssolutions.metiers.vente.PanierMetier;


@RestController
@RequestMapping("/api/panier")
public class PanierController {

	
	@Autowired
	private PanierMetier panierMetier;
	
	@PostMapping(value = "/save/{actionTVA}/{id}/{idstock}" )
	public Panier savePanier( @PathVariable(value ="actionTVA") boolean actionTVA,@PathVariable(value ="id")Long idproforma,@PathVariable(value ="idstock")Long idstock, @RequestBody Panier p)
	{
		return panierMetier.addPanier(actionTVA, idproforma, idstock, p);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Panier updatePanier(@PathVariable(value ="id") Long id)
	{
		return panierMetier.editePanier(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteDetails ( @PathVariable(value ="id") Long id) 
	{
		panierMetier.deletePanier(id);
	}

	@GetMapping( value = "/liste/{id}")
	public List<Panier> ListePanier(@PathVariable(value ="id") Long id,HttpSession httpSession) 
	{
		return panierMetier.detailventeByScrussale(httpSession,id);
	}
	
	
	@GetMapping(value = "/calculHT/{id}")
	public double totalHT(@PathVariable(value ="id") Long id)
	{
		return panierMetier.calculHT(id);
	}
	
	@GetMapping(value = "/calculRemise/{id}")
	public double totalRemise(@PathVariable(value ="id") Long id)
	{
		return panierMetier.calculRemise(id);
	}
	
	@GetMapping(value = "/calculTOTALREMISE/{id}")
	public double totalApresRemise(@PathVariable(value ="id") Long id)
	{
		return panierMetier.calculTOTALREMISE(id);
	}
	
	@GetMapping(value = "/calculTVA/{id}")
	public double totalTVA(@PathVariable(value ="id") Long id)
	{
		return panierMetier.calculTVA(id);
	}
	
	@GetMapping(value = "/calculTTC/{id}")
	public double totalTTC(@PathVariable(value ="id") Long id)
	{
		return panierMetier.calculTTC(id);
	}
	
}
