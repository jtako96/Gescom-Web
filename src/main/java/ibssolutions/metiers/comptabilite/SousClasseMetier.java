package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.SousClasse;

public interface SousClasseMetier {

	public SousClasse addSousClasse( SousClasse s );
	public SousClasse editeSousClasse( Long id );
	public void deleteSousClasse ( Long id );
	
	public List<SousClasse> findAllOrdonly ();
	public List<SousClasse> findAllOrdonlyByClasse (Long id);
	
}
