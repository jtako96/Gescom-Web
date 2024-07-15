package ibssolutions.metiersI.comptabilite;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.JournalComptableRepository;
import ibssolutions.entity.comptabilite.JournalComptable;
import ibssolutions.metiers.comptabilite.JournalComptableMetier;

@Service @Transactional
public class IJournalComptableMetier implements JournalComptableMetier{

	@Autowired
	JournalComptableRepository journalRepository;

	
	@Override
	public JournalComptable addJournalComptable(JournalComptable jc) {
		
		return journalRepository.save(jc);
	}

	@Override
	public JournalComptable editeJournalComptable(Long id) {
		
		return journalRepository.findOne(id);
	}

	@Override
	public void deleteJournalComptable(Long id) {
		journalRepository.delete(id);
		
	}

	@Override
	public List<JournalComptable> findAllOrdonly() {
		
		return journalRepository.findAll();
	}

}
