package ibssolutions.web.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.parametre.Magasin;
import ibssolutions.entity.stockarticle.Approvisionement;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.metiers.stockarticle.StockMetier;



@RestController
@RequestMapping("/api/stock")
public class StockController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Stock [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 28/01/2022
	 */
	
	@Autowired
	private StockMetier stockMetier;
	
	@Value("${images.dir}")
	private String imagedir;
	
	@PostMapping(value = "/save" )
	public Stock saveStock(@RequestBody Stock s,HttpSession httpsession)
	{
		return stockMetier.addStock(s, httpsession);
	}
	
	@GetMapping(value = "/update")
	public Stock updateStock(@RequestBody Stock a)
	{
		return stockMetier.updateStock(a);
	}
	

	@GetMapping(value = "/edite/{id}")
	public Stock editeStock(@PathVariable(value ="id") Long id)
	{
		return stockMetier.editeStock(id);
	}
	
	
	@GetMapping(value = "/addChoix/{id}/{id2}/{idmagasin}")
	public Stock addChoixStock(@PathVariable(value ="id") Long id,@PathVariable(value ="id2") Long id2,@PathVariable(value ="idmagasin")Long idmagasin)
	{
		return stockMetier.addChoix(id, id2,idmagasin);
	}
	
	
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteStock ( @PathVariable(value ="id") Long id) 
	{
		stockMetier.deleteStock(id);
	}
	
	@GetMapping( value = "/liste/scrussale/{id}")
	public List<Stock> ListeStock(@PathVariable(value ="id") Long id,HttpSession httpsession) 
	{
		return stockMetier.findAllOrdonly(id,httpsession);
	}

	
	@GetMapping( value = "/liste/ArticleChoisie/{id}/{id2}")
	public List<Stock> ListeArticleChoisie(@PathVariable(value ="id") Long id,@PathVariable(value ="id2") Long id2) 
	{
		return stockMetier.findByMagasinScrussale(id, id2);
	}
	
	
	@GetMapping( value = "/liste/magasin")
	public List<Magasin> ListeStockMagasin(HttpSession httpsession) 
	{
		return stockMetier.LmagasinbyScrussale(httpsession);
	}
	
	@PostMapping(value = "/save/approvisionnement/{id}" )
	public Approvisionement saveApp(@PathVariable(value ="id") Long id,@RequestBody Approvisionement a)
	{
		return stockMetier.addAprov(a, id);
	}
	
	
}
