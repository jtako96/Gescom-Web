package ibssolutions.metiersI.comptabilite;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.DetailEcritureRepository;
import ibssolutions.dao.EcritureRepository;
import ibssolutions.entity.comptabilite.DetailEcriture;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.metiers.comptabilite.DetailEcritureMetier;


@Service @Transactional
public class IDetailEcritureMetier implements DetailEcritureMetier{

	@Autowired
	DetailEcritureRepository detailRepository;
	
	@Autowired
	EcritureRepository  ecritureRepository;
	
	@Override
	public DetailEcriture addDetailEcriture(DetailEcriture d,Long idecriture) {
		
		
		if (d.getSens().toUpperCase().equals("D")) {
			d.setMontantDebit(d.getMontantCredit());
			d.setMontantCredit(0);
		}else {
			d.setMontantCredit(d.getMontantCredit());
			d.setMontantDebit(0);
		}
		d.setDate(new Date());
		d.setEcriture(ecritureRepository.findOne(idecriture));
		return detailRepository.save(d);
	}

	@Override
	public DetailEcriture editeDetailEcriture(Long id) {
		
		return detailRepository.findOne(id);
	}

	@Override
	public void deleteDetailEcriture(Long id) {
		detailRepository.delete(id);
	}

	@Override
	public List<DetailEcriture> findAllOrdonly(Long idecriture) {
		
		return detailRepository.listeDetailEcriture(idecriture);
	}

	@Override
	public double totalDebit(Long idecriture) {
		
		return detailRepository.sommeDebit(idecriture);
	}

	@Override
	public double totalCredit(Long idecriture) {
		
		return detailRepository.sommeCredit(idecriture);
	}

	@Override
	public void validEcriture(Long id) {
		Ecriture e = ecritureRepository.findOne(id);
		e.setEtat(true);
		ecritureRepository.save(e);
	}
}
