package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.Compte;

public interface CompteMetier {

	public Compte addCompte( Compte c );
	public Compte editeCompte( Long id );
	public void deleteCompte ( Long id );
	
	public List<Compte> findAllOrdonly ();
	public List<Compte> findAllOrdonlyBySubdivision(Long id);
	Compte updateCompte(Compte c);
	
}
