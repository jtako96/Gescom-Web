package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.comptabilite.JournalComptable;

public interface JournalComptableRepository  extends JpaRepository<JournalComptable, Long>{

	@Query("select j from JournalComptable j where j.id=1L")
	JournalComptable getJournalAchat();
	
	@Query("select j from JournalComptable j where j.id=2L")
	JournalComptable getJournalVente();
	
	@Query("select j from JournalComptable j where j.id=3L")
	JournalComptable getJournalTresorerie();
	
	@Query("select j from JournalComptable j where j.id=4L")
	JournalComptable getJournalOperationDivers();

	
	
	
	
}
