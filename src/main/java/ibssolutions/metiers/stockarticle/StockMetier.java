package ibssolutions.metiers.stockarticle;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.parametre.Magasin;
import ibssolutions.entity.stockarticle.Approvisionement;
import ibssolutions.entity.stockarticle.Stock;


public interface StockMetier {

	public Stock addStock( Stock s,HttpSession httpsession );
	public Stock updateStock( Stock s );
	public Stock addChoix(Long idarticle, Long idscrussale ,Long idmagasin);
	public Stock editeStock( Long id );
	public void deleteStock ( Long id );
	
	public List<Stock> findAllOrdonly (Long idmagasin,HttpSession httpsession);
	List<Stock> findByMagasinScrussale(Long idmagasin, Long idscrussale);
	
	public List<Magasin> LmagasinbyScrussale(HttpSession httpsession);
	
	public Approvisionement addAprov(Approvisionement a, Long id);
	
}
