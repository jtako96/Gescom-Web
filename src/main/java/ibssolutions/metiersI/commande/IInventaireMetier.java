package ibssolutions.metiersI.commande;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibssolutions.commande.DetailsInventaire;
import ibssolutions.commande.Inventaire;
import ibssolutions.dao.DetailsInventaireRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.InventaireRepository;
import ibssolutions.dao.MoisRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.StatutLivraisonRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.metiers.commande.InventaireMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IInventaireMetier implements InventaireMetier{

	@Autowired InventaireRepository inventaireRepository;
	
	@Autowired
	ExerciceRepository exerciceRepository;
	
	@Autowired
	ParametreRepository parametreRepository;
	
	@Autowired
	UserRepository userrep;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	StatutLivraisonRepository statutLivraisonRepository;
	
	@Autowired
	DetailsInventaireRepository detailsRepository;
	
	@Autowired
	MoisRepository moisRepository;
	
	@Autowired
	StockRepository  stockRepository;
	
	@Override
	public Inventaire addInventaire(Inventaire i,HttpSession httpSession) {
		
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		Parametre p = parametreRepository.findByInventaire();
		i.setCode("INV-"+p.getValeur());
		p.setValeur(p.getValeur()+1);
		parametreRepository.save(p);
		i.setDateInventaire(new Date());
		i.setScrussale(scrussaleRepository.findOne(users.getIdScrussale()));
		i.setMois(moisRepository.getMoisTrue());
		i.setUsername(users.getNomComplet());
		i.setExercice(exerciceRepository.getExerciceTrue());
		
		return inventaireRepository.save(i);
	}

	@Override
	public Inventaire editeInventaire(Long iod) {
		
		return inventaireRepository.findOne(iod);
	}

	@Override
	public void deleteInventaire(Long id) {
		inventaireRepository.delete(id);
	}

	@Override
	public List<Inventaire> ListeInventaire(HttpSession httpSession) {
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		return inventaireRepository.findAllInventaire(users.getIdScrussale());
	}

	@Override
	public boolean generateDetails(HttpSession httpSession, Long idmagasin,Long idinv) {
		
		boolean resultat =  false;
		
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		List<DetailsInventaire> Ldetails  = inventaireRepository.listeDetails(idinv,users.getIdScrussale(),idmagasin);
		if (Ldetails.size() != 0) 
		{
			 resultat =  false;
			 System.err.println("sdsvdsf");
		}
		else 
		{
			List<Stock>Lstock = stockRepository.listStockByScrussale(idmagasin, users.getIdScrussale());
			for (Stock stock : Lstock) 
			{
				
				DetailsInventaire d = new DetailsInventaire();
				
				d.setInventaire(inventaireRepository.findOne(idinv));
				d.setQteAvantInventaire(stock.getQuantiteReel());
				d.setQuantiteInventorie(0);
				d.setQteAprestInventaire(stock.getQuantiteReel() - d.getQteAprestInventaire());
				d.setStock(stock);
				
				detailsRepository.save(d);

				//fin de la génération des article a inventorie suit a la creation des 
			}
			resultat =  true;
		}
		return resultat;
	}

	@Override
	public List<DetailsInventaire> listedetails(Long idinventaire,Long idmagasin, HttpSession httpSession) {
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return inventaireRepository.ficheInventorial(idinventaire,users.getIdScrussale(),idmagasin);
	}

	@Override
	public void saveDetails(DetailsInventaire d) {
		detailsRepository.save(d);
	}
	
	@Override
	public List<Inventaire> ListeInventaire(Long idscrussale,Long idmois) {
		
		return inventaireRepository.findAllInventaireByID(idscrussale,idmois);
		
	}

	@Override
	public List<DetailsInventaire> listeDetailsbyIDinve(Long id) {
		
		return inventaireRepository.findByIDinventaire(id);
	}
	
	@Override
	public void validerInventaire(Long idDetails) {
		System.out.println("ID recuperer pour Opérations =======/.. "+idDetails);
		DetailsInventaire di = detailsRepository.findOne(idDetails);
		
		di.setEtat(true);
		System.out.println("OBjer recuperer pour Opérations =======/.. "+di);
		detailsRepository.save(di);
	}
}
