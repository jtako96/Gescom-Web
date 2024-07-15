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

import ibssolutions.entity.clientelle.Client;
import ibssolutions.metiers.clientelle.CLientMetier;



@RestController
@RequestMapping("/api/client")
public class ClientController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Client [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 28/01/2022
	 */
	
	@Autowired
	private CLientMetier clientMetier;
	
	
	@PostMapping(value = "/save" )
	public Client saveClient(@RequestBody Client c)
	{
		return clientMetier.addClient(c);
	}
	
	@GetMapping(value = "/save/scrussale")
	public Client saveClientByScrussale(@RequestBody Client c, HttpSession httpSession)
	{
		return clientMetier.saveClient(c, httpSession);
	}
	

	@GetMapping(value = "/edite/{id}")
	public Client updateClient(@PathVariable(value ="id") Long id)
	{
		return clientMetier.editeClient(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteClient ( @PathVariable(value ="id") Long id) 
	{
		clientMetier.deleteClient(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Client> ListeClient() 
	{
		return clientMetier.findAllClient();
	}
	
	@GetMapping( value = "/liste/scrussale")
	public List<Client> ListeClientBySousGroup( HttpSession httpSession) 
	{
		return clientMetier.findAllClientByScrussale(httpSession);
	}
	
	@PostMapping(value = "/update")
	public Client updateClientModifier(@RequestBody Client c)
	{
		return clientMetier.updateClient(c);
	}
		
	@GetMapping( value = "/activeClient/{id}")
	public void activeClient (@PathVariable(value ="id") Long id ) 
	{
		clientMetier.activeClient(id);
	}
	
	@GetMapping( value = "/desactiveClient/{id}")
	public void desactiveClient (@PathVariable(value ="id") Long id ) 
	{
		clientMetier.desactiveClient(id);
	}
}
