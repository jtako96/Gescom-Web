package ibssolutions.metiersI.vente;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.DetailPrestationRepository;
import ibssolutions.dao.PrestationRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.vente.DetailPrestation;
import ibssolutions.entity.vente.Prestation;
import ibssolutions.metiers.vente.DetailPrestationMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IDetailPrestationMetier implements DetailPrestationMetier{

	@Autowired
	DetailPrestationRepository detailPrestationRepository;
	
	@Autowired
	private PrestationRepository prestationRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userrep;
	
	
	@Override
	public DetailPrestation addDetailPrestation(boolean actionTVA, Long idprestation, DetailPrestation p) {
		
		Prestation prestation = prestationRepository.findOne(idprestation);
		
		DetailPrestation dp = detailPrestationRepository.save(new DetailPrestation(prestation));
		
		dp.setDescription(p.getDescription());
		dp.setReference(prestation.getCode()+"-"+dp.getId());
		dp.setPrixUnitaire(p.getPrixUnitaire());
		dp.setQuantite(p.getQuantite());//enregidtrement 
		dp.setRemise(p.getRemise());
		dp.setMontantHT(p.getMontantHT());
		dp.setMontantRemise(p.getMontantRemise());
		dp.setMontantTVA(p.getMontantTVA());
		dp.setMontantTTC(p.getMontantTTC());
		
		
		return detailPrestationRepository.save(dp);
	}

	@Override
	public DetailPrestation editeDetailPrestation(Long id) {
		
		return null;
	}

	@Override
	public void deleteDetailPrestation(Long id) {
		
		detailPrestationRepository.delete(id);
	}

	@Override
	public double calculHT(Long idproforma) {
		
		return detailPrestationRepository.sommeHT(idproforma);
	}
	
	@Override
	public double calculRemise(Long idproforma) {
		
		return detailPrestationRepository.sommeRemiseOk(idproforma);
	}

	@Override
	public double calculTOTALREMISE(Long idproforma) {
		
		return detailPrestationRepository.sommeRemise(idproforma);
	}

	@Override
	public double calculTVA(Long idproforma) {
		
		return detailPrestationRepository.sommeTVA(idproforma);
	}

	@Override
	public double calculTTC(Long idproforma) {
		
		return detailPrestationRepository.sommeTTC(idproforma);
	}

	@Override
	public List<DetailPrestation> detailproformatByScrussale(HttpSession httpSession,Long proforma) {
		
		  Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		  User users = userrep.findOne(recuperer.get("username").toString());
			
		return detailPrestationRepository.listeDetailPrestationScrussal(scrussaleRepository.findOne(users.getIdScrussale()),prestationRepository.findOne(proforma));
	}

}
