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

import ibssolutions.entity.vente.DetailProforma;
import ibssolutions.metiers.vente.DetailProformaMetier;


@RestController
@RequestMapping("/api/detailProforma")
public class DetailProformaController {

	
	@Autowired
	private DetailProformaMetier detailProformaMetier;
	
	@PostMapping(value = "/save/{actionTVA}/{id}/{idstock}" )
	public DetailProforma saveDetailProforma( @PathVariable(value ="actionTVA") boolean actionTVA,@PathVariable(value ="id")Long idproforma,@PathVariable(value ="idstock")Long idstock, @RequestBody DetailProforma p)
	{
		return detailProformaMetier.addDetailProforma(actionTVA, idproforma, idstock, p);
	}
	
	@GetMapping(value = "/edite/{id}")
	public DetailProforma updateDetailProforma(@PathVariable(value ="id") Long id)
	{
		return detailProformaMetier.editeDetailProforma(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteDetails ( @PathVariable(value ="id") Long id) 
	{
		detailProformaMetier.deleteDetailProforma(id);
	}

	@GetMapping( value = "/liste/{id}")
	public List<DetailProforma> ListeDetailProforma(@PathVariable(value ="id") Long id,HttpSession httpSession) 
	{
		return detailProformaMetier.detailproformatByScrussale(httpSession,id);
	}
	
	
	@GetMapping(value = "/calculHT/{id}")
	public double totalHT(@PathVariable(value ="id") Long id)
	{
		return detailProformaMetier.calculHT(id);
	}
	
	@GetMapping(value = "/calculRemise/{id}")
	public double totalRemise(@PathVariable(value ="id") Long id)
	{
		return detailProformaMetier.calculRemise(id);
	}
	
	@GetMapping(value = "/calculTOTALREMISE/{id}")
	public double totalApresRemise(@PathVariable(value ="id") Long id)
	{
		return detailProformaMetier.calculTOTALREMISE(id);
	}
	
	@GetMapping(value = "/calculTVA/{id}")
	public double totalTVA(@PathVariable(value ="id") Long id)
	{
		return detailProformaMetier.calculTVA(id);
	}
	
	@GetMapping(value = "/calculTTC/{id}")
	public double totalTTC(@PathVariable(value ="id") Long id)
	{
		return detailProformaMetier.calculTTC(id);
	}
	
}
