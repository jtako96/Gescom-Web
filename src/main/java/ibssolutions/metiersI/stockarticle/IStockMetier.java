package ibssolutions.metiersI.stockarticle;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.AprovissionementRepository;
import ibssolutions.dao.ArticleRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.MagasinRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.Magasin;
import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.stockarticle.Approvisionement;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.metiers.stockarticle.StockMetier;

@Service @Transactional
public class IStockMetier implements StockMetier{

	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private ArticleRepository articleRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	MagasinRepository magasinRepository;
	
	@Autowired
	UserRepository userrep;
	
	@Autowired
	AprovissionementRepository aproRepository;
	
	@Autowired
	ExerciceRepository exerciceRepository;
	
	@Override
	public Stock addStock(Stock s ,HttpSession httpsession) {
		
		Map<String, Object> recuperer = getloggerScrussale(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		s.setScrussale(scrussaleRepository.findOne(users.getIdScrussale()));
		
		return stockRepository.save(s);
	}

	@Override
	public Stock updateStock(Stock s) {
		
		return stockRepository.save(s);
	}

	@Override
	public Stock addChoix(Long idarticle, Long idscrussale,Long idmagasin) {
		
		Scrussale s = scrussaleRepository.findOne(idscrussale);
		Stock stock = new Stock(0, 0, 0, s, articleRepository.findOne(idarticle));
		stock.setMagasin(magasinRepository.findOne(idmagasin));
		return stockRepository.save(stock);
	}

	@Override
	public Stock editeStock(Long id) {
		
		return stockRepository.findOne(id);
	}

	@Override
	public void deleteStock(Long id) {
		stockRepository.delete(id);
	}

	@Override
	public List<Stock> findAllOrdonly(Long idmagasin,HttpSession httpsession) {
		
		Map<String, Object> recuperer = getloggerScrussale(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
	
		
		return stockRepository.listStockByScrussale(idmagasin,users.getIdScrussale());
	}

	@Override
	public List<Stock> findByMagasinScrussale(Long idmagasin, Long idscrussale) {
		
		return stockRepository.listStockByScrussale(idmagasin,idscrussale);
	}
	
	
	public Map<String, Object> getloggerScrussale(HttpSession httpsession)
	{

		SecurityContext securityContext = (SecurityContext) httpsession.getAttribute("SPRING_SECURITY_CONTEXT");
		String username = securityContext.getAuthentication().getName();
		List<String> roles = new ArrayList<String>();

		for (GrantedAuthority ga : securityContext.getAuthentication().getAuthorities()) {

			roles.add(ga.getAuthority());

		}
		Map<String, Object> params = new HashMap<>();
		params.put("username", username);
		params.put("roles", roles);

		return params;

	}

	@Override
	public List<Magasin> LmagasinbyScrussale(HttpSession httpsession) {
		
		Map<String, Object> recuperer = getloggerScrussale(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
	
		return magasinRepository.getAllMagasin(users.getIdScrussale());
	}

	@Override
	public Approvisionement addAprov(Approvisionement a,Long id) {
		
		Approvisionement ap = new Approvisionement();
		
		ap.setDateAprov(new Date());
		ap.setExercice(exerciceRepository.getExerciceTrue());
		
		ap.setQuantiteEntree(a.getQuantiteEntree());
		ap.setQuantiteAvant(stockRepository.findOne(id).getQuantiteReel());
		ap.setQuantiteApres( a.getQuantiteEntree() + stockRepository.findOne(id).getQuantiteReel());
		ap.setStock(stockRepository.findOne(id));
		ap.setSource(a.getSource());
		ap.setScrussale(stockRepository.findOne(id).getScrussale());
		Approvisionement  aprov = aproRepository.save(ap);
		
		Stock s  = stockRepository.findOne(id);
		
		s.setQuantiteReel(s.getQuantiteReel() + aprov.getQuantiteEntree());
		stockRepository.save(s);
		
		return aprov;
	}

}
