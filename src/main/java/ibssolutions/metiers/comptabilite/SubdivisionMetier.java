package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.Subdivision;

public interface SubdivisionMetier {

	public Subdivision addSubdivision( Subdivision s );
	public Subdivision editeSubdivision( Long id );
	public void deleteSubdivision ( Long id );
	
	public List<Subdivision> findAllOrdonly ();
	public List<Subdivision> findAllOrdonlyBySousClasse(Long id);
	
}
