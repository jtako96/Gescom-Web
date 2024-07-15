package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.JournalComptable;

public interface JournalComptableMetier {

	public JournalComptable addJournalComptable( JournalComptable jc );
	public JournalComptable editeJournalComptable( Long id );
	public void deleteJournalComptable ( Long id );
	
	public List<JournalComptable> findAllOrdonly ();
	
}
