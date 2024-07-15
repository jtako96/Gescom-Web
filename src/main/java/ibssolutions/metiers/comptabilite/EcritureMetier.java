package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.Ecriture;

public interface EcritureMetier {

	public Ecriture addEcriture( Ecriture e );
	public Ecriture editeEcriture( Long id );
	public void deleteEcriture ( Long id );
	public void validateEcriture ( Long id );
	
	public List<Ecriture> findAllOrdonly (Long idscrussale, Long id );
	List<Ecriture> findAllOrdonlyTrue(Long idscrussale, Long id);
	
}
