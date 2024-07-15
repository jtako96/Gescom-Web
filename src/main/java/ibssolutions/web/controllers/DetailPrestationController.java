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

import ibssolutions.entity.vente.DetailPrestation;
import ibssolutions.metiers.vente.DetailPrestationMetier;


@RestController
@RequestMapping("/api/detailPrestation")
public class DetailPrestationController {

	
	@Autowired
	private DetailPrestationMetier detailPrestationMetier;
	
	@PostMapping(value = "/save/{actionTVA}/{id}" )
	public DetailPrestation saveDetailPrestation( @PathVariable(value ="actionTVA") boolean actionTVA,@PathVariable(value ="id")Long idproforma,@RequestBody DetailPrestation p)
	{
		return detailPrestationMetier.addDetailPrestation(actionTVA, idproforma,  p);
	}
	
	@GetMapping(value = "/edite/{id}")
	public DetailPrestation updateDetailPrestation(@PathVariable(value ="id") Long id)
	{
		return detailPrestationMetier.editeDetailPrestation(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteDetails ( @PathVariable(value ="id") Long id) 
	{
		detailPrestationMetier.deleteDetailPrestation(id);
	}

	@GetMapping( value = "/liste/{id}")
	public List<DetailPrestation> ListeDetailPrestation(@PathVariable(value ="id") Long id,HttpSession httpSession) 
	{
		return detailPrestationMetier.detailproformatByScrussale(httpSession,id);
	}
	
	
	@GetMapping(value = "/calculHT/{id}")
	public double totalHT(@PathVariable(value ="id") Long id)
	{
		return detailPrestationMetier.calculHT(id);
	}
	
	@GetMapping(value = "/calculRemise/{id}")
	public double totalRemise(@PathVariable(value ="id") Long id)
	{
		return detailPrestationMetier.calculRemise(id);
	}
	
	@GetMapping(value = "/calculTOTALREMISE/{id}")
	public double totalApresRemise(@PathVariable(value ="id") Long id)
	{
		return detailPrestationMetier.calculTOTALREMISE(id);
	}
	
	@GetMapping(value = "/calculTVA/{id}")
	public double totalTVA(@PathVariable(value ="id") Long id)
	{
		return detailPrestationMetier.calculTVA(id);
	}
	
	@GetMapping(value = "/calculTTC/{id}")
	public double totalTTC(@PathVariable(value ="id") Long id)
	{
		return detailPrestationMetier.calculTTC(id);
	}
	
}
