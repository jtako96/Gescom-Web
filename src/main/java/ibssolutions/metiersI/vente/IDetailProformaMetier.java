package ibssolutions.metiersI.vente;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.DetailProformaRepository;
import ibssolutions.dao.ProformaRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.entity.vente.DetailProforma;
import ibssolutions.entity.vente.Proforma;
import ibssolutions.metiers.vente.DetailProformaMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IDetailProformaMetier implements DetailProformaMetier{

	@Autowired
	DetailProformaRepository detailProformaRepository;
	
	@Autowired
	private ProformaRepository proformaRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userrep;
	
	
	@Override
	public DetailProforma addDetailProforma(boolean actionTVA, Long idproforma, Long idstock, DetailProforma p) {
		
		Proforma proforma = proformaRepository.findOne(idproforma);
		Stock  stock = stockRepository.findOne(idstock);
		
		DetailProforma dp = detailProformaRepository.save(new DetailProforma(stock, proforma));
		dp.setDescription(p.getDescription());
		dp.setReference(proforma.getCode()+"-"+dp.getId());
		dp.setPrixUnitaire(p.getPrixUnitaire());
		dp.setQuantite(p.getQuantite());
		dp.setRemise(p.getRemise());
		dp.setMontantHT(p.getMontantHT());
		dp.setMontantRemise(p.getMontantRemise());
		dp.setMontantTVA(p.getMontantTVA());
		dp.setMontantTTC(p.getMontantTTC());
		
		
		return detailProformaRepository.save(dp);
	}

	@Override
	public DetailProforma editeDetailProforma(Long id) {
		
		return null;
	}

	@Override
	public void deleteDetailProforma(Long id) {
		
		detailProformaRepository.delete(id);
	}

	@Override
	public double calculHT(Long idproforma) {
		
		return detailProformaRepository.sommeHT(idproforma);
	}
	
	@Override
	public double calculRemise(Long idproforma) {
		
		return detailProformaRepository.sommeRemiseOk(idproforma);
	}

	@Override
	public double calculTOTALREMISE(Long idproforma) {
		
		return detailProformaRepository.sommeRemise(idproforma);
	}

	@Override
	public double calculTVA(Long idproforma) {
		
		return detailProformaRepository.sommeTVA(idproforma);
	}

	@Override
	public double calculTTC(Long idproforma) {
		
		return detailProformaRepository.sommeTTC(idproforma);
	}

	@Override
	public List<DetailProforma> detailproformatByScrussale(HttpSession httpSession,Long proforma) {
		
		  Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		  User users = userrep.findOne(recuperer.get("username").toString());
			
		return detailProformaRepository.listeDetailProformaScrussal(scrussaleRepository.findOne(users.getIdScrussale()),proformaRepository.findOne(proforma));
	}

}
