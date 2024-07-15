package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.DetailEcriture;

public interface DetailEcritureMetier {

	public DetailEcriture addDetailEcriture( DetailEcriture d , Long idecriture);
	public DetailEcriture editeDetailEcriture( Long id );
	public void deleteDetailEcriture ( Long id );
	
	public List<DetailEcriture> findAllOrdonly (Long idecriture);
	
	public double totalDebit(Long idecriture);
	public double totalCredit(Long idecriture);
	void validEcriture(Long id);
}
