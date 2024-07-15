package ibssolutions.metiersI.vente;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.PanierRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.dao.VenteRepository;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.entity.vente.Panier;
import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.vente.PanierMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IPanierMetier implements PanierMetier{

	@Autowired
	PanierRepository panierRepository;
	
	@Autowired
	private VenteRepository venteRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userrep;
	
	
	@Override
	public Panier addPanier(boolean actionTVA, Long idvente, Long idstock, Panier p) {
		
		Vente vente = venteRepository.findOne(idvente);
		Stock  stock = stockRepository.findOne(idstock);
		
		Panier dp = panierRepository.save(new Panier(stock, vente));
		dp.setDescription(p.getDescription());
		dp.setReference(vente.getCode()+"-"+dp.getId());
		dp.setPrixUnitaire(p.getPrixUnitaire());
		dp.setQuantite(p.getQuantite());
		dp.setRemise(p.getRemise());
		dp.setMontantHT(p.getMontantHT());
		dp.setMontantRemise(p.getMontantRemise());
		dp.setMontantTVA(p.getMontantTVA());
		dp.setMontantTTC(p.getMontantTTC());
		
		
		return panierRepository.save(dp);
	}

	@Override
	public Panier editePanier(Long id) {
		
		return null;
	}

	@Override
	public void deletePanier(Long id) {
		
		panierRepository.delete(id);
	}

	@Override
	public double calculHT(Long idvente) {
		
		return panierRepository.sommeHT(idvente);
	}
	
	@Override
	public double calculRemise(Long idvente) {
		
		return panierRepository.sommeRemiseOk(idvente);
	}

	@Override
	public double calculTOTALREMISE(Long idvente) {
		
		return panierRepository.sommeRemise(idvente);
	}

	@Override
	public double calculTVA(Long idvente) {
		
		return panierRepository.sommeTVA(idvente);
	}

	@Override
	public double calculTTC(Long idvente) {
		
		return panierRepository.sommeTTC(idvente);
	}

	@Override
	public List<Panier> detailventeByScrussale(HttpSession httpSession,Long vente) {
		
		  Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		  User users = userrep.findOne(recuperer.get("username").toString());
			
		return panierRepository.listePanierScrussal(scrussaleRepository.findOne(users.getIdScrussale()),venteRepository.findOne(vente));
	}

}
