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

import ibssolutions.commande.DetailsEntree;
import ibssolutions.commande.EntreeStock;
import ibssolutions.metiers.commande.DetailsEntreeMetier;
import ibssolutions.metiers.commande.EntreeStockMetier;


@RestController
@RequestMapping("/api/detailEntreeStock")
public class DetailEntreeController {


	@Autowired
	private DetailsEntreeMetier detailStockMetier;
	
	@PostMapping(value = "/save/{id}" )
	public DetailsEntree saveDetailsEntree(@PathVariable("id")Long id, @RequestBody DetailsEntree p)
	{
		return detailStockMetier.addDetailsEntree(p,id);
	}
	
	@GetMapping(value = "/edite/{id}")
	public DetailsEntree updateDetailsEntree(@PathVariable(value ="id") Long id)
	{
		return detailStockMetier.editeDetailsEntree(id);
	}
		
	@DeleteMapping( value = "/delete/{id}")
	public void deleteDetailsEntree ( @PathVariable(value ="id") Long id) 
	{
		detailStockMetier.deleteDetailsEntree(id);
	}
	
	@GetMapping( value = "/liste/{id}")
	public List<DetailsEntree> ListeDetailsEntree(@PathVariable("id")Long id) 
	{
		return detailStockMetier.findAllOrdonlyByEntre(id);
	}
	
	
	@GetMapping( value = "/actualiser/{id}")
	public boolean actualiseStock ( @PathVariable(value ="id") Long id) 
	{
		return detailStockMetier.actualisationQte(id);
	}


}
