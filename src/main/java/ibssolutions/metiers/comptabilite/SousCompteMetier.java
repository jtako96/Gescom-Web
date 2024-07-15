package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.SousCompte;

public interface SousCompteMetier {

	public SousCompte addSousCompte(SousCompte s);
	public SousCompte editeSousCompte(Long id);
	
	public void deleteSousCoompte(Long id);
	public List<SousCompte>findSousCompteAll();
	public List<SousCompte> findSousCompteByCompte(Long id);
}
