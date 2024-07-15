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

import ibssolutions.commande.EntreeStock;
import ibssolutions.metiers.commande.EntreeStockMetier;


@RestController
@RequestMapping("/api/entreeStock")
public class EntreeStockController {


	@Autowired
	private EntreeStockMetier entreeStockMetier;
	
	@PostMapping(value = "/save" )
	public EntreeStock saveEntreeStock(@RequestBody EntreeStock p)
	{
		return entreeStockMetier.addEntreeStock(p);
	}
	
	@GetMapping(value = "/edite/{id}")
	public EntreeStock updateEntreeStock(@PathVariable(value ="id") Long id)
	{
		return entreeStockMetier.editeEntreeStock(id);
	}
		
	@DeleteMapping( value = "/delete/{id}")
	public void deleteEntreeStock ( @PathVariable(value ="id") Long id) 
	{
		entreeStockMetier.deleteEntreeStock(id);
	}
	
	@GetMapping( value = "/liste")
	public List<EntreeStock> ListeEntreeStock() 
	{
		return entreeStockMetier.findAllOrdonly();
	}


}
