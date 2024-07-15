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

import ibssolutions.entity.vente.Proforma;
import ibssolutions.metiers.vente.ProformaMetier;


@RestController
@RequestMapping("/api/proforma")
public class ProformaController {

	
	@Autowired
	private ProformaMetier proformaMetier;
	
	@PostMapping(value = "/save" )
	public Proforma saveProforma(@RequestBody Proforma p,HttpSession httpsession)
	{
		return proformaMetier.addProforma(p,httpsession);
	}
	
	@GetMapping(value = "/edite/{id}")
	public Proforma updateProforma(@PathVariable(value ="id") Long id)
	{
		return proformaMetier.editeProforma(id);
	}
	

	@GetMapping( value = "/liste")
	public List<Proforma> ListeProforma(HttpSession httpSession) 
	{
		return proformaMetier.proformatByScrussale(httpSession);
	}
	
	@PostMapping(value = "/update" )
	public Proforma updateProforma(@RequestBody Proforma p)
	{
		return proformaMetier.updateProforma(p);
	}
	
	
}
