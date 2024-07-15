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

import ibssolutions.entity.comptabilite.DetailEcriture;
import ibssolutions.metiers.comptabilite.DetailEcritureMetier;


@RestController
@RequestMapping("/api/detailEcriture")
public class DetailEcritureController {

	
	@Autowired
	private DetailEcritureMetier detailEcritureMetier;
	
	@PostMapping(value = "/save/{id}" )
	public DetailEcriture saveDetailEcriture(@PathVariable(value ="id") Long idecriture, @RequestBody DetailEcriture d)
	{
		return detailEcritureMetier.addDetailEcriture(d,idecriture);
	}
	
	@GetMapping(value = "/edite/{id}")
	public DetailEcriture updateDetailEcriture(@PathVariable(value ="id") Long id)
	{
		return detailEcritureMetier.editeDetailEcriture(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteDetails ( @PathVariable(value ="id") Long id) 
	{
		detailEcritureMetier.deleteDetailEcriture(id);
	}
	
	@GetMapping( value = "/validations/{id}")
	public void valid ( @PathVariable(value ="id") Long id) 
	{
		detailEcritureMetier.validEcriture(id);
	}

	@GetMapping( value = "/liste/{id}")
	public List<DetailEcriture> ListeDetailEcriture(@PathVariable(value ="id") Long id,HttpSession httpSession) 
	{
		return detailEcritureMetier.findAllOrdonly(id);
	}
	
	
	@GetMapping(value = "/calculDebit/{id}")
	public double totalDebit(@PathVariable(value ="id") Long id)
	{
		return detailEcritureMetier.totalDebit(id);
	}
	
	@GetMapping(value = "/calculCredit/{id}")
	public double totalCredit(@PathVariable(value ="id") Long id)
	{
		return detailEcritureMetier.totalCredit(id);
	}
	

	
}
